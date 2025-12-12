import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies default padding', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('p-6');
  });

  it('applies custom padding', () => {
    const { container } = render(<Card padding="sm">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('p-3');
  });

  it('applies no padding when specified', () => {
    const { container } = render(<Card padding="none">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('p-0');
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('custom-class');
  });

  it('has correct styling classes', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('bg-white');
    expect(card).toHaveClass('dark:bg-gray-800');
    expect(card).toHaveClass('rounded-lg');
    expect(card).toHaveClass('shadow-md');
  });
});

describe('CardHeader', () => {
  it('renders children correctly', () => {
    render(<CardHeader>Header content</CardHeader>);
    expect(screen.getByText('Header content')).toBeInTheDocument();
  });

  it('has border bottom', () => {
    const { container } = render(<CardHeader>Header</CardHeader>);
    const header = container.firstChild as HTMLElement;
    expect(header).toHaveClass('border-b');
  });
});

describe('CardTitle', () => {
  it('renders children correctly', () => {
    render(<CardTitle>Title text</CardTitle>);
    expect(screen.getByText('Title text')).toBeInTheDocument();
  });

  it('renders as h3 element', () => {
    render(<CardTitle>Title</CardTitle>);
    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toBeInTheDocument();
  });

  it('has correct styling', () => {
    render(<CardTitle>Title</CardTitle>);
    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toHaveClass('text-xl');
    expect(title).toHaveClass('font-semibold');
  });
});

describe('CardContent', () => {
  it('renders children correctly', () => {
    render(<CardContent>Content text</CardContent>);
    expect(screen.getByText('Content text')).toBeInTheDocument();
  });
});
