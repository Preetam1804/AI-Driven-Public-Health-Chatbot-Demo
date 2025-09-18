import React, { useState } from 'react';
import { Shield, Calendar, Clock, MapPin, Plus, Check } from 'lucide-react';

interface Vaccination {
  id: string;
  name: string;
  ageGroup: string;
  dueDate: Date;
  status: 'due' | 'completed' | 'overdue';
  description: string;
  location?: string;
}

export function VaccinationScheduler() {
  const [vaccinations] = useState<Vaccination[]>([
    {
      id: '1',
      name: 'COVID-19 Booster',
      ageGroup: 'Adults (18+)',
      dueDate: new Date(Date.now() + 604800000), // 1 week from now
      status: 'due',
      description: 'Third dose of COVID-19 vaccine for enhanced protection',
      location: 'Primary Health Center, Koramangala'
    },
    {
      id: '2',
      name: 'Influenza Vaccine',
      ageGroup: 'Senior Citizens (60+)',
      dueDate: new Date(Date.now() + 1209600000), // 2 weeks from now
      status: 'due',
      description: 'Annual flu vaccination recommended for elderly individuals'
    },
    {
      id: '3',
      name: 'Hepatitis B',
      ageGroup: 'Adults (18+)',
      dueDate: new Date(Date.now() - 604800000), // 1 week ago
      status: 'overdue',
      description: 'Second dose of Hepatitis B vaccine series'
    },
    {
      id: '4',
      name: 'Tetanus',
      ageGroup: 'Adults (18+)',
      dueDate: new Date(Date.now() - 2592000000), // 1 month ago
      status: 'completed',
      description: 'Tetanus toxoid vaccination - valid for 10 years'
    }
  ]);

  const [selectedVaccination, setSelectedVaccination] = useState<string | null>(null);
  const [reminderPhone, setReminderPhone] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'due':
        return 'text-blue-600 bg-blue-100';
      case 'overdue':
        return 'text-red-600 bg-red-100';
      case 'completed':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="w-4 h-4" />;
      case 'overdue':
        return <Clock className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const scheduleReminder = (vaccinationId: string) => {
    if (!reminderPhone) return;
    
    // In a real app, this would make an API call to schedule SMS/WhatsApp reminders
    alert(`Reminder scheduled for ${reminderPhone}`);
    setSelectedVaccination(null);
    setReminderPhone('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Shield className="w-7 h-7 mr-3 text-blue-600" />
              Vaccination Schedule
            </h1>
            <p className="text-gray-600 mt-1">Track and manage your immunization schedule</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Vaccination</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {vaccinations.filter(v => v.status === 'due').length}
              </p>
              <p className="text-sm text-gray-500">Due Soon</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {vaccinations.filter(v => v.status === 'overdue').length}
              </p>
              <p className="text-sm text-gray-500">Overdue</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {vaccinations.filter(v => v.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((vaccinations.filter(v => v.status === 'completed').length / vaccinations.length) * 100)}%
              </p>
              <p className="text-sm text-gray-500">Protection</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vaccination List */}
      <div className="space-y-4">
        {vaccinations.map((vaccination) => (
          <div key={vaccination.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(vaccination.status)}`}>
                  {getStatusIcon(vaccination.status)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{vaccination.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vaccination.status)}`}>
                      {vaccination.status.charAt(0).toUpperCase() + vaccination.status.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-2">{vaccination.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Age Group: {vaccination.ageGroup}</span>
                    <span>Due: {vaccination.dueDate.toLocaleDateString('en-IN')}</span>
                    {vaccination.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{vaccination.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => setSelectedVaccination(vaccination.id)}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                >
                  Set Reminder
                </button>
                {vaccination.status !== 'completed' && (
                  <button className="bg-green-100 text-green-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                    Book Appointment
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reminder Modal */}
      {selectedVaccination && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Set Vaccination Reminder</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (for SMS/WhatsApp)
                </label>
                <input
                  type="tel"
                  value={reminderPhone}
                  onChange={(e) => setReminderPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedVaccination(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => scheduleReminder(selectedVaccination)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Set Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Government Guidelines */}
      <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-6 border border-blue-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Official Vaccination Guidelines</h2>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <p className="text-gray-700 text-sm">Follow the National Immunization Schedule as per Ministry of Health guidelines</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <p className="text-gray-700 text-sm">Consult with healthcare providers before getting vaccinated</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <p className="text-gray-700 text-sm">Report any adverse events to the nearest health facility</p>
          </div>
        </div>
      </div>
    </div>
  );
}