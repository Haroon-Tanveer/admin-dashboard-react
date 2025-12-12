import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button } from '../components/ui';
import { MinimalLayout } from '../components/layouts';
import { mockForgotPassword } from '../utils/auth';
import { KeyRound, CheckCircle } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const ForgotPassword = () => {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError('');

    const result = await mockForgotPassword(data.email);

    if (result.success) {
      setIsSuccess(true);
    } else {
      setError(result.error || 'An error occurred');
    }
    setIsLoading(false);
  };

  return (
    <MinimalLayout>
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          {isSuccess ? (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Check Your Email</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We've sent you a password reset link. Please check your email inbox.
              </p>
              <Link to="/login">
                <Button className="w-full">Back to Login</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                  <KeyRound className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Forgot Password?
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Enter your email and we'll send you a reset link
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  error={errors.email?.message}
                  {...register('email')}
                />

                <Button type="submit" className="w-full" isLoading={isLoading}>
                  Send Reset Link
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Back to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </MinimalLayout>
  );
};
