import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = ({ children, padding = 'md', className = '', ...props }: CardProps) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardHeader = ({ children, className = '', ...props }: CardHeaderProps) => {
  return (
    <div className={`mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 ${className}`} {...props}>
      {children}
    </div>
  );
};

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export const CardTitle = ({ children, className = '', ...props }: CardTitleProps) => {
  return (
    <h3 className={`text-xl font-semibold text-gray-900 dark:text-white ${className}`} {...props}>
      {children}
    </h3>
  );
};

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardContent = ({ children, className = '', ...props }: CardContentProps) => {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
};
