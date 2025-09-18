import React from 'react';
import { 
  MessageCircle, 
  Activity, 
  Shield, 
  Calendar, 
  Heart, 
  Users, 
  FileText, 
  Bell, 
  Trophy,
  Phone,
  Home,
  Stethoscope
} from 'lucide-react';

interface User {
  name: string;
  age: number;
  lastCheckup: string;
  language: string;
}

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  user: User;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'chat', label: 'AI Assistant', icon: MessageCircle },
  { id: 'symptoms', label: 'Symptom Checker', icon: Stethoscope },
  { id: 'vaccinations', label: 'Vaccinations', icon: Shield },
  { id: 'alerts', label: 'Health Alerts', icon: Activity },
  { id: 'exercise', label: 'Exercise Guide', icon: Heart },
  { id: 'forum', label: 'Community', icon: Users },
  { id: 'reports', label: 'Upload Reports', icon: FileText },
  { id: 'reminders', label: 'Reminders', icon: Bell },
  { id: 'rewards', label: 'Health Rewards', icon: Trophy },
];

export function Sidebar({ activeSection, setActiveSection, user }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-80 bg-white/80 backdrop-blur-lg border-r border-white/20 shadow-sm z-40">
      <div className="p-6">
        {/* User Profile Card */}
        <div className="bg-gradient-to-br from-blue-600 to-emerald-600 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">👤</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-blue-100 text-sm">Age: {user.age}</p>
              <p className="text-blue-100 text-sm">Last Checkup: {user.lastCheckup}</p>
            </div>
          </div>
          
          {/* Health Score */}
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-100">Health Score</span>
              <span className="text-lg font-bold">8.5/10</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
              <div className="bg-white h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Emergency Contact */}
        <div className="mt-8 p-4 bg-red-50 rounded-xl border border-red-100">
          <h4 className="text-red-800 font-semibold mb-2">Emergency</h4>
          <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>Call 108</span>
          </button>
        </div>

        {/* WhatsApp Integration */}
        <div className="mt-4">
          <a
            href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20health%20assistance"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </aside>
  );
}