import './Splash.css';
import React, { useMemo } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { QUOTES } from '../constants/quotes';

export default function Splash({ onEnter = () => { } }) {
    const quote = useMemo(() => {
        if (!Array.isArray(QUOTES) || QUOTES.length === 0) return '';
        const idx = Math.floor(Math.random() * QUOTES.length);
        return QUOTES[idx];
    }, []);

    return (
        <Box className="splash-root">
            <Paper elevation={6} className="splash-paper">
                <Typography variant="h3" className="splash-title">
                    Bienvenida<span role="img" aria-label="sol">☀️</span>
                </Typography>
                <Typography variant="subtitle1" className="splash-subtitle">
                    Una frase para empezar bien el día
                </Typography>
                <Typography variant="h6" className="splash-quote">
                    “{quote}”
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={onEnter}
                    className="splash-btn"
                >
                    Ingresar
                </Button>
            </Paper>
        </Box>
    );
}
