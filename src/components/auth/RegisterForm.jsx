import './RegisterForm.css';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

export default function RegisterForm({ onSwitch }) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    const res = await register(name, email, password);
    setLoading(false);
    if (!res.success) setError(res.error);
    else setSuccess(true);
  };

  return (
    <div className="register-form-container">
      <form onSubmit={handleSubmit}>
        <div className="register-form-title">Registrarse</div>
        {error && <Alert severity="error" style={{ marginBottom: '1rem' }}>{error}</Alert>}
        {success && <Alert severity="success" style={{ marginBottom: '1rem' }}>¡Registro exitoso! Ya puedes iniciar sesión.</Alert>}
        <input
          className="register-form-input"
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          className="register-form-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="register-form-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          className="register-form-button"
          type="submit"
          disabled={loading}
        >
          Registrarse
        </button>
        <div
          className="register-form-link"
          onClick={onSwitch}
        >
          ¿Ya tienes cuenta? Inicia sesión
        </div>
      </form>
    </div>
  );
}
