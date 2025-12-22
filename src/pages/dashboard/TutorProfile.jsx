import React, { useState, useEffect, useCallback } from 'react';
import { 
    User, Mail, Phone, Building2, CreditCard, 
    FileText, BadgeCheck, Loader, AlertCircle, RefreshCcw 
} from 'lucide-react';
import { getTutorProfile } from '../../services/api/tutorService'; // Importing from service

const TutorProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchProfile = useCallback(async () => {
        setLoading(true);
        setError('');

        try {
            // Clean service call
            const data = await getTutorProfile();
            setProfile(data);
        } catch (err) {
            console.error("Profile fetch error:", err);
            if (err.response && err.response.status === 401) {
                setError('Session expired. Please log in again.');
            } else {
                setError('Failed to load profile details.');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    if (loading) return (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
            <Loader className="animate-spin text-blue-600" size={40} />
            <p className="text-gray-500 text-sm animate-pulse">Loading profile...</p>
        </div>
    );

    if (error) return (
        <div className="flex flex-col items-center justify-center h-96 text-center px-4">
            <div className="bg-red-50 p-4 rounded-full mb-4">
                <AlertCircle size={40} className="text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
            <p className="text-gray-500 mb-6 max-w-sm">{error}</p>
            <button 
                onClick={fetchProfile}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                <RefreshCcw size={16} /> Retry
            </button>
        </div>
    );

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-800 relative">
                    <div className="absolute -bottom-10 left-8">
                        <div className="w-24 h-24 rounded-2xl bg-white p-1.5 shadow-lg rotate-3">
                            <div className="w-full h-full rounded-xl bg-blue-50 flex items-center justify-center text-3xl font-bold text-blue-700 uppercase">
                                {profile?.firstName?.[0] || <User />}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Name & ID */}
                <div className="pt-14 px-8 pb-6 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                {profile?.firstName || "Tutor"} {profile?.lastName}
                                {profile?.registrationNumber && (
                                    <BadgeCheck className="text-blue-500" size={20} />
                                )}
                            </h1>
                            <p className="text-sm text-gray-500 font-medium mt-1">
                                Registration ID: <span className="font-mono text-gray-700 bg-gray-100 px-2 py-0.5 rounded text-xs ml-1">
                                    {profile?.registrationNumber || "PENDING"}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Personal */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                            Personal Details
                        </h3>
                        <InfoCard icon={Mail} label="Email Address" value={profile?.email} />
                        <InfoCard icon={Phone} label="Phone Number" value={profile?.phoneNumber || "Not provided"} />
                        <div className="group flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-200">
                            <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                                <FileText size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-gray-500 font-medium mb-1">Bio</p>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {profile?.bio || "No biography added yet."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Financial */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                            Financial Information
                        </h3>
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden transition-transform hover:scale-[1.01] duration-300">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-5 rounded-full blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-blue-500 opacity-10 rounded-full blur-xl"></div>
                            <div className="flex items-center justify-between mb-8">
                                <CreditCard size={24} className="text-blue-400" />
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-2 py-1 rounded backdrop-blur-sm border border-white/5">
                                    Banking Details
                                </span>
                            </div>
                            <div className="space-y-5 relative z-10">
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Bank Name</p>
                                    <div className="flex items-center gap-2">
                                        <Building2 size={16} className="text-gray-400" />
                                        <p className="font-semibold text-lg tracking-wide">{profile?.bankName || "N/A"}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Account Number</p>
                                    <p className="font-mono text-xl tracking-widest text-blue-50">{profile?.bankAccountNumber || "•••• •••• ••••"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper component for uniform card style
const InfoCard = ({ icon: Icon, label, value }) => (
    <div className="group flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-200">
        <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
            <Icon size={20} />
        </div>
        <div>
            <p className="text-xs text-gray-500 font-medium mb-0.5">{label}</p>
            <p className="text-sm font-semibold text-gray-900">{value}</p>
        </div>
    </div>
);

export default TutorProfile;