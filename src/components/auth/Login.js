import React from 'react';
import { signInWithGoogle } from '../../services/firebase';
import { authAPI } from '../../services/api';
import './Login.css';

const Login = () => {
  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      const idToken = await user.getIdToken();
      
      // Enviar token al backend
      const response = await authAPI.login(idToken);
      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        token: idToken
      }));
      
      // Recargar la página para actualizar el estado de autenticación
      window.location.reload();
    } catch (error) {
      console.error('Error during authentication:', error);
      alert('Error during authentication. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>MultiPost</h1>
        <p>Gestiona todas tus redes sociales desde un solo lugar</p>
        <button onClick={handleGoogleSignIn} className="google-login-btn">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" />
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  );
};

export default Login;