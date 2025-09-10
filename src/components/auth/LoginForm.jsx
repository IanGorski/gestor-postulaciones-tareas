import './LoginForm.css';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

export default function LoginForm({ onSwitch }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await login(email, password);
    setLoading(false);
    if (!res.success) setError(res.error);
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <div className="login-form-title">Iniciar sesión</div>
        {error && <Alert severity="error" style={{ marginBottom: '1rem' }}>{error}</Alert>}
        <input
          className="login-form-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="login-form-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          className="login-form-button"
          type="submit"
          disabled={loading}
        >
          Entrar
        </button>
        <div
          className="login-form-link"
          onClick={onSwitch}
        >
          ¿No tienes cuenta? Regístrate
        </div>
      </form>
    </div>
  );
}
