import React, { useState } from 'react';
import AnimatedCube from './AnimatedCube';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './LoginForm.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Simulación de envío
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  return (
    <div className="forgot-container">
      <div className="forgot-visual">
        <AnimatedCube />
      </div>
      <motion.div 
        className="forgot-form"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2>Recuperar contraseña</h2>
        {sent ? (
          <div style={{marginTop:'2rem'}}>
            <p>Te enviamos un correo para recuperar tu contraseña.</p>
            <Link to="/">Volver al login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" placeholder="Tu email" value={email} onChange={e => setEmail(e.target.value)} />
            <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar enlace'}</button>
            {error && <div className="login-error">{error}</div>}
          </form>
        )}
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
