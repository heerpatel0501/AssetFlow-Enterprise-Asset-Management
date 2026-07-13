import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
