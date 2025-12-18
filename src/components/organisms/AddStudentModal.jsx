import React, { useState } from 'react';
import { X, QrCode } from 'lucide-react';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';

const AddStudentModal = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
    if (!isOpen) return null;
    const [regNo, setRegNo] = useState('');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Add Student to Class</h3>
                    <button onClick={onClose}><X size={20} className="text-gray-500" /></button>
                </div>
                <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg flex items-center justify-center cursor-pointer border-2 border-dashed border-blue-200 hover:bg-blue-100 transition">
                        <div className="text-center text-blue-600">
                            <QrCode className="mx-auto mb-2" />
                            <span className="text-sm font-medium">Scan QR Code</span>
                        </div>
                    </div>
                    <div className="text-center text-sm text-gray-500">- OR -</div>
                    <form onSubmit={(e) => { e.preventDefault(); onSubmit(regNo); }}>
                        <FormField 
                            id="regNo" 
                            label="Student Registration Number" 
                            placeholder="e.g. STU-25080001"
                            value={regNo}
                            onChange={(e) => setRegNo(e.target.value)}
                            required
                        />
                        <div className="mt-4 flex justify-end gap-2">
                            <Button variant="secondary" onClick={onClose}>Cancel</Button>
                            <Button type="submit" disabled={isSubmitting}>Add Student</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default AddStudentModal;