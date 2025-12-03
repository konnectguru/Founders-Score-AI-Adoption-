import React from 'react';
import { ArrowRight, Brain, Users, Zap, CheckCircle } from 'lucide-react';
import Button from './Button';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-16 py-12 px-4 sm:px-6">
      
      {/* HOOK */}
      <section className="text-center space-y-8 bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-gray-100">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Your AI tools aren't working because your <span className="text-brand">team isn't using them</span>.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Answer 15 questions to find out why your team is ghosting AI and exactly what to do about it.
        </p>
        <div className="pt-4">
          <Button onClick={onStart} size="lg" className="text-lg px-8 py-4 shadow-lg transform transition hover:-translate-y-1">
            Start the Assessment <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* VALUE PROP */}
      <section className="bg-slate-50 rounded-2xl p-8 sm:p-10 border border-slate-200">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900">Take This Assessment to Measure and Improve:</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            {/* Brand Pink Icon Background */}
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-brand/10 text-brand mb-4">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">1. TEAM MINDSET</h3>
            <p className="text-gray-600 text-sm">Does your team see AI as a tool they shape—or a threat they endure?</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            {/* Brand Purple Icon Background */}
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-brand-purple/10 text-brand-purple mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">2. TEAM STRUCTURE</h3>
            <p className="text-gray-600 text-sm">Do you have the right roles to make AI adoption stick?</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            {/* Brand Orange Icon Background */}
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-brand-orange/10 text-brand-orange mb-4">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">3. STRATEGIC HABITS</h3>
            <p className="text-gray-600 text-sm">Are you protecting strategic thinking as AI scales—or losing it?</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="inline-flex items-center text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
            <span className="mr-4">⏱️ Only takes 3 minutes</span>
            <span className="mr-4">💰 Completely free</span>
            <span>⚡ Instant results</span>
          </p>
        </div>
      </section>

      {/* CREDIBILITY */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">The Science Behind The Scorecard</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-brand-purple mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-700">85% of AI initiatives fail due to poor team adoption (not bad technology).</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-brand-purple mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-700">Teams trained with the Purpose Portfolio Method show <strong className="text-gray-900">92% adoption</strong> vs 30% industry average.</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-brand-purple mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-700">Most common reason teams ghost AI: Identity threat ("Will I still be valuable?").</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-brand">
          <div className="flex items-center mb-4">
             <div className="h-12 w-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
               <img src="https://picsum.photos/100/100" alt="Guruprasad Kamat" className="h-full w-full object-cover" />
             </div>
             <div>
               <h4 className="font-bold text-gray-900">Guruprasad Kamat</h4>
               <p className="text-sm text-gray-500">Purpose Portfolio Architect</p>
             </div>
          </div>
          <p className="text-gray-600 text-sm italic mb-4">
            "This assessment is based on 200+ team interviews, 5 AI teams built from scratch, and the Purpose Portfolio Method™—combining counseling psychology with team architecture."
          </p>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-gray-100 text-xs font-medium text-gray-600 rounded">Masters in Psychology</span>
            <span className="px-2 py-1 bg-gray-100 text-xs font-medium text-gray-600 rounded">500+ Professionals Trained</span>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="text-center py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready to Discover Your AI Team Readiness Score?</h2>
        <div className="flex justify-center mb-8">
           <ul className="text-left space-y-2">
             <li className="flex items-center text-gray-600"><CheckCircle className="h-4 w-4 text-brand mr-2" /> Start the quiz (only takes 3 minutes)</li>
             <li className="flex items-center text-gray-600"><CheckCircle className="h-4 w-4 text-brand mr-2" /> Completely free</li>
             <li className="flex items-center text-gray-600"><CheckCircle className="h-4 w-4 text-brand mr-2" /> Get immediate recommendations</li>
           </ul>
        </div>
        <Button onClick={onStart} size="lg" className="w-full sm:w-auto px-12">
          Start the Assessment Now
        </Button>
      </section>
      
    </div>
  );
};

export default LandingPage;