import './LoginForm.css';
import AnimatedCube from './AnimatedCube';
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
  const [showPassword, setShowPassword] = useState(false);
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
      {/* Sección 3D: ocupa 50% en desktop, se apila en tablet/móvil */}
      <div className="login-form-left">
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', height: '100%' }}>
            <AnimatedCube />
          </div>
        </div>
      </div>
      {/* Formulario */}
      <div className="login-form-right">
        <form onSubmit={handleSubmit} className="login-form-wrapper">
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
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              className="login-form-input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: '100%', paddingRight: '2.5rem' }}
              autocomplete="current-password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#a259b6', fontSize: '1.6rem', display: 'flex', alignItems: 'center' }}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="#a259b6" strokeWidth="2" d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z"/><circle cx="12" cy="12" r="3" stroke="#a259b6" strokeWidth="2"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="#a259b6" strokeWidth="2" d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z"/><circle cx="12" cy="12" r="3" stroke="#a259b6" strokeWidth="2"/><line x1="4" y1="20" x2="20" y2="4" stroke="#a259b6" strokeWidth="2"/></svg>
              )}
            </span>
          </div>
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
    </div>
  );
}
