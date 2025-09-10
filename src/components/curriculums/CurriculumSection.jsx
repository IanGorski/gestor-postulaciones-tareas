import './CurriculumSection.css';
import React, { useRef, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';

import LinearProgress from '@mui/material/LinearProgress';
const CurriculumSection = ({ files, previewIdx, error, progress, handleFileChange, handleRemove, handlePreview, handleOpenPdf, handleClosePreview }) => {
  const fileInputRefs = useRef([]);

  // Focus automático al abrir el selector de archivo
  useEffect(() => {
    if (error && typeof error === 'object' && error.type === 'file' && fileInputRefs.current[error.idx]) {
      fileInputRefs.current[error.idx].focus();
    }
  }, [error]);

  return (
  <Box className="cs-root">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={4}
        useFlexGap
        flexWrap="wrap"
        justifyContent={{ xs: 'flex-start', md: 'center' }}
        className="cs-stack"
      >
      {[0, 1, 2, 3, 4].map(idx => (
        <Paper
          key={idx}
          elevation={3}
          className="cs-paper"
          role="region"
          aria-label={`Currículum ${idx+1}`}
        >
  <Typography variant="subtitle1" className="cs-title">Currículum {idx + 1}:</Typography>
        <Button
          variant="outlined"
          component="label"
          size="medium"
          aria-label={`Seleccionar archivo para currículum ${idx+1}`}
          className="cs-btn-select"
        >
          Seleccionar archivo
          <input
            type="file"
            accept=".pdf,.doc,.docx,.odt"
            hidden
            aria-label={`Archivo para currículum ${idx+1}`}
            onChange={e => handleFileChange(e, idx)}
            ref={el => fileInputRefs.current[idx] = el}
            id={`file-input-${idx}`}
            aria-describedby={error && error.idx === idx ? `file-error-${idx}` : undefined}
          />
        </Button>
        {progress > 0 && progress < 100 && (
          <LinearProgress variant="determinate" value={progress} className="cs-progress" />
        )}
        {files[idx] && (
          <Box className="cs-file-box">
            <Typography variant="body2" noWrap className="cs-file-name">{files[idx].name}</Typography>
            <IconButton onClick={() => handleRemove(idx)} color="error" size="small" className="cs-btn-remove" aria-label={`Quitar archivo de currículum ${idx+1}`}> 
              <DeleteIcon fontSize="small" />
            </IconButton>
            <Box className="cs-file-actions">
              {files[idx].type === 'application/pdf' ? (
                <Stack direction="row" spacing={1.5} justifyContent="center" className="cs-stack-actions">
                  <Button onClick={() => handlePreview(idx)} variant="outlined" size="small" className="cs-btn-preview" aria-label={`Vista previa PDF currículum ${idx+1}`}>
                    Vista previa PDF
                  </Button>
                  <Button onClick={() => handleOpenPdf(idx)} variant="contained" size="small" className="cs-btn-open" aria-label={`Abrir PDF currículum ${idx+1} en otra ventana`}>
                    Abrir en otra ventana
                  </Button>
                </Stack>
              ) : (
                <Button
                  href={files[idx].base64}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  size="small"
                  className="cs-btn-view"
                  aria-label={`Ver archivo currículum ${idx+1}`}
                >Ver archivo</Button>
              )}
            </Box>
            {/* Feedback visual al eliminar */}
            {files[idx].removing && (
              <LinearProgress color="error" className="cs-progress-removing" />
            )}
            {/* Confirmación visual al guardar */}
            {files[idx].saved && (
              <Typography variant="caption" color="success.main" className="cs-saved">¡Guardado!</Typography>
            )}
          </Box>
        )}
  {previewIdx === idx && files[idx] && files[idx].type === 'application/pdf' && (
          <Box className="cs-preview-overlay" onClick={handleClosePreview}>
            <Box className="cs-preview-box" onClick={e => e.stopPropagation()}>
              <Button onClick={handleClosePreview} variant="outlined" color="error" size="small" className="cs-btn-close" aria-label="Cerrar vista previa PDF">Cerrar</Button>
              <Typography variant="h6" className="cs-preview-title">Vista previa PDF: {files[idx].name}</Typography>
              <iframe src={files[idx].base64} width="100%" height="500" title="Vista previa PDF" className="cs-preview-frame"></iframe>
            </Box>
          </Box>
        )}
      </Paper>
    ))}
    {error && typeof error === 'string' && <Typography color="error">{error}</Typography>}
    {error && typeof error === 'object' && typeof error.idx === 'number' &&
      <Typography color="error" id={`file-error-${error.idx}`}>{error.message}</Typography>
    }
      </Stack>
    </Box>
  );
}

export default CurriculumSection;
