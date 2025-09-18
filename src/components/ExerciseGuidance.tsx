import React, { useState } from 'react';
import { Heart, Play, Pause, RotateCcw, Clock, Target } from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  duration: number; // in seconds
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'cardio' | 'strength' | 'flexibility' | 'balance';
  instructions: string[];
}

export function ExerciseGuidance() {
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const exercises: Exercise[] = [
    {
      id: '1',
      name: 'Gentle Walking',
      duration: 600, // 10 minutes
      description: 'Low-impact cardiovascular exercise perfect for daily health maintenance',
      difficulty: 'beginner',
      category: 'cardio',
      instructions: [
        'Start with 5 minutes of slow walking',
        'Gradually increase pace to comfortable level',
        'Maintain steady breathing',
        'Cool down with 2 minutes of slow walking'
      ]
    },
    {
      id: '2',
      name: 'Chair Exercises',
      duration: 300, // 5 minutes
      description: 'Safe seated exercises for seniors or those with mobility limitations',
      difficulty: 'beginner',
      category: 'strength',
      instructions: [
        'Sit straight in a sturdy chair',
        'Perform arm circles (10 each direction)',
        'Do seated marching in place (20 steps)',
        'Shoulder blade squeezes (10 reps)',
        'Deep breathing exercises (5 breaths)'
      ]
    },
    {
      id: '3',
      name: 'Simple Stretching',
      duration: 480, // 8 minutes
      description: 'Basic stretches to improve flexibility and reduce stiffness',
      difficulty: 'beginner',
      category: 'flexibility',
      instructions: [
        'Neck rolls (5 each direction)',
        'Shoulder shrugs (10 reps)',
        'Gentle spinal twists (5 each side)',
        'Ankle circles (10 each direction)',
        'Deep breathing and relaxation'
      ]
    },
    {
      id: '4',
      name: 'Balance Training',
      duration: 360, // 6 minutes
      description: 'Improve stability and prevent falls with simple balance exercises',
      difficulty: 'intermediate',
      category: 'balance',
      instructions: [
        'Stand behind a chair for support',
        'Single leg stands (30 seconds each)',
        'Heel-to-toe walking (10 steps)',
        'Side leg raises (10 each side)',
        'Gentle cool down stretches'
      ]
    }
  ];

  const startExercise = (exercise: Exercise) => {
    setActiveExercise(exercise);
    setTimeRemaining(exercise.duration);
    setCurrentStep(0);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetExercise = () => {
    if (activeExercise) {
      setTimeRemaining(activeExercise.duration);
      setCurrentStep(0);
      setIsPlaying(false);
    }
  };

  const stopExercise = () => {
    setActiveExercise(null);
    setIsPlaying(false);
    setTimeRemaining(0);
    setCurrentStep(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cardio':
        return 'bg-red-100 text-red-800';
      case 'strength':
        return 'bg-blue-100 text-blue-800';
      case 'flexibility':
        return 'bg-purple-100 text-purple-800';
      case 'balance':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Timer effect
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Heart className="w-7 h-7 mr-3 text-red-500" />
              Exercise Guidance
            </h1>
            <p className="text-gray-600 mt-1">Safe, age-appropriate exercises for better health</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">68</p>
            <p className="text-sm text-gray-500">Your Age</p>
          </div>
        </div>
      </div>

      {/* Active Exercise Session */}
      {activeExercise && (
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{activeExercise.name}</h2>
            <button 
              onClick={stopExercise}
              className="bg-white/20 text-white px-3 py-1 rounded-lg hover:bg-white/30 transition-colors text-sm"
            >
              Stop
            </button>
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">{formatTime(timeRemaining)}</div>
              <div className="text-blue-100">Time remaining</div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={togglePlayPause}
              className="bg-white text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center space-x-2 font-semibold"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            
            <button
              onClick={resetExercise}
              className="bg-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-colors flex items-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </button>
          </div>
          
          <div className="bg-white/10 rounded-xl p-4">
            <h3 className="font-semibold mb-3">Instructions:</h3>
            <div className="space-y-2">
              {activeExercise.instructions.map((instruction, index) => (
                <div 
                  key={index} 
                  className={`flex items-center space-x-3 ${currentStep === index ? 'text-yellow-300' : 'text-blue-100'}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentStep === index ? 'bg-yellow-400 text-gray-900' : 'bg-white/20'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-sm">{instruction}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Exercise Cards */}
      {!activeExercise && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{exercise.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{exercise.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                  {exercise.difficulty}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(exercise.category)}`}>
                  {exercise.category}
                </span>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  {Math.floor(exercise.duration / 60)}m
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                {exercise.instructions.slice(0, 3).map((instruction, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                    </div>
                    <span className="text-sm text-gray-600">{instruction}</span>
                  </div>
                ))}
                {exercise.instructions.length > 3 && (
                  <div className="text-xs text-gray-500 ml-6">
                    +{exercise.instructions.length - 3} more steps
                  </div>
                )}
              </div>
              
              <button
                onClick={() => startExercise(exercise)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-semibold"
              >
                <Play className="w-4 h-4" />
                <span>Start Exercise</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Health Benefits */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Health Benefits of Regular Exercise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Heart Health</h4>
                <p className="text-gray-600 text-sm">Improves cardiovascular function and reduces blood pressure</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Better Balance</h4>
                <p className="text-gray-600 text-sm">Reduces risk of falls and improves mobility</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">💪</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Muscle Strength</h4>
                <p className="text-gray-600 text-sm">Maintains muscle mass and bone density</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">🧠</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Mental Health</h4>
                <p className="text-gray-600 text-sm">Reduces stress and improves cognitive function</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Guidelines */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Safety First</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-amber-600 rounded-full mt-1.5"></div>
            <p>Always consult your doctor before starting any new exercise program</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-amber-600 rounded-full mt-1.5"></div>
            <p>Stop immediately if you feel chest pain, dizziness, or shortness of breath</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-amber-600 rounded-full mt-1.5"></div>
            <p>Start slowly and gradually increase intensity over time</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-amber-600 rounded-full mt-1.5"></div>
            <p>Stay hydrated and exercise in a safe, comfortable environment</p>
          </div>
        </div>
      </div>
    </div>
  );
}