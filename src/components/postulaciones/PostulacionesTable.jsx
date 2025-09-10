import React, { useRef } from 'react';
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
    isEditingRow = () => false,
  } = props;

  const editInputRefs = useRef({});

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

  return (
    <Box>
      {/* Barra de acciones */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, justifyContent: 'center' }}>
        <TextField
          variant="outlined"
          value={search}
          onChange={onSearchChange}
          placeholder="Buscar en la sección"
          sx={{ width: 350, background: '#fff', borderRadius: 1 }}
          aria-label="Buscar en la sección"
        />
        <Button
          color="success"
          startIcon={<DownloadIcon />}
          onClick={handleExportCSV}
          sx={{
            fontWeight: 700,
            px: 3,
            py: 1.2,
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(80,200,120,0.18)',
            background: 'linear-gradient(90deg,#43e97b 0%,#38f9d7 100%)',
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            '&:hover': {
              background: 'linear-gradient(90deg,#38f9d7 0%,#43e97b 100%)',
              color: '#fff',
            },
          }}
        >
          Exportar CSV
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<PictureAsPdfIcon />}
          onClick={handleExportPDF}
          sx={{
            fontWeight: 700,
            px: 3,
            py: 1.2,
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(220,38,38,0.18)',
            background: 'linear-gradient(90deg,#d96083 0%,#734a91 100%)',
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            ml: 1,
            '&:hover': {
              background: 'linear-gradient(90deg,#734a91 0%,#d96083 100%)',
              color: '#fff',
            },
          }}
        >
          Exportar PDF
        </Button>
        <Button
          variant="contained"
          color="warning"
          startIcon={<TableChartIcon />}
          onClick={handleExportExcel}
          sx={{
            fontWeight: 700,
            px: 3,
            py: 1.2,
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(255,200,80,0.18)',
            background: 'linear-gradient(90deg,#ffd86f 0%,#f5f7fa 100%)',
            color: '#734a91',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            ml: 1,
            '&:hover': {
              background: 'linear-gradient(90deg,#f5f7fa 0%,#ffd86f 100%)',
              color: '#734a91',
            },
          }}
        >
          Exportar Excel
        </Button>
        <label htmlFor="import-csv-input" style={{ display: 'inline-block' }}>
          <input
            id="import-csv-input"
            type="file"
            accept=".csv"
            style={{ display: 'none' }}
            onChange={handleImportCSV}
          />
          <Button
            variant="contained"
            color="info"
            startIcon={<UploadFileIcon />}
            component="span"
            sx={{
              fontWeight: 700,
              px: 3,
              py: 1.2,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(80,180,255,0.18)',
              background: 'linear-gradient(90deg,#38f9d7 0%,#43e97b 100%)',
              color: '#fff',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              ml: 1,
              '&:hover': {
                background: 'linear-gradient(90deg,#43e97b 0%,#38f9d7 100%)',
                color: '#fff',
              },
            }}
          >
            Importar CSV
          </Button>
        </label>
      </Box>

  {/* Barra de estado: conteo y errores */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, px: 0.5, gap: 1 }}>
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
                <Button
                  variant="contained"
                  sx={{ background: '#a259b6', fontWeight: 600, borderRadius: 2, px: 3 }}
                  onClick={onAddRow}
                >
                  AGREGAR
                </Button>
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
    </Box>
  );
}

export default PostulacionesTable;