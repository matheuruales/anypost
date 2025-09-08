export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
  mfaEnabled: boolean;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  displayName?: string;
}

export interface MfaEnrollment {
  secret: string;
  qrCodeUrl: string;
}

export interface MfaVerification {
  code: string;
}