import React, { useState } from 'react';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';

const OtpVerificationModal = ({ isOpen, onClose, onVerify, identifier }) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onVerify(otp); // Parent handles error
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm">
                <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Verify Identity</h3>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Code sent to <b>{identifier}</b>
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormField
                        id="otp"
                        label="Enter OTP"
                        placeholder="123456"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="text-center tracking-widest text-lg"
                    />

                    <Button type="submit" fullWidth disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify'}
                    </Button>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full text-center text-sm text-gray-500 hover:text-gray-700"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OtpVerificationModal;