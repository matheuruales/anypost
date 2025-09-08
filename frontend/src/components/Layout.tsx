import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import { AuthService } from '../features/auth/services/authService';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-malachite/5 via-white to-heliotrope/5">
      <nav className="glass-effect sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-malachite to-heliotrope flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-malachite to-razzmatazz bg-clip-text text-transparent">
                  AnyPost
                </h1>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-gray-700">Hello, {user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="btn-danger"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {location.pathname !== '/login' && (
                    <Link
                      to="/login"
                      className="nav-link"
                    >
                      Login
                    </Link>
                  )}
                  {location.pathname !== '/register' && (
                    <Link
                      to="/register"
                      className="btn-primary"
                    >
                      Sign Up
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="mt-12 py-6 bg-gradient-to-r from-malachite/10 to-razzmatazz/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>© 2023 AnyPost. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};