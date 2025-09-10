import React from 'react';
import './ConfirmDialog.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

function ConfirmDialog({ open, title = 'Confirmar', description = '', confirmText = 'Aceptar', cancelText = 'Cancelar', onCancel, onConfirm }) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle className="cd-title">{title}</DialogTitle>
      {description && (
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions className="cd-actions">
        <Button variant="outlined" color="inherit" onClick={onCancel}>{cancelText}</Button>
        <Button variant="contained" color="primary" onClick={onConfirm}>{confirmText}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
