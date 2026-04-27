import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { getTranslation } from '../utils/translations';
import { Mic, Search, CalendarClock, ShieldCheck, Download, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Mock target date for next election phase
  const targetDate = new Date('2029-04-15T08:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="card text-center mb-8 bg-gradient-to-br from-[var(--saffron)]/10 via-[var(--bg-secondary)] to-[var(--green)]/10">
      <h3 className="text-xl font-bold mb-4 flex justify-center items-center gap-2">
        <CalendarClock className="text-saffron" />
        General Elections 2029
      </h3>
      <div className="flex justify-center gap-4">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <div className="bg-[var(--bg-secondary)] border-2 border-[var(--saffron)] text-2xl font-bold rounded-lg w-16 h-16 flex items-center justify-center shadow-lg">
              {value}
            </div>
            <span className="text-xs uppercase mt-2 font-medium text-[var(--text-secondary)]">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const VoiceSearch = () => {
  const { language } = useAppContext();
  const [isListening, setIsListening] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Your browser does not support Voice Search.");
      return;
    }

    setIsListening(true);
    setResponse('');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      simulateResponse(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const simulateResponse = (q) => {
    const qLower = q.toLowerCase();
    if (qLower.includes('date') || qLower.includes('कब')) {
      setResponse("The General Elections are expected around April-May 2029.");
    } else if (qLower.includes('booth') || qLower.includes('केंद्र')) {
      setResponse("You can find your polling booth in the Constituency tab using your location.");
    } else {
      setResponse("I'm sorry, I didn't understand. Please check our Voter Services or FAQ.");
    }
  };

  return (
    <div className="card mb-8 animate-float shadow-[0_10px_40px_-10px_rgba(255,153,51,0.2)] border-[var(--saffron)]/30 border-2">
      <div className="flex flex-col items-center p-4">
        <h3 className="text-lg font-semibold mb-4 text-center">
          {getTranslation(language, 'voice_query')}
        </h3>
        <div className="flex w-full max-w-md gap-3">
          <input
            type="text"
            className="input-field flex-1 pl-5 rounded-full py-3 shadow-inner"
            placeholder="Try 'When is my voting date?'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={startListening}
            className={`p-3 rounded-full transition-all text-white hover:scale-110 flex items-center justify-center shrink-0 ${isListening ? 'animate-pulse' : ''}`}
            style={{ width: '52px', height: '52px', backgroundColor: isListening ? '#ef4444' : 'var(--navy)', boxShadow: '0 4px 14px rgba(0,0,128,0.3)' }}
          >
            {isListening ? <Mic className="animate-bounce" size={24} /> : <Mic size={24} />}
          </button>
        </div>
        {response && (
          <div className="mt-4 p-3 bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-lg text-sm w-full max-w-md text-center border border-green-200 dark:border-green-800">
            {response}
          </div>
        )}
      </div>
    </div>
  );
};

const QuickLinks = () => {
  const { language } = useAppContext();

  const links = [
    { to: "/services", icon: <ShieldCheck size={24} className="text-saffron" />, label: "check_status", desc: "Verify your name in the electoral roll" },
    { to: "/constituency", icon: <MapPin size={24} className="text-green" />, label: "find_booth", desc: "Locate your nearest polling station" },
    { to: "/timeline", icon: <CalendarClock size={24} className="text-navy" />, label: "timeline", desc: "Track all election phases" },
    { to: "/evm-demo", icon: <Download size={24} className="text-saffron" />, label: "evm_demo", desc: "Learn how to cast your vote" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {links.map((link, idx) => (
        <Link to={link.to} key={idx} className="card hover:border-[var(--saffron)] transition-colors group flex flex-col items-center text-center">
          <div className="p-3 bg-[var(--bg-primary)] rounded-full mb-3 group-hover:scale-110 transition-transform shadow-sm border border-[var(--border-color)]">
            {link.icon}
          </div>
          <h4 className="font-semibold mb-1">{getTranslation(language, link.label)}</h4>
          <p className="text-xs text-[var(--text-secondary)]">{link.desc}</p>
        </Link>
      ))}
    </div>
  );
};

const Home = () => {
  const { language } = useAppContext();

  return (
    <>
      <div className="animate-fadeIn">
        <div className="text-center mb-10 mt-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--saffron)] via-orange-400 to-[var(--green)]">Chunav Saathi</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Your comprehensive digital companion for the Indian democratic process.
            Stay informed, prepared, and ready to make your vote count.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <VoiceSearch />
          <CountdownTimer />

          <h2 className="text-2xl font-bold mb-6 mt-12 border-l-4 border-[var(--saffron)] pl-3">
            Quick Access
          </h2>
          <QuickLinks />
        </div>
      </div>
    </>
  );
};

export default Home;
