import React, { useRef } from 'react';
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
  const isMobile = useMediaQuery('(max-width:900px)');
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
  // sectionName,
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
  // curriculums,
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
  // ...existing code...
    isEditingRow = () => false,
  } = props;

  const editInputRefs = useRef({});

  // Exportar PDF con jsPDF y autoTable
  // ...existing code...

  return (
    <Box>
      {/* Barra de acciones (igual en ambos modos) */}
      {/* ...existing code... */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        mb: 2,
        width: '100%',
      }}>
        {/* ...existing code... */}
        <TextField
          variant="outlined"
          value={search}
          onChange={onSearchChange}
          placeholder="Buscar en la sección"
          className="pt-textfield-busqueda"
          aria-label="Buscar en la sección"
          sx={{
            background: (theme) => theme.palette.mode === 'dark' ? '#222' : '#fff',
            color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#222',
            borderRadius: 1,
            minWidth: 220,
          }}
        />
        {/* ...existing code for buttons... */}
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

      {/* Responsive: tarjetas en móvil */}
      {isMobile ? (
        <>
          {/* Formulario de alta para agregar registros en móvil */}
          <Paper elevation={2} sx={{ p: { xs: 1, sm: 2 }, mb: 2, borderRadius: 3, minWidth: 0, width: '100%' }}>
            <Stack spacing={1}>
              {columns.map((col, idx) => (
                <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>{col}</Typography>
                  <TextField
                    value={newRow[idx] || ''}
                    onChange={(e) => onInputChange(e, idx, null)}
                    size="small"
                    variant="standard"
                    fullWidth
                    error={Boolean(newRowErrors[idx])}
                    helperText={newRowErrors[idx] || ''}
                    aria-label={`Nuevo ${col}`}
                  />
                </Box>
              ))}
              <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 1 }}>
                <Button
                  variant="contained"
                  sx={{ background: '#a259b6', fontWeight: 600, borderRadius: 2, px: 3 }}
                  onClick={onAddRow}
                >
                  AGREGAR
                </Button>
              </Stack>
            </Stack>
          </Paper>
          {/* Tarjetas de registros */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2, minWidth: 0, width: '100%' }}>
            {(Array.isArray(paginatedRows) && paginatedRows.length > 0 ? paginatedRows : rows).map((row, i) => {
              const realIdx = paginatedRealIndices && paginatedRealIndices[i] !== undefined ? paginatedRealIndices[i] : (start + i);
              const editingRow = isEditingRow(realIdx);
              return (
                <Paper key={realIdx} elevation={3} sx={{ p: { xs: 1, sm: 2 }, borderRadius: 3, minWidth: 0, width: '100%' }}>
                  <Stack spacing={1}>
                    {columns.map((col, colIdx) => (
                      <Box key={colIdx} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>{col}</Typography>
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
                            aria-label={`Editar ${col}`}
                          />
                        ) : (
                          <Typography variant="body2">{row[colIdx] || ''}</Typography>
                        )}
                      </Box>
                    ))}
                    <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 1 }}>
                      {editingRow ? (
                        <>
                          <Button onClick={() => onSaveEdit(realIdx)} variant="contained" color="success" size="small">Guardar</Button>
                          <Button onClick={onCancelEdit} variant="outlined" color="inherit" size="small">Cancelar</Button>
                        </>
                      ) : (
                        <>
                          <Button onClick={() => onEditRow(realIdx)} variant="outlined" size="small">Editar</Button>
                          <Button onClick={() => onDelete(realIdx)} variant="outlined" color="error" size="small">Eliminar</Button>
                        </>
                      )}
                    </Stack>
                  </Stack>
                </Paper>
              );
            })}
          </Box>
        </>
      ) : (
        <>
          {/* ...existing code for table... */}
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
        </>
      )}

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