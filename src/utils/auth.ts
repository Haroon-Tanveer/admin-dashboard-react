import { User } from '../store/types';

const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'user123',
    name: 'John Doe',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
  },
];

export const mockLogin = async (
  email: string,
  password: string
): Promise<{ user: User } | { error: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = MOCK_USERS.find((u) => u.email === email && u.password === password);

  if (!user) {
    return { error: 'Invalid email or password' };
  }

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword };
};

export const mockRegister = async (
  email: string,
  password: string,
  name: string
): Promise<{ user: User } | { error: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const existingUser = MOCK_USERS.find((u) => u.email === email);
  if (existingUser) {
    return { error: 'User already exists' };
  }

  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
  };

  return { user: newUser };
};

export const mockForgotPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = MOCK_USERS.find((u) => u.email === email);
  if (!user) {
    return { success: false, error: 'Email not found' };
  }

  return { success: true };
};
