import React, { useState } from 'react';
import { Search, Download, HeartPulse, CheckCircle, AlertTriangle } from 'lucide-react';

const VoterServices = () => {
  const [epicNumber, setEpicNumber] = useState('');
  const [status, setStatus] = useState(null);
  
  const handleCheckStatus = (e) => {
    e.preventDefault();
    if (epicNumber.length > 5) {
      setStatus({ valid: true, message: "Voter found in Electoral Roll. Status: Active" });
    } else {
      setStatus({ valid: false, message: "EPIC Number not found. Please try again." });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Voter Services</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Registration Check */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Search className="text-saffron" />
            Check Registration Status
          </h3>
          <form onSubmit={handleCheckStatus}>
            <div className="input-group">
              <label>Enter EPIC Number (Voter ID)</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. ABC1234567"
                value={epicNumber}
                onChange={(e) => setEpicNumber(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">Search</button>
          </form>
          
          {status && (
            <div className={`mt-4 p-3 rounded-lg border flex items-start gap-2 ${
              status.valid ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              {status.valid ? <CheckCircle size={20} className="shrink-0 mt-0.5" /> : <AlertTriangle size={20} className="shrink-0 mt-0.5" />}
              <p className="text-sm font-medium">{status.message}</p>
            </div>
          )}
        </div>

        {/* E-EPIC Download */}
        <div className="card flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Download className="text-green" />
              Download e-EPIC
            </h3>
            <p className="text-[var(--text-secondary)] mb-4">
              Get a digital copy of your Voter ID card instantly. Valid as a proof of identity for voting.
            </p>
          </div>
          <button className="btn btn-outline w-full border-green-500 text-green-700 hover:bg-green-500 hover:text-white dark:text-green-400">
            <Download size={18} className="mr-2" /> Download Now
          </button>
        </div>
      </div>

      {/* PwD & Senior Citizens */}
      <div className="card bg-gradient-to-r from-[var(--bg-primary)] to-[var(--saffron)]/10 border-l-4 border-l-[var(--saffron)]">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <HeartPulse className="text-red-500" />
          Home Voting Eligibility Check
        </h3>
        <p className="text-[var(--text-secondary)] mb-4">
          Senior citizens (85+ years) and Persons with Disabilities (PwD with 40% benchmark disability) can opt for voting from home.
        </p>
        
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="input-group">
            <label>Category</label>
            <select className="input-field">
              <option>Senior Citizen (85+)</option>
              <option>Person with Disability (PwD)</option>
              <option>Other / Not Applicable</option>
            </select>
          </div>
          <div className="flex items-end">
            <button type="button" className="btn btn-secondary w-full mb-4">Check Eligibility</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoterServices;
