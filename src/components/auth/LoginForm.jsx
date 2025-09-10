

import React, { useState } from 'react';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AnimatedCube from './AnimatedCube';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginForm.css';

function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result && result.success) {
      navigate('/app');
    } else {
      setError(result.error || 'Usuario o contraseña incorrectos');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="login-container">
      <div className="login-visual" style={{ minHeight: 220, minWidth: 220 }}>
        <AnimatedCube key={"cube-" + (showPassword ? "show" : "hide")}/>
      </div>
      <motion.div 
        className="login-form"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" placeholder="Tu email" value={email} onChange={e => setEmail(e.target.value)} />
          <label>Contraseña</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Tu contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ paddingRight: '38px' }}
            />
            <span
              style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Ingresando...' : 'Entrar'}</button>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </form>
        <div className="login-links">
          <Link to="/register">¿No tienes cuenta? Registrate</Link>
          <Link to="/forgot">¿Olvidaste tu contraseña?</Link>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginForm;
