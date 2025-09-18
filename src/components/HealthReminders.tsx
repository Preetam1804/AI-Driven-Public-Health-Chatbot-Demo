import React, { useState } from 'react';
import { Bell, Plus, Clock, Phone, MessageSquare, Trash2, Edit } from 'lucide-react';

interface Reminder {
  id: string;
  title: string;
  description: string;
  time: string;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  method: 'sms' | 'whatsapp' | 'both';
  isActive: boolean;
  nextDue: Date;
}

export function HealthReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Take Blood Pressure Medication',
      description: 'Morning dose of Amlodipine 5mg',
      time: '08:00',
      frequency: 'daily',
      method: 'both',
      isActive: true,
      nextDue: new Date(Date.now() + 3600000)
    },
    {
      id: '2',
      title: 'Blood Sugar Check',
      description: 'Monitor glucose levels after breakfast',
      time: '09:30',
      frequency: 'daily',
      method: 'sms',
      isActive: true,
      nextDue: new Date(Date.now() + 7200000)
    },
    {
      id: '3',
      title: 'Doctor Appointment',
      description: 'Cardiology checkup with Dr. Sharma',
      time: '14:00',
      frequency: 'once',
      method: 'whatsapp',
      isActive: true,
      nextDue: new Date(Date.now() + 604800000)
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
    frequency: 'daily' as const,
    method: 'both' as const,
    phoneNumber: '+91'
  });

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id ? { ...reminder, isActive: !reminder.isActive } : reminder
    ));
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  const editReminder = (reminder: Reminder) => {
    setFormData({
      title: reminder.title,
      description: reminder.description,
      time: reminder.time,
      frequency: reminder.frequency,
      method: reminder.method,
      phoneNumber: '+91'
    });
    setEditingId(reminder.id);
    setShowForm(true);
  };

  const saveReminder = () => {
    if (!formData.title || !formData.time) return;

    const reminder: Reminder = {
      id: editingId || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      time: formData.time,
      frequency: formData.frequency,
      method: formData.method,
      isActive: true,
      nextDue: new Date()
    };

    if (editingId) {
      setReminders(prev => prev.map(r => r.id === editingId ? reminder : r));
    } else {
      setReminders(prev => [reminder, ...prev]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      time: '',
      frequency: 'daily',
      method: 'both',
      phoneNumber: '+91'
    });
    setShowForm(false);
    setEditingId(null);
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'daily':
        return 'bg-blue-100 text-blue-800';
      case 'weekly':
        return 'bg-green-100 text-green-800';
      case 'monthly':
        return 'bg-purple-100 text-purple-800';
      case 'once':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'sms':
        return <Phone className="w-4 h-4" />;
      case 'whatsapp':
        return <MessageSquare className="w-4 h-4" />;
      case 'both':
        return (
          <div className="flex space-x-1">
            <Phone className="w-3 h-3" />
            <MessageSquare className="w-3 h-3" />
          </div>
        );
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Bell className="w-7 h-7 mr-3 text-blue-600" />
              Health Reminders
            </h1>
            <p className="text-gray-600 mt-1">Set up SMS and WhatsApp reminders for medications and appointments</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Reminder</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {reminders.filter(r => r.isActive).length}
              </p>
              <p className="text-sm text-gray-500">Active Reminders</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {reminders.filter(r => r.frequency === 'daily').length}
              </p>
              <p className="text-sm text-gray-500">Daily Reminders</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {reminders.filter(r => r.method === 'whatsapp' || r.method === 'both').length}
              </p>
              <p className="text-sm text-gray-500">WhatsApp Alerts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reminder Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {editingId ? 'Edit Reminder' : 'Create New Reminder'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Take morning medication"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Additional details..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="once">Once</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notification Method</label>
                <select
                  value={formData.method}
                  onChange={(e) => setFormData(prev => ({ ...prev, method: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="sms">SMS Only</option>
                  <option value="whatsapp">WhatsApp Only</option>
                  <option value="both">Both SMS & WhatsApp</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3 mt-6">
            <button
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={saveReminder}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingId ? 'Update' : 'Create'} Reminder
            </button>
          </div>
        </div>
      )}

      {/* Reminders List */}
      <div className="space-y-4">
        {reminders.map((reminder) => (
          <div key={reminder.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  reminder.isActive ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <Bell className={`w-6 h-6 ${reminder.isActive ? 'text-green-600' : 'text-gray-400'}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{reminder.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFrequencyColor(reminder.frequency)}`}>
                      {reminder.frequency}
                    </span>
                    <div className="flex items-center space-x-1 text-gray-500">
                      {getMethodIcon(reminder.method)}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-2">{reminder.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{reminder.time}</span>
                    </div>
                    <span>Next: {reminder.nextDue.toLocaleDateString('en-IN')}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleReminder(reminder.id)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    reminder.isActive 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {reminder.isActive ? 'Active' : 'Inactive'}
                </button>
                
                <button
                  onClick={() => editReminder(reminder)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => deleteReminder(reminder.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Integration Info */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">SMS Integration</h4>
                <p className="text-gray-600 text-sm">Reliable text message reminders via telecom networks</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">WhatsApp Alerts</h4>
                <p className="text-gray-600 text-sm">Rich media reminders with health tips and images</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Smart Scheduling</h4>
                <p className="text-gray-600 text-sm">Automatic reminder timing based on your timezone</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Privacy First</h4>
                <p className="text-gray-600 text-sm">Your health data is encrypted and never shared</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}