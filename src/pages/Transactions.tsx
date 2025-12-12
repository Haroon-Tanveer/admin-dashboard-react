import { useState, useMemo } from 'react';
import { Card, Table, Pagination, Column, Input, Select } from '../components/ui';
import { Download, Search } from 'lucide-react';

interface Transaction {
  id: string;
  invoiceNumber: string;
  customer: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
  dueDate: string;
}

const mockTransactions: Transaction[] = [
  { id: '1', invoiceNumber: 'INV-001', customer: 'Acme Corp', amount: 1200, status: 'paid', date: '2024-11-01', dueDate: '2024-11-15' },
  { id: '2', invoiceNumber: 'INV-002', customer: 'Tech Solutions', amount: 2500, status: 'paid', date: '2024-11-05', dueDate: '2024-11-20' },
  { id: '3', invoiceNumber: 'INV-003', customer: 'Global Industries', amount: 800, status: 'pending', date: '2024-11-10', dueDate: '2024-11-25' },
  { id: '4', invoiceNumber: 'INV-004', customer: 'StartUp Inc', amount: 1500, status: 'overdue', date: '2024-10-15', dueDate: '2024-10-30' },
  { id: '5', invoiceNumber: 'INV-005', customer: 'Enterprise Co', amount: 3200, status: 'paid', date: '2024-11-12', dueDate: '2024-11-27' },
  { id: '6', invoiceNumber: 'INV-006', customer: 'Digital Agency', amount: 950, status: 'pending', date: '2024-11-15', dueDate: '2024-11-30' },
  { id: '7', invoiceNumber: 'INV-007', customer: 'Consulting Group', amount: 1800, status: 'paid', date: '2024-11-08', dueDate: '2024-11-23' },
  { id: '8', invoiceNumber: 'INV-008', customer: 'Media House', amount: 2100, status: 'overdue', date: '2024-10-20', dueDate: '2024-11-05' },
];

export const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((transaction) => {
      const matchesSearch =
        transaction.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.customer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const columns: Column<Transaction>[] = [
    {
      key: 'invoiceNumber',
      header: 'Invoice',
      sortable: true,
      render: (transaction) => (
        <span className="font-medium text-blue-600 dark:text-blue-400">{transaction.invoiceNumber}</span>
      ),
    },
    {
      key: 'customer',
      header: 'Customer',
      sortable: true,
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      render: (transaction) => (
        <span className="font-medium">${transaction.amount.toLocaleString()}</span>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      sortable: true,
      render: (transaction) => new Date(transaction.date).toLocaleDateString(),
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      sortable: true,
      render: (transaction) => new Date(transaction.dueDate).toLocaleDateString(),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (transaction) => {
        const statusColors = {
          paid: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
          pending: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
          overdue: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
        };
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[transaction.status]}`}>
            {transaction.status}
          </span>
        );
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <button
          className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
          aria-label="Download invoice"
        >
          <Download size={16} />
        </button>
      ),
    },
  ];

  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const paidAmount = filteredTransactions.filter((t) => t.status === 'paid').reduce((sum, t) => sum + t.amount, 0);
  const pendingAmount = filteredTransactions.filter((t) => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0);
  const overdueAmount = filteredTransactions.filter((t) => t.status === 'overdue').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Transactions</h1>
        <p className="text-gray-600 dark:text-gray-400">Track and manage invoices and payments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">${totalAmount.toLocaleString()}</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Paid</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">${paidAmount.toLocaleString()}</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">${pendingAmount.toLocaleString()}</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Overdue</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-2">${overdueAmount.toLocaleString()}</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>
            <Select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'paid', label: 'Paid' },
                { value: 'pending', label: 'Pending' },
                { value: 'overdue', label: 'Overdue' },
              ]}
            />
          </div>

          <Table
            data={paginatedTransactions}
            columns={columns}
            keyExtractor={(transaction) => transaction.id}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredTransactions.length}
          />
        </div>
      </Card>
    </div>
  );
};
