# Admin Dashboard

A comprehensive, production-ready admin dashboard built with React, TypeScript, and Tailwind CSS. Features include authentication, analytics, user management, project tracking, and more.

## Features

### Authentication
- Login, Register, and Forgot Password pages
- Mock authentication system with Context API
- Protected routes
- Session persistence

### Dashboard Pages
- **Analytics Dashboard**: Interactive charts showing revenue, expenses, user growth, and sales by category
- **Users/CRM**: User management with table, pagination, sorting, and advanced filters
- **Projects/Kanban**: Drag-and-drop Kanban board for project management
- **Transactions/Invoices**: Transaction tracking with filtering and statistics
- **Notifications**: Notification center with read/unread status and filtering
- **File Manager**: File and folder browser with grid and list views
- **Calendar**: Calendar view with event management
- **Settings**: Theme settings, profile management, and preferences

### UI Components
- Button (multiple variants and sizes)
- Card components
- Form inputs (text, select, checkbox, textarea)
- Modal dialogs
- Table with sorting and pagination
- Responsive design

### Layouts
- Sidebar layout (collapsible)
- Top navigation layout
- Minimal layout (for auth pages)

### Theme & Customization
- Light/Dark mode with persistence
- RTL (Right-to-Left) support
- Theme switcher
- Layout mode selector

### State Management
- Global state with Context API and useReducer
- LocalStorage persistence
- Type-safe state management

### Testing
- Unit tests for UI components
- Testing setup with Vitest and React Testing Library

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Running Tests

```bash
npm run test
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## Default Login Credentials

For testing purposes, use these credentials:

- **Email**: admin@example.com
- **Password**: admin123

or

- **Email**: user@example.com
- **Password**: user123

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable components
│   ├── ui/         # UI components (Button, Card, etc.)
│   └── layouts/    # Layout components (Sidebar, TopNav, etc.)
├── pages/          # Page components
├── routes/         # Routing configuration
├── store/          # Global state management
├── styles/         # Global styles
├── test/           # Test configuration
└── utils/          # Utility functions
```

## Features Breakdown

### Accessibility
- ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- Semantic HTML

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interactions

### Performance
- Code splitting ready
- Optimized bundle size
- Lazy loading support

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect the configuration
4. Deploy!

The `vercel.json` file is already configured for SPA routing.

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT
