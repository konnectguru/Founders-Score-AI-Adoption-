import { Question } from './types';

export const BEST_PRACTICES_QUESTIONS: Question[] = [
  { id: 1, text: "Have you explicitly communicated your vision for how AI + humans will work together?", type: 'yes_no' },
  { id: 2, text: "Does your team openly discuss their concerns or fears about AI?", type: 'yes_no' },
  { id: 3, text: "Do you have a documented process for deciding when to use AI vs when humans should lead?", type: 'yes_no' },
  { id: 4, text: "Have you defined clear roles for 'AI strategists' (not just 'AI users')?", type: 'yes_no' },
  { id: 5, text: "Do you measure both 'AI usage' AND 'strategic output quality'?", type: 'yes_no' },
  { id: 6, text: "Does your team have weekly rituals to reflect on AI learnings (not just tool demos)?", type: 'yes_no' },
  { id: 7, text: "Have you addressed the identity question: 'Who am I if AI does my work?'", type: 'yes_no' },
  { id: 8, text: "Do team members challenge AI outputs (vs blindly accepting them)?", type: 'yes_no' },
  { id: 9, text: "Have you created a psychologically safe space for team members to admit AI confusion?", type: 'yes_no' },
  { id: 10, text: "Do you celebrate strategic insights—not just productivity gains?", type: 'yes_no' },
];

export const QUALIFYING_QUESTIONS: Question[] = [
  {
    id: 11,
    text: "Which best describes your current situation?",
    type: 'multiple_choice',
    options: [
      { label: "We haven't started using AI yet (exploring options)", value: 'not_started' },
      { label: "We've deployed AI tools but adoption is low (<30%)", value: 'low_adoption' },
      { label: "We have moderate adoption but inconsistent results (30-60%)", value: 'moderate' },
      { label: "We have strong adoption and good momentum (60%+)", value: 'strong' },
      { label: "We're scaling AI across the entire organization", value: 'scaling' },
    ]
  },
  {
    id: 12,
    text: "What is the most important outcome you want to achieve in the next 90 days?",
    type: 'multiple_choice',
    options: [
      { label: "Get team buy-in and reduce AI anxiety", value: 'buy_in' },
      { label: "Increase AI adoption from current levels to 60%+", value: 'adoption' },
      { label: "Build the right team structure (hire AI strategists, integrators)", value: 'structure' },
      { label: "Protect strategic thinking as AI scales", value: 'strategy' },
      { label: "Create sustainable AI adoption rituals and habits", value: 'habits' },
      { label: "Something else", value: 'other' },
    ]
  },
  {
    id: 13,
    text: "What is the biggest obstacle stopping you from achieving this?",
    type: 'multiple_choice',
    options: [
      { label: "Team feels threatened/anxious about AI (identity crisis)", value: 'threatened' },
      { label: "Don't know who to hire or what roles we need", value: 'roles' },
      { label: "No clear process for deciding when to use AI", value: 'process' },
      { label: "Leadership isn't aligned on AI strategy", value: 'leadership' },
      { label: "We're overwhelmed and don't know where to start", value: 'overwhelmed' },
      { label: "Something else", value: 'other' },
    ]
  },
  {
    id: 14,
    text: "Which solution would suit you best right now?",
    type: 'multiple_choice',
    options: [
      { label: "Free resources (guides, webinars, toolkits)", value: 'free' },
      { label: "Short workshop or sprint (4 weeks, hands-on)", value: 'workshop' },
      { label: "Ongoing advisory support (3-6 months, part-time)", value: 'advisory' },
      { label: "Full partnership (6-12 months, fractional Chief AI Officer)", value: 'fractional' },
      { label: "Done-for-you (you build the team, we just consult)", value: 'dfy' },
      { label: "Not sure yet—just exploring", value: 'exploring' },
    ]
  },
  {
    id: 15,
    text: "Is there anything else you think we should know about your situation?",
    type: 'open',
  },
];