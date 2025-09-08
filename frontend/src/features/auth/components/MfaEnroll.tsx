import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

export const MfaEnroll: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // In a real implementation, this would come from your backend
  const mockMfaData = {
    secret: 'JBSWY3DPEHPK3PXP',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/MyApp:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=MyApp'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate MFA enrollment
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, you would verify the TOTP code with Firebase
      if (code === '123456') { // Mock validation
        navigate('/dashboard');
      } else {
        setError('Invalid verification code');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to enroll MFA');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 glass-effect p-10 rounded-3xl shadow-2xl border border-white/30">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-malachite to-razzmatazz bg-clip-text text-transparent">
            Set Up Two-Factor Authentication
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Scan the QR code with your authenticator app
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <img 
            src={mockMfaData.qrCodeUrl} 
            alt="QR Code for MFA" 
            className="w-48 h-48"
          />
          
          <div className="text-center">
            <p className="text-sm text-gray-600">Or enter this secret key manually:</p>
            <p className="font-mono text-sm bg-gray-100 p-2 rounded">{mockMfaData.secret}</p>
          </div>
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
            Verify and Enable
          </Button>
        </form>
      </div>
    </div>
  );
};