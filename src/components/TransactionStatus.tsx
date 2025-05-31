
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Receipt, X } from 'lucide-react';
import { TransactionResponse } from '@/services/vendingMachineApi';

interface TransactionStatusProps {
  transaction: TransactionResponse | null;
  onClose: () => void;
}

const TransactionStatus: React.FC<TransactionStatusProps> = ({ 
  transaction, 
  onClose 
}) => {
  if (!transaction) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'CANCELLED':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'PENDING':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <Receipt className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'default' as const;
      case 'CANCELLED':
        return 'destructive' as const;
      case 'PENDING':
        return 'secondary' as const;
      default:
        return 'outline' as const;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              Transaction Receipt
            </CardTitle>
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Status:</span>
            <Badge variant={getStatusVariant(transaction.status)} className="flex items-center gap-1">
              {getStatusIcon(transaction.status)}
              {transaction.status}
            </Badge>
          </div>
          
          <div className="border-t pt-3">
            <h4 className="font-semibold mb-2">Items Purchased:</h4>
            <div className="space-y-2">
              {transaction.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.productName} x{item.quantity}</span>
                  <span>${item.totalPrice.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t pt-3 space-y-2">
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span className="font-semibold">${transaction.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Amount Received:</span>
              <span>${transaction.amountReceived.toFixed(2)}</span>
            </div>
            {transaction.changeGiven > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Change Given:</span>
                <span className="font-semibold">${transaction.changeGiven.toFixed(2)}</span>
              </div>
            )}
          </div>
          
          {transaction.changeBreakdown && Object.keys(transaction.changeBreakdown).length > 0 && (
            <div className="border-t pt-3">
              <h4 className="font-semibold mb-2">Change Breakdown:</h4>
              <div className="grid grid-cols-2 gap-1 text-sm">
                {Object.entries(transaction.changeBreakdown).map(([denomination, count]) => (
                  <div key={denomination} className="flex justify-between">
                    <span>{denomination}:</span>
                    <span>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="text-xs text-gray-500 text-center">
            {new Date(transaction.timestamp).toLocaleString()}
          </div>
          
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionStatus;
