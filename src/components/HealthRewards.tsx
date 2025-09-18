import React, { useState } from 'react';
import { Trophy, Star, Gift, Target, Calendar, Award } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'daily' | 'weekly' | 'monthly' | 'special';
  isCompleted: boolean;
  progress: number;
  maxProgress: number;
  icon: string;
}

export function HealthRewards() {
  const [currentPoints] = useState(850);
  const [currentLevel] = useState(5);
  const [pointsToNextLevel] = useState(150);

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Daily Health Check',
      description: 'Complete 7 consecutive daily health check-ins',
      points: 100,
      category: 'weekly',
      isCompleted: true,
      progress: 7,
      maxProgress: 7,
      icon: '✅'
    },
    {
      id: '2',
      title: 'Exercise Streak',
      description: 'Exercise for 5 days in a row',
      points: 150,
      category: 'weekly',
      isCompleted: false,
      progress: 3,
      maxProgress: 5,
      icon: '💪'
    },
    {
      id: '3',
      title: 'Medication Adherence',
      description: 'Take medications on time for 30 days',
      points: 300,
      category: 'monthly',
      isCompleted: false,
      progress: 22,
      maxProgress: 30,
      icon: '💊'
    },
    {
      id: '4',
      title: 'Health Champion',
      description: 'Help 3 community members with health tips',
      points: 200,
      category: 'special',
      isCompleted: false,
      progress: 1,
      maxProgress: 3,
      icon: '🌟'
    },
    {
      id: '5',
      title: 'Symptom Tracker',
      description: 'Log symptoms for 14 consecutive days',
      points: 120,
      category: 'weekly',
      isCompleted: false,
      progress: 8,
      maxProgress: 14,
      icon: '📊'
    },
    {
      id: '6',
      title: 'Vaccination Hero',
      description: 'Complete all scheduled vaccinations',
      points: 250,
      category: 'special',
      isCompleted: true,
      progress: 3,
      maxProgress: 3,
      icon: '🛡️'
    }
  ]);

  const rewards = [
    {
      id: '1',
      name: 'Health Certificate',
      description: 'Digital health achievement certificate',
      cost: 500,
      category: 'recognition'
    },
    {
      id: '2',
      name: 'Free Health Consultation',
      description: '15-minute video call with a doctor',
      cost: 800,
      category: 'service'
    },
    {
      id: '3',
      name: 'Medication Reminder Plus',
      description: 'Premium reminder features for 3 months',
      cost: 300,
      category: 'feature'
    },
    {
      id: '4',
      name: 'Health Report Analysis',
      description: 'AI-powered detailed analysis of your reports',
      cost: 600,
      category: 'service'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'daily':
        return 'bg-blue-100 text-blue-800';
      case 'weekly':
        return 'bg-green-100 text-green-800';
      case 'monthly':
        return 'bg-purple-100 text-purple-800';
      case 'special':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRewardCategoryColor = (category: string) => {
    switch (category) {
      case 'recognition':
        return 'bg-yellow-100 text-yellow-800';
      case 'service':
        return 'bg-blue-100 text-blue-800';
      case 'feature':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Trophy className="w-7 h-7 mr-3 text-yellow-500" />
              Health Rewards
            </h1>
            <p className="text-gray-600 mt-1">Earn points for healthy habits and unlock rewards</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-yellow-600">{currentPoints}</p>
            <p className="text-sm text-gray-500">Total Points</p>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">Level {currentLevel}</p>
              <p className="text-yellow-100">Current Level</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {currentLevel + 1}</span>
              <span>{currentPoints - (currentLevel - 1) * 200}/{pointsToNextLevel}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full" 
                style={{ width: `${((currentPoints - (currentLevel - 1) * 200) / pointsToNextLevel) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {achievements.filter(a => a.isCompleted).length}
              </p>
              <p className="text-sm text-gray-500">Achievements Unlocked</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">7</p>
              <p className="text-sm text-gray-500">Day Streak</p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-purple-600" />
          Achievements
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`relative p-4 border-2 rounded-xl transition-all ${
                achievement.isCompleted 
                  ? 'border-green-300 bg-green-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`text-2xl ${achievement.isCompleted ? 'opacity-100' : 'opacity-60'}`}>
                  {achievement.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-semibold ${achievement.isCompleted ? 'text-green-900' : 'text-gray-900'}`}>
                      {achievement.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(achievement.category)}`}>
                      {achievement.category}
                    </span>
                  </div>
                  
                  <p className={`text-sm mb-3 ${achievement.isCompleted ? 'text-green-700' : 'text-gray-600'}`}>
                    {achievement.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.maxProgress}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          achievement.isCompleted ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className={`text-xs font-medium ${achievement.isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                      {achievement.points} points
                    </span>
                    {achievement.isCompleted && (
                      <div className="text-green-600 text-xs font-bold">COMPLETED!</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rewards Store */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Gift className="w-5 h-5 mr-2 text-pink-600" />
          Rewards Store
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((reward) => (
            <div key={reward.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{reward.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRewardCategoryColor(reward.category)}`}>
                  {reward.category}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-bold text-gray-900">{reward.cost} points</span>
                </div>
                
                <button 
                  disabled={currentPoints < reward.cost}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPoints >= reward.cost
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {currentPoints >= reward.cost ? 'Redeem' : 'Not Enough Points'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Challenges */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Challenges</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-purple-200">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">💧</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Stay Hydrated</h4>
                <p className="text-xs text-gray-500">Drink 8 glasses of water</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Progress: 6/8</div>
              <div className="text-sm font-bold text-blue-600">+50 pts</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-purple-200">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🚶</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Take a Walk</h4>
                <p className="text-xs text-gray-500">Walk for 20 minutes</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Progress: 15/20 min</div>
              <div className="text-sm font-bold text-green-600">+75 pts</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-purple-200">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🧘</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Mindful Moment</h4>
                <p className="text-xs text-gray-500">5 minutes of deep breathing</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Not started</div>
              <div className="text-sm font-bold text-orange-600">+40 pts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}