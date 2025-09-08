import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

interface MfaVerifyProps {
  resolver?: any;
  onVerificationComplete: () => void;
}

export const MfaVerify: React.FC<MfaVerifyProps> = ({ resolver, onVerificationComplete }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate MFA verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, you would use:
      // await AuthService.verifyMfa(resolver, verificationCodeId, code);
      
      if (code === '123456') { // Mock validation
        const token = 'mock-id-token-' + Date.now();
        localStorage.setItem('idToken', token);
        onVerificationComplete();
        navigate('/dashboard');
      } else {
        setError('Invalid verification code');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to verify MFA code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 glass-effect p-10 rounded-3xl shadow-2xl border border-white/30">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-malachite to-razzmatazz bg-clip-text text-transparent">
            Two-Factor Authentication Required
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the verification code from your authenticator app
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-razzmatazz/10 border border-razzmatazz text-razzmatazz px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <Input
            label="Verification Code"
            name="code"
            type="text"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code from your app"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full"
          >
            Verify and Continue
          </Button>
        </form>
      </div>
    </div>
  );
};