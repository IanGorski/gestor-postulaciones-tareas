import React, { useState, useEffect, useMemo } from "react";
import { Box, Typography, Button } from "@mui/material";
import { getRandomQuote } from "../data/quotes";

function MotivationalQuote() {
    const [quote, setQuote] = useState("");
    useEffect(() => {
        setQuote(getRandomQuote());
    }, []);

    const parts = useMemo(() => {
        const match = quote.match(/^(.*?)(\[[^\]]+\])?$/);
        if (!match) return { text: quote, cite: "" };
        return { text: (match[1] || "").trim(), cite: (match[2] || "").trim() };
    }, [quote]);

    return (
        <Box
            sx={{
                mb: 3,
                px: { xs: 2, sm: 4 },
                py: 2.5,
                borderRadius: 3,
                background: '#2d1846', // violeta uniforme
                boxShadow: 2,
                textAlign: 'center',
                maxWidth: 600,
                mx: 'auto',
            }}
        >
            <Typography
                variant="subtitle1"
                sx={{ color: '#e0b3ff', fontWeight: 600, mb: 1 }}
            >
                Frase motivacional
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    color: '#fff',
                    fontSize: '1.25rem',
                    mb: 1.5,
                    textShadow: '0 1px 8px #734a91',
                }}
            >
                {parts.text}
            </Typography>
            {parts.cite && (
                <Typography
                    variant="caption"
                    sx={{ color: '#e0b3ff', fontStyle: 'italic' }}
                >
                    {parts.cite}
                </Typography>
            )}
            <Button
                variant="text"
                size="small"
                sx={{ mt: 2, color: '#e0b3ff' }}
                onClick={() => setQuote(getRandomQuote())}
            >
                Otra frase
            </Button>
        </Box>
    );
}

export default MotivationalQuote;
