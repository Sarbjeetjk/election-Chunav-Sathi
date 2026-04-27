import React, { useState } from 'react';
import { User, Scale, Banknote, AlertTriangle } from 'lucide-react';

const Candidates = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const mockCandidates = [
    {
      id: 1,
      name: "Rajesh Kumar",
      party: "National Democratic Party",
      age: 45,
      education: "M.A. Political Science",
      assets: "₹ 5.2 Crores",
      liabilities: "₹ 45 Lakhs",
      criminalCases: 0,
      color: "bg-orange-500",
    },
    {
      id: 2,
      name: "Priya Sharma",
      party: "United Progressive Front",
      age: 38,
      education: "L.L.B.",
      assets: "₹ 2.1 Crores",
      liabilities: "₹ 12 Lakhs",
      criminalCases: 1,
      color: "bg-blue-500",
    },
    {
      id: 3,
      name: "Amit Patel",
      party: "Independent",
      age: 52,
      education: "B.Com",
      assets: "₹ 12.5 Crores",
      liabilities: "₹ 2.3 Crores",
      criminalCases: 0,
      color: "bg-gray-500",
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Know Your Candidates</h2>
        <p className="text-[var(--text-secondary)]">Compare candidate affidavits, assets, and criminal records to make an informed choice.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {mockCandidates.map((candidate) => (
          <div 
            key={candidate.id} 
            className={`card cursor-pointer border-2 transition-all ${
              selectedCandidate?.id === candidate.id ? 'border-[var(--saffron)] scale-[1.02]' : 'border-transparent'
            }`}
            onClick={() => setSelectedCandidate(candidate)}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-full ${candidate.color} flex items-center justify-center text-white font-bold text-xl`}>
                {candidate.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-lg">{candidate.name}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{candidate.party}</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm border-t border-[var(--border-color)] pt-3">
              <span className="flex items-center gap-1">
                <Banknote size={16} className="text-green" /> {candidate.assets}
              </span>
              <span className={`flex items-center gap-1 ${candidate.criminalCases > 0 ? 'text-red-500 font-bold' : 'text-green-600'}`}>
                {candidate.criminalCases > 0 ? <AlertTriangle size={16} /> : <CheckCircle size={16} />} 
                {candidate.criminalCases} Cases
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedCandidate && (
        <div className="card bg-[var(--bg-secondary)] border-[var(--saffron)]/30 animate-fadeIn shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-center border-b pb-4">Affidavit Summary: {selectedCandidate.name}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="text-[var(--saffron)] mt-1" />
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">Personal Details</p>
                  <p className="font-medium">Age: {selectedCandidate.age} years</p>
                  <p className="font-medium">Education: {selectedCandidate.education}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Scale className="text-red-500 mt-1" />
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">Criminal Records</p>
                  <p className={`font-bold ${selectedCandidate.criminalCases > 0 ? 'text-red-500' : 'text-green-600'}`}>
                    {selectedCandidate.criminalCases} Pending Cases
                  </p>
                  {selectedCandidate.criminalCases > 0 && (
                    <p className="text-xs text-[var(--text-secondary)] mt-1 border-l-2 border-red-500 pl-2">
                      Charges related to unlawful assembly (Section 144) - (Mock Data)
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Banknote className="text-[var(--green)] mt-1" />
                <div className="w-full">
                  <p className="text-sm text-[var(--text-secondary)]">Financial Assets</p>
                  <div className="flex justify-between items-center bg-green-50 dark:bg-green-900/20 p-2 rounded mb-2">
                    <span className="font-medium text-green-800 dark:text-green-400">Total Assets</span>
                    <span className="font-bold">{selectedCandidate.assets}</span>
                  </div>
                  <div className="flex justify-between items-center bg-red-50 dark:bg-red-900/20 p-2 rounded">
                    <span className="font-medium text-red-800 dark:text-red-400">Total Liabilities</span>
                    <span className="font-bold">{selectedCandidate.liabilities}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button className="btn btn-outline border-[var(--border-color)] text-sm">
              <Download size={16} className="mr-2" /> Download Original Affidavit (Form 26)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const CheckCircle = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
)

export default Candidates;
