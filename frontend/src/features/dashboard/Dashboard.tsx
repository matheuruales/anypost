import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/hooks/useAuth';
import { authApi } from '../../lib/api'; // Ruta corregida
import { User } from '../auth/types/auth';

export const Dashboard: React.FC = () => {
  const { user: firebaseUser } = useAuth();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await authApi.getUserProfile();
        if (response.data) {
          setUserProfile(response.data);
        } else {
          setError(response.error || 'Failed to fetch user profile');
        }
      } catch (err) {
        setError('An error occurred while fetching user profile');
      } finally {
        setLoading(false);
      }
    };

    if (firebaseUser) {
      fetchUserProfile();
    }
  }, [firebaseUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-malachite"></div>
      </div>
    );
  }

  return (
    <div className="card p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-malachite to-razzmatazz bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Welcome to your AnyPost dashboard</p>
        </div>
        <div className="bg-malachite text-white px-4 py-2 rounded-full text-sm font-semibold">
          {userProfile?.mfaEnabled ? 'MFA Enabled' : 'MFA Disabled'}
        </div>
      </div>

      {error && (
        <div className="bg-razzmatazz/10 border border-razzmatazz text-razzmatazz px-4 py-3 rounded-xl mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="stat-card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Information</h2>
          <div className="space-y-3">
            <p><span className="font-medium text-razzmatazz">Email:</span> {firebaseUser?.email}</p>
            <p><span className="font-medium text-razzmatazz">Email Verified:</span> {firebaseUser?.emailVerified ? 'Yes' : 'No'}</p>
            <p><span className="font-medium text-razzmatazz">User ID:</span> {firebaseUser?.uid}</p>
          </div>
        </div>

        <div className="stat-card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Security</h2>
          <div className="space-y-3">
            <p><span className="font-medium text-razzmatazz">MFA Status:</span> {userProfile?.mfaEnabled ? 'Enabled' : 'Disabled'}</p>
            <p><span className="font-medium text-razzmatazz">Account Created:</span> {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-malachite/10 to-malachite/5 p-5 rounded-2xl border border-malachite/20 text-center">
          <div className="w-12 h-12 bg-malachite rounded-full flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-800">Posts</h3>
          <p className="text-2xl font-bold text-malachite mt-2">24</p>
        </div>

        <div className="bg-gradient-to-br from-heliotrope/10 to-heliotrope/5 p-5 rounded-2xl border border-heliotrope/20 text-center">
          <div className="w-12 h-12 bg-heliotrope rounded-full flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-800">Followers</h3>
          <p className="text-2xl font-bold text-heliotrope mt-2">156</p>
        </div>

        <div className="bg-gradient-to-br from-razzmatazz/10 to-razzmatazz/5 p-5 rounded-2xl border border-razzmatazz/20 text-center">
          <div className="w-12 h-12 bg-razzmatazz rounded-full flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-800">Likes</h3>
          <p className="text-2xl font-bold text-razzmatazz mt-2">342</p>
        </div>
      </div>

      <div className="flex space-x-4">
        <button className="btn-primary">
          Enable MFA
        </button>
        <button className="btn-secondary">
          Edit Profile
        </button>
        <button className="bg-gradient-to-r from-malachite to-razzmatazz text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-malachite/30">
          Create New Post
        </button>
      </div>
    </div>
  );
};