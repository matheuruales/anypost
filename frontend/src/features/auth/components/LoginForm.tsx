import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { AuthService } from '../services/authService';
import { LoginCredentials } from '../types/auth';

interface LoginFormProps {
  onMfaRequired?: (resolver: any) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onMfaRequired }) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const user = await AuthService.login(credentials.email, credentials.password);
      const token = await AuthService.getIdToken();
      localStorage.setItem('idToken', token);
      navigate('/dashboard');
    } catch (error: any) {
      if (AuthService.isMultiFactorError(error)) {
        const resolver = AuthService.getMultiFactorResolver(error);
        onMfaRequired?.(resolver);
      } else {
        setError(error.message || 'Failed to login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 glass-effect p-10 rounded-3xl shadow-2xl border border-white/30">
        <div className="text-center">
          <div className="mx-auto w-24 h-24 mb-4 gradient-bg rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold bg-gradient-to-r from-malachite to-razzmatazz bg-clip-text text-transparent">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link
              to="/register"
              className="font-medium text-malachite hover:text-malachite-dark transition-colors"
            >
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-razzmatazz/10 border border-razzmatazz text-razzmatazz px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            <Input
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full"
          >
            Sign in
          </Button>
          
          <div className="text-center">
            <a href="#" className="text-sm text-heliotrope hover:text-heliotrope-dark transition-colors">
              Forgot your password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};