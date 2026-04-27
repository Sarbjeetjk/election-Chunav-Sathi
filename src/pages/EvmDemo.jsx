import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Info } from 'lucide-react';

const EvmDemo = () => {
  const [step, setStep] = useState(0);
  const [votedCandidate, setVotedCandidate] = useState(null);
  const [vvpatSlip, setVvpatSlip] = useState(false);

  const mockCandidates = [
    { id: 1, name: "Candidate A", symbol: "Lotus (Mock)" },
    { id: 2, name: "Candidate B", symbol: "Hand (Mock)" },
    { id: 3, name: "Candidate C", symbol: "Broom (Mock)" },
    { id: 4, name: "NOTA", symbol: "None of the above" },
  ];

  const handleVote = (candidate) => {
    if (step === 1) {
      setVotedCandidate(candidate);
      setStep(2);
      
      // Simulate VVPAT
      setTimeout(() => {
        setVvpatSlip(true);
        setTimeout(() => {
          setStep(3);
        }, 7000); // Slip shows for 7 seconds
      }, 1000);
    }
  };

  const resetDemo = () => {
    setStep(0);
    setVotedCandidate(null);
    setVvpatSlip(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Interactive EVM-VVPAT Demo</h2>
        <p className="text-[var(--text-secondary)]">Learn how to cast your vote correctly and verify it using the VVPAT machine.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Instructions Panel */}
        <div className="card">
          <h3 className="text-xl font-bold mb-6">Voting Process</h3>
          
          <div className="space-y-8">
            <div className={`p-6 rounded-lg border-2 transition-all ${step === 0 ? 'border-[var(--saffron)] bg-[var(--saffron)]/10' : 'border-[var(--border-color)] opacity-50'}`}>
              <h4 className="font-bold flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--saffron)] text-white flex items-center justify-center text-sm">1</span>
                Identity Verification
              </h4>
              <p className="text-sm mt-2">Polling officer verifies your ID and applies indelible ink. You receive a voter slip.</p>
              {step === 0 && <button onClick={() => setStep(1)} className="btn btn-primary mt-3 text-sm">Proceed to Voting Compartment</button>}
            </div>

            <div className={`p-6 rounded-lg border-2 transition-all ${step === 1 ? 'border-[var(--saffron)] bg-[var(--saffron)]/10' : 'border-[var(--border-color)] opacity-50'}`}>
              <h4 className="font-bold flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--saffron)] text-white flex items-center justify-center text-sm">2</span>
                Cast Your Vote
              </h4>
              <p className="text-sm mt-2">Press the blue button on the Ballot Unit against the candidate of your choice. The red light will glow.</p>
            </div>

            <div className={`p-6 rounded-lg border-2 transition-all ${step === 2 ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-[var(--border-color)] opacity-50'}`}>
              <h4 className="font-bold flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">3</span>
                Verify on VVPAT
              </h4>
              <p className="text-sm mt-2">Check the VVPAT window. A printed slip will appear for 7 seconds showing your chosen candidate's serial number, name, and symbol.</p>
            </div>

            {step === 3 && (
              <div className="p-6 rounded-lg border-2 border-green-500 bg-green-50 dark:bg-green-900/20 text-center animate-fadeIn">
                <CheckCircle2 size={48} className="text-green-500 mx-auto mb-2" />
                <h4 className="font-bold text-lg text-green-700 dark:text-green-400">Voting Complete!</h4>
                <p className="text-sm mt-2">Your vote has been recorded successfully. A loud beep from the Control Unit confirms it.</p>
                <button onClick={resetDemo} className="btn btn-outline mt-4">Restart Demo</button>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Machine */}
        <div className="flex flex-col items-center justify-center gap-12 bg-gray-100 dark:bg-gray-800 p-8 rounded-xl border-4 border-gray-300 dark:border-gray-700">
          
          {/* VVPAT Machine */}
          <div className="w-64 bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-xl border-2 border-gray-400 dark:border-gray-600 relative">
            <div className="text-center font-bold mb-2 text-xs text-gray-500 dark:text-gray-400">VVPAT</div>
            <div className="bg-black h-32 rounded flex items-center justify-center relative overflow-hidden">
              {vvpatSlip && votedCandidate && (
                <div className="w-48 h-24 bg-white animate-slideDown absolute top-0 p-2 shadow-inner border border-gray-300 flex flex-col justify-center text-black">
                  <p className="font-bold border-b border-black text-center mb-1 pb-1 text-sm">{votedCandidate.name}</p>
                  <p className="text-xs text-center">{votedCandidate.symbol}</p>
                </div>
              )}
            </div>
            {step === 2 && !vvpatSlip && (
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white animate-pulse text-xs">Printing...</div>
            )}
          </div>

          {/* Ballot Unit (EVM) */}
          <div className="w-72 bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-xl border-2 border-gray-400 dark:border-gray-600">
             <div className="text-center font-bold mb-4 text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center px-2">
                <span>Ready Light</span>
                <div className={`w-3 h-3 rounded-full ${step === 1 ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-gray-500'}`}></div>
             </div>
             
             <div className="space-y-4">
               {mockCandidates.map((candidate) => (
                 <div key={candidate.id} className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded border border-gray-300 dark:border-gray-600">
                   <div className="w-6 text-center font-bold">{candidate.id}</div>
                   <div className="flex-1 font-semibold text-sm truncate">{candidate.name}</div>
                   <div className={`w-3 h-3 rounded-full mx-2 transition-all ${votedCandidate?.id === candidate.id ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-red-900'}`}></div>
                   <button 
                     onClick={() => handleVote(candidate)}
                     disabled={step !== 1}
                     className={`w-8 h-8 rounded-full border-4 border-gray-400 shadow-md transition-all ${step === 1 ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer active:scale-95' : 'bg-blue-800 cursor-not-allowed opacity-50'}`}
                   ></button>
                 </div>
               ))}
             </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default EvmDemo;
