import React from 'react';
import { Calendar, Flag, ShieldAlert, CheckCircle2 } from 'lucide-react';

const Timeline = () => {
  const events = [
    { date: "March 15, 2029", title: "Election Notification", desc: "Official announcement and enforcement of MCC", icon: <Flag className="text-saffron" size={20} /> },
    { date: "April 5, 2029", title: "Last Date for Nominations", desc: "Deadline for candidates to file papers", icon: <Calendar className="text-navy" size={20} /> },
    { date: "April 20, 2029", title: "Phase 1 Voting", desc: "First phase of polling begins", icon: <CheckCircle2 className="text-green" size={20} /> },
    { date: "May 15, 2029", title: "Final Phase Voting", desc: "Conclusion of all polling phases", icon: <CheckCircle2 className="text-green" size={20} /> },
    { date: "May 23, 2029", title: "Counting of Votes", desc: "Results declaration", icon: <Flag className="text-saffron" size={20} /> },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Election Timeline & MCC</h2>
        <p className="text-[var(--text-secondary)]">Understand the schedule and the rules of the democratic process.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Timeline */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-6 border-b pb-2">Key Dates</h3>
          <div className="relative border-l-2 ml-3 space-y-6" style={{ borderColor: 'rgba(255, 153, 51, 0.3)' }}>
            {events.map((event, idx) => (
              <div key={idx} className="relative" style={{ paddingLeft: '2.5rem' }}>
                <div className="absolute bg-[var(--bg-secondary)] border border-[var(--saffron)] rounded-full p-1 shadow-sm flex items-center justify-center" style={{ left: '-17px', top: '-2px', width: '32px', height: '32px' }}>
                  {event.icon}
                </div>
                <div className="pt-1">
                  <span className="text-xs font-bold text-[var(--saffron)] uppercase tracking-wider">{event.date}</span>
                  <h4 className="font-semibold text-lg">{event.title}</h4>
                  <p className="text-sm text-[var(--text-secondary)]">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Code of Conduct */}
        <div className="flex flex-col gap-6">
          <div className="card" style={{ border: '1px solid rgba(255, 153, 51, 0.5)' }}>
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--saffron)' }}>
              <ShieldAlert />
              Model Code of Conduct (MCC)
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              The MCC is a set of guidelines issued by the Election Commission of India for conduct of political parties and candidates during elections mainly with respect to speeches, polling day, polling booths, portfolios, election manifestos, processions and general conduct.
            </p>
            <ul className="text-sm space-y-2 list-disc pl-5" style={{ color: 'var(--text-secondary)' }}>
              <li>No party or candidate shall include in any activity which may aggravate existing differences or create mutual hatred.</li>
              <li>Criticism of other political parties shall be confined to their policies and program.</li>
              <li>There shall be no appeal to caste or communal feelings for securing votes.</li>
              <li>Ruling party ministers shall not combine their official visit with electioneering work.</li>
            </ul>
          </div>

          <div className="card border-l-4" style={{ borderLeftColor: 'var(--green)' }}>
             <h4 className="font-bold mb-2">Report a Violation (cVIGIL)</h4>
             <p className="text-sm text-[var(--text-secondary)] mb-4">
               Citizens can use the cVIGIL app to record on-the-spot incidents of MCC violations.
             </p>
             <button className="btn btn-secondary w-full text-sm" onClick={() => alert("Downloading cVIGIL info PDF...")}>Download cVIGIL Info</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
