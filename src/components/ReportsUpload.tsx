import React, { useState } from 'react';
import { FileText, Upload, Eye, Download, Trash2, CheckCircle } from 'lucide-react';

interface MedicalReport {
  id: string;
  name: string;
  type: string;
  uploadDate: Date;
  size: string;
  status: 'processing' | 'analyzed' | 'error';
  aiSummary?: string;
}

export function ReportsUpload() {
  const [reports, setReports] = useState<MedicalReport[]>([
    {
      id: '1',
      name: 'Blood_Test_Report_Jan2025.pdf',
      type: 'Blood Test',
      uploadDate: new Date(Date.now() - 86400000),
      size: '2.4 MB',
      status: 'analyzed',
      aiSummary: 'Blood glucose levels are within normal range. Vitamin D deficiency detected - consider supplementation. Cholesterol levels are slightly elevated.'
    },
    {
      id: '2',
      name: 'ECG_Report_Dec2024.pdf',
      type: 'ECG',
      uploadDate: new Date(Date.now() - 2592000000),
      size: '1.8 MB',
      status: 'analyzed',
      aiSummary: 'Heart rhythm is normal. No signs of arrhythmia or other cardiac abnormalities detected in this ECG.'
    },
    {
      id: '3',
      name: 'Chest_Xray_Nov2024.jpg',
      type: 'X-Ray',
      uploadDate: new Date(Date.now() - 5184000000),
      size: '3.2 MB',
      status: 'processing'
    }
  ]);

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      const newReport: MedicalReport = {
        id: Date.now().toString(),
        name: file.name,
        type: getReportType(file.name),
        uploadDate: new Date(),
        size: formatFileSize(file.size),
        status: 'processing'
      };

      setReports(prev => [newReport, ...prev]);

      // Simulate processing
      setTimeout(() => {
        setReports(prev => prev.map(report => 
          report.id === newReport.id 
            ? { 
                ...report, 
                status: 'analyzed',
                aiSummary: 'Report uploaded successfully. AI analysis will be available shortly. Please consult with your healthcare provider for detailed interpretation.'
              }
            : report
        ));
      }, 3000);
    });
  };

  const getReportType = (filename: string): string => {
    const lower = filename.toLowerCase();
    if (lower.includes('blood') || lower.includes('lab')) return 'Blood Test';
    if (lower.includes('ecg') || lower.includes('ekg')) return 'ECG';
    if (lower.includes('xray') || lower.includes('x-ray')) return 'X-Ray';
    if (lower.includes('mri')) return 'MRI';
    if (lower.includes('ct') || lower.includes('scan')) return 'CT Scan';
    return 'Medical Report';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const deleteReport = (reportId: string) => {
    setReports(prev => prev.filter(report => report.id !== reportId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'analyzed':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <div className="animate-spin w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full"></div>;
      case 'analyzed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <div className="w-4 h-4 bg-red-600 rounded-full"></div>;
      default:
        return <div className="w-4 h-4 bg-gray-600 rounded-full"></div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <FileText className="w-7 h-7 mr-3 text-blue-600" />
              Medical Reports
            </h1>
            <p className="text-gray-600 mt-1">Upload and get AI analysis of your medical reports</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
            <p className="text-sm text-gray-500">Reports Uploaded</p>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Upload New Report</h2>
        
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            
            <div>
              <p className="text-lg font-semibold text-gray-900">
                Drag and drop your medical reports here
              </p>
              <p className="text-gray-500 mt-1">
                or click to browse files
              </p>
            </div>
            
            <div className="text-sm text-gray-500">
              <p>Supported formats: PDF, JPG, PNG, DOC, DOCX</p>
              <p>Maximum file size: 10MB</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5">⚠️</div>
            <div className="text-sm">
              <p className="text-amber-800 font-medium">Privacy & Security</p>
              <p className="text-amber-700 mt-1">
                Your medical reports are encrypted and processed securely. AI analysis is for informational purposes only and doesn't replace professional medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      {reports.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Your Reports</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {reports.map((report) => (
              <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-semibold text-gray-900">{report.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)} flex items-center space-x-1`}>
                          {getStatusIcon(report.status)}
                          <span className="capitalize">{report.status}</span>
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{report.type}</span>
                        <span>{report.size}</span>
                        <span>{report.uploadDate.toLocaleDateString('en-IN')}</span>
                      </div>
                      
                      {report.aiSummary && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm font-medium text-blue-900 mb-1">AI Analysis Summary:</p>
                          <p className="text-sm text-blue-800">{report.aiSummary}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteReport(report.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Features */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">AI-Powered Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">🧠</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Smart Analysis</h4>
              <p className="text-gray-600 text-sm">AI extracts key insights from your reports</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">📊</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Trend Tracking</h4>
              <p className="text-gray-600 text-sm">Monitor health metrics over time</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">💡</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Recommendations</h4>
              <p className="text-gray-600 text-sm">Get personalized health suggestions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}