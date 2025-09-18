import React, { useState } from 'react';
import { Stethoscope, AlertTriangle, Info, ArrowRight, Phone } from 'lucide-react';

interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
}

interface Assessment {
  condition: string;
  probability: string;
  urgency: 'low' | 'medium' | 'high';
  advice: string;
  sources: string[];
}

export function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [currentStep, setCurrentStep] = useState<'symptoms' | 'assessment'>('symptoms');
  const [assessment, setAssessment] = useState<Assessment | null>(null);

  const commonSymptoms = [
    { id: '1', name: 'Fever', severity: 'moderate' as const },
    { id: '2', name: 'Headache', severity: 'mild' as const },
    { id: '3', name: 'Cough', severity: 'mild' as const },
    { id: '4', name: 'Shortness of breath', severity: 'severe' as const },
    { id: '5', name: 'Chest pain', severity: 'severe' as const },
    { id: '6', name: 'Nausea', severity: 'mild' as const },
    { id: '7', name: 'Fatigue', severity: 'mild' as const },
    { id: '8', name: 'Body aches', severity: 'mild' as const },
    { id: '9', name: 'Sore throat', severity: 'mild' as const },
    { id: '10', name: 'Dizziness', severity: 'moderate' as const },
    { id: '11', name: 'Abdominal pain', severity: 'moderate' as const },
    { id: '12', name: 'Rash', severity: 'mild' as const }
  ];

  const toggleSymptom = (symptom: Symptom) => {
    setSelectedSymptoms(prev => {
      const exists = prev.find(s => s.id === symptom.id);
      if (exists) {
        return prev.filter(s => s.id !== symptom.id);
      } else {
        return [...prev, symptom];
      }
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'severe':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const analyzeSymptoms = () => {
    // Simple rule-based assessment (in real app, this would be more sophisticated)
    const severeSymptoms = selectedSymptoms.filter(s => s.severity === 'severe');
    const moderateSymptoms = selectedSymptoms.filter(s => s.severity === 'moderate');
    
    let assessment: Assessment;
    
    if (severeSymptoms.length > 0) {
      assessment = {
        condition: 'Requires Immediate Medical Attention',
        probability: 'High Priority',
        urgency: 'high',
        advice: 'Your symptoms indicate a potentially serious condition. Please seek immediate medical attention or call emergency services (108).',
        sources: ['WHO Guidelines', 'Ministry of Health & Family Welfare']
      };
    } else if (moderateSymptoms.length >= 2) {
      assessment = {
        condition: 'Common Viral Infection (Possible)',
        probability: 'Moderate',
        urgency: 'medium',
        advice: 'Your symptoms suggest a possible viral infection. Monitor your symptoms, stay hydrated, and consult a healthcare provider if symptoms worsen.',
        sources: ['CDC Guidelines', 'Indian Medical Association']
      };
    } else {
      assessment = {
        condition: 'Minor Illness (Likely)',
        probability: 'Low',
        urgency: 'low',
        advice: 'Your symptoms appear to be mild. Rest, stay hydrated, and monitor your condition. Consult a doctor if symptoms persist or worsen.',
        sources: ['WHO Self-Care Guidelines', 'National Health Portal']
      };
    }
    
    setAssessment(assessment);
    setCurrentStep('assessment');
  };

  const resetAssessment = () => {
    setSelectedSymptoms([]);
    setAssessment(null);
    setCurrentStep('symptoms');
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-600 text-white';
      case 'medium':
        return 'bg-yellow-600 text-white';
      case 'low':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Stethoscope className="w-7 h-7 mr-3 text-blue-600" />
              Symptom Checker
            </h1>
            <p className="text-gray-600 mt-1">Get preliminary health assessment based on your symptoms</p>
          </div>
          {currentStep === 'assessment' && (
            <button 
              onClick={resetAssessment}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Start Over
            </button>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-amber-800 font-medium">Medical Disclaimer</p>
            <p className="text-amber-700 mt-1">
              This tool provides general health information only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a healthcare provider for medical concerns.
            </p>
          </div>
        </div>
      </div>

      {currentStep === 'symptoms' ? (
        <div className="space-y-6">
          {/* Symptom Selection */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Select Your Symptoms</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {commonSymptoms.map((symptom) => {
                const isSelected = selectedSymptoms.find(s => s.id === symptom.id);
                return (
                  <button
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      isSelected 
                        ? 'bg-blue-50 border-blue-300 shadow-md' 
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{symptom.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(symptom.severity)}`}>
                        {symptom.severity}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedSymptoms.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700">
                      <span className="font-medium">{selectedSymptoms.length}</span> symptoms selected
                    </p>
                    <p className="text-sm text-gray-500">Click analyze to get your health assessment</p>
                  </div>
                  <button
                    onClick={analyzeSymptoms}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <span>Analyze Symptoms</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
              <h3 className="text-lg font-bold text-red-900 mb-2 flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Emergency
              </h3>
              <p className="text-red-700 text-sm mb-4">
                If you're experiencing severe symptoms or a medical emergency
              </p>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors w-full font-medium">
                Call 108 (Emergency)
              </button>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Need Help?
              </h3>
              <p className="text-blue-700 text-sm mb-4">
                Chat with our AI assistant for personalized guidance
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full font-medium">
                Chat with AI
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Assessment Results
        <div className="space-y-6">
          {assessment && (
            <>
              {/* Assessment Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Health Assessment</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(assessment.urgency)}`}>
                    {assessment.urgency.charAt(0).toUpperCase() + assessment.urgency.slice(1)} Priority
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Possible Condition:</h3>
                    <p className="text-gray-700">{assessment.condition}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Recommendation:</h3>
                    <p className="text-gray-700 leading-relaxed">{assessment.advice}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Your Symptoms:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSymptoms.map((symptom) => (
                        <span
                          key={symptom.id}
                          className={`px-3 py-1 rounded-full text-sm border ${getSeverityColor(symptom.severity)}`}
                        >
                          {symptom.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Sources:</h3>
                    <div className="flex flex-wrap gap-2">
                      {assessment.sources.map((source, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assessment.urgency === 'high' && (
                  <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                    <h3 className="text-lg font-bold text-red-900 mb-2">Immediate Action Required</h3>
                    <p className="text-red-700 text-sm mb-4">Your symptoms require immediate medical attention</p>
                    <div className="space-y-2">
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors w-full font-medium">
                        Call Emergency (108)
                      </button>
                      <button className="bg-white text-red-600 border border-red-300 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors w-full font-medium">
                        Find Nearest Hospital
                      </button>
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Next Steps</h3>
                  <p className="text-blue-700 text-sm mb-4">Get more personalized guidance</p>
                  <div className="space-y-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full font-medium">
                      Consult Doctor Online
                    </button>
                    <button className="bg-white text-blue-600 border border-blue-300 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors w-full font-medium">
                      Chat with AI Assistant
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}