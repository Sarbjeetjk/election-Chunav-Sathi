import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingAssistant from './components/FloatingAssistant';
import Home from './pages/Home';
import VoterServices from './pages/VoterServices';
import Constituency from './pages/Constituency';
import Timeline from './pages/Timeline';
import Candidates from './pages/Candidates';
import EvmDemo from './pages/EvmDemo';
import Quiz from './pages/Quiz';
import SmartAssistant from './components/SmartAssistant';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen relative">
        <div className="flag-gradient-top"></div>
        <Navbar />
        <main className="flex-1 mt-16 container py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<VoterServices />} />
            <Route path="/constituency" element={<Constituency />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/evm-demo" element={<EvmDemo />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/assistant" element={<SmartAssistant />} />
          </Routes>
        </main>
        <FloatingAssistant />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
