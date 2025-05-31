
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package } from 'lucide-react';
import { Product } from '@/services/vendingMachineApi';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: number) => void;
  disabled?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, disabled }) => {
  const isOutOfStock = product.stock === 0 || !product.available;
  
  return (
    <Card className={`relative transition-all duration-300 hover:shadow-lg ${
      isOutOfStock ? 'opacity-50' : 'hover:scale-105'
    } ${disabled ? 'opacity-75' : ''}`}>
      <CardContent className="p-4">
        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center">
          <Package className="w-12 h-12 text-gray-400" />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-sm truncate">{product.name}</h3>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-green-600">
              ${product.price.toFixed(2)}
            </span>
            <Badge variant={isOutOfStock ? "destructive" : "secondary"}>
              Stock: {product.stock}
            </Badge>
          </div>
          
          <Button
            className="w-full"
            size="sm"
            onClick={() => onSelect(product.id)}
            disabled={isOutOfStock || disabled}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {isOutOfStock ? 'Out of Stock' : 'Select'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
