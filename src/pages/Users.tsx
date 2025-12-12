import { useState, useMemo, SetStateAction, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react';
import { Card, Table, Pagination, Button, Input, Select, Modal, Column } from '../components/ui';
import { UserPlus, Edit, Trash2, Search } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinedDate: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinedDate: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', joinedDate: '2024-02-20' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'active', joinedDate: '2024-03-10' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'inactive', joinedDate: '2024-01-05' },
  { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'active', joinedDate: '2024-04-12' },
  { id: '6', name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'active', joinedDate: '2024-02-28' },
  { id: '7', name: 'Eve Adams', email: 'eve@example.com', role: 'Manager', status: 'active', joinedDate: '2024-03-15' },
  { id: '8', name: 'Frank Miller', email: 'frank@example.com', role: 'User', status: 'inactive', joinedDate: '2024-01-22' },
  { id: '9', name: 'Grace Lee', email: 'grace@example.com', role: 'User', status: 'active', joinedDate: '2024-05-01' },
  { id: '10', name: 'Henry Clark', email: 'henry@example.com', role: 'Manager', status: 'active', joinedDate: '2024-04-08' },
  { id: '11', name: 'Ivy Davis', email: 'ivy@example.com', role: 'User', status: 'active', joinedDate: '2024-06-10' },
  { id: '12', name: 'Jack White', email: 'jack@example.com', role: 'User', status: 'inactive', joinedDate: '2024-02-14' },
];

export const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 5;

  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [searchQuery, roleFilter, statusFilter]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const columns: Column<User>[] = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (user: { role: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
          {user.role}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (user: { status: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; }) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            user.status === 'active'
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
          }`}
        >
          {user.status}
        </span>
      ),
    },
    {
      key: 'joinedDate',
      header: 'Joined Date',
      sortable: true,
      render: (user: { joinedDate: string | number | Date; }) => new Date(user.joinedDate).toLocaleDateString(),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (user: SetStateAction<User | null>) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedUser(user);
              setIsModalOpen(true);
            }}
            className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
            aria-label="Edit user"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded"
            aria-label="Delete user"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Users</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your users and their roles</p>
        </div>
        <Button>
          <UserPlus size={20} className="mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e: { target: { value: SetStateAction<string>; }; }) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
              </div>
            </div>
            <Select
              value={roleFilter}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
              options={[
                { value: 'all', label: 'All Roles' },
                { value: 'Admin', label: 'Admin' },
                { value: 'Manager', label: 'Manager' },
                { value: 'User', label: 'User' },
              ]}
            />
            <Select
              value={statusFilter}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]}
            />
          </div>

          <Table
            data={paginatedUsers}
            columns={columns}
            keyExtractor={(user: { id: any; }) => user.id}
            onRowClick={(user: SetStateAction<User | null>) => {
              setSelectedUser(user);
              setIsModalOpen(true);
            }}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredUsers.length}
          />
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        title="User Details"
        size="md"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <p className="text-gray-900 dark:text-white">{selectedUser.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <p className="text-gray-900 dark:text-white">{selectedUser.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
              <p className="text-gray-900 dark:text-white">{selectedUser.role}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
              <p className="text-gray-900 dark:text-white capitalize">{selectedUser.status}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Joined Date</label>
              <p className="text-gray-900 dark:text-white">
                {new Date(selectedUser.joinedDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
