import './SplashScreen.css';
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Paper, Typography, Button, Stack } from '@mui/material';
import { getRandomQuote } from '../data/quotes';

export default function SplashScreen({ onEnter = () => { } }) {
    const [quote, setQuote] = useState('');
    useEffect(() => {
        setQuote(getRandomQuote());
    }, []);

    const parts = useMemo(() => {
        // Divide la cita opcional entre corchetes al final
        const match = quote.match(/^(.*?)(\[[^\]]+\])?$/);
        if (!match) return { text: quote, cite: '' };
        return { text: (match[1] || '').trim(), cite: (match[2] || '').trim() };
    }, [quote]);

    return (
        <Box className="ss-root">
            <Paper elevation={8} className="ss-paper">
                <Typography variant="h3" className="ss-title">
                    Bienvenida
                </Typography>
                <Typography variant="h6" className="ss-subtitle">
                    Una frase para empezar el día
                </Typography>

                <Typography variant="h5" className="ss-quote">
                    {parts.text}
                </Typography>
                {parts.cite && (
                    <Typography variant="body2" className="ss-cite">
                        {parts.cite}
                    </Typography>
                )}

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" className="ss-btn-stack">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onEnter}
                        className="ss-btn ss-btn-enter"
                    >
                        Entrar
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setQuote(getRandomQuote())}
                        className="ss-btn ss-btn-quote"
                    >
                        Otra frase
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
}
