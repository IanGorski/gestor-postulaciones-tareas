import React, { useRef, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import Divider from '@mui/material/Divider';
// Agrega aquí los íconos que uses, por ejemplo:
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableChartIcon from '@mui/icons-material/TableChart';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import MuiAlert from '@mui/material/Alert';

function PostulacionesTable(props) {
  // Detect mobile (from 300px to 900px width)
  const isMobile = useMediaQuery('(min-width:300px) and (max-width:900px)');
  const {
    columns = [],
    rows = [],
    _realIndices = [],
    _editing = {},
    editRowData = [],
    newRow = [],
    _error,
    onInputChange = () => {},
    onEditRow = () => {},
    onSaveEdit = () => {},
    onCancelEdit = () => {},
    onDelete = () => {},
    onAddRow = () => {},
    search = '',
    onSearchChange = () => {},
    sectionName = '',
    _showFilters,
    _setShowFilters,
    _columnFilters = [],
    _setColumnFilters,
    _isCompact = false,
    _pagedRows = [],
    _sortedRows = [],
    _page = 0,
    _setPage = () => {},
    _rowsPerPage = 10,
    _setRowsPerPage = () => {},
    _orderBy = 0,
    _order = 'asc',
    _handleRequestSort = () => {},
    _isDesktop = false,
    curriculums = [],
    newRowErrors = [],
    editRowErrors = [],
    loading = false,
    hasAnyErrors = false,
    paginatedRows = [],
    paginatedRealIndices = [],
    start = 0,
    totalCount,
    currentPage = 0,
    setCurrentPage = () => {},
    currentRowsPerPage = 10,
    setCurrentRowsPerPage = () => {},
    handleExportCSV = () => {
      // Generar CSV a partir de columns y rows, con BOM UTF-8 para acentos
      if (!columns.length || !rows.length) return;
      const separator = ',';
      const csvHeader = columns.map(col => `"${col}"`).join(separator);
      const csvRows = rows.map(row => row.map(cell => `"${cell}"`).join(separator));
      const csvContent = [csvHeader, ...csvRows].join('\n');
      // Agregar BOM UTF-8 para que Excel y otros reconozcan acentos
      const bom = '\uFEFF';
      const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Postulaciones_${sectionName || 'datos'}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    handleExportExcel = () => {},
    handleImportCSV = () => {},
  editing = {},
  isEditingRow = (rowIdx) => editing && editing.row === rowIdx,
  } = props;

  const editInputRefs = useRef({});
  const [expandedCards, setExpandedCards] = useState({}); // realIdx => bool
  const toggleExpand = (idx) => setExpandedCards(prev => ({ ...prev, [idx]: !prev[idx] }));

  // Exportar PDF con jsPDF y autoTable
  const handleExportPDF = async () => {
    const jsPDF = (await import('jspdf')).default;
    const autoTable = (await import('jspdf-autotable')).default;
    const doc = new jsPDF();

    // Título principal
    doc.setFontSize(18);
    doc.text('Postulaciones - ' + (sectionName || ''), 14, 18);

    // Tabla principal
    autoTable(doc, {
      startY: 28,
      head: [columns],
      body: rows.map(row => row),
      theme: 'grid',
      headStyles: { fillColor: [162, 89, 182] },
      styles: { fontSize: 10 },
    });

    // Espacio antes de curriculums
    let finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 50;

    // Título de curriculums
    doc.setFontSize(15);
    doc.text('Curriculums Adjuntos', 14, finalY);

    // Tabla de curriculums adjuntos reales
    autoTable(doc, {
      startY: finalY + 6,
      head: [['Nombre archivo', 'Tipo', 'Vista previa']],
      body: (curriculums.filter(Boolean).length > 0)
        ? curriculums.filter(Boolean).map(c => [
            c.name,
            c.type,
            c.base64 ? 'Adjunto' : ''
          ])
        : [['No hay currículums adjuntos', '', '']],
      theme: 'striped',
      headStyles: { fillColor: [89, 182, 162] },
      styles: { fontSize: 10 },
    });

    doc.save(`Postulaciones_${sectionName || 'datos'}_con_curriculums.pdf`);
  };

  // Renderizado condicional: tarjetas en móvil, tabla en desktop
  return (
    <Box>
      {/* Barra de acciones (responsive desde 300px) */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 1,
          mb: 2,
          justifyContent: { xs: 'flex-start', sm: 'center' },
        }}
      >
        <TextField
          variant="outlined"
          value={search}
          onChange={onSearchChange}
          placeholder="Buscar por sección"
          size="small"
          sx={{
            width: { xs: '100%', sm: 300, md: 350 },
            background: '#fff',
            borderRadius: 1,
          }}
          aria-label="Buscar por sección"
        />
  {/* Contenedor de botones: wrap en mobile */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <Button
            color="success"
            size="small"
            startIcon={<DownloadIcon />}
            onClick={handleExportCSV}
            sx={{ flex: { xs: '1 1 calc(50% - 8px)', sm: '0 0 auto' } }}
          >
            Exportar CSV
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<PictureAsPdfIcon />}
            onClick={handleExportPDF}
            sx={{ flex: { xs: '1 1 calc(50% - 8px)', sm: '0 0 auto' } }}
          >
            Exportar PDF
          </Button>
          <Button
            variant="contained"
            color="warning"
            size="small"
            startIcon={<TableChartIcon />}
            onClick={handleExportExcel}
            sx={{ flex: { xs: '1 1 calc(50% - 8px)', sm: '0 0 auto' } }}
          >
            Exportar Excel
          </Button>
          <Button
            variant="contained"
            color="info"
            size="small"
            component="label"
            startIcon={<UploadFileIcon />}
            sx={{ flex: { xs: '1 1 100%', sm: '0 0 auto' } }}
          >
            Importar CSV
            <input id="import-csv-input" type="file" accept=".csv" hidden onChange={handleImportCSV} />
          </Button>
        </Box>
      </Box>

      {/* Barra de estado */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          mb: 1,
          px: 0.5,
          gap: 1,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {loading
            ? 'Cargando…'
            : `Mostrando ${rows?.length ? Math.min(currentRowsPerPage, rows.length - start) : 0} de ${totalCount ?? (rows?.length || 0)} registros`}
        </Typography>
        {hasAnyErrors && (
          <MuiAlert severity="error" variant="outlined" sx={{ py: 0.25, px: 1, fontSize: 12 }}>
            Hay campos con error. Revisá los marcados en rojo.
          </MuiAlert>
        )}
      </Box>

      {/* Renderizado tarjetas en móvil */}
      {isMobile ? (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          minWidth: 0,
          maxWidth: '100%',
          px: 0,
          mx: 0,
          overflowX: 'hidden'
        }}>
          {/* Tarjeta para NUEVO registro en móvil */}
          {Array.isArray(columns) && columns.length > 0 && (
      <Paper
        sx={{
  p: { xs: 1, sm: 2 },
    mb: 2,
    boxShadow: 2,
    borderLeft: '4px solid #734a91',
    borderRadius: 2,
  width: '100%',
  minWidth: 0,
  maxWidth: '100%',
  boxSizing: 'border-box',
        }}
              role="form"
              aria-label="Nuevo registro"
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: '#3c3c3c' }}>
                Nuevo registro
              </Typography>
              {columns.map((col, idx) => (
                <Box key={`new-mobile-${idx}`} sx={{ mb: 1.25 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.4 }}>
                    {col}
                  </Typography>
                  <TextField
                    value={newRow[idx] || ''}
                    onChange={(e) => onInputChange(e, idx, null)}
                    size="small"
                    variant="outlined"
                    fullWidth
                    error={Boolean(newRowErrors[idx])}
                    helperText={newRowErrors[idx] || ''}
                    aria-label={`Nuevo ${col}`}
                  />
                </Box>
              ))}
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Button onClick={onAddRow} variant="contained" size="small" sx={{ flex: 1, background: '#a259b6', fontWeight: 600 }}>AGREGAR</Button>
              </Box>
            </Paper>
          )}
          {rows?.length === 0 ? (
            <Paper sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
              Sin datos en esta sección.
            </Paper>
          ) : (
            (Array.isArray(paginatedRows) && paginatedRows.length > 0 ? paginatedRows : rows).map((row, i) => {
              const realIdx = paginatedRealIndices && paginatedRealIndices[i] !== undefined ? paginatedRealIndices[i] : (start + i);
              const editingRow = isEditingRow(realIdx);
              return (
  <Paper
      key={realIdx}
      sx={{
    p: { xs: 1, sm: 2 },
        mb: 2,
        boxShadow: 2,
        borderLeft: '4px solid #a259b6',
        borderRadius: 2,
        overflow: 'hidden',
    width: '100%',
    minWidth: 0,
    maxWidth: '100%',
    boxSizing: 'border-box',
      }}
                  role="article"
                  aria-label={`Registro ${realIdx + 1}`}
                >
                  {/* Encabezado de la tarjeta con título (primer campo) */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#3c3c3c' }}>
                      {row?.[0] || 'Registro'}
                    </Typography>
                    {!editingRow && (
                      <Stack direction="row" spacing={1}>
                        <Button onClick={() => onEditRow(realIdx)} variant="text" size="small">Editar</Button>
                        <Button onClick={() => onDelete(realIdx)} variant="text" color="error" size="small">Eliminar</Button>
                      </Stack>
                    )}
                  </Box>

                  {/* Contenido de campos (priorizar Nombre ONG / Puesto / Modalidad) */}
                  {(() => {
                    const lower = (s) => (s || '').toString().toLowerCase();
                    const preferredGroups = [
                      ['Nombre ONG', 'Nombre Fundación', 'Nombre ong', 'Nombre'],
                      ['Puesto'],
                      ['Modalidad']
                    ];
                    const headerLower = columns.map(c => lower(c));
                    const preferredIdxs = [];
                    preferredGroups.forEach(group => {
                      const found = headerLower.findIndex(h => group.some(g => lower(g) && h.includes(lower(g))));
                      if (found >= 0 && !preferredIdxs.includes(found)) preferredIdxs.push(found);
                    });
                    const allIdxs = columns.map((_, i) => i);
                    const remaining = allIdxs.filter(i => !preferredIdxs.includes(i));
                    const displayIdxs = expandedCards[realIdx] ? allIdxs : [...preferredIdxs, ...remaining].slice(0, 4);

                    return displayIdxs.map((idx) => (
                      <Box key={idx} sx={{ mb: 1.25 }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.4 }}>
                          {columns[idx]}
                        </Typography>
                        {editingRow ? (
                          <TextField
                            value={editRowData[idx] || ''}
                            onChange={(e) => onInputChange(e, idx, realIdx)}
                            size="small"
                            variant="outlined"
                            fullWidth
                            error={Boolean(editRowErrors[idx])}
                            helperText={editRowErrors[idx] || ''}
                            aria-label={`Editar ${columns[idx]}`}
                          />
                        ) : (
                          <Typography variant="body2" sx={{ mt: 0.25 }}>
                            {row[idx] || ''}
                          </Typography>
                        )}
                      </Box>
                    ));
                  })()}

                  {/* Toggle ver más/menos (si hay más de 4 columnas) */}
                  {!editingRow && columns.length > 4 && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
                      <Button size="small" variant="text" onClick={() => toggleExpand(realIdx)}>
                        {expandedCards[realIdx] ? 'Ver menos' : 'Ver más'}
                      </Button>
                    </Box>
                  )}

                  {/* Acciones en modo edición */}
                  {editingRow && (
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Button onClick={() => onSaveEdit(realIdx)} variant="contained" color="success" size="small" sx={{ flex: 1 }}>Guardar</Button>
                      <Button onClick={onCancelEdit} variant="outlined" color="inherit" size="small" sx={{ flex: 1 }}>Cancelar</Button>
                    </Box>
                  )}
                </Paper>
              );
            })
          )}
        </Box>
      ) : (
        // Renderizado tabla en desktop
        <>
          <TableContainer component={Paper} sx={{ boxShadow: 2, maxHeight: { xs: 420, md: 560 }, overflowY: 'auto' }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell key={col} sx={{ fontWeight: 600, color: '#a259b6', borderBottom: '2px solid #a259b6' }}>
                      {col}
                    </TableCell>
                  ))}
                  <TableCell align="right" sx={{ borderBottom: '2px solid #a259b6', minWidth: 160 }}>
                    <Button variant="contained" sx={{ background: '#a259b6', fontWeight: 600, borderRadius: 2, px: 3 }} onClick={onAddRow}>AGREGAR</Button>
                  </TableCell>
                </TableRow>
                {/* Fila de entrada para una NUEVA fila */}
                <TableRow>
                  {columns.map((_, idx) => (
                    <TableCell key={`new-${idx}`}>
                      <TextField
                        value={newRow[idx] || ''}
                        onChange={(e) => onInputChange(e, idx, null)}
                        size="small"
                        variant="standard"
                        fullWidth
                        error={Boolean(newRowErrors[idx])}
                        helperText={newRowErrors[idx] || ''}
                        aria-label={`Nuevo ${columns[idx]}`}
                      />
                    </TableCell>
                  ))}
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1} align="center" sx={{ color: 'text.secondary' }}>
                      Sin datos en esta sección.
                    </TableCell>
                  </TableRow>
                ) : (
                  (Array.isArray(paginatedRows) && paginatedRows.length > 0 ? paginatedRows : rows).map((row, i) => {
                    const realIdx = paginatedRealIndices && paginatedRealIndices[i] !== undefined ? paginatedRealIndices[i] : (start + i);
                    const editingRow = isEditingRow(realIdx);
                    return (
                      <TableRow key={realIdx} hover>
                        {columns.map((_, colIdx) => (
                          <TableCell key={colIdx}>
                            {editingRow ? (
                              <TextField
                                inputRef={el => editInputRefs.current[realIdx] = el}
                                value={editRowData[colIdx] || ''}
                                onChange={(e) => onInputChange(e, colIdx, realIdx)}
                                size="small"
                                variant="standard"
                                fullWidth
                                error={Boolean(editRowErrors[colIdx])}
                                helperText={editRowErrors[colIdx] || ''}
                                aria-label={`Editar ${columns[colIdx]}`}
                              />
                            ) : (
                              <span>{row[colIdx] || ''}</span>
                            )}
                          </TableCell>
                        ))}
                        <TableCell align="center">
                          {editingRow ? (
                            <Stack direction="row" spacing={1} justifyContent="center">
                              <Button onClick={() => onSaveEdit(realIdx)} variant="contained" color="success" size="small">Guardar</Button>
                              <Button onClick={onCancelEdit} variant="outlined" color="inherit" size="small">Cancelar</Button>
                            </Stack>
                          ) : (
                            <Stack direction="row" spacing={1} justifyContent="center">
                              <Button onClick={() => onEditRow(realIdx)} variant="outlined" size="small">Editar</Button>
                              <Button onClick={() => onDelete(realIdx)} variant="outlined" color="error" size="small">Eliminar</Button>
                            </Stack>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider sx={{ my: 1.5 }} />
          <TablePagination
            component="div"
            count={rows?.length || 0}
            page={currentPage}
            onPageChange={(_, p) => setCurrentPage(p)}
            rowsPerPage={currentRowsPerPage}
            onRowsPerPageChange={(e) => {
              setCurrentRowsPerPage(parseInt(e.target.value, 10));
              setCurrentPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25, 50]}
            labelRowsPerPage="Filas por página"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          />
        </>
      )}
    </Box>
  );
}

export default PostulacionesTable;