import { useState, useEffect } from 'react';
import { isNotEmpty, isValidDate, isEmail } from '../utils/validations';

export function usePostulaciones(SECTIONS, activeProfile = 'default') {
  // Seleccionar la primera sección por defecto para que el contenido sea visible al cargar
  const [selected, setSelected] = useState(0);
  const [newRowErrors, setNewRowErrors] = useState({});
  const [editRowErrors, setEditRowErrors] = useState({});
  const storageKey = `postulaciones_data_${activeProfile}`;
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return SECTIONS.map(() => []);
      }
    }
    return SECTIONS.map(() => []);
  });
  // Recargar datos cuando cambia el perfil activo
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch {
        setData(SECTIONS.map(() => []));
      }
    } else {
      setData(SECTIONS.map(() => []));
    }
  }, [storageKey, SECTIONS]);
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [data, storageKey]);
  const [editing, setEditing] = useState({ row: null, col: null });
  const [editRowData, setEditRowData] = useState([]);
  const [newRow, setNewRow] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const normalize = (s = '') =>
    (s || '')
      .toString()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase();

  const handleInputChange = (e, colIdx, rowIdx = null) => {
    const colName = SECTIONS[selected].columns[colIdx].toLowerCase();
    const value = e.target.value;
    let msg = '';
    if (!isNotEmpty(value)) {
      msg = 'Campo requerido';
    } else if (colName.includes('email')) {
      if (!isEmail(value)) msg = 'Email inválido';
    } else if (colName.includes('fecha')) {
      if (!isValidDate(value)) msg = 'Fecha inválida';
    }
    if (rowIdx === null) {
      const updated = [...newRow];
      updated[colIdx] = value;
      setNewRow(updated);
      setNewRowErrors(errors => ({ ...errors, [colIdx]: msg }));
    } else if (editing.row === rowIdx) {
      const updated = [...editRowData];
      updated[colIdx] = value;
      setEditRowData(updated);
      setEditRowErrors(errors => ({ ...errors, [colIdx]: msg }));
    } else {
      const updatedData = data.map((sectionRows, sIdx) => {
        if (sIdx !== selected) return sectionRows;
        return sectionRows.map((row, rIdx) => {
          if (rIdx !== rowIdx) return row;
          const updatedRow = [...row];
          updatedRow[colIdx] = value;
          return updatedRow;
        });
      });
      setData(updatedData);
    }
  };

  const handleAddRow = (onSuccess) => {
    const requiredCols = SECTIONS[selected].columns;
    let hasError = false;
    const errors = {};
    // Bloquear agregar si TODOS los campos están vacíos
    const allEmpty = requiredCols.every((_, idx) => !isNotEmpty(newRow[idx] || ''));
    if (allEmpty) {
      setError('No puedes agregar una fila vacía. Completa los campos requeridos.');
      setNewRowErrors(requiredCols.reduce((acc, _, idx) => ({ ...acc, [idx]: 'Campo requerido' }), {}));
      return false;
    }
    requiredCols.forEach((col, idx) => {
      const value = newRow[idx];
      const colName = col.toLowerCase();
      if (!isNotEmpty(value)) {
        errors[idx] = 'Campo requerido';
        hasError = true;
      } else if (colName.includes('email')) {
        if (!isEmail(value)) { errors[idx] = 'Email inválido'; hasError = true; }
      } else if (colName.includes('fecha')) {
        if (!isValidDate(value)) { errors[idx] = 'Fecha inválida'; hasError = true; }
      }
    });
    setNewRowErrors(errors);
    if (hasError) {
      setError('Por favor corrige los errores antes de agregar.');
      return false;
    }
    setError('');
    const updatedData = data.map((sectionRows, idx) =>
      idx === selected ? [...sectionRows, newRow] : sectionRows
    );
    setData(updatedData);
    setNewRow([]);
    setNewRowErrors({});
    if (typeof onSuccess === 'function') onSuccess();
    return true;
  };

  const handleEditRow = (rowIdx) => {
    setEditing({ row: rowIdx, col: null });
    setEditRowData([...data[selected][rowIdx]]);
  };

  const handleSaveEdit = (rowIdx) => {
    const requiredCols = SECTIONS[selected].columns;
    let hasError = false;
    const errors = {};
    requiredCols.forEach((col, idx) => {
      const value = editRowData[idx];
      const colName = col.toLowerCase();
      if (!isNotEmpty(value)) {
        errors[idx] = 'Campo requerido';
        hasError = true;
      } else if (colName.includes('email')) {
        if (!isEmail(value)) { errors[idx] = 'Email inválido'; hasError = true; }
      } else if (colName.includes('fecha')) {
        if (!isValidDate(value)) { errors[idx] = 'Fecha inválida'; hasError = true; }
      }
    });
    setEditRowErrors(errors);
    if (hasError) {
      setError('Por favor corrige los errores antes de guardar.');
      return;
    }
    setError('');
    const updatedData = data.map((sectionRows, idx) => {
      if (idx !== selected) return sectionRows;
      return sectionRows.map((row, rIdx) => (rIdx === rowIdx ? editRowData : row));
    });
    setData(updatedData);
  setEditing({ row: null, col: null });
    setEditRowData([]);
    setEditRowErrors({});
  return true;
  };

  const handleCancelEdit = () => {
    setEditing({ row: null, col: null });
    setEditRowData([]);
    setEditRowErrors({});
    setError('');
  };

  const handleDelete = (rowIdx) => {
    const updatedData = data.map((sectionRows, idx) =>
      idx === selected ? sectionRows.filter((_, rIdx) => rIdx !== rowIdx) : sectionRows
    );
    setData(updatedData);
    return true;
  };

  const filteredRows = selected !== null && search.trim() !== ''
    ? data[selected].filter(row =>
        row.some(cell => normalize(cell).includes(normalize(search)))
      )
    : selected !== null ? data[selected] : [];

  return {
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
  };
}
