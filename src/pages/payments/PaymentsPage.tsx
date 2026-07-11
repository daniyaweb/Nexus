import React, { useState } from 'react';
import { DollarSign, ArrowUpRight, ArrowDownLeft, ArrowLeftRight, TrendingUp } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { wallets, transactions, Transaction } from '../../data/payments';

export const PaymentsPage: React.FC = () => {
    const { user } = useAuth();

    const userWallet = wallets.find(w => w.userId === user?.id);
    const [balance, setBalance] = useState(userWallet?.balance || 0);
    const [allTransactions, setAllTransactions] = useState<Transaction[]>(transactions);
    const [activeModal, setActiveModal] = useState<'deposit' | 'withdraw' | 'transfer' | 'funding' | null>(null);
    const [amount, setAmount] = useState('');
    const [receiver, setReceiver] = useState('');

    const handleTransaction = () => {
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        const num = Number(amount);

        if ((activeModal === 'withdraw' || activeModal === 'transfer' || activeModal === 'funding') && num > balance) {
            alert('Insufficient balance');
            return;
        }

        const newTransaction: Transaction = {
            id: 't' + (allTransactions.length + 1),
            type: activeModal!,
            amount: num,
            sender: activeModal === 'deposit' ? 'Bank' : user?.name || 'You',
            receiver: activeModal === 'deposit' ? user?.name || 'You' : receiver || 'Recipient',
            status: 'completed',
            createdAt: new Date().toISOString(),
        };

        if (activeModal === 'deposit') setBalance(balance + num);
        if (activeModal === 'withdraw') setBalance(balance - num);
        if (activeModal === 'transfer') setBalance(balance - num);
        if (activeModal === 'funding') setBalance(balance - num);

        setAllTransactions([newTransaction, ...allTransactions]);
        setAmount('');
        setReceiver('');
        setActiveModal(null);
    };

    const getTypeColor = (type: string) => {
        if (type === 'deposit') return 'success';
        if (type === 'funding') return 'primary';
        if (type === 'withdraw') return 'error';
        return 'warning';
    };

    const getStatusColor = (status: string) => {
        if (status === 'completed') return 'success';
        if (status === 'pending') return 'warning';
        return 'error';
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
                <p className="text-gray-600">Manage your wallet and transactions</p>
            </div>

            {/* Wallet Balance */}
            <Card className="bg-primary-700 overflow-hidden">
                <CardBody>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-primary-200 text-sm font-medium">Wallet Balance</p>
                            <h2 className="text-4xl font-bold mt-1">${balance.toLocaleString()}</h2>
                            <p className="text-primary-200 text-sm mt-1">{user?.name}</p>
                        </div>
                        <div className="p-4 bg-primary-500 rounded-full">
                            <DollarSign size={32} className="text-white" />
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                    onClick={() => setActiveModal('deposit')}
                    className="flex flex-col items-center p-4 bg-success-50 border border-success-500 rounded-xl hover:bg-success-100 transition-colors"
                >
                    <ArrowDownLeft size={24} className="text-success-700 mb-2" />
                    <span className="text-sm font-medium text-success-700">Deposit</span>
                </button>

                <button
                    onClick={() => setActiveModal('withdraw')}
                    className="flex flex-col items-center p-4 bg-error-50 border border-error-500 rounded-xl hover:bg-error-100 transition-colors"
                >
                    <ArrowUpRight size={24} className="text-error-700 mb-2" />
                    <span className="text-sm font-medium text-error-700">Withdraw</span>
                </button>

                <button
                    onClick={() => setActiveModal('transfer')}
                    className="flex flex-col items-center p-4 bg-warning-50 border border-warning-500 rounded-xl hover:bg-warning-100 transition-colors"
                >
                    <ArrowLeftRight size={24} className="text-warning-700 mb-2" />
                    <span className="text-sm font-medium text-warning-700">Transfer</span>
                </button>

                <button
                    onClick={() => setActiveModal('funding')}
                    className="flex flex-col items-center p-4 bg-primary-50 border border-primary-500 rounded-xl hover:bg-primary-100 transition-colors"
                >
                    <TrendingUp size={24} className="text-primary-700 mb-2" />
                    <span className="text-sm font-medium text-primary-700">Fund Deal</span>
                </button>
            </div>

            {/* Transaction History */}
            <Card>
                <CardHeader>
                    <h2 className="text-lg font-medium text-gray-900">Transaction History</h2>
                </CardHeader>
                <CardBody>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px] text-sm">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Type</th>
                                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Amount</th>
                                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Sender</th>
                                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Receiver</th>
                                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allTransactions.map(tx => (
                                    <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <Badge variant={getTypeColor(tx.type)}>{tx.type}</Badge>
                                        </td>
                                        <td className="py-3 px-4 font-medium text-gray-900">${tx.amount.toLocaleString()}</td>
                                        <td className="py-3 px-4 text-gray-600">{tx.sender}</td>
                                        <td className="py-3 px-4 text-gray-600">{tx.receiver}</td>
                                        <td className="py-3 px-4">
                                            <Badge variant={getStatusColor(tx.status)}>{tx.status}</Badge>
                                        </td>
                                        <td className="py-3 px-4 text-gray-500">{new Date(tx.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>

            {/* Transaction Modal */}
            {activeModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 capitalize">{activeModal}</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                                <input
                                    type="number"
                                    placeholder="Enter amount"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>

                            {(activeModal === 'transfer' || activeModal === 'funding') && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {activeModal === 'funding' ? 'Entrepreneur Name' : 'Recipient Name'}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter name"
                                        value={receiver}
                                        onChange={e => setReceiver(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 mt-6">
                            <Button onClick={handleTransaction} fullWidth>Confirm</Button>
                            <Button variant="outline" onClick={() => { setActiveModal(null); setAmount(''); setReceiver(''); }} fullWidth>Cancel</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};