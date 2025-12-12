import { Card, CardContent, CardHeader, CardTitle } from '../components/ui';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';

const revenueData = [
  { month: 'Jan', revenue: 4000, expenses: 2400 },
  { month: 'Feb', revenue: 3000, expenses: 1398 },
  { month: 'Mar', revenue: 2000, expenses: 9800 },
  { month: 'Apr', revenue: 2780, expenses: 3908 },
  { month: 'May', revenue: 1890, expenses: 4800 },
  { month: 'Jun', revenue: 2390, expenses: 3800 },
  { month: 'Jul', revenue: 3490, expenses: 4300 },
];

const categoryData = [
  { name: 'Electronics', value: 400 },
  { name: 'Clothing', value: 300 },
  { name: 'Food', value: 300 },
  { name: 'Books', value: 200 },
  { name: 'Other', value: 150 },
];

const usersData = [
  { month: 'Jan', users: 120 },
  { month: 'Feb', users: 190 },
  { month: 'Mar', users: 280 },
  { month: 'Apr', users: 390 },
  { month: 'May', users: 470 },
  { month: 'Jun', users: 520 },
  { month: 'Jul', users: 600 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

const StatCard = ({ title, value, change, icon, trend }: StatCardProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
          <p
            className={`text-sm mt-2 ${
              trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}
          >
            {change}
          </p>
        </div>
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">{icon}</div>
      </div>
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="$45,231"
          change="+20.1% from last month"
          icon={<DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
          trend="up"
        />
        <StatCard
          title="Total Users"
          value="2,350"
          change="+15.3% from last month"
          icon={<Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
          trend="up"
        />
        <StatCard
          title="Total Orders"
          value="1,234"
          change="+8.2% from last month"
          icon={<ShoppingCart className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
          trend="up"
        />
        <StatCard
          title="Conversion Rate"
          value="3.24%"
          change="-2.4% from last month"
          icon={<TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
          trend="down"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="month" className="text-gray-600 dark:text-gray-400" />
                <YAxis className="text-gray-600 dark:text-gray-400" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usersData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="month" className="text-gray-600 dark:text-gray-400" />
                <YAxis className="text-gray-600 dark:text-gray-400" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="users" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: 'John Doe', action: 'created a new project', time: '2 minutes ago' },
                { user: 'Jane Smith', action: 'updated user profile', time: '15 minutes ago' },
                { user: 'Bob Johnson', action: 'completed a transaction', time: '1 hour ago' },
                { user: 'Alice Brown', action: 'uploaded 5 files', time: '2 hours ago' },
                { user: 'Charlie Wilson', action: 'scheduled a meeting', time: '3 hours ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
                  <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
