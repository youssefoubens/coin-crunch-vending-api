
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, DollarSign } from 'lucide-react';

interface CoinInsertionProps {
  currentBalance: number;
  onInsertCoin: (amount: number) => void;
  disabled?: boolean;
}

const CoinInsertion: React.FC<CoinInsertionProps> = ({ 
  currentBalance, 
  onInsertCoin, 
  disabled 
}) => {
  const coinValues = [0.25, 0.50, 1.00, 2.00, 5.00, 10.00];

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Coins className="w-5 h-5" />
          Insert Coins
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-3 bg-green-100 rounded-lg border-2 border-green-300">
          <div className="flex items-center justify-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-xl font-bold text-green-800">
              ${currentBalance.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-green-600 mt-1">Current Balance</p>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {coinValues.map((value) => (
            <Button
              key={value}
              variant="outline"
              size="sm"
              onClick={() => onInsertCoin(value)}
              disabled={disabled}
              className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              ${value.toFixed(2)}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CoinInsertion;
