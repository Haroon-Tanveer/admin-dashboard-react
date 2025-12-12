import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from '../store';
import { SidebarLayout, TopNavLayout } from '../components/layouts';
import {
  Login,
  Register,
  ForgotPassword,
  Dashboard,
  Users,
  Projects,
  Transactions,
  Settings,
  Notifications,
  FileManager,
  Calendar,
} from '../pages';
import { ProtectedRoute } from './ProtectedRoute';

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const { state } = useAppContext();

  if (state.layout.layoutMode === 'topnav') {
    return <TopNavLayout>{children}</TopNavLayout>;
  }

  return <SidebarLayout>{children}</SidebarLayout>;
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <Dashboard />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <Users />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <Projects />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <Transactions />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <Notifications />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/files"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <FileManager />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <Calendar />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <LayoutWrapper>
                <Settings />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
