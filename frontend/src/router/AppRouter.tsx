import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import { Layout } from '../components/Layout';
import { LoginForm } from '../features/auth/components/LoginForm';
import { RegisterForm } from '../features/auth/components/RegisterForm';
import { MfaEnroll } from '../features/auth/components/MfaEnroll';
import { MfaVerify } from '../features/auth/components/MfaVerify';
import { Dashboard } from '../features/dashboard/Dashboard';

export const AppRouter: React.FC = () => {
  const { user, loading } = useAuth();
  const [mfaResolver, setMfaResolver] = useState<any>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-malachite"></div>
      </div>
    );
  }

  const handleMfaRequired = (resolver: any) => {
    setMfaResolver(resolver);
  };

  const handleMfaVerificationComplete = () => {
    setMfaResolver(null);
  };

  return (
    <Layout>
      <Routes>
        <Route 
          path="/login" 
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : mfaResolver ? (
              <MfaVerify 
                resolver={mfaResolver} 
                onVerificationComplete={handleMfaVerificationComplete}
              />
            ) : (
              <LoginForm onMfaRequired={handleMfaRequired} />
            )
          } 
        />
        <Route 
          path="/register" 
          element={user ? <Navigate to="/dashboard" replace /> : <RegisterForm />} 
        />
        <Route 
          path="/mfa-enroll" 
          element={user ? <MfaEnroll /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/" 
          element={<Navigate to={user ? "/dashboard" : "/login"} replace />} 
        />
      </Routes>
    </Layout>
  );
};