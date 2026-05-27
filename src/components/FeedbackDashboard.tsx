import React, { useState } from 'react';
import { 
  Smile, 
  MessageSquare, 
  ThumbsUp, 
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { CategoryFilter, DateRange } from '../types';

interface FeedbackDashboardProps {
  category: CategoryFilter;
  dateRange: DateRange;
}

export default function FeedbackDashboard({ category, dateRange }: FeedbackDashboardProps) {
  const [hoveredTrend, setHoveredTrend] = useState<string | null>(null);

  // Category scaling divisor for dynamic simulation
  const getMultiplier = (cat: CategoryFilter): number => {
    switch (cat) {
      case 'Regular': return 0.65;
      case 'Partner': return 0.20;
      case 'Offline event': return 0.10;
      case 'Other': return 0.05;
      case 'All':
      default: return 1.0;
    }
  };

  const mult = getMultiplier(category);
  const formatNum = (val: number) => Math.round(val).toLocaleString('en-US');

  // Scaled values
  const totalResponses = 12450 * mult;
  const positiveReviews = 10832 * mult;
  const poorRatings = 314 * mult;

  // Monthly stats (Nov - Apr) for Reg vs Comp bar chart
  const regAndCompData = [
    { month: 'Nov', regPercent: '65%', compPercent: '50%' },
    { month: 'Dec', regPercent: '75%', compPercent: '60%' },
    { month: 'Jan', regPercent: '85%', compPercent: '70%' },
    { month: 'Feb', regPercent: '70%', compPercent: '55%' },
    { month: 'Mar', regPercent: '90%', compPercent: '80%' },
    { month: 'Apr', regPercent: '80%', compPercent: '65%' },
  ];

  // Daily submissions path VN continuous SVG
  const dailyPath = "M 0,110 C 100,120 150,60 250,55 C 350,45 400,85 500,75 C 600,65 650,30 750,35 C 850,40 900,70 1000,60";

  // Heat map weekdays hour weights
  const heatmapDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const heatWeights: Record<string, number[]> = {
    'Mon': [1,1,1,1,1,2,3,4,4,3,2,2,3,4,3,2,1,1,1,1,1,1,1,1],
    'Tue': [1,1,1,1,1,2,3,4,4,4,3,2,3,4,3,2,1,1,1,1,1,1,1,1],
    'Wed': [1,1,1,1,1,2,3,4,4,3,2,2,3,4,3,2,1,1,1,1,1,1,1,1],
    'Thu': [1,1,1,1,1,2,3,4,4,3,2,2,3,4,3,2,1,1,1,1,1,1,1,1],
    'Fri': [1,1,1,1,1,2,3,4,4,3,2,2,3,4,3,2,1,1,1,1,1,1,1,1],
    'Sat': [1,1,1,1,1,2,3,4,4,3,2,2,3,4,3,1,1,1,1,1,1,1,1,1],
    'Sun': [1,1,1,1,1,2,3,4,4,3,2,2,3,4,3,1,1,1,1,1,1,1,1,1],
  };

  const getHeatColor = (weight: number) => {
    switch (weight) {
      case 4: return 'bg-[#2d34e2]'; // More
      case 3: return 'bg-[#7377eb]'; // Mid-high
      case 2: return 'bg-[#b2b4f4]'; // Mid-low
      case 1:
      default: return 'bg-blue-50/50'; // Less
    }
  };

  const categoryResponses = [
    { name: 'Regular', count: Math.round(9235 * mult), percentage: 65, color: '#4A53FA' },
    { name: 'Partner', count: Math.round(2842 * mult), percentage: 20, color: '#E950F7' },
    { name: 'Offline event', count: Math.round(1421 * mult), percentage: 10, color: '#FF6105' },
    { name: 'Other', count: Math.round(710 * mult), percentage: 5, color: '#FF3B4B' },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#F9F9F9] p-4 md:p-10 pt-28 md:pt-28 pb-24 min-h-screen">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-[11px] font-bold text-[#00C4CC] mb-1 uppercase tracking-wider font-raleway">Satisfaction Metrics</p>
            <h1 className="font-raleway text-[30px] leading-[24px] font-extrabold text-[#1A1F36] tracking-tight">
              Learner Feedback
            </h1>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Course completions, score outcomes, and qualitative indicators. <span className="font-semibold text-[#4A53FA]">({category} Category)</span>
            </p>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* KPI 1: Total Responses */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col p-5 relative overflow-hidden group hover:translate-y-[-2px] transition-all">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#00C4CC]"></div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-raleway">Total Responses</span>
              <MessageSquare className="w-5 h-5 text-[#00C4CC] opacity-60" />
            </div>
            <div className="flex items-baseline mb-1">
              <span className="text-3xl font-extrabold text-gray-800 font-raleway">
                {formatNum(totalResponses)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <span className="text-green-600 flex items-center shrink-0">↑ 14%</span>
              <span className="text-gray-400 font-medium">vs last month</span>
            </div>
          </div>

          {/* KPI 2: Overall CSAT */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col p-5 relative overflow-hidden group hover:translate-y-[-2px] transition-all">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#5A32FA]"></div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-raleway">Overall CSAT</span>
              <Smile className="w-5 h-5 text-[#5A32FA] opacity-60" />
            </div>
            <div className="flex items-baseline mb-1">
              <span className="text-3xl font-extrabold text-gray-800 font-raleway">94.2%</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <span className="text-green-600 flex items-center shrink-0">↑ 2.1%</span>
              <span className="text-gray-400 font-medium">vs last month</span>
            </div>
          </div>

          {/* KPI 3: Positive Reviews */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col p-5 relative overflow-hidden group hover:translate-y-[-2px] transition-all">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-raleway">Positive Reviews</span>
              <ThumbsUp className="w-5 h-5 text-green-500 opacity-60" />
            </div>
            <div className="flex items-baseline mb-2">
              <span className="text-3xl font-extrabold text-gray-800 font-raleway">
                {formatNum(positiveReviews)}
              </span>
            </div>
            <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden mt-1">
              <div className="bg-green-500 h-full rounded-full w-[87%]"></div>
            </div>
            <p className="text-[9px] font-bold text-gray-400 uppercase mt-1.5 text-right tracking-wider">87% OF TOTAL</p>
          </div>

          {/* KPI 4: Needs Attention */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col p-5 relative overflow-hidden group hover:translate-y-[-2px] transition-all">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#FF6105]"></div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-raleway">Needs Attention</span>
              <AlertTriangle className="w-5 h-5 text-[#FF6105] opacity-60" />
            </div>
            <div className="flex items-baseline mb-1">
              <span className="text-3xl font-extrabold text-gray-800 font-raleway">
                {formatNum(poorRatings)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <span className="text-red-500 flex items-center shrink-0">↓ 12%</span>
              <span className="text-gray-400 font-medium">unresolved flags</span>
            </div>
          </div>

        </div>

        {/* Analytics Row: Satisfaction & Trainer Impression */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Card: Satisfaction Level Arc Gauge */}
          <div className="md:col-span-12 lg:col-span-4 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between">
            <div className="mb-4">
              <h3 className="font-raleway text-base md:text-lg font-bold text-gray-800">Satisfaction Level</h3>
              <p className="text-xs text-gray-400 mt-1">Learner course satisfaction index</p>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center py-6 relative">
              {/* Premium gauge overlay */}
              <div className="relative w-full max-w-[200px] aspect-[2/1] flex items-end justify-center overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 100 50">
                  <defs>
                    <linearGradient id="satisfactionGrad" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" stopColor="#9EDCB7" />
                      <stop offset="50%" stopColor="#0BA84A" />
                      <stop offset="100%" stopColor="#078531" />
                    </linearGradient>
                  </defs>
                  
                  {/* Outer track background */}
                  <path d="M 10,45 A 35,35 0 0 1 90,45" fill="none" stroke="#F3F4F6" strokeLinecap="round" strokeWidth="9" />
                  
                  {/* Gauge fill arc */}
                  <path d="M 10,45 A 35,35 0 0 1 90,45" fill="none" stroke="url(#satisfactionGrad)" strokeDasharray="125.6" strokeDashoffset="7.5" strokeLinecap="round" strokeWidth="9" />
                </svg>

                {/* Score central overlays */}
                <div className="absolute inset-0 flex items-end justify-center pb-1 select-none">
                  <div className="flex items-baseline">
                    <span className="font-raleway text-3.5xl font-extrabold text-gray-800">4.7</span>
                    <span className="text-xs font-semibold text-gray-400 ml-0.5">/5</span>
                  </div>
                </div>
              </div>

              {/* Range legends */}
              <div className="w-full flex justify-between items-center mt-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#9EDCB7]"></div>
                  <span>Not satisfied</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>Very satisfied</span>
                  <div className="w-2 h-2 rounded-full bg-[#078531]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: Trainer Impression */}
          <div className="md:col-span-12 lg:col-span-8 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-raleway text-base md:text-lg font-bold text-gray-800">Trainer Impression</h3>
              <p className="text-xs text-gray-400 mt-1">Average ratings across key instruction metric criteria</p>
            </div>

            <div className="flex-grow flex flex-col justify-center gap-4.5 mt-4 sm:mt-0 py-2">
              
              {/* Metric 1 */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-1">
                  <span className="text-gray-700">Trainer Subject Knowledge Mastery</span>
                  <span className="text-[#4A53FA] font-bold bg-[#4A53FA]/5 px-2 py-0.5 rounded">4.8 / 5</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#138EFF] to-[#4A53FA] h-full rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>

              {/* Metric 2 */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-1">
                  <span className="text-gray-700">New Knowledge Acquired Practicality</span>
                  <span className="text-[#4A53FA] font-bold bg-[#4A53FA]/5 px-2 py-0.5 rounded">4.6 / 5</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#138EFF] to-[#4A53FA] h-full rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              {/* Metric 3 */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-1">
                  <span className="text-gray-700">Content Quality & Relevance usefulness</span>
                  <span className="text-[#4A53FA] font-bold bg-[#4A53FA]/5 px-2 py-0.5 rounded">4.3 / 5</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#138EFF] to-[#4A53FA] h-full rounded-full" style={{ width: '86%' }}></div>
                </div>
              </div>

              {/* Metric 4 */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-1">
                  <span className="text-gray-700">Level of Confidence after lesson completion</span>
                  <span className="text-[#4A53FA] font-bold bg-[#4A53FA]/5 px-2 py-0.5 rounded">4.1 / 5</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#a6c8ff] h-full rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bento Grid: Usefulness curve and NPS Score */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Usefulness Trend area graph - Span 8 columns */}
          <div className="md:col-span-12 lg:col-span-8 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-raleway text-lg font-bold text-gray-800">Content Usefulness Trend</h3>
              <p className="text-xs text-gray-400 mt-1">Rolling 6-month sentiment usefulness evaluations</p>
            </div>

            {/* Faux curve area line chart */}
            <div className="flex-grow w-full h-44 relative mt-6 flex items-end pt-4 border-b border-l border-[#F0F2F5]">
              <div className="absolute -left-6 top-0 h-full flex flex-col justify-between text-[9px] font-bold text-[#767587] pb-6">
                <span>100</span>
                <span>75</span>
                <span>50</span>
              </div>
              <div className="absolute inset-0 w-full h-full flex flex-col justify-between pointer-events-none pb-6">
                <div className="w-full border-t border-dashed border-gray-100 h-0"></div>
                <div className="w-full border-t border-dashed border-gray-100 h-0"></div>
                <div className="w-full border-t border-dashed border-gray-100 h-0"></div>
              </div>
              
              <div className="relative w-full h-full flex items-end justify-between px-4 pb-0 z-10">
                <div className="absolute bottom-0 left-0 w-full h-[80%] bg-gradient-to-t from-[#00C4CC]/15 to-transparent" style={{ clipPath: 'polygon(0 40%, 20% 20%, 40% 30%, 60% 10%, 80% 15%, 100% 5%, 100% 100%, 0% 100%)' }}></div>
                <svg className="absolute bottom-0 left-0 w-full h-[80%] overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M 0,40 Q 10,30 20,20 T 40,30 T 60,10 T 80,15 T 100,5" fill="none" stroke="#00C4CC" strokeWidth="2" strokeLinecap="round" />
                </svg>
                
                {/* Months labels overlay */}
                <div className="absolute bottom-[-22px] w-full left-0 flex justify-between px-4 text-[10px] font-bold text-gray-400 uppercase">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                </div>
              </div>
            </div>
            
            <div className="h-4"></div>
          </div>

          {/* NPS segment doughnut - Span 4 columns */}
          <div className="md:col-span-12 lg:col-span-4 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-raleway text-lg font-bold text-gray-800">NPS Score</h3>
              <p className="text-xs text-gray-400 mt-1">Likelihood values to recommend program</p>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center py-4">
              
              {/* Outer circle doughnut with segments representations */}
              <div className="relative w-36 h-36 rounded-full border-[12px] border-gray-100 flex items-center justify-center shadow-inner">
                <div className="absolute inset-0 rounded-full border-[12px] border-transparent border-t-green-500 border-r-green-500 rotate-45 opacity-90"></div>
                <div className="absolute inset-0 rounded-full border-[12px] border-transparent border-b-[#FF6105] -rotate-12 opacity-90"></div>
                <div className="text-center font-raleway select-none">
                  <span className="text-3xl font-black text-gray-800 block">+64</span>
                  <span className="block text-[10px] font-bold text-green-600 mt-0.5 tracking-widest uppercase">Excellent</span>
                </div>
              </div>

              {/* Legends percentage summary */}
              <div className="w-full flex flex-col gap-1.5 mt-5 text-xs font-semibold">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm bg-green-500"></div>
                    <span className="text-gray-500">Promoters (9-10)</span>
                  </div>
                  <span className="text-gray-800 font-bold">72%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm bg-gray-200"></div>
                    <span className="text-gray-500">Passives (7-8)</span>
                  </div>
                  <span className="text-gray-800 font-bold">20%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm bg-[#FF6105]"></div>
                    <span className="text-gray-500">Detractors (0-6)</span>
                  </div>
                  <span className="text-gray-800 font-bold">8%</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Dynamic bar charts completing feedback: Registration and completion rates */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-6">
            <div>
              <h3 className="font-raleway text-lg font-bold text-gray-800">Registration and completion rates</h3>
              <p className="text-xs text-gray-400 mt-1">Monthly comparison of aggregate registration vs feedback completions</p>
            </div>
            
            {/* Color keys */}
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#E950F7]"></div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Registrations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#00C4CC]"></div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Completions</span>
              </div>
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="relative h-60 mt-4">
            
            {/* Horizontal guideline markers */}
            <div className="absolute left-10 right-0 top-0 bottom-8 border-l border-b border-gray-100 flex flex-col justify-between pointer-events-none">
              <div className="w-full h-[1px] bg-gray-50"></div>
              <div className="w-full h-[1px] bg-gray-50"></div>
              <div className="w-full h-[1px] bg-gray-100"></div>
              <div className="w-full h-[1px] bg-gray-100"></div>
              <div className="w-full h-0"></div>
            </div>

            {/* Y axis text overlay */}
            <div className="absolute left-0 top-0 bottom-8 w-8 flex flex-col justify-between text-right text-[9px] text-[#767587] font-bold pr-2 py-0">
              <span>2,000</span>
              <span>1,500</span>
              <span>1,000</span>
              <span>500</span>
              <span>0</span>
            </div>

            {/* Vertical Columns side-by-side loops */}
            <div className="absolute left-10 right-0 top-0 bottom-8 flex justify-around items-end px-4">
              {regAndCompData.map((d, index) => (
                <div key={index} className="flex items-end gap-1.5 h-full relative group cursor-pointer">
                  {/* Left Bar: Regs */}
                  <div 
                    className="w-5 sm:w-6 rounded-t transition-all duration-300 hover:brightness-105" 
                    style={{ 
                      height: d.regPercent, 
                      backgroundColor: '#E950F7' 
                    }}
                  ></div>
                  {/* Right Bar: completions */}
                  <div 
                    className="w-5 sm:w-6 rounded-t transition-all duration-300 hover:brightness-105" 
                    style={{ 
                      height: d.compPercent, 
                      backgroundColor: '#00C4CC' 
                    }}
                  ></div>
                </div>
              ))}
            </div>

            {/* X axis labels month representation */}
            <div className="absolute left-10 right-0 bottom-0 h-6 flex justify-around items-center pt-2">
              {regAndCompData.map((d, index) => (
                <span key={index} className="text-[10px] font-bold text-[#767587] uppercase w-12 text-center font-raleway">
                  {d.month}
                </span>
              ))}
            </div>
            
          </div>
        </div>

        {/* Shared analytics area/line trend for Daily submission curves */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
          <div className="mb-2">
            <h3 className="font-raleway text-lg font-bold text-gray-800">Daily submissions (VN)</h3>
            <p className="text-xs text-gray-400 mt-1">Timeline representation derived from feedback completions</p>
          </div>

          <div className="w-full h-40 relative">
            <div className="flex w-full h-full gap-4">
              <div className="flex flex-col justify-between items-end pb-8 text-[10px] text-gray-400 font-bold w-3">
                <span>100</span>
                <span>75</span>
                <span>30</span>
                <span>25</span>
                <span>0</span>
              </div>
              <div className="flex-1 relative">
                <svg className="w-full h-[120px] overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 120">
                  <defs>
                    <linearGradient id="feedSubGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#4a53fa" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#4a53fa" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  <line x1="0" y1="0" x2="1000" y2="0" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="30" x2="1000" y2="30" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="60" x2="1000" y2="60" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="90" x2="1000" y2="90" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="120" x2="1000" y2="120" stroke="#D1D5DB" strokeWidth="1.5" />

                  <path d="M 0,110 C 100,120 150,60 250,55 C 350,45 400,85 500,75 C 600,65 650,30 750,35 C 850,40 900,70 1000,60 V 120 H 0 Z" fill="url(#feedSubGradient)" />
                  <path d={dailyPath} fill="none" stroke="#4a53fa" strokeLinecap="round" strokeWidth="3" />
                </svg>
                
                {/* Date overlay */}
                <div className="absolute bottom-0 left-0 w-full flex justify-between text-[10px] text-gray-400 font-bold tracking-wider">
                  <span>01/10</span>
                  <span>05/10</span>
                  <span>10/10</span>
                  <span>15/10</span>
                  <span>20/10</span>
                  <span>25/10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Heat matrix component representation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
            <div>
              <h3 className="font-raleway text-lg font-bold text-gray-800">Registration time (VN)</h3>
              <p className="text-xs text-gray-400 mt-1">Timezone Asia/Ho_Chi_Minh timezone analytics</p>
            </div>

            <div className="flex flex-col mt-4">
              
              <div className="flex mb-2">
                <div className="w-8 mr-3"></div>
                <div className="flex-1 grid grid-cols-24 gap-0.5">
                  <span className="text-[9px] font-bold text-gray-400 text-center">0</span>
                  <span className="col-span-2"></span>
                  <span className="text-[9px] font-bold text-gray-400 text-center">3</span>
                  <span className="col-span-2"></span>
                  <span className="text-[9px] font-bold text-gray-400 text-center">6</span>
                  <span className="col-span-2"></span>
                  <span className="text-[9px] font-bold text-gray-400 text-center">9</span>
                  <span className="col-span-2"></span>
                  <span className="text-[9px] font-bold text-gray-400 text-center">12</span>
                  <span className="col-span-2"></span>
                  <span className="text-[9px] font-bold text-gray-400 text-center">15</span>
                  <span className="col-span-2"></span>
                  <span className="text-[9px] font-bold text-gray-400 text-center">18</span>
                  <span className="col-span-2"></span>
                  <span className="text-[9px] font-bold text-gray-400 text-center">21</span>
                  <span className="col-span-2"></span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                {heatmapDays.map((day) => (
                  <div key={day} className="flex items-center">
                    <span className="w-8 text-[10px] font-bold text-gray-400 text-right mr-3">{day}</span>
                    <div className="flex-1 grid grid-cols-24 gap-1 h-3 flex-wrap">
                      {heatWeights[day].map((weight, index) => (
                        <div 
                          key={index} 
                          className={`h-3 rounded-[2px] transition-all hover:scale-110 cursor-pointer ${getHeatColor(weight)}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-1.5 mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span>Less</span>
                <div className="flex gap-[2px]">
                  <div className="w-2.5 h-2.5 rounded-[2px] bg-blue-50/50"></div>
                  <div className="w-2.5 h-2.5 rounded-[2px] bg-[#b2b4f4]"></div>
                  <div className="w-2.5 h-2.5 rounded-[2px] bg-[#7377eb]"></div>
                  <div className="w-2.5 h-2.5 rounded-[2px] bg-[#2d34e2]"></div>
                </div>
                <span>More</span>
              </div>

            </div>
          </div>

          {/* New responses donut representation */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
            <div>
              <h3 className="font-raleway text-[#1A1F36] text-lg font-bold">Total responses by category</h3>
              <p className="text-xs text-gray-400 mt-1">Breakdown of registration source types</p>
            </div>

            <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-6 py-4">
              
              <div className="relative w-32 h-32 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'conic-gradient(#4A53FA 0% 65%, #E950F7 65% 85%, #FF6105 85% 95%, #FF3B4B 95% 100%)' }}>
                <div className="absolute w-24 h-24 bg-white rounded-full flex items-center justify-center flex-col shadow-inner select-none">
                  <span className="font-raleway text-lg font-black text-gray-800">{category === 'All' ? '14.2k' : formatNum(14208 * mult)}</span>
                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Total</span>
                </div>
              </div>

              <div className="flex-grow w-full sm:w-auto flex flex-col gap-2">
                {categoryResponses.map((item) => (
                  <div key={item.name} className="flex items-center justify-between font-semibold text-xs py-1 hover:bg-gray-50/50 rounded transition-colors px-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-600 font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-gray-800">{formatNum(item.count)}</span>
                      <span className="text-gray-400 w-8 text-right font-medium">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
