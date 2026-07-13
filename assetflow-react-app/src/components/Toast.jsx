import React, { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="toast-container">
      <div className="toast">
        <CheckCircle2 size={20} />
        {message}
      </div>
    </div>
  );
}
