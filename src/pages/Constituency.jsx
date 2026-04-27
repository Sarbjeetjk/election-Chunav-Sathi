import React, { useState } from 'react';
import { MapPin, Navigation, Map } from 'lucide-react';

const Constituency = () => {
  const [pincode, setPincode] = useState('');
  const [locationData, setLocationData] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  const handlePincodeSearch = (e) => {
    e.preventDefault();
    if(pincode.length === 6) {
      setLocationData({
        parliamentary: "New Delhi (Mock)",
        assembly: "New Delhi Assembly (Mock)",
        booth: "NP Co-ed Senior Secondary School, Havlock Square"
      });
    }
  };

  const handleGeolocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setTimeout(() => {
            setLocationData({
              parliamentary: "South Delhi (Mock)",
              assembly: "Malviya Nagar (Mock)",
              booth: "Sarvodaya Vidyalaya, Block C"
            });
            setIsLocating(false);
          }, 1000);
        },
        (error) => {
          alert("Error getting location. Please use pincode.");
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
      setIsLocating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center flex justify-center items-center gap-3">
        <Map className="text-green" />
        Know Your Constituency
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Search by Pincode</h3>
          <form onSubmit={handlePincodeSearch} className="flex gap-2">
            <input 
              type="text" 
              className="input-field flex-1" 
              placeholder="Enter 6-digit Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g,'').slice(0,6))}
              maxLength={6}
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>

          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border-color)]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[var(--bg-secondary)] text-[var(--text-secondary)]">OR</span>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-4">Use Current Location</h3>
          <button 
            onClick={handleGeolocation} 
            disabled={isLocating}
            className="btn btn-outline w-full flex justify-center"
          >
            {isLocating ? (
              <span className="animate-pulse">Locating...</span>
            ) : (
              <>
                <Navigation size={18} className="mr-2 text-saffron" />
                Find Near Me
              </>
            )}
          </button>
        </div>

        {locationData ? (
          <div className="card border-[var(--green)]/50 border-2 bg-[var(--green)]/5 animate-fadeIn">
            <h3 className="text-xl font-bold mb-4 border-b border-[var(--border-color)] pb-2 text-green">
              Your Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Parliamentary Constituency</p>
                <p className="font-semibold text-lg">{locationData.parliamentary}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Assembly Constituency</p>
                <p className="font-semibold text-lg">{locationData.assembly}</p>
              </div>
              <div className="p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)] shadow-sm">
                <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1 mb-1">
                  <MapPin size={14} className="text-saffron" />
                  Nearest Polling Booth
                </p>
                <p className="font-bold">{locationData.booth}</p>
                <button className="text-saffron text-sm font-semibold mt-2 underline hover:text-saffron-dark">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="card flex flex-col items-center justify-center text-center text-[var(--text-secondary)] p-8 border-dashed">
            <MapPin size={48} className="mb-4 opacity-50" />
            <p>Enter your pincode or use geolocation to find your constituency and nearest polling booth.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Constituency;
