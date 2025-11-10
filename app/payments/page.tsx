'use client';

import { useState } from 'react';
import Card from '@/components/Card';
import { payments } from '@/lib/data/mockData';

export default function PaymentsPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const statuses = ['all', 'completed', 'pending', 'failed'];

  const filteredPayments = payments.filter((payment) => {
    return statusFilter === 'all' || payment.status === statusFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'cash':
        return '💵';
      case 'card':
        return '💳';
      case 'upi':
        return '📱';
      case 'bank-transfer':
        return '🏦';
      default:
        return '💰';
    }
  };

  const totalRevenue = payments
    .filter((p) => p.status === 'completed')
    .reduce((acc, p) => acc + p.amount, 0);
  const pendingRevenue = payments
    .filter((p) => p.status === 'pending')
    .reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600 mt-2">Track and manage payment transactions</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          + Record Payment
        </button>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <div className="text-3xl font-bold text-blue-600">{payments.length}</div>
          <div className="text-sm text-gray-600 mt-1">Total Transactions</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Completed Revenue</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-yellow-600">
            ${pendingRevenue.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 mt-1">Pending Revenue</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-purple-600">
            {payments.filter((p) => p.status === 'completed').length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Successful Payments</div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex gap-2 flex-wrap">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </Card>

      {/* Recent Payments Grid */}
      <Card title="Recent Transactions" subtitle="Latest payment activity" className="mb-8">
        <div className="space-y-4">
          {filteredPayments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-2xl">
                  {getMethodIcon(payment.method)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900">{payment.memberName}</p>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        payment.status
                      )}`}
                    >
                      {payment.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{payment.planName} Plan</p>
                  <p className="text-xs text-gray-400">
                    {new Date(payment.date).toLocaleDateString()} •{' '}
                    {payment.method.charAt(0).toUpperCase() +
                      payment.method.slice(1).replace('-', ' ')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">${payment.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {filteredPayments.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No payments found</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
          </div>
        </Card>
      )}

      {/* Payment Details Table */}
      <Card title="Payment Details" subtitle="Complete transaction history">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Transaction ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Member</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Plan</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Method</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="font-mono text-xs text-gray-600">#{payment.id}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">
                          {payment.memberName.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{payment.memberName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{payment.planName}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-gray-900">${payment.amount}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      <span>{getMethodIcon(payment.method)}</span>
                      <span className="text-gray-600">
                        {payment.method.charAt(0).toUpperCase() +
                          payment.method.slice(1).replace('-', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        payment.status
                      )}`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payment Methods Breakdown */}
      <Card title="Payment Methods Breakdown" subtitle="Revenue by payment method" className="mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['cash', 'card', 'upi', 'bank-transfer'].map((method) => {
            const methodPayments = payments.filter(
              (p) => p.method === method && p.status === 'completed'
            );
            const methodRevenue = methodPayments.reduce((acc, p) => acc + p.amount, 0);
            return (
              <div key={method} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2">{getMethodIcon(method)}</div>
                <div className="text-lg font-bold text-gray-900">${methodRevenue.toLocaleString()}</div>
                <div className="text-xs text-gray-600">
                  {method.charAt(0).toUpperCase() + method.slice(1).replace('-', ' ')}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {methodPayments.length} transactions
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
