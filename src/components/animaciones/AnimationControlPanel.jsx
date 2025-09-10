import React from 'react';
import './AnimationControlPanel.css';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const AnimationControlPanel = ({
  showBg,
  showParticles,
  showMascot,
  bgSpeed,
  particleSpeed,
  particleCount,
  onChange,
}) => {
  return (
    <Paper elevation={3} className="acp-panel">
      <Typography variant="subtitle1" className="acp-title">Animaciones</Typography>
      <Stack spacing={1}>
        <FormControlLabel control={<Switch checked={showBg} onChange={(_, v) => onChange({ showBg: v })} />} label="Fondo animado" />
        <FormControlLabel control={<Switch checked={showParticles} onChange={(_, v) => onChange({ showParticles: v })} />} label="Partículas" />
        <FormControlLabel control={<Switch checked={showMascot} onChange={(_, v) => onChange({ showMascot: v })} />} label="Mascota" />

        <Typography variant="caption" className="acp-label">Velocidad fondo: {bgSpeed.toFixed(1)}x</Typography>
        <Slider min={0.5} max={3} step={0.1} value={bgSpeed} onChange={(_, v) => onChange({ bgSpeed: v })} />

        <Typography variant="caption" className="acp-label">Velocidad partículas: {particleSpeed.toFixed(1)}s</Typography>
        <Slider min={4} max={24} step={0.5} value={particleSpeed} onChange={(_, v) => onChange({ particleSpeed: v })} />

        <Typography variant="caption" className="acp-label">Densidad partículas: {particleCount}</Typography>
        <Slider min={0} max={60} step={1} value={particleCount} onChange={(_, v) => onChange({ particleCount: v })} />
      </Stack>
    </Paper>
  );
};

export default AnimationControlPanel;
