// Hook personalizado para gestionar archivos de currículum y estado de previsualización
import { useState, useEffect } from 'react';

export function useCurriculums(activeProfile = 'default') {
  const storageKey = `curriculums_${activeProfile}`;
  const [files, setFiles] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    const initial = [null, null, null, null, null];
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return [...parsed, ...initial].slice(0, 5);
        }
      } catch {
        // ignorar errores de parseo y usar el valor inicial
      }
    }
    return initial;
  });
  // Recargar archivos cuando cambia el perfil activo
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    const initial = [null, null, null, null, null];
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setFiles([...parsed, ...initial].slice(0, 5));
          return;
        }
      } catch {
        // ignorar errores de parseo y usar el valor inicial
      }
    }
    setFiles(initial);
  }, [storageKey]);
  const [previewIdx, setPreviewIdx] = useState(null);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(files));
  }, [files, storageKey]);

  const handleFileChange = (e, idx) => {
    const file = e.target.files[0];
    if (file) {
      // Validación simple de tamaño (10MB) y tipo
      if (file.size > 10 * 1024 * 1024) {
        setError('El archivo supera 10MB.');
        return;
      }
      const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.oasis.opendocument.text'];
      if (!allowed.includes(file.type)) {
        setError('Formato no permitido.');
        return;
      }
      const reader = new FileReader();
      reader.onprogress = (ev) => {
        if (ev.lengthComputable) setProgress(Math.round((ev.loaded / ev.total) * 100));
      };
      reader.onload = ev => {
        const base64 = ev.target.result;
        const updated = [...files];
        updated[idx] = { name: file.name, type: file.type, base64 };
        setFiles(updated);
        setError('');
        setProgress(0);
      };
      reader.onerror = () => setError('Error al leer el archivo.');
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = (idx) => {
    const updated = [...files];
    updated[idx] = null;
    setFiles(updated);
    setPreviewIdx(null);
    return true;
  };

  const handlePreview = (idx) => {
    setPreviewIdx(idx);
  };

  const handleOpenPdf = (idx) => {
    const file = files[idx];
    if (file && file.type === 'application/pdf') {
      const base64 = file.base64.split(',')[1];
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
    }
  };

  const handleClosePreview = () => {
    setPreviewIdx(null);
  };

  return {
    files,
    previewIdx,
    error,
    progress,
    handleFileChange,
    handleRemove,
    handlePreview,
    handleOpenPdf,
    handleClosePreview,
  };
}
