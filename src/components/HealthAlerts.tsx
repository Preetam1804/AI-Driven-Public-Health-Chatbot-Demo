import React, { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, Calendar, Zap, Info, CheckCircle } from 'lucide-react';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  location: string;
  timestamp: Date;
  source: string;
  isRead: boolean;
}

export function HealthAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'critical',
      title: 'Dengue Outbreak Alert',
      message: 'High number of dengue cases reported in your district. Take immediate precautions - use mosquito nets, wear full sleeves, and remove standing water.',
      location: 'Bangalore Urban',
      timestamp: new Date(),
      source: 'Ministry of Health & Family Welfare',
      isRead: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'Seasonal Flu Advisory',
      message: 'Flu cases increasing due to weather changes. Get vaccinated and maintain hygiene. Vulnerable populations should take extra care.',
      location: 'Karnataka State',
      timestamp: new Date(Date.now() - 3600000),
      source: 'State Health Department',
      isRead: false
    },
    {
      id: '3',
      type: 'info',
      title: 'COVID-19 Vaccination Drive',
      message: 'Free COVID-19 booster shots available at nearby health centers. Senior citizens and immunocompromised individuals are prioritized.',
      location: 'All Districts',
      timestamp: new Date(Date.now() - 86400000),
      source: 'National Health Mission',
      isRead: true
    }
  ]);

  const markAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <Zap className="w-5 h-5 text-orange-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getAlertBorderColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'border-l-red-500 bg-red-50';
      case 'warning':
        return 'border-l-orange-500 bg-orange-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Health Alerts</h1>
            <p className="text-gray-600 mt-1">Real-time health advisories from government sources</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Last updated</p>
            <p className="font-semibold text-gray-900">
              {new Date().toLocaleDateString('en-IN', { 
                day: 'numeric', 
                month: 'short', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {alerts.filter(a => a.type === 'critical').length}
              </p>
              <p className="text-sm text-gray-500">Critical Alerts</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {alerts.filter(a => a.type === 'warning').length}
              </p>
              <p className="text-sm text-gray-500">Warnings</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {alerts.filter(a => a.type === 'info').length}
              </p>
              <p className="text-sm text-gray-500">Information</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 ${getAlertBorderColor(alert.type)} ${
              !alert.isRead ? 'ring-2 ring-blue-100' : ''
            } transition-all hover:shadow-md`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="flex-shrink-0 mt-1">
                  {getAlertIcon(alert.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                    {!alert.isRead && (
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-3">{alert.message}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {alert.timestamp.toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-400">
                    Source: {alert.source}
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 ml-4">
                {!alert.isRead && (
                  <button
                    onClick={() => markAsRead(alert.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark as read</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prevention Tips */}
      <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-6 border border-emerald-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Prevention Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">🦟</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Mosquito Control</h4>
              <p className="text-gray-600 text-sm">Remove standing water, use nets, wear protective clothing</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">🧼</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Hygiene</h4>
              <p className="text-gray-600 text-sm">Wash hands frequently, sanitize surfaces, avoid crowded places</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}