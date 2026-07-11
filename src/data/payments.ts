export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'transfer' | 'funding';
  amount: number;
  sender: string;
  receiver: string;
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
}

export interface Wallet {
  userId: string;
  balance: number;
}

export const wallets: Wallet[] = [
  { userId: 'e1', balance: 5000 },
  { userId: 'e2', balance: 3200 },
  { userId: 'e3', balance: 8750 },
  { userId: 'i1', balance: 50000 },
  { userId: 'i2', balance: 75000 },
  { userId: 'i3', balance: 30000 },
];

export const transactions: Transaction[] = [
  {
    id: 't1',
    type: 'deposit',
    amount: 5000,
    sender: 'Bank',
    receiver: 'Sarah Johnson',
    status: 'completed',
    createdAt: '2024-02-15T10:00:00Z'
  },
  {
    id: 't2',
    type: 'funding',
    amount: 10000,
    sender: 'Michael Rodriguez',
    receiver: 'Sarah Johnson',
    status: 'completed',
    createdAt: '2024-02-14T14:30:00Z'
  },
  {
    id: 't3',
    type: 'withdraw',
    amount: 2000,
    sender: 'Sarah Johnson',
    receiver: 'Bank',
    status: 'completed',
    createdAt: '2024-02-13T09:15:00Z'
  },
  {
    id: 't4',
    type: 'transfer',
    amount: 1500,
    sender: 'Michael Rodriguez',
    receiver: 'James Wilson',
    status: 'pending',
    createdAt: '2024-02-12T16:45:00Z'
  },
];