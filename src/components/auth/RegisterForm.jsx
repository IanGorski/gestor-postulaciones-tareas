import React, { useState } from 'react';
import AnimatedCube from './AnimatedCube';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './RegisterForm.css';

function RegisterForm() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirm) {
      setError('Completa todos los campos');
      return;
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    const result = await register(name, email, password);
    setLoading(false);
    if (result && result.success) {
      navigate('/app');
    } else {
      setError(result.error || 'Error al registrar');
    }
  };

  return (
    <div className="login-container">
      <div className="login-visual">
        <AnimatedCube />
      </div>
      <motion.div 
        className="login-form"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input type="text" placeholder="Tu nombre" value={name} onChange={e => setName(e.target.value)} />
          <label>Email</label>
          <input type="email" placeholder="Tu email" value={email} onChange={e => setEmail(e.target.value)} />
          <label>Contraseña</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Crea una contraseña"
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
          <label>Confirmar contraseña</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Repite la contraseña"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              style={{ paddingRight: '38px' }}
            />
            <span
              style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
              onClick={() => setShowConfirm((v) => !v)}
            >
              {showConfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Creando...' : 'Crear cuenta'}</button>
          {error && <div className="login-error">{error}</div>}
        </form>
        <div className="login-links">
          <Link to="/">¿Ya tienes cuenta? Inicia sesión</Link>
        </div>
      </motion.div>
    </div>
  );
}

export default RegisterForm;
