
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Quiz from './components/Quiz';
import ResultsPage from './components/ResultsPage';
import { UserContact } from './types';

function App() {
  const [view, setView] = useState<'landing' | 'quiz' | 'results'>('landing');
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [contact, setContact] = useState<UserContact>({ name: '', email: '' });

  const handleStart = () => {
    setView('quiz');
    window.scrollTo(0, 0);
  };

  const handleQuizComplete = (finalAnswers: Record<number, any>, userContact: UserContact) => {
    setAnswers(finalAnswers);
    setContact(userContact);
    setView('results');
    window.scrollTo(0, 0);
  };

  // CSS-based Logo Component to ensure it always displays correctly
  const Logo = () => (
    <div className="flex flex-col select-none leading-none">
      <div className="flex text-4xl sm:text-5xl font-black tracking-tighter">
        <span className="text-[#E11D74]">A</span>
        <span className="text-[#9A00BD]">I</span>
        <span className="text-[#FF6B1A]">T</span>
        <span className="text-[#FFD600]">S</span>
      </div>
      <div className="text-[0.65rem] sm:text-[0.75rem] font-black tracking-[0.18em] text-black mt-0.5 sm:mt-1 ml-0.5 sm:ml-1 whitespace-nowrap">
        AI THINK SCHOOL
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      {/* Simple Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center cursor-pointer gap-4" onClick={() => setView('landing')}>
              <Logo />
              <div className="hidden sm:block h-10 w-px bg-gray-200"></div>
              <span className="font-semibold text-sm sm:text-lg tracking-tight text-gray-600 hidden sm:block">
                Team Readiness Scorecard
              </span>
            </div>
            {view !== 'landing' && (
              <div className="text-xs sm:text-sm text-brand-purple font-medium bg-brand-purple/5 px-3 py-1 rounded-full border border-brand-purple/10">
                Purpose Portfolio Method™
              </div>
            )}
          </div>
        </div>
      </header>

      <main>
        {view === 'landing' && <LandingPage onStart={handleStart} />}
        {view === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
        {view === 'results' && <ResultsPage answers={answers} contact={contact} />}
      </main>
    </div>
  );
}

export default App;
