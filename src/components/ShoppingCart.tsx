
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, CreditCard, X } from 'lucide-react';

interface CartItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface ShoppingCartProps {
  items: CartItem[];
  onPurchase: () => void;
  onCancel: () => void;
  onRemoveItem: (productId: number) => void;
  currentBalance: number;
  disabled?: boolean;
}

const ShoppingCartComponent: React.FC<ShoppingCartProps> = ({
  items,
  onPurchase,
  onCancel,
  onRemoveItem,
  currentBalance,
  disabled
}) => {
  const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const canPurchase = currentBalance >= totalAmount && items.length > 0;

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-purple-800">
          <ShoppingCart className="w-5 h-5" />
          Shopping Cart ({items.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center justify-between p-2 bg-white rounded border">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.productName}</h4>
                    <p className="text-xs text-gray-600">
                      ${item.unitPrice.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">${item.totalPrice.toFixed(2)}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onRemoveItem(item.productId)}
                      disabled={disabled}
                      className="h-6 w-6 p-0 hover:bg-red-100"
                    >
                      <Trash2 className="w-3 h-3 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-3">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold">Total:</span>
                <span className="text-lg font-bold text-purple-700">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center mb-3 text-sm">
                <span>Balance:</span>
                <span className={currentBalance >= totalAmount ? 'text-green-600' : 'text-red-600'}>
                  ${currentBalance.toFixed(2)}
                </span>
              </div>
              
              {!canPurchase && items.length > 0 && (
                <p className="text-red-600 text-xs mb-3">
                  Insufficient balance. Please insert more coins.
                </p>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onCancel}
                disabled={disabled}
                className="flex-1"
              >
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={onPurchase}
                disabled={!canPurchase || disabled}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <CreditCard className="w-4 h-4 mr-1" />
                Purchase
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ShoppingCartComponent;
