import React, { useState } from 'react';
import { Trophy, Share2, Medal, Award, Star } from 'lucide-react';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [userName, setUserName] = useState('');

  const questions = [
    {
      questionText: 'What is the minimum voting age in India?',
      answerOptions: [
        { answerText: '16', isCorrect: false },
        { answerText: '18', isCorrect: true },
        { answerText: '21', isCorrect: false },
        { answerText: '25', isCorrect: false },
      ],
    },
    {
      questionText: 'What does EVM stand for?',
      answerOptions: [
        { answerText: 'Electronic Voting Machine', isCorrect: true },
        { answerText: 'Election Voting Mechanism', isCorrect: false },
        { answerText: 'Electronic Voter Module', isCorrect: false },
        { answerText: 'Electrical Voting Machine', isCorrect: false },
      ],
    },
    {
      questionText: 'Which body conducts elections to the Lok Sabha in India?',
      answerOptions: [
        { answerText: 'Supreme Court', isCorrect: false },
        { answerText: 'Parliament', isCorrect: false },
        { answerText: 'Election Commission of India', isCorrect: true },
        { answerText: 'President of India', isCorrect: false },
      ],
    },
    {
      questionText: 'What does VVPAT stand for?',
      answerOptions: [
        { answerText: 'Voter Verifiable Paper Audit Trail', isCorrect: true },
        { answerText: 'Voting Verification Process And Trail', isCorrect: false },
        { answerText: 'Voter Validated Paper Audit Trail', isCorrect: false },
        { answerText: 'Verified Voting Paper Action Trail', isCorrect: false },
      ],
    },
    {
      questionText: 'When is National Voters\' Day celebrated in India?',
      answerOptions: [
        { answerText: '15th August', isCorrect: false },
        { answerText: '26th January', isCorrect: false },
        { answerText: '25th January', isCorrect: true },
        { answerText: '2nd October', isCorrect: false },
      ],
    }
  ];

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  const generateBadge = (e) => {
    e.preventDefault();
    if(userName.trim().length > 0) {
      setShowBadge(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4 flex justify-center items-center gap-3">
          <Trophy className="text-saffron" size={32} />
          Election Champion Quiz
        </h2>
        <p className="text-[var(--text-secondary)]">Test your knowledge about Indian elections and earn your badge!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Quiz Section */}
        <div className="card h-full flex flex-col justify-center min-h-[400px]">
          {showScore ? (
            <div className="text-center animate-fadeIn">
              <Medal size={64} className={`mx-auto mb-4 ${score > 3 ? 'text-saffron' : 'text-gray-400'}`} />
              <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
              <p className="text-lg mb-6">
                You scored <span className="font-bold text-saffron text-2xl">{score}</span> out of {questions.length}
              </p>
              
              {score === questions.length ? (
                <p className="text-green-600 font-bold mb-6">Perfect Score! You are a true Election Champion.</p>
              ) : score >= 3 ? (
                <p className="text-saffron-dark font-semibold mb-6">Great job! You have good knowledge of the electoral process.</p>
              ) : (
                <p className="text-[var(--text-secondary)] mb-6">Good try. Keep exploring Chunav Saathi to learn more!</p>
              )}
              
              <button onClick={restartQuiz} className="btn btn-outline">Try Again</button>
            </div>
          ) : (
            <div className="flex flex-col h-full animate-fadeIn">
              <div className="mb-6 flex justify-between items-center border-b border-[var(--border-color)] pb-4">
                <h3 className="text-xl font-bold">Question {currentQuestion + 1}</h3>
                <span className="text-sm font-semibold bg-[var(--bg-primary)] px-3 py-1 rounded-full border border-[var(--border-color)] text-[var(--text-secondary)]">
                  {currentQuestion + 1} / {questions.length}
                </span>
              </div>
              <div className="text-lg font-medium mb-8 flex-1">
                {questions[currentQuestion].questionText}
              </div>
              <div className="flex flex-col gap-3">
                {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
                    className="p-4 text-left rounded-lg border-2 border-[var(--border-color)] hover:border-[var(--saffron)] hover:bg-[var(--saffron)]/5 transition-all font-medium"
                  >
                    {answerOption.answerText}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Badge Generator Section */}
        <div className="card h-full flex flex-col border-[var(--saffron)]/30 border-2">
          <div className="mb-6 text-center">
            <h3 className="text-xl font-bold mb-2 flex justify-center items-center gap-2">
              <Award className="text-green" />
              "I Voted" Badge
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">Generate and share your custom badge to encourage others!</p>
          </div>

          {!showBadge ? (
            <form onSubmit={generateBadge} className="flex-1 flex flex-col justify-center">
              <div className="input-group mb-6">
                <label className="text-center">Enter your name</label>
                <input 
                  type="text" 
                  className="input-field text-center text-lg" 
                  placeholder="e.g. Rahul Sharma"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-full">Generate My Badge</button>
            </form>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center animate-fadeIn">
              {/* The Badge */}
              <div className="relative w-64 h-64 bg-gradient-to-br from-orange-100 via-white to-green-100 rounded-full shadow-2xl border-4 border-white flex flex-col items-center justify-center p-6 text-center transform hover:scale-105 transition-transform mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-[var(--saffron)] opacity-20 animate-[spin_10s_linear_infinite]"></div>
                
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/220px-Emblem_of_India.svg.png" alt="Emblem" className="h-12 w-12 opacity-80 mb-2 drop-shadow-md" />
                <h4 className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--saffron)] to-[var(--green)]">I VOTED</h4>
                <div className="w-16 h-1 bg-gradient-to-r from-[var(--saffron)] via-white to-[var(--green)] my-2 rounded-full"></div>
                <p className="font-bold text-gray-800 text-lg">{userName}</p>
                <div className="flex justify-center gap-1 mt-2">
                  <Star size={12} className="text-[var(--saffron)] fill-[var(--saffron)]" />
                  <Star size={12} className="text-[var(--saffron)] fill-[var(--saffron)]" />
                  <Star size={12} className="text-[var(--saffron)] fill-[var(--saffron)]" />
                </div>
              </div>

              <button className="btn btn-secondary w-full flex items-center justify-center gap-2">
                <Share2 size={18} />
                Share on Social Media
              </button>
              
              <button onClick={() => setShowBadge(false)} className="text-sm mt-4 text-[var(--text-secondary)] hover:text-saffron underline">
                Create another badge
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
