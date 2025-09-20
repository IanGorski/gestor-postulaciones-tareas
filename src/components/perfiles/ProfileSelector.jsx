import './ProfileSelector.css';
import React, { useState, useEffect } from 'react';
import ConfirmDialog from '../shared/ConfirmDialog';
import { motion as Motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ColorLensIcon from '@mui/icons-material/ColorLens';

const defaultProfiles = [
    {
        id: 'default',
        name: 'Mi Perfil',
        color: '#a259b6',
        avatar: '',
    },
];

function ProfileSelector({ activeProfile, setActiveProfile }) {
    const [profiles, setProfiles] = useState(() => {
        const saved = localStorage.getItem('profiles');
        if (saved) return JSON.parse(saved);
        return defaultProfiles;
    });
    const [editing, setEditing] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editProfile, setEditProfile] = useState({ name: '', color: '#a259b6', avatar: '' });
    const [newProfile, setNewProfile] = useState({ name: '', color: '#a259b6', avatar: '' });
    const [confirm, setConfirm] = useState({ open: false, id: null });

    useEffect(() => {
        localStorage.setItem('profiles', JSON.stringify(profiles));
    }, [profiles]);

    const handleSelect = (id) => {
        setActiveProfile(id);
    };

    const handleAdd = () => {
        if (!newProfile.name.trim()) return;
        const id = Date.now().toString();
        setProfiles([...profiles, { ...newProfile, id }]);
        setNewProfile({ name: '', color: '#a259b6', avatar: '' });
    };

    const handleEdit = (id) => {
        // Solo actualiza el perfil y cierra el modal al hacer clic en 'Guardar'
        setProfiles(prev => prev.map(p => p.id === id ? { ...p, ...editProfile } : p));
        setEditing(null);
    };

    const handleDelete = (id) => {
        setConfirm({ open: true, id });
    };
    const confirmDelete = () => {
        const id = confirm.id;
        setProfiles(profiles.filter(p => p.id !== id));
        if (activeProfile === id) setActiveProfile(profiles[0]?.id || 'default');
        setConfirm({ open: false, id: null });
        // Eliminar datos asociados al perfil
        localStorage.removeItem(`postulaciones_data_${id}`);
        localStorage.removeItem(`curriculums_${id}`);
    };

    return (
        <Motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="ps-motion"
        >
            <Box className="ps-root">
                <Typography variant="h6" className="ps-title">
                    Perfiles
                </Typography>
                <Stack direction="row" spacing={1.5} alignItems="flex-start" justifyContent="flex-start" className="ps-stack">
                    {profiles.map(profile => (
                        <Motion.div
                            key={profile.id}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.98 }}
                            className="ps-profile"
                        >
                            <IconButton
                                onClick={() => handleSelect(profile.id)}
                                className={activeProfile === profile.id ? "ps-btn-avatar ps-btn-avatar-active" : "ps-btn-avatar"}
                                style={{ background: profile.color }}
                            >
                                <Avatar src={profile.avatar} className="ps-avatar" style={{ background: profile.color }}>
                                    {profile.name[0]}
                                </Avatar>
                            </IconButton>
                            <Typography variant="body2" className="ps-profile-name">{profile.name}</Typography>
                            <Stack direction="row" spacing={0.5} className="ps-profile-actions">
                                <IconButton size="small" onClick={() => {
                                    setEditing(profile.id);
                                    setEditProfile({
                                        name: profile.name,
                                        color: profile.color,
                                        avatar: profile.avatar
                                    });
                                    setIsEditModalOpen(true);
                                }} className="ps-btn-edit"><EditIcon fontSize="small" className="ps-icon-edit" /></IconButton>
                                <IconButton size="small" onClick={() => handleDelete(profile.id)} className="ps-btn-delete"><DeleteIcon fontSize="small" className="ps-icon-delete" /></IconButton>
                            </Stack>
                        </Motion.div>
                    ))}
                    <Motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.98 }} className="ps-profile ps-profile-new">
                        <IconButton onClick={() => { setEditing('new'); setIsEditModalOpen(true); }} className="ps-btn-avatar ps-btn-avatar-new">
                            <AddIcon className="ps-icon-add" />
                        </IconButton>
                        <Typography variant="body2" className="ps-profile-name">Nuevo</Typography>
                    </Motion.div>
                </Stack>
                {isEditModalOpen && (
                    <Box className="ps-edit-box">
                        <Typography variant="subtitle1" className="ps-edit-title">
                            {editing === 'new' ? 'Crear perfil' : 'Editar perfil'}
                        </Typography>
                        <Stack spacing={1.5}>
                            <TextField
                                label="Nombre"
                                value={editing === 'new' ? newProfile.name : editProfile.name}
                                onChange={e => {
                                    if (editing === 'new') setNewProfile({ ...newProfile, name: e.target.value });
                                    else setEditProfile(prev => ({ ...prev, name: e.target.value }));
                                }}
                                fullWidth
                                size="small"
                                className="ps-edit-input"
                            />
                            <Stack direction="row" spacing={1.5} alignItems="center" className="ps-edit-color-row">
                                <TextField
                                    label="Color"
                                    type="color"
                                    value={editing === 'new' ? newProfile.color : editProfile.color}
                                    onChange={e => {
                                        if (editing === 'new') setNewProfile({ ...newProfile, color: e.target.value });
                                        else setEditProfile(prev => ({ ...prev, color: e.target.value }));
                                    }}
                                    className="ps-edit-color-input"
                                    size="small"
                                />
                                <ColorLensIcon className="ps-edit-color-icon" style={{ color: editing === 'new' ? newProfile.color : editProfile.color }} />
                            </Stack>
                            <TextField
                                label="Foto (URL)"
                                value={editing === 'new' ? newProfile.avatar : editProfile.avatar}
                                onChange={e => {
                                    if (editing === 'new') setNewProfile({ ...newProfile, avatar: e.target.value });
                                    else setEditProfile(prev => ({ ...prev, avatar: e.target.value }));
                                }}
                                fullWidth
                                size="small"
                                className="ps-edit-input"
                            />
                            <Stack direction="row" spacing={1.5} justifyContent="flex-end" className="ps-edit-actions">
                                {editing === 'new' ? (
                                    <Button variant="contained" color="success" onClick={() => { handleAdd(); setIsEditModalOpen(false); setEditing(null); }} size="small" className="ps-btn-create">Crear</Button>
                                ) : (
                                    <Button variant="contained" color="primary" onClick={() => { handleEdit(editing); setIsEditModalOpen(false); }} size="small" className="ps-btn-save">Guardar</Button>
                                )}
                                <Button variant="outlined" color="error" onClick={() => { setIsEditModalOpen(false); setEditing(null); }} size="small" className="ps-btn-cancel">Cancelar</Button>
                            </Stack>
                        </Stack>
                    </Box>
                )}
            </Box>
            <ConfirmDialog
                open={confirm.open}
                title="Eliminar perfil"
                description="¿Estás seguro de eliminar este perfil? Se eliminarán también sus postulaciones y currículums. Esta acción no se puede deshacer."
                onCancel={() => setConfirm({ open: false, id: null })}
                onConfirm={confirmDelete}
            />
        </Motion.div>
    );
}

export default ProfileSelector;
