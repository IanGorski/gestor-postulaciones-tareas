import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import ConfirmDialog from './components/shared/ConfirmDialog';
import { motion } from 'framer-motion';
import './styles/global.css';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import ProfileSelector from './components/perfiles/ProfileSelector';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import SettingsIcon from '@mui/icons-material/Settings';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import { useThemeMode } from './context/ThemeModeContext';

const Motion = motion;
const ParticlesBackground = lazy(() => import('./components/animaciones/ParticlesBackground'));
const AnimatedBackground = lazy(() => import('./components/animaciones/AnimatedBackground'));
const InteractiveHummingbird = lazy(() => import('./components/animaciones/InteractiveHummingbird'));
const PostulacionesTable = lazy(() => import('./components/postulaciones/PostulacionesTable'));
import { usePostulaciones } from './hooks/usePostulaciones';
import { SECTIONS } from './constants/sections';

import es from './i18n/es.json';
import en from './i18n/en.json';
import './App.css';
// import Container from '@mui/material/Container';
// import Button from '@mui/material/Button';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Stack from '@mui/material/Stack';
const CurriculumSection = lazy(() => import('./components/curriculums/CurriculumSection'));
import { useCurriculums } from './hooks/useCurriculums';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Stack from '@mui/material/Stack';
function App() {

  const [activeProfile, setActiveProfile] = useState(() => {
    const saved = localStorage.getItem('activeProfile');
    return saved || '';
  });
  useEffect(() => {
    localStorage.setItem('activeProfile', activeProfile);
  }, [activeProfile]);
  // Wrapper para agregar fila
  const onAddRowWrapped = () => {
    handleAddRow();
    showSnack('Fila agregada', 'success');
  };

  // Eliminar estado local de darkMode y usar contexto
  const { darkMode, setDarkMode } = useThemeMode();
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Hooks principales para postulaciones y curriculums
  const {
    selected,
    setSelected,
    data,
    editing,
    editRowData,
    newRow,
    error,
    search,
    filteredRows,
    handleInputChange,
    handleEditRow,
    handleSaveEdit,
    handleCancelEdit,
    handleDelete,
    handleAddRow,
    setSearch,
    newRowErrors,
    editRowErrors,
  } = usePostulaciones(SECTIONS, activeProfile);

  const curr = useCurriculums(activeProfile);

  // Snackbar de feedback
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });
  const showSnack = (message, severity = 'success') => setSnack({ open: true, message, severity });

  // Confirmación global
  const [confirm, setConfirm] = useState({ open: false, title: '', description: '', onConfirm: null });
  const closeConfirm = () => setConfirm((c) => ({ ...c, open: false }));

  // Wrappers para feedback
  const onSaveEditWrapped = (idx) => {
    handleSaveEdit(idx);
    if (!error) showSnack('Cambios guardados', 'success');
  };
  // Ejemplo: mostrar notificación al agregar una nueva postulación
  const onDeleteWrapped = (idx) => {
    setConfirm({
      open: true,
      title: 'Eliminar fila',
      description: '¿Estás seguro de eliminar este registro? Esta acción no se puede deshacer.',
      onConfirm: () => {
        const ok = handleDelete(idx);
        closeConfirm();
        if (ok) showSnack('Fila eliminada', 'info');
      },
    });
  };
  const handleFileChangeWrapped = (e, idx) => {
    curr.handleFileChange(e, idx);
    showSnack('Archivo seleccionado', 'info');
  };
  const handleRemoveWrapped = (idx) => {
    setConfirm({
      open: true,
      title: 'Quitar archivo',
      description: '¿Deseas quitar este archivo adjunto?',
      onConfirm: () => {
        const ok = curr.handleRemove(idx);
        closeConfirm();
        if (ok) showSnack('Archivo eliminado', 'info');
      },
    });
  };
  // Si no hay perfiles, bloquear la app y mostrar solo el formulario de creación
  const profiles = (() => {
    const saved = localStorage.getItem('profiles');
    if (saved) return JSON.parse(saved);
    return [];
  })();
  const noProfiles = !profiles.length;
  const [lang] = useState('es');
  const t = (key) => (lang === 'en' ? en[key] : es[key] || key);
  // Controles de animación
  const [panelOpen, setPanelOpen] = useState(false);
  const [showAnimations, setShowAnimations] = useState(true);
  const [showBg, setShowBg] = useState(true);
  const [showParticles, setShowParticles] = useState(true);
  const [showMascot, setShowMascot] = useState(true);
  const [animSpeed, setAnimSpeed] = useState(1); // partículas
  const [bgSpeed, setBgSpeed] = useState(1); // fondo
  const [particlesDensity, setParticlesDensity] = useState(12);

  return (
    <>
      {/* Confirmación global */}
      <ConfirmDialog
        open={confirm.open}
        title={confirm.title}
        description={confirm.description}
        onCancel={closeConfirm}
        onConfirm={confirm.onConfirm || closeConfirm}
      />
      {noProfiles ? (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
          <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 700 }}>
            ¡Bienvenido! Crea tu primer perfil para comenzar
          </Typography>
          <ProfileSelector activeProfile={activeProfile} setActiveProfile={setActiveProfile} />
        </Container>
      ) : (
        <>
          <ProfileSelector activeProfile={activeProfile} setActiveProfile={setActiveProfile} />
          <Snackbar
            open={snack.open}
            autoHideDuration={2500}
            onClose={() => setSnack((s) => ({ ...s, open: false }))}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <MuiAlert elevation={6} variant="filled" severity={snack.severity} onClose={() => setSnack((s) => ({ ...s, open: false }))}>
              {snack.message}
            </MuiAlert>
          </Snackbar>
          {showAnimations && showParticles && (
            <Suspense fallback={null}>
              <ParticlesBackground density={particlesDensity} speed={animSpeed} />
            </Suspense>
          )}
          <Tooltip title="Ajustes de animación">
            <Fab
              color="primary"
              size="medium"
              onClick={() => setPanelOpen(true)}
              sx={{
                position: 'fixed',
                bottom: { xs: 32, md: 40 },
                right: { xs: 32, md: 40 },
                zIndex: 1200,
                boxShadow: 4,
                width: 56,
                height: 56,
                minHeight: 56,
                minWidth: 56,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SettingsIcon aria-label="Abrir ajustes de animación" sx={{ fontSize: 28 }} />
            </Fab>
          </Tooltip>
          <Tooltip title={darkMode ? 'Modo claro' : 'Modo oscuro'}>
            <IconButton
              color={darkMode ? 'warning' : 'primary'}
              onClick={toggleDarkMode}
              sx={{
                position: 'fixed',
                bottom: { xs: 32, md: 40 },
                right: { xs: 96, md: 120 },
                zIndex: 1300,
                background: '#fff',
                border: '2px solid #734a91',
                boxShadow: 2,
                width: 56,
                height: 56,
                minHeight: 56,
                minWidth: 56,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {darkMode ? <Brightness7Icon sx={{ fontSize: 28 }} /> : <Brightness4Icon sx={{ fontSize: 28 }} />}
            </IconButton>
          </Tooltip>
          <Drawer anchor="right" open={panelOpen} onClose={() => setPanelOpen(false)}>
            <Box sx={{ width: { xs: 280, sm: 320, md: 360 }, p: 2 }}>
              <h3 style={{ marginTop: 0 }}>Animaciones</h3>
              <FormControlLabel control={<Switch checked={showAnimations} onChange={e => setShowAnimations(e.target.checked)} />} label="Mostrar animaciones" />
              <FormControlLabel control={<Switch checked={showBg} onChange={e => setShowBg(e.target.checked)} />} label="Fondo animado" />
              <FormControlLabel control={<Switch checked={showParticles} onChange={e => setShowParticles(e.target.checked)} />} label="Partículas" />
              <FormControlLabel control={<Switch checked={showMascot} onChange={e => setShowMascot(e.target.checked)} />} label="Mascota" />
              <div style={{ marginTop: 16 }}>
                <div style={{ marginBottom: 8 }}>Velocidad partículas: {animSpeed.toFixed(1)}x</div>
                <Slider min={0.5} max={2} step={0.1} value={animSpeed} onChange={(_, v) => setAnimSpeed(v)} valueLabelDisplay="auto" />
              </div>
              <div style={{ marginTop: 16 }}>
                <div style={{ marginBottom: 8 }}>Velocidad fondo: {bgSpeed.toFixed(1)}x</div>
                <Slider min={0.5} max={2} step={0.1} value={bgSpeed} onChange={(_, v) => setBgSpeed(v)} valueLabelDisplay="auto" />
              </div>
              <div style={{ marginTop: 16 }}>
                <div style={{ marginBottom: 8 }}>Densidad de partículas: {particlesDensity}</div>
                <Slider min={0} max={50} step={1} value={particlesDensity} onChange={(_, v) => setParticlesDensity(v)} valueLabelDisplay="auto" />
              </div>
            </Box>
          </Drawer>
          <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Container
              maxWidth="xl"
              sx={{
                width: '100%',
                mx: 'auto',
                px: { xs: 2, sm: 4, md: 6 },
                py: { xs: 2.5, md: 5 },
                pl: { xs: 'calc(12px + env(safe-area-inset-left))' },
                pr: { xs: 'calc(12px + env(safe-area-inset-right))' },
                display: 'flex',
                flexDirection: 'column',
                minHeight: { lg: '100vh' },
                boxSizing: 'border-box',
                gap: { xs: 2, md: 3 },
                background: '#fff',
                borderRadius: { xs: 0, md: 4 },
                boxShadow: { xs: 'none', md: 3 },
                position: 'relative',
                overflow: 'visible',
              }}
            >
              {showAnimations && showBg && (
                <Suspense fallback={null}>
                  <AnimatedBackground speed={bgSpeed} />
                </Suspense>
              )}
              <Typography variant="h4" align="center" sx={{ mb: { xs: 2, md: 4 }, fontWeight: 700, letterSpacing: 0.5 }}>
                {t('app.title')}
              </Typography>
              <nav aria-label="Navegación principal">
                <Box
                  sx={{
                    borderRadius: 2,
                    pt: 1,
                    pb: 1,
                    mt: { xs: 1, md: 1 },
                    mb: 3,
                  }}
                >
                  <Stack
                    direction={{ xs: 'row' }}
                    spacing={{ xs: 1, sm: 2 }}
                    useFlexGap
                    flexWrap="wrap"
                    justifyContent="center"
                    alignItems="center"
                    role="menubar"
                  >
                    {SECTIONS.map((section, idx) => (
                      <Button
                        key={section.name}
                        variant={selected === idx ? 'contained' : 'outlined'}
                        color="primary"
                        onClick={() => setSelected(idx)}
                        aria-label={`Ir a sección ${section.name}`}
                        role="menuitem"
                        sx={{
                          minWidth: { xs: 'auto', sm: 100 },
                          px: { xs: 1.2, sm: 1.8 },
                          py: { xs: 0.4, sm: 0.7 },
                          borderRadius: 999,
                          borderWidth: 1.4,
                          borderStyle: 'solid',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          letterSpacing: 0.3,
                          lineHeight: 1.1,
                          ...(selected === idx
                            ? {
                              backgroundColor: 'primary.main',
                              color: 'primary.contrastText',
                              borderColor: 'primary.main',
                              boxShadow: { xs: 'none', md: '0 4px 12px rgba(115, 74, 145, 0.18)' },
                              '&:hover': { backgroundColor: 'primary.dark', borderColor: 'primary.dark' },
                            }
                            : {
                              color: (theme) => theme.palette.mode === 'dark' ? '#e0e0e0' : '#5a357a',
                              borderColor: 'rgba(115, 74, 145, 0.45)',
                              '&:hover': {
                                borderColor: 'rgba(115, 74, 145, 0.7)',
                                backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(115,74,145,0.13)' : 'rgba(232, 213, 246, 0.25)',
                                color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#734a91',
                              },
                            }),
                        }}
                      >
                        {section.name}
                      </Button>
                    ))}
                  </Stack>
                </Box>
              </nav>
              {selected !== null && (
                <Box sx={{ flexGrow: 1, minHeight: 0 }}>
                  <Suspense fallback={<div style={{ textAlign: 'center', padding: '16px' }}>Cargando tabla…</div>}>
                    <PostulacionesTable
                      columns={SECTIONS[selected].columns}
                      rows={filteredRows}
                      realIndices={filteredRows.map(row => data[selected].indexOf(row))}
                      editing={editing}
                      editRowData={editRowData}
                      newRow={newRow}
                      error={error}
                      onInputChange={handleInputChange}
                      onEditRow={handleEditRow}
                      onSaveEdit={onSaveEditWrapped}
                      onCancelEdit={handleCancelEdit}
                      onDelete={onDeleteWrapped}
                      onAddRow={onAddRowWrapped}
                      search={search}
                      onSearchChange={e => setSearch(e.target.value)}
                      sectionName={SECTIONS[selected].name}
                      newRowErrors={newRowErrors}
                      editRowErrors={editRowErrors}
                      allSections={SECTIONS.map((section, idx) => ({
                        name: section.name,
                        columns: section.columns,
                        rows: data[idx] || []
                      }))}
                      curriculums={curr.files}
                      activeProfile={activeProfile}
                    />
                  </Suspense>
                </Box>
              )}
              {/* Sección para adjuntar currículums */}
              <Accordion defaultExpanded={false} sx={{ mt: 3 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon aria-label="Expandir sección adjuntar currículum" />}>
                  <Typography variant="h6" align="center" sx={{ width: '100%' }}>
                    {t('section.attach_cv')}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: { xs: 0, sm: 2 }, py: { xs: 1, sm: 2 } }}>
                  <Suspense fallback={<div style={{ textAlign: 'center', padding: '12px' }}>Cargando currículums…</div>}>
                    <CurriculumSection
                      files={curr.files}
                      previewIdx={curr.previewIdx}
                      error={curr.error}
                      progress={curr.progress}
                      handleFileChange={handleFileChangeWrapped}
                      handleRemove={handleRemoveWrapped}
                      handlePreview={curr.handlePreview}
                      handleOpenPdf={curr.handleOpenPdf}
                      handleClosePreview={curr.handleClosePreview}
                    />
                  </Suspense>
                </AccordionDetails>
              </Accordion>
            </Container>
          </Motion.div>
        </>
      )}
    </>
  );
}

export default App;
