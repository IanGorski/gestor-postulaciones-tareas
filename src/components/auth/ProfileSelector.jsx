import React from 'react';
import './ProfileSelector.css';

export default function ProfileSelector({ activeProfile, setActiveProfile }) {
	return (
		<header className="profile-header">
			<div className="profile-info">
				<span className="profile-label">Perfil activo:</span>
				<select
					className="profile-select"
					value={activeProfile}
					onChange={e => setActiveProfile(e.target.value)}
				>
					{/* Puedo mapear los perfiles acá si tengo la lista */}
					<option value="">Selecciona un perfil</option>
				</select>
			</div>
			<div className="profile-actions">
				<button className="logout-btn" onClick={() => window.location.reload()}>
					Cerrar sesión
				</button>
			</div>
		</header>
	);
}
