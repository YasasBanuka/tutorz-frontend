import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import Button from '../atoms/Button'; // Reusing your existing Button atom

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmLabel = "Confirm", 
  cancelLabel = "Cancel", 
  variant = "primary" // 'primary', 'danger', 'success'
}) => {
  if (!isOpen) return null;

  // Determine icon and colors based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          icon: <XCircle size={32} />,
          iconBg: 'bg-red-100 text-red-600',
          btnVariant: 'danger'
        };
      case 'success':
        return {
          icon: <CheckCircle size={32} />,
          iconBg: 'bg-green-100 text-green-600',
          btnVariant: 'primary' // Assuming you might add a success variant to Button later
        };
      default:
        return {
          icon: <AlertCircle size={32} />,
          iconBg: 'bg-blue-100 text-blue-600',
          btnVariant: 'primary'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm transform transition-all scale-100">
        <div className="flex flex-col items-center text-center">
          
          {/* Icon */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${styles.iconBg}`}>
            {styles.icon}
          </div>

          {/* Text Content */}
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-gray-500 mt-2 mb-6 text-sm">
            {message}
          </p>
          
          {/* Actions */}
          <div className="flex gap-3 w-full">
            <Button 
              variant="secondary" // Gray button for cancel
              onClick={onClose}
              fullWidth
            >
              {cancelLabel}
            </Button>
            
            <Button 
              variant={styles.btnVariant} 
              onClick={onConfirm}
              fullWidth
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;