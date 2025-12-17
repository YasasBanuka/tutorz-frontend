import React, { useState, useEffect } from 'react';
import { Plus, Edit2, UserPlus, Search } from 'lucide-react';
import ClassCard from '../../components/molecules/ClassCard';
import ClassFormModal from '../../components/organisms/ClassFormModal';
import AddStudentModal from '../../components/organisms/AddStudentModal';
import ConfirmationModal from '../../components/molecules/ConfirmationModal'; // Import ConfirmationModal
import useApi from '../../hooks/useApi';
import * as tutorService from '../../services/api/tutorService';

const ClassesPage = () => {
  // State
  const [classes, setClasses] = useState([]);
  const [isClassModalOpen, setClassModalOpen] = useState(false);
  const [isStudentModalOpen, setStudentModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Confirmation & Success Modal States
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);

  // API Hooks
  const { request: fetchClasses, loading: isLoading } = useApi();
  const { request: saveClass, loading: isSaving } = useApi();

  // Load Classes
  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    const { data } = await fetchClasses(tutorService.getClasses);
    if (data) setClasses(data);
  };

  // Handlers
  const handleCreateClick = () => {
    setEditingClass(null);
    setClassModalOpen(true);
  };

  const handleEditClick = (cls) => {
    setEditingClass(cls);
    setClassModalOpen(true);
  };

  const handleAddStudentClick = (classId) => {
    setSelectedClassId(classId);
    setStudentModalOpen(true);
  };

  // 1. Intercept Submit: Store data and open Confirmation Modal
  const handleClassSubmit = (formData) => {
    setPendingFormData(formData);
    setIsConfirmOpen(true);
  };

  // 2. Proceed with Save after Confirmation
  const handleConfirmSave = async () => {
    let result;
    if (editingClass) {
      result = await saveClass(tutorService.updateClass, editingClass.classId, pendingFormData);
    } else {
      result = await saveClass(tutorService.createClass, pendingFormData);
    }

    if (result.data) {
      setIsConfirmOpen(false); // Close confirmation
      setClassModalOpen(false); // Close form
      setPendingFormData(null); // Clear temp data
      loadClasses(); // Refresh list
      setIsSuccessOpen(true); // Show Success Modal
    }
  };

  const handleStudentSubmit = async (regNo) => {
    const { data } = await saveClass(tutorService.addStudentToClass, { 
        classId: selectedClassId, 
        studentRegistrationNumber: regNo 
    });
    if (data) {
      alert("Student Added Successfully!");
      setStudentModalOpen(false);
    }
  };

  // Filter Classes
  const filteredClasses = classes.filter(c => 
    c.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>
            <p className="text-gray-500">Manage your subjects and schedules</p>
        </div>
        <button 
            onClick={handleCreateClick}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
            <Plus size={20} /> Create Class
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
            type="text" 
            placeholder="Search by subject or grade..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="text-center py-10">Loading classes...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((cls) => (
                <div key={cls.classId} className="relative">
                    <ClassCard 
                        subject={cls.subject} 
                        time={`${cls.dayOfWeek} ${cls.startTime}`} 
                        students={cls.studentCount} 
                        status={cls.isActive ? 'active' : 'inactive'}
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button 
                            onClick={() => handleEditClick(cls)} 
                            className="p-1.5 bg-white shadow-sm border rounded-full hover:bg-gray-50 text-gray-600"
                            title="Edit Class"
                        >
                            <Edit2 size={16} />
                        </button>
                        <button 
                            onClick={() => handleAddStudentClick(cls.classId)} 
                            className="p-1.5 bg-white shadow-sm border rounded-full hover:bg-gray-50 text-blue-600"
                            title="Add Student"
                        >
                            <UserPlus size={16} />
                        </button>
                    </div>
                </div>
            ))}
            {filteredClasses.length === 0 && (
                <div className="col-span-full text-center py-10 text-gray-500 bg-gray-50 rounded-xl border border-dashed">
                    No classes found. Create one to get started!
                </div>
            )}
        </div>
      )}

      {/* --- MODALS --- */}

      {/* 1. Class Form Modal */}
      <ClassFormModal 
        isOpen={isClassModalOpen} 
        onClose={() => setClassModalOpen(false)} 
        onSubmit={handleClassSubmit} // Opens Confirmation Modal now
        initialData={editingClass}
        isSubmitting={isSaving}
      />

      {/* 2. Add Student Modal */}
      <AddStudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setStudentModalOpen(false)}
        onSubmit={handleStudentSubmit}
        isSubmitting={isSaving}
      />

      {/* 3. Confirmation Modal (Add/Edit Class) */}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmSave}
        title={editingClass ? "Update Class" : "Create Class"}
        message={editingClass 
            ? "Are you sure you want to update this class details?" 
            : "Are you sure you want to create this new class?"}
        confirmLabel={editingClass ? "Update" : "Create"}
        cancelLabel="Cancel"
        variant="primary"
      />

      {/* 4. Success Modal */}
      <ConfirmationModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        onConfirm={() => setIsSuccessOpen(false)}
        title="Success"
        message={editingClass 
            ? "Class updated successfully!" 
            : "Class added successfully!"}
        confirmLabel="OK"
        cancelLabel="Close"
        variant="success"
      />
    </div>
  );
};

export default ClassesPage;