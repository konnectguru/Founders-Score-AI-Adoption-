import React, { useState, useEffect, useRef } from 'react';
import { BEST_PRACTICES_QUESTIONS, QUALIFYING_QUESTIONS } from '../constants';
import { UserContact } from '../types';
import Button from './Button';
import { ChevronRight, ChevronLeft, Lock, Check } from 'lucide-react';

interface QuizProps {
  onComplete: (answers: Record<number, any>, contact: UserContact) => void;
}

type QuizPhase = 'contact' | 'questions';

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<QuizPhase>('contact');
  const [contact, setContact] = useState<UserContact>({ name: '', email: '', phone: '' });
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const allQuestions = [...BEST_PRACTICES_QUESTIONS, ...QUALIFYING_QUESTIONS];
  const currentQuestion = allQuestions[currentQuestionIndex];
  const totalQuestions = allQuestions.length;

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    };
  }, []);

  // Scroll to top when question changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentQuestionIndex, phase]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contact.name && contact.email) {
      setPhase('questions');
    }
  };

  const handleNext = () => {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete(answers, contact);
    }
  };

  const handlePrevious = () => {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleAnswer = (questionId: number, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));

    if (currentQuestionIndex < totalQuestions - 1) {
      const question = allQuestions[currentQuestionIndex];
      if (question.id === questionId && question.type !== 'open') {
        if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
        autoAdvanceTimer.current = setTimeout(() => {
          setCurrentQuestionIndex(prev => prev + 1);
        }, 400); 
      }
    }
  };

  // Progress calculation
  const progress = phase === 'contact' 
    ? 0 
    : Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  // CONTACT FORM
  if (phase === 'contact') {
    return (
      <div className="max-w-xl mx-auto py-12 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-brand/10 text-brand mb-4">
              <Lock className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Unlock Your Assessment</h2>
            <p className="text-gray-500 mt-2">Enter your details to begin the 15-question evaluation.</p>
          </div>
          
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name *</label>
              <input
                type="text"
                id="name"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-brand focus:border-brand"
                value={contact.name}
                onChange={e => setContact({ ...contact, name: e.target.value })}
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email *</label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-brand focus:border-brand"
                value={contact.email}
                onChange={e => setContact({ ...contact, email: e.target.value })}
                placeholder="jane@company.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone (Optional)</label>
              <input
                type="tel"
                id="phone"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-brand focus:border-brand"
                value={contact.phone}
                onChange={e => setContact({ ...contact, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div className="pt-4">
              <Button type="submit" fullWidth>Begin Assessment</Button>
            </div>
            <p className="text-xs text-center text-gray-400">Your information is secure and will never be shared.</p>
          </form>
        </div>
      </div>
    );
  }

  // SINGLE QUESTION RENDER
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const hasAnswer = answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== '';
  const sectionTitle = currentQuestionIndex < 10 ? "Part 1: Best Practices" : "Part 2: The Big Five";

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-medium text-gray-500 mb-2">
          <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-brand h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Section Header */}
        <div className="text-center sm:text-left">
           <span className="inline-block px-3 py-1 bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wide rounded-full mb-3">
             {sectionTitle}
           </span>
        </div>

        {/* Question Card */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg border border-gray-100 min-h-[300px] flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-snug">
            {currentQuestion.text}
          </h2>

          {/* YES / NO */}
          {currentQuestion.type === 'yes_no' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label 
                className={`
                  relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 flex items-center justify-center space-x-3
                  ${answers[currentQuestion.id] === 'yes' 
                    ? 'border-brand bg-brand/5 shadow-md' 
                    : 'border-gray-200 hover:border-brand-purple/50 hover:bg-gray-50'}
                `}
                onClick={() => handleAnswer(currentQuestion.id, 'yes')}
              >
                <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${answers[currentQuestion.id] === 'yes' ? 'border-brand bg-brand' : 'border-gray-300'}
                `}>
                   {answers[currentQuestion.id] === 'yes' && <Check className="w-4 h-4 text-white" />}
                </div>
                <span className={`text-lg font-medium ${answers[currentQuestion.id] === 'yes' ? 'text-brand-dark' : 'text-gray-700'}`}>
                  Yes
                </span>
              </label>

              <label 
                className={`
                  relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 flex items-center justify-center space-x-3
                  ${answers[currentQuestion.id] === 'no' 
                    ? 'border-brand bg-brand/5 shadow-md' 
                    : 'border-gray-200 hover:border-brand-purple/50 hover:bg-gray-50'}
                `}
                onClick={() => handleAnswer(currentQuestion.id, 'no')}
              >
                <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${answers[currentQuestion.id] === 'no' ? 'border-brand bg-brand' : 'border-gray-300'}
                `}>
                   {answers[currentQuestion.id] === 'no' && <Check className="w-4 h-4 text-white" />}
                </div>
                <span className={`text-lg font-medium ${answers[currentQuestion.id] === 'no' ? 'text-brand-dark' : 'text-gray-700'}`}>
                  No
                </span>
              </label>
            </div>
          )}

          {/* MULTIPLE CHOICE */}
          {currentQuestion.type === 'multiple_choice' && (
             <div className="space-y-3">
               {currentQuestion.options?.map((opt) => (
                  <label 
                    key={opt.value} 
                    className={`
                      flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200
                      ${answers[currentQuestion.id] === opt.value 
                        ? 'border-brand bg-brand/5 shadow-sm' 
                        : 'border-gray-200 hover:border-brand-purple/50 hover:bg-gray-50'}
                    `}
                    onClick={() => handleAnswer(currentQuestion.id, opt.value)}
                  >
                     <div className={`
                       w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mr-4
                       ${answers[currentQuestion.id] === opt.value ? 'border-brand bg-brand' : 'border-gray-300'}
                     `}>
                        {answers[currentQuestion.id] === opt.value && <Check className="w-3 h-3 text-white" />}
                     </div>
                     <span className={`font-medium ${answers[currentQuestion.id] === opt.value ? 'text-brand-dark' : 'text-gray-700'}`}>
                       {opt.label}
                     </span>
                  </label>
               ))}
             </div>
          )}

          {/* OPEN TEXT */}
          {currentQuestion.type === 'open' && (
             <div>
               <textarea
                 rows={5}
                 className="block w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-brand focus:border-brand resize-none"
                 placeholder="Type your answer here..."
                 value={answers[currentQuestion.id] || ''}
                 onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                 autoFocus
               />
             </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4">
          <button 
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`
              flex items-center text-gray-500 font-medium px-4 py-2 rounded-lg transition-colors
              ${currentQuestionIndex === 0 ? 'opacity-0 cursor-default' : 'hover:bg-gray-100 hover:text-gray-900'}
            `}
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> Previous
          </button>

          <Button 
            onClick={handleNext} 
            disabled={!hasAnswer}
            className={isLastQuestion ? "px-8" : "px-6"}
          >
            {isLastQuestion ? 'See Results' : 'Next'} 
            {!isLastQuestion && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;