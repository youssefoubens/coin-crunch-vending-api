# Coin Crunch Vending API

A modern, interactive vending machine application with a React frontend that connects to a vending machine API backend.

## Overview

Coin Crunch Vending API is a web application that simulates a smart vending machine interface. It allows users to:

- Browse available products with prices and stock information
- Insert virtual coins of different denominations
- Select and add products to a shopping cart
- Complete transactions and receive change
- View transaction receipts and change breakdown

## Features

- 🪙 **Coin Insertion**: Insert virtual coins of different denominations
- 🛒 **Product Selection**: Browse and select from available products 
- 🧮 **Real-time Balance**: Monitor your current balance as you add coins
- 📊 **Transaction History**: View detailed receipt with itemized purchase information
- 🔄 **Change Calculation**: Automatically calculated change returned in appropriate denominations

## Technologies Used

- **Frontend**:
  - React with TypeScript
  - Tailwind CSS for styling
  - Shadcn UI component library
  - Vite build tool

- **Backend**:
  - RESTful API architecture (Spring boot)
  - HTTP endpoints for vending machine operations

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn or bun package manager

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/coin-crunch-vending-api.git
   cd coin-crunch-vending-api
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

### Backend Configuration

The application expects the vending machine backend API to be running at `http://localhost:8087/api/vending`. Make sure the backend service is running before using the application.

## API Endpoints

The frontend interacts with the following API endpoints:

- `GET /products` - Fetch all available products
- `POST /insert-coin?amount={amount}` - Insert coins into the machine
- `POST /select-product?productId={id}&quantity={qty}` - Select a product
- `POST /complete-purchase` - Complete the transaction and get change
- `POST /cancel-transaction` - Cancel the current transaction
- `GET /balance` - Get the current inserted balance

## Project Structure

```
coin-crunch-vending-api/
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   │   ├── ui/         # UI components from shadcn
│   │   ├── VendingMachine.tsx   # Main vending machine component
│   │   ├── CoinInsertion.tsx    # Coin insertion interface
│   │   ├── ProductCard.tsx      # Product display card
│   │   ├── ShoppingCart.tsx     # Shopping cart component
│   │   └── TransactionStatus.tsx # Transaction receipt display
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── services/       # API service layer
│   │   └── vendingMachineApi.ts # API client for vending machine
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── tailwind.config.ts  # Tailwind CSS configuration
└── vite.config.ts      # Vite configuration
```

## Usage

1. **Insert Coins**: Click on the coin denominations to add money to your balance
2. **Select Products**: Browse the available products and click to add them to your cart
3. **Complete Purchase**: Once you've selected products, click "Complete Purchase" to finalize the transaction
4. **Receive Change**: The system will automatically calculate and display your change

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.