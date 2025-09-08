import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
  MultiFactorError,
  MultiFactorResolver,
  getMultiFactorResolver,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  MultiFactorSession,
  Auth,
  applyActionCode
} from 'firebase/auth';
import { auth } from '../../../lib/firebase';

export class AuthService {
  static async register(email: string, password: string): Promise<FirebaseUser> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  static async login(email: string, password: string): Promise<FirebaseUser> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: unknown) {
      if (this.isMultiFactorError(error)) {
        throw error;
      }
      console.error('Login error:', error);
      throw error;
    }
  }

  static async logout(): Promise<void> {
    try {
      await signOut(auth);
      localStorage.removeItem('idToken');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  static async getIdToken(): Promise<string> {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('No user is signed in');
    }
    return await currentUser.getIdToken();
  }

  static isMultiFactorError(error: unknown): error is MultiFactorError {
    return (error as MultiFactorError).code === 'auth/multi-factor-auth-required';
  }

  static getMultiFactorResolver(error: MultiFactorError): MultiFactorResolver {
    return getMultiFactorResolver(auth, error);
  }

  static async enrollMfa(user: FirebaseUser, verificationCodeId: string, code: string): Promise<void> {
    const multiFactorSession = await this.getMfaSession();
    const cred = PhoneAuthProvider.credential(verificationCodeId, code);
    const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
    
    await user.multiFactor.enroll(multiFactorAssertion, "My TOTP Device");
  }

  static async verifyMfa(resolver: MultiFactorResolver, verificationCodeId: string, code: string): Promise<void> {
    const cred = PhoneAuthProvider.credential(verificationCodeId, code);
    const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
    
    await resolver.resolveSignIn(multiFactorAssertion);
  }

  private static async getMfaSession(): Promise<MultiFactorSession> {
    // This would typically involve getting a session from your backend
    // For simplicity, we're using a placeholder here
    return {} as MultiFactorSession;
  }
}