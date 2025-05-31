
const API_BASE_URL = 'http://localhost:8080/api/vending';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  available: boolean;
}

export interface TransactionItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface TransactionResponse {
  items: TransactionItem[];
  totalAmount: number;
  amountReceived: number;
  changeGiven: number;
  status: string;
  timestamp: string;
  changeBreakdown: Record<string, number>;
}

class VendingMachineApi {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async insertCoin(amount: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/insert-coin?amount=${amount}`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to insert coin');
    } catch (error) {
      console.error('Error inserting coin:', error);
      throw error;
    }
  }

  async selectProduct(productId: number, quantity: number = 1): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/select-product?productId=${productId}&quantity=${quantity}`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to select product');
    } catch (error) {
      console.error('Error selecting product:', error);
      throw error;
    }
  }

  async completePurchase(): Promise<TransactionResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/purchase`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to complete purchase');
      return await response.json();
    } catch (error) {
      console.error('Error completing purchase:', error);
      throw error;
    }
  }

  async cancelTransaction(): Promise<TransactionResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/cancel`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to cancel transaction');
      return await response.json();
    } catch (error) {
      console.error('Error cancelling transaction:', error);
      throw error;
    }
  }

  async getCurrentBalance(): Promise<number> {
    try {
      const response = await fetch(`${API_BASE_URL}/balance`);
      if (!response.ok) throw new Error('Failed to fetch balance');
      return await response.json();
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw error;
    }
  }

  async getTransactionStatus(id: number): Promise<TransactionResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${id}`);
      if (!response.ok) throw new Error('Failed to fetch transaction status');
      return await response.json();
    } catch (error) {
      console.error('Error fetching transaction status:', error);
      throw error;
    }
  }
}

export const vendingMachineApi = new VendingMachineApi();
