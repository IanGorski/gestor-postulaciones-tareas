
import './LoginForm.css';
import AnimatedCube from './auth/AnimatedCube';
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { getRandomQuote } from '../data/quotes';

function SplashScreen({ onEnter }) {
    const [quote, setQuote] = useState('');
    useEffect(() => {
        setQuote(getRandomQuote());
    }, []);

    const parts = useMemo(() => {
        const match = quote.match(/^(.*?)(\[[^\]]+\])?$/);
        if (!match) return { text: quote, cite: '' };
        return { text: (match[1] || '').trim(), cite: (match[2] || '').trim() };
    }, [quote]);

    return (
        <div className="login-form-container" style={{ display: 'flex', minHeight: '100vh', background: '#fff' }}>
            {/* Sección 3D: ocupa 50% con fondo degradado y cubo/personaje centrado */}
            <div style={{ width: '50vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 40% 40%, #e040fb 0%, #a259b6 100%)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                    <AnimatedCube />
                </div>
            </div>
            {/* Sección formulario: ocupa 50% con fondo blanco y contenido centrado */}
            <div style={{ width: '50vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
                <form className="login-form" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(80, 0, 120, 0.12)', padding: '2rem 2.5rem', maxWidth: 400, width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="login-form-title">Bienvenida</div>
                    <div style={{ color: '#5a357a', fontWeight: 500, marginBottom: '1rem', opacity: 0.9, fontSize: '1.2rem', textAlign: 'center' }}>Una frase para empezar el día</div>
                    <div style={{ color: '#2e2140', lineHeight: 1.45, marginBottom: '1.5rem', fontSize: '1.3rem', textAlign: 'center' }}>{parts.text}</div>
                    {parts.cite && (
                        <div style={{ color: '#734a91', fontSize: '1rem', textAlign: 'center', marginBottom: '1.5rem' }}>{parts.cite}</div>
                    )}
                    <button
                        className="login-form-button"
                        type="button"
                        style={{ marginBottom: '1rem' }}
                        onClick={onEnter}
                    >
                        Entrar
                    </button>
                    <button
                        className="login-form-button"
                        type="button"
                        style={{ background: '#fff', color: '#734a91', border: '2px solid #734a91' }}
                        onClick={() => setQuote(getRandomQuote())}
                    >
                        Otra frase
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SplashScreen;
