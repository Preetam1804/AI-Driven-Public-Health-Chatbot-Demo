import React from 'react';
import { Activity, Shield, Heart, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';

export function Dashboard() {
  const healthMetrics = [
    {
      title: 'Blood Pressure',
      value: '120/80',
      status: 'Normal',
      change: '-2%',
      color: 'green',
      icon: Activity
    },
    {
      title: 'Heart Rate',
      value: '72 BPM',
      status: 'Healthy',
      change: '+1%',
      color: 'blue',
      icon: Heart
    },
    {
      title: 'Next Checkup',
      value: '15 Days',
      status: 'Scheduled',
      change: '',
      color: 'purple',
      icon: Calendar
    },
    {
      title: 'Health Score',
      value: '8.5/10',
      status: 'Excellent',
      change: '+0.5',
      color: 'emerald',
      icon: TrendingUp
    }
  ];

  const recentAlerts = [
    {
      type: 'warning',
      message: 'Dengue cases reported in your area - take precautions',
      time: '2 hours ago'
    },
    {
      type: 'info',
      message: 'Flu vaccination reminder - due next week',
      time: '1 day ago'
    },
    {
      type: 'success',
      message: 'Completed 7-day exercise streak!',
      time: '2 days ago'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-blue-600 to-emerald-600 rounded-3xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
        <p className="text-blue-100 text-lg">Here's your health overview for today</p>
        <div className="mt-6 flex items-center space-x-4">
          <div className="bg-white/20 rounded-lg p-3">
            <span className="text-2xl">🌟</span>
          </div>
          <div>
            <p className="font-semibold">Today's Goal</p>
            <p className="text-blue-100">Complete your daily health checkup</p>
          </div>
        </div>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${metric.color}-100 rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${metric.color}-600`} />
                </div>
                {metric.change && (
                  <span className={`text-sm font-medium ${metric.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </span>
                )}
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
              <p className={`text-sm font-medium text-${metric.color}-600`}>{metric.status}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Alerts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Health Alerts */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
            Recent Alerts
          </h2>
          <div className="space-y-4">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.type === 'warning' ? 'bg-orange-500' :
                  alert.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-gray-900 text-sm">{alert.message}</p>
                  <p className="text-gray-500 text-xs mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-blue-50 rounded-xl text-left hover:bg-blue-100 transition-colors">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-2">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">Check Symptoms</h3>
              <p className="text-gray-500 text-xs">Quick health assessment</p>
            </button>
            
            <button className="p-4 bg-green-50 rounded-xl text-left hover:bg-green-100 transition-colors">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mb-2">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">Vaccination</h3>
              <p className="text-gray-500 text-xs">Schedule & reminders</p>
            </button>
            
            <button className="p-4 bg-purple-50 rounded-xl text-left hover:bg-purple-100 transition-colors">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mb-2">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">Exercise Plan</h3>
              <p className="text-gray-500 text-xs">Personalized fitness</p>
            </button>
            
            <button className="p-4 bg-orange-50 rounded-xl text-left hover:bg-orange-100 transition-colors">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center mb-2">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">Book Checkup</h3>
              <p className="text-gray-500 text-xs">Find nearby clinics</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}