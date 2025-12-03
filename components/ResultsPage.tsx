
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { UserContact, ScoreResult } from '../types';
import Button from './Button';
import { Download, ArrowRight, TrendingUp, Mail, Check, RefreshCw, X, AlertCircle } from 'lucide-react';
import { BEST_PRACTICES_QUESTIONS } from '../constants';

interface ResultsPageProps {
  answers: Record<number, any>;
  contact: UserContact;
}

const RESEND_API_KEY = 're_hZMYAKHQ_AvDrvgVpTGzgz89aN2H6Haan';

const ResultsPage: React.FC<ResultsPageProps> = ({ answers, contact }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const emailSentRef = useRef(false);

  const resultData = useMemo((): ScoreResult => {
    // 1. Calculate Base Score (Q1-10)
    let rawScore = 0;
    BEST_PRACTICES_QUESTIONS.forEach(q => {
      if (answers[q.id] === 'yes') rawScore += 10;
    });

    // 2. Adjustments based on Q11 (Current Situation)
    const q11 = answers[11];
    if (q11 === 'not_started') rawScore -= 10;
    if (q11 === 'low_adoption') rawScore -= 5;
    if (q11 === 'scaling') rawScore += 10;

    // 3. Adjustments based on Q13 (Obstacles)
    const q13 = answers[13];
    if (q13 === 'threatened') rawScore -= 5;
    if (q13 === 'overwhelmed') rawScore -= 5;

    // Clamp score
    const finalScore = Math.max(0, Math.min(100, rawScore));

    // Determine Tier
    let tier: ScoreResult['tier'] = 'building';
    if (finalScore <= 40) tier = 'critical';
    else if (finalScore >= 71) tier = 'ready';

    // Tier Content Logic
    if (tier === 'critical') {
      return {
        score: finalScore,
        tier,
        title: "CRITICAL RISK",
        color: "text-red-500",
        insights: {
          items: [
             "MINDSET GAP: Your team likely sees AI as a threat (not a tool). This is why adoption stalls—even with the best technology.",
             "STRUCTURAL GAP: You don't have the right roles or processes to support AI adoption. Without structure, AI becomes a 'nice to have' that nobody owns.",
             "HABIT GAP: Strategic thinking is at risk. When AI automates tasks, teams forget how to think—leading to deskilling."
          ]
        },
        nextSteps: [
          { title: "Book a FREE 20-minute AI Readiness Call", desc: "We'll review your scorecard, identify your #1 barrier, and give you one action you can take this week.", action: "Book Your Free Call" },
          { title: "Download 'The Cognitive Clarity Toolkit'", desc: "Practical exercises to help your team see AI as their tool (40 pages).", action: "Download Now" },
          { title: "Join our monthly webinar", desc: "The AI Adoption Paradox: Learn why teams ghost AI tools—and how to fix it.", action: "Register for Webinar" }
        ]
      };
    } else if (tier === 'building') {
       return {
        score: finalScore,
        tier,
        title: "BUILDING MOMENTUM",
        color: "text-brand-orange", // Using brand orange for medium tier
        insights: {
          strength: "Your team has foundations in place, but lacks consistency.",
          gap: "Your team lacks psychological safety to admit AI confusion. This is why adoption feels forced, not natural.",
          items: [
            "You've got strong foundations, but there are gaps that could cause adoption to plateau.",
            "Without intervention, adoption will likely plateau at 50-60%.",
            "Focus is needed on ritualizing AI usage to make it stick."
          ]
        },
        nextSteps: [
          { title: "Explore the AI Team Sprint", desc: "4 weeks. Purpose Portfolio Method. Turn anxiety into action and embed adoption rituals.", action: "Learn About Sprint" },
          { title: "Join 'The AI Adoption Paradox' Webinar", desc: "See how other founders broke through the 60% plateau.", action: "Register Now" },
          { title: "Book a Strategy Call", desc: "Want personalized advice? Let's talk about your specific gaps.", action: "Book 20-Min Call" }
        ]
      };
    } else {
       return {
        score: finalScore,
        tier,
        title: "AI-READY",
        color: "text-green-500",
        insights: {
          items: [
            "Your team sees AI as a tool they shape (not a threat).",
            "You have strong structure and clear roles.",
            "Strategic thinking is protected. You are in the top 15% of teams we've assessed."
          ]
        },
        nextSteps: [
          { title: "Consider Fractional AI Advisor", desc: "Stay ahead as you scale. Prevent backsliding with ongoing support (3-6 months).", action: "Book Strategy Call" },
          { title: "Send your team to AI Think School", desc: "Give them cognitive clarity training so they stay strategic.", action: "Explore Think School" },
          { title: "Share this scorecard", desc: "Help your network assess their AI readiness.", action: "Share Scorecard" }
        ]
      };
    }
  }, [answers]);

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
        setAnimatedScore(resultData.score);
    }, 100);
    return () => clearTimeout(timer);
  }, [resultData.score]);

  // Handle Email Sending
  const sendResultsEmail = async () => {
    if (!contact.email) return;
    
    setEmailStatus('sending');
    setErrorMessage('');

    // Get hex color for email inline styles
    const getHexColor = (tier: string) => {
      switch(tier) {
          case 'critical': return '#ef4444'; 
          case 'building': return '#FF6B1A'; 
          case 'ready': return '#22c55e';
          default: return '#E11D74';
      }
    };
    const tierColor = getHexColor(resultData.tier);

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'AI Think School <guru@founder.aithinkschool.com>', 
          reply_to: 'guru@founder.aithinkschool.com',
          to: [contact.email],
          subject: `Your AI Team Readiness Score: ${resultData.score}/100`,
          html: `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto;">
              <div style="text-align: center; padding: 30px 20px; background-color: #f8fafc; border-bottom: 3px solid #E11D74;">
                <h1 style="color: #111; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1px;">AI Team Readiness Scorecard</h1>
              </div>
              
              <div style="padding: 30px 20px;">
                <p style="font-size: 16px;">Hi <strong>${contact.name}</strong>,</p>
                <p style="font-size: 16px; color: #555;">Thank you for taking the assessment. Here is your personalized breakdown based on the Purpose Portfolio Method™.</p>
                
                <div style="text-align: center; margin: 40px 0; padding: 30px; background-color: #f0fdfa; border-radius: 12px; border: 1px solid #e0f2fe;">
                  <div style="font-size: 14px; text-transform: uppercase; color: #64748b; letter-spacing: 2px; margin-bottom: 10px;">Your Score</div>
                  <div style="font-size: 64px; font-weight: 800; line-height: 1; color: ${tierColor}; margin-bottom: 10px;">${resultData.score}</div>
                  <div style="font-size: 20px; font-weight: bold; text-transform: uppercase; color: #334155;">${resultData.title}</div>
                </div>

                <h3 style="color: #111; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-top: 30px;">Key Insights for Your Team</h3>
                <ul style="padding-left: 20px; color: #444;">
                  ${resultData.insights.items.map(item => `<li style="margin-bottom: 12px;">${item}</li>`).join('')}
                </ul>

                <h3 style="color: #111; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-top: 30px;">Recommended Next Steps</h3>
                <ul style="padding-left: 0; list-style: none;">
                  ${resultData.nextSteps.map(step => `
                    <li style="margin-bottom: 20px; background-color: #fff; padding: 15px; border: 1px solid #eee; border-radius: 8px;">
                      <strong style="color: #E11D74; display: block; margin-bottom: 4px;">${step.title}</strong>
                      <span style="color: #555; font-size: 14px;">${step.desc}</span>
                    </li>
                  `).join('')}
                </ul>
                
                <div style="margin-top: 40px; text-align: center;">
                  <a href="https://guruprasadkamat.com" style="background-color: #E11D74; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block;">Book Your Free Strategy Call</a>
                </div>
              </div>
              
              <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0 0 10px 0;"><strong>AI Think School</strong><br>Purpose Portfolio Method™</p>
                <p style="margin: 0;"><a href="https://guruprasadkamat.com" style="color: #64748b; text-decoration: underline;">guruprasadkamat.com</a> | guru@founder.aithinkschool.com</p>
              </div>
            </div>
          `
        })
      });

      if (response.ok) {
        setEmailStatus('success');
        setShowToast(true);
      } else {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to send email');
      }
    } catch (error: any) {
      console.error('Email send error:', error);
      setEmailStatus('error');
      
      // Provide detailed feedback for CORS errors which are common in frontend-only demos
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        setErrorMessage("Browser blocked the email request (CORS). This is expected in a demo environment without a backend.");
      } else {
        setErrorMessage("Failed to send email. Please check the console for details.");
      }
    }
  };

  // Send email automatically on mount
  useEffect(() => {
    if (contact.email && !emailSentRef.current) {
      emailSentRef.current = true;
      sendResultsEmail();
    }
  }, [contact.email]);

  // Auto-hide toast
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Speedometer Gauge Calculations
  const radius = 80;
  const strokeWidth = 16;
  const arcLength = Math.PI * radius;
  const strokeDashoffset = arcLength * (1 - (animatedScore / 100));

  const getStrokeColor = (tier: string) => {
      switch(tier) {
          case 'critical': return '#ef4444'; 
          case 'building': return '#FF6B1A'; 
          case 'ready': return '#22c55e';
          default: return '#E11D74';
      }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-12">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-4 z-50 animate-bounce-in">
          <div className="bg-white border-l-4 border-green-500 rounded-r-lg shadow-lg p-4 flex items-start space-x-3 max-w-sm">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Report Sent!</p>
              <p className="text-sm text-gray-500 mt-1">
                We've emailed your full scorecard to <span className="font-medium text-gray-900">{contact.email}</span>.
              </p>
            </div>
            <button 
              onClick={() => setShowToast(false)}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header Result */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gray-900 p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-brand-purple/20 blur-3xl rounded-full pointer-events-none"></div>

          <p className="text-gray-400 font-medium uppercase tracking-wider mb-8 relative z-10">AI Team Readiness Score</p>
          
          {/* Speedometer SVG */}
          <div className="relative w-64 h-32 mx-auto mb-6 z-10">
             <svg className="w-full h-full overflow-visible" viewBox="0 0 200 110">
                <path 
                    d="M 20 100 A 80 80 0 0 1 180 100" 
                    fill="none" 
                    stroke="#374151" 
                    strokeWidth={strokeWidth} 
                    strokeLinecap="round" 
                />
                <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke={getStrokeColor(resultData.tier)}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={arcLength}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-[stroke-dashoffset] duration-[1500ms] ease-out"
                />
             </svg>
             
             <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end translate-y-2">
                 <span className={`text-6xl font-extrabold ${resultData.color} drop-shadow-lg`}>
                    {Math.round(animatedScore)}
                 </span>
             </div>
          </div>

          <h1 className={`text-4xl font-bold mt-6 ${resultData.color} tracking-tight relative z-10`}>{resultData.title}</h1>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto text-lg leading-relaxed relative z-10">
            {resultData.tier === 'critical' && "Your team is NOT ready to adopt AI strategically."}
            {resultData.tier === 'building' && "Good foundations, but gaps could cause adoption to plateau."}
            {resultData.tier === 'ready' && "Congratulations! Your team is well-positioned for AI adoption."}
          </p>
        </div>

        {/* Insights */}
        <div className="p-8 sm:p-12 bg-white">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-brand" /> Key Insights for {contact.name}
          </h3>
          <div className="space-y-6">
            {resultData.insights.items.map((item, idx) => (
              <div key={idx} className="flex items-start">
                <div className={`mt-2 mr-4 flex-shrink-0 h-2.5 w-2.5 rounded-full ${resultData.color.replace('text-', 'bg-')}`}></div>
                <p className="text-gray-700 leading-relaxed text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 text-center">Recommended Next Steps</h3>
        <div className="grid md:grid-cols-1 gap-4">
          {resultData.nextSteps.map((step, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-lg">{step.title}</h4>
                <p className="text-gray-600 mt-1">{step.desc}</p>
              </div>
              <Button variant={idx === 0 ? 'primary' : 'outline'} className="flex-shrink-0 whitespace-nowrap w-full sm:w-auto">
                {step.action} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center border-t border-gray-200 pt-12 pb-8">
        <h4 className="font-bold text-gray-900 mb-2">Questions? Let's talk.</h4>
        <div className="space-y-1 text-gray-600 mb-8">
          <p>Email: guru@founder.aithinkschool.com</p>
          <p>LinkedIn: linkedin.com/in/connectguru</p>
          <p>Website: guruprasadkamat.com</p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
           {/* Primary action is now Print/PDF if email is failing */}
           <Button variant="primary" onClick={() => window.print()} className="flex items-center">
             <Download className="mr-2 h-4 w-4" /> Save Scorecard (PDF)
           </Button>

           <Button 
             variant={emailStatus === 'error' ? 'outline' : 'secondary'} 
             onClick={sendResultsEmail}
             disabled={emailStatus === 'success' || emailStatus === 'sending'}
             className="flex items-center"
           >
             {emailStatus === 'sending' && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
             {emailStatus === 'success' && <Check className="mr-2 h-4 w-4 text-green-600" />}
             {emailStatus === 'error' && <Mail className="mr-2 h-4 w-4" />}
             {emailStatus === 'idle' && <Mail className="mr-2 h-4 w-4" />}
             
             {emailStatus === 'sending' && 'Sending Report...'}
             {emailStatus === 'success' && 'Report Sent'}
             {emailStatus === 'error' && 'Retry Email'}
             {emailStatus === 'idle' && 'Email Report'}
           </Button>
        </div>
        
        {emailStatus === 'success' && (
           <p className="text-green-600 text-sm mt-3 font-medium">
             ✓ Results emailed to {contact.email}
           </p>
        )}
        
        {emailStatus === 'error' && (
           <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg max-w-lg mx-auto">
             <div className="flex items-start justify-center text-red-600 mb-1">
               <AlertCircle className="h-4 w-4 mr-2 mt-0.5" />
               <p className="font-bold text-sm">Email Delivery Failed</p>
             </div>
             <p className="text-red-500 text-xs">
               {errorMessage || "Security restriction: Browsers block direct API calls to Resend (CORS). This feature requires a backend."}
             </p>
             <p className="text-red-500 text-xs mt-1 font-medium">
               Please use the "Save Scorecard (PDF)" button above.
             </p>
           </div>
        )}
      </footer>

    </div>
  );
};

export default ResultsPage;
