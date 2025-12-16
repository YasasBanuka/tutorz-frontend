import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';

const ClassFormModal = ({ isOpen, onClose, onSubmit, initialData = null, isSubmitting }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    className: '', // 1. Added className field
    subject: '',
    grade: '',
    dayOfWeek: 'Monday',
    startTime: '',
    endTime: '',
    hallName: '',
    fee: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Reset for create mode
      setFormData({ 
          className: '', 
          subject: '', 
          grade: '', 
          dayOfWeek: 'Monday', 
          startTime: '', 
          endTime: '', 
          hallName: '', 
          fee: '' 
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 2. Prepare payload
    // If user didn't type a Class Name, auto-generate it from Subject + Grade
    const finalClassName = formData.className || `${formData.subject} - ${formData.grade}`;

    const payload = {
        ...formData,
        className: finalClassName, // Ensure this is sent
        fee: parseFloat(formData.fee) // 3. Ensure Fee is a Number
    };

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">{initialData ? 'Edit Class' : 'Create New Class'}</h2>
          <button onClick={onClose}><X className="text-gray-500" /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Added Class Name Field */}
          <FormField 
            id="className" 
            label="Class Name" 
            placeholder="e.g. Science Revision 2025 (Optional)" 
            value={formData.className} 
            onChange={handleChange} 
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField id="subject" label="Subject" value={formData.subject} onChange={handleChange} required />
            <FormField id="grade" label="Grade" value={formData.grade} onChange={handleChange} required placeholder="e.g. Grade 11" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className='flex flex-col gap-1'>
                <label className="text-sm font-medium text-gray-700">Day</label>
                <select 
                    name="dayOfWeek" 
                    value={formData.dayOfWeek} 
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </div>
            <FormField id="startTime" label="Start Time" type="time" value={formData.startTime} onChange={handleChange} required />
            <FormField id="endTime" label="End Time" type="time" value={formData.endTime} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <FormField id="hallName" label="Hall Name" value={formData.hallName} onChange={handleChange} />
             <FormField id="fee" label="Fee (LKR)" type="number" value={formData.fee} onChange={handleChange} required />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : (initialData ? 'Update Class' : 'Create Class')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassFormModal;