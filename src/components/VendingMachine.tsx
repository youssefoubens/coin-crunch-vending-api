
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Zap } from 'lucide-react';
import ProductCard from './ProductCard';
import CoinInsertion from './CoinInsertion';
import ShoppingCart from './ShoppingCart';
import TransactionStatus from './TransactionStatus';
import { vendingMachineApi, Product, TransactionResponse } from '@/services/vendingMachineApi';

interface CartItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

const VendingMachine: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [processing, setProcessing] = useState<boolean>(false);
  const [currentTransaction, setCurrentTransaction] = useState<TransactionResponse | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [productsData, balance] = await Promise.all([
        vendingMachineApi.getProducts(),
        vendingMachineApi.getCurrentBalance()
      ]);
      setProducts(productsData);
      setCurrentBalance(balance);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load vending machine data. Please check if the backend is running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInsertCoin = async (amount: number) => {
    try {
      setProcessing(true);
      await vendingMachineApi.insertCoin(amount);
      const newBalance = await vendingMachineApi.getCurrentBalance();
      setCurrentBalance(newBalance);
      toast({
        title: "Coin Inserted",
        description: `$${amount.toFixed(2)} added to your balance.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to insert coin. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleSelectProduct = async (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    try {
      setProcessing(true);
      await vendingMachineApi.selectProduct(productId, 1);
      
      // Update cart items
      const existingItem = cartItems.find(item => item.productId === productId);
      if (existingItem) {
        setCartItems(cartItems.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * item.unitPrice }
            : item
        ));
      } else {
        setCartItems([...cartItems, {
          productId: product.id,
          productName: product.name,
          quantity: 1,
          unitPrice: product.price,
          totalPrice: product.price
        }]);
      }

      toast({
        title: "Product Selected",
        description: `${product.name} added to cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to select product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.productId !== productId));
  };

  const handlePurchase = async () => {
    try {
      setProcessing(true);
      const transaction = await vendingMachineApi.completePurchase();
      setCurrentTransaction(transaction);
      
      // Reset cart and update balance and products
      setCartItems([]);
      const [newBalance, updatedProducts] = await Promise.all([
        vendingMachineApi.getCurrentBalance(),
        vendingMachineApi.getProducts()
      ]);
      setCurrentBalance(newBalance);
      setProducts(updatedProducts);
      
      toast({
        title: "Purchase Completed",
        description: "Your transaction has been completed successfully!",
      });
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Failed to complete purchase. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleCancel = async () => {
    try {
      setProcessing(true);
      const transaction = await vendingMachineApi.cancelTransaction();
      setCurrentTransaction(transaction);
      setCartItems([]);
      
      const newBalance = await vendingMachineApi.getCurrentBalance();
      setCurrentBalance(newBalance);
      
      toast({
        title: "Transaction Cancelled",
        description: "Your transaction has been cancelled.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel transaction.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
        <Card className="p-8">
          <div className="flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading Vending Machine...</span>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-4">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
              <Zap className="w-8 h-8" />
              Smart Vending Machine
            </CardTitle>
            <p className="text-blue-100">Select your products and enjoy!</p>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Products Grid */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Available Products
                  <Badge variant="secondary">{products.length} items</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={handleSelectProduct}
                      disabled={processing}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Coin Insertion */}
            <CoinInsertion
              currentBalance={currentBalance}
              onInsertCoin={handleInsertCoin}
              disabled={processing}
            />

            {/* Shopping Cart */}
            <ShoppingCart
              items={cartItems}
              onPurchase={handlePurchase}
              onCancel={handleCancel}
              onRemoveItem={handleRemoveFromCart}
              currentBalance={currentBalance}
              disabled={processing}
            />
          </div>
        </div>

        {/* Transaction Status Modal */}
        <TransactionStatus
          transaction={currentTransaction}
          onClose={() => setCurrentTransaction(null)}
        />

        {/* Processing Overlay */}
        {processing && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                <span>Processing...</span>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendingMachine;
