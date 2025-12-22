import React from 'react';
import Button from '../atoms/Button';

const DuplicateUserModal = ({ isOpen, onClose, existingUser, onItsMe, onItsParent, loading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Account Found</h3>
                    <p className="text-gray-500 mt-2 text-sm">
                        The email <b>{existingUser?.identifier}</b> is already registered.
                    </p>
                </div>

                <div className="space-y-3">
                    <Button variant="outline" fullWidth onClick={onItsMe} disabled={loading}>
                        That's me! (Log In)
                    </Button>

                    <Button 
                        variant="primary" 
                        fullWidth 
                        onClick={onItsParent}
                        loading={loading} 
                        disabled={loading}
                    >
                        That's my Family Account (Add Sibling)
                    </Button>
                    
                    <button 
                        onClick={onClose}
                        disabled={loading}
                        className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-2"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DuplicateUserModal;