import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ChatInterface } from './components/ChatInterface';
import { HealthAlerts } from './components/HealthAlerts';
import { VaccinationScheduler } from './components/VaccinationScheduler';
import { SymptomChecker } from './components/SymptomChecker';
import { CommunityForum } from './components/CommunityForum';
import { ReportsUpload } from './components/ReportsUpload';
import { HealthReminders } from './components/HealthReminders';
import { ExerciseGuidance } from './components/ExerciseGuidance';
import { HealthRewards } from './components/HealthRewards';

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [user] = useState({
    name: 'John Doe',
    age: 68,
    lastCheckup: 'Aug 2025',
    language: 'en'
  });

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'chat':
        return <ChatInterface />;
      case 'alerts':
        return <HealthAlerts />;
      case 'vaccinations':
        return <VaccinationScheduler />;
      case 'symptoms':
        return <SymptomChecker />;
      case 'forum':
        return <CommunityForum />;
      case 'reports':
        return <ReportsUpload />;
      case 'reminders':
        return <HealthReminders />;
      case 'exercise':
        return <ExerciseGuidance />;
      case 'rewards':
        return <HealthRewards />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <Header user={user} />
      
      <div className="flex">
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          user={user}
        />
        
        <main className="flex-1 p-6 ml-80">
          <div className="max-w-7xl mx-auto">
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </div>
  );
}