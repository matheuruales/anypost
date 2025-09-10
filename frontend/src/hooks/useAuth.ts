import { useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  signOut,
  User,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../services/firebase';
import api from '../services/api';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loading: boolean;
}

export const useAuth = (): AuthContextType => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      
      // Register user in backend
      await api.post('/auth/register', {
        uid: userCredential.user.uid,
        email: userCredential.user.email
      });
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  };

  return {
    currentUser,
    login,
    register,
    logout,
    resetPassword,
    loading
  };
};