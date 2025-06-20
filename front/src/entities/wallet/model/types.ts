export interface Wallet {
  id: string;
  balance: number;
  currency: string;
  pendingAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface WalletOperationRequest {
  amount: number;
  type: 'deposit' | 'withdraw';
}

export interface WalletOperationResponse {
  success: boolean;
  wallet: Wallet;
  transactionId: string;
}

