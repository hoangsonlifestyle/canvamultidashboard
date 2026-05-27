import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  PieChart as PieChartIcon, 
  Flag, 
  Target as TargetIcon, 
  Banknote,
  TrendingUp,
  TriangleAlert,
  Info
} from 'lucide-react';
import { CategoryFilter, DateRange, TerminationReason } from '../types';

interface RunrateDashboardProps {
  category: CategoryFilter;
  dateRange: DateRange;
}

export default function RunrateDashboard({ category, dateRange }: RunrateDashboardProps) {
  // Category multiplier to dynamic-scale dashboard values
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
  
  // Format numbers nicely
  const formatNum = (val: number) => {
    return Math.round(val).toLocaleString('en-US');
  };

  // Base values for stats
  const baseTargetClasses = 12450;
  const baseUniqueLearners = 84200;
  const baseTargetClassesLimit = 15000;
  const baseUniqueLearnersLimit = 100000;
  const baseVoucherValue = 240; // in Millions

  // Live state values scaled
  const valTargetClasses = baseTargetClasses * mult;
  const valUniqueLearners = baseUniqueLearners * mult;
  const valTargetClassesLimit = baseTargetClassesLimit * mult;
  const valUniqueLearnersLimit = baseUniqueLearnersLimit * mult;
  const valVoucherValue = baseVoucherValue * mult;

  // Let's add tooltip hover state for charts
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);
  const [hoveredPoints, setHoveredPoints] = useState<{ x: number, y: number, month: string } | null>(null);

  const terminationReasons: TerminationReason[] = [
    { reason: 'No time available', count: Math.round(342 * mult), impact: 'High' },
    { reason: 'The program is no longer relevant', count: Math.round(215 * mult), impact: 'Med' },
    { reason: 'The content is not engaging', count: Math.round(189 * mult), impact: 'Low' },
    { reason: 'There are other plans', count: Math.round(84 * mult), impact: 'High' },
    { reason: 'Other reasons', count: Math.round(45 * mult), impact: 'Low' },
  ];

  // Learner Growth vs Target coordinates (simulate 6 points: Jan - Jun)
  const lineChartData = [
    { month: 'JAN', value: Math.round(12000 * mult), target: Math.round(15000 * mult) },
    { month: 'FEB', value: Math.round(24000 * mult), target: Math.round(25000 * mult) },
    { month: 'MAR', value: Math.round(42000 * mult), target: Math.round(40000 * mult) },
    { month: 'APR', value: Math.round(55000 * mult), target: Math.round(58000 * mult) },
    { month: 'MAY', value: Math.round(71000 * mult), target: Math.round(72000 * mult) },
    { month: 'JUN', value: Math.round(84200 * mult), target: Math.round(84200 * mult) },
  ];

  // Bar chart data classes vs targets by month (Jan - Dec)
  const barChartData = [
    { month: 'Jan', actual: 30, target: 33 },
    { month: 'Feb', actual: 32, target: 34 },
    { month: 'Mar', actual: 35, target: 37 },
    { month: 'Apr', actual: 39, target: 40 },
    { month: 'May', actual: 41, target: 42 },
    { month: 'Jun', actual: 44, target: 45 },
    { month: 'Jul', actual: 45, target: 46 },
    { month: 'Aug', actual: 47, target: 48 },
    { month: 'Sep', actual: 47, target: 49 },
    { month: 'Oct', actual: 48, target: 50 },
    { month: 'Nov', actual: 44, target: 46 },
    { month: 'Dec', actual: 49, target: 51 },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-dot-grid p-6 md:p-10 pt-28 md:pt-28 pb-24 min-h-screen">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-raleway text-[30px] leading-[24px] font-extrabold text-[#1A1F36] tracking-tight">
              Runrate Overview
            </h1>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Real-time runrate performance and targets. <span className="font-semibold text-[#4A53FA]">({category} Category)</span>
            </p>
          </div>
          {dateRange.startDate && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg py-2 px-3.5 flex items-center gap-2 text-xs text-[#4A53FA] font-semibold">
              <Info className="w-4 h-4 shrink-0" />
              <span>Filtering for: <strong className="font-bold">{dateRange.startDate}</strong> to <strong className="font-bold">{dateRange.endDate}</strong></span>
            </div>
          )}
        </div>

        {/* KPI Cards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Target Classes */}
          <div 
            className="flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 p-6"
            style={{
              background: 'linear-gradient(135deg, rgb(154, 159, 255) 0%, rgb(74, 83, 250) 55%, rgb(46, 53, 237) 100%)',
              borderRadius: '24px',
              boxShadow: 'rgba(74, 83, 250, 0.3) 0px 10px 25px -5px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset'
            }}
          >
            <div className="flex justify-between items-start mb-2 pl-2">
              <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">Target Classes</span>
              <GraduationCap className="w-5 h-5 opacity-90 text-white" />
            </div>
            <div className="pl-2">
              <span className="font-raleway text-[20px] font-extrabold text-white">
                {formatNum(valTargetClasses)}
              </span>
            </div>
            <div className="pl-2 mt-3 flex items-center gap-1.5 text-xs text-white/80 font-medium">
              <span className="bg-white/15 px-2 py-0.5 rounded-full text-[10px] font-bold">LIVE</span>
              <span>Classes tracked dynamically</span>
            </div>
          </div>

          {/* Card 2: Target Unique Learners */}
          <div 
            className="flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 p-6"
            style={{
              background: 'linear-gradient(135deg, rgb(162, 210, 255) 0%, rgb(19, 142, 255) 55%, rgb(11, 109, 194) 100%)',
              borderRadius: '24px',
              boxShadow: 'rgba(19, 142, 255, 0.3) 0px 10px 25px -5px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset'
            }}
          >
            <div className="flex justify-between items-start mb-2 pl-2">
              <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">Target Unique Learners</span>
              <Users className="w-5 h-5 opacity-90 text-white" />
            </div>
            <div className="pl-2">
              <span className="font-raleway text-[20px] font-extrabold text-white">
                {formatNum(valUniqueLearners)}
              </span>
            </div>
            <div className="pl-2 mt-3 flex items-center gap-1.5 text-xs text-white/80 font-medium">
              <span className="bg-white/15 px-2 py-0.5 rounded-full text-[10px] font-bold">98.2%</span>
              <span>Active course enrollments</span>
            </div>
          </div>

          {/* Card 3: Ratio of Learners to Target % */}
          <div 
            className="flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 p-6"
            style={{
              background: 'linear-gradient(135deg, rgb(254, 193, 156) 0%, rgb(255, 97, 5) 55%, rgb(208, 73, 0) 100%)',
              borderRadius: '24px',
              boxShadow: 'rgba(255, 97, 5, 0.3) 0px 10px 25px -5px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset'
            }}
          >
            <div className="flex justify-between items-start pl-2 mb-2">
              <span className="text-xs font-semibold text-white/85 uppercase tracking-widest">Ratio of Learners to Target %</span>
              <PieChartIcon className="w-5 h-5 opacity-90 text-white" />
            </div>
            <div className="pl-2">
              <span className="font-raleway text-[20px] font-extrabold text-white">92.4%</span>
            </div>
            <div className="pl-2 mt-3 flex items-center gap-1 text-white/90 text-xs font-bold uppercase tracking-wider">
              <span>Healthy range (90-110%)</span>
            </div>
          </div>

          {/* Card 4: Target Classes progress */}
          <div 
            className="flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 p-6"
            style={{
              background: 'linear-gradient(135deg, rgb(255, 176, 183) 0%, rgb(255, 59, 75) 55%, rgb(197, 37, 50) 100%)',
              borderRadius: '24px',
              boxShadow: 'rgba(255, 59, 75, 0.3) 0px 10px 25px -5px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset'
            }}
          >
            <div className="flex justify-between items-start mb-2 pl-2">
              <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">Target Classes Limit</span>
              <Flag className="w-5 h-5 opacity-90 text-white" />
            </div>
            <div className="pl-2">
              <span className="font-raleway text-[20px] font-extrabold text-white">
                {formatNum(valTargetClassesLimit)}
              </span>
            </div>
            <div className="pl-2 mt-3 flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[10px] text-white/90 font-bold uppercase">
                <span>Monthly milestones reached</span>
                <span>83%</span>
              </div>
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: '83%' }}></div>
              </div>
            </div>
          </div>

          {/* Card 5: Total Unique Learners Limit */}
          <div 
            className="flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 p-6"
            style={{
              background: 'linear-gradient(135deg, #9edcb7 0%, #0ba84a 55%, #078531 100%)',
              borderRadius: '24px',
              boxShadow: 'rgba(11, 168, 74, 0.3) 0px 10px 25px -5px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset'
            }}
          >
            <div className="flex justify-between items-start mb-2 pl-2">
              <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">Total Unique Learners Limit</span>
              <TargetIcon className="w-5 h-5 opacity-90 text-white" />
            </div>
            <div className="pl-2">
              <span className="font-raleway text-[20px] font-extrabold text-white">
                {category === 'All' ? '100k' : formatNum(valUniqueLearnersLimit)}
              </span>
            </div>
            <div className="pl-2 mt-3 flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[10px] text-white/90 font-bold uppercase">
                <span>Unique registration cap</span>
                <span>84.2%</span>
              </div>
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: '84.2%' }}></div>
              </div>
            </div>
          </div>

          {/* Card 6: Total Voucher Value */}
          <div 
            className="flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 p-6"
            style={{
              background: 'linear-gradient(135deg, rgb(247, 181, 253) 0%, rgb(233, 80, 247) 55%, rgb(200, 64, 212) 100%)',
              borderRadius: '24px',
              boxShadow: 'rgba(233, 80, 247, 0.3) 0px 10px 25px -5px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset'
            }}
          >
            <div className="flex justify-between items-start mb-2 pl-2">
              <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">Total Voucher Value</span>
              <Banknote className="w-5 h-5 opacity-80 text-white" />
            </div>
            <div className="pl-2">
              <span className="font-raleway text-[20px] font-extrabold text-white">
                {formatNum(valVoucherValue)}M VNĐ
              </span>
            </div>
            <div className="pl-2 mt-3 flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[10px] text-white/90 font-bold uppercase">
                <span>Fund distribution used</span>
                <span>75%</span>
              </div>
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>

        </div>

        {/* Dashboard Visuals Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Analytics Charts Side Wrapper - Span 2 Columns */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Chart Block 1: Learner Growth vs Target */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col min-h-[380px]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
                <div>
                  <h3 className="font-raleway text-lg font-bold text-gray-800">
                    Learner Growth vs Target
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">SME operations growth curve comparison</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00C4CC]"></div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Actual Growth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200 border border-gray-300"></div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Target Baseline</span>
                  </div>
                </div>
              </div>

              {/* Handcoded elegant SVG Area graph */}
              <div className="flex-1 w-full relative min-h-[220px] flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 600 220" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="600" y2="20" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3" />
                  <line x1="0" y1="70" x2="600" y2="70" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3" />
                  <line x1="0" y1="120" x2="600" y2="120" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3" />
                  <line x1="0" y1="170" x2="600" y2="170" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3" />
                  <line x1="0" y1="210" x2="600" y2="210" stroke="#E2E8F0" strokeWidth="1.5" />

                  <defs>
                    <linearGradient id="growthArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00C4CC" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#00C4CC" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Draw smoothed layout actual values polygon */}
                  {/* points: Jan: 10,200 Feb: 100,180 Mar: 200,140 Apr: 300,100 May: 400,60 Jun: 500,22 */}
                  <path 
                    d="M 10,195 C 100,180 180,145 280,120 C 380,95 450,55 580,45 L 580,210 L 10,210 Z" 
                    fill="url(#growthArea)"
                  />
                  <path 
                    d="M 10,195 C 100,180 180,145 280,120 C 380,95 450,55 580,45" 
                    fill="none" 
                    stroke="url(#growthArea)" 
                    strokeWidth="3.5" 
                    strokeLinecap="round"
                    className="stroke-[#00C4CC]"
                  />

                  {/* Draw Target dashed curve */}
                  <path 
                    d="M 10,200 C 130,175 250,135 375,95 C 490,65 540,55 580,45" 
                    fill="none" 
                    stroke="#D1D5DB" 
                    strokeWidth="2" 
                    strokeDasharray="5,5" 
                  />

                  {/* Highlight June endpoints */}
                  <circle cx="580" cy="45" r="5" fill="#00C4CC" stroke="white" strokeWidth="2" className="shadow-lg hover:scale-125 transition-transform" />
                </svg>

                {/* X-Axis labels absolute overlay */}
                <div className="absolute bottom-[-10px] left-0 w-full flex justify-between px-3 text-[10px] text-gray-400 font-bold tracking-wider">
                  {lineChartData.map((d, index) => (
                    <span key={index} className="cursor-pointer hover:text-[#4A53FA]">
                      {d.month}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tooltip dynamic assist view */}
              <div className="mt-5 p-3.5 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between text-xs font-semibold text-gray-600">
                <span>Month of JUN target achieved:</span>
                <span className="text-[#00C4CC] font-bold">{formatNum(valUniqueLearners)} learners ({formatNum(84200)} / {formatNum(84200)})</span>
              </div>
            </div>

            {/* Chart Block 2: Classes Growth vs Target */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col min-h-[360px]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
                <div>
                  <h3 className="font-raleway text-lg font-bold text-gray-800">
                    Classes Growth vs Target
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">Monthly breakdown showing classes loaded vs targets set</p>
                </div>
                
                {/* Legends */}
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-[#E950F7]"></div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Classes Delivered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-[#138EFF]"></div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Target Limits</span>
                  </div>
                </div>
              </div>

              {/* Grouped Bar Graph Representation */}
              <div className="flex-grow flex flex-col justify-end mt-4">
                <div className="h-44 w-full flex items-end justify-between border-b border-gray-200 pb-1 relative">
                  
                  {/* Grid Lines Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="w-full h-[1px] bg-gray-50"></div>
                    <div className="w-full h-[1px] bg-gray-50"></div>
                    <div className="w-full h-[1px] bg-gray-100"></div>
                    <div className="w-full h-[1px] bg-gray-100"></div>
                    <div className="w-full h-[1px] bg-transparent"></div>
                  </div>

                  {barChartData.map((d, index) => {
                    const scaledActual = d.actual * mult;
                    const scaledTarget = d.target * mult;
                    
                    // compute heights
                    const actualPercent = Math.max(10, Math.round((scaledActual / d.target) * 90));
                    const targetPercent = Math.max(15, Math.round((scaledTarget / d.target) * 95));

                    const keyStr = d.month.toUpperCase();
                    const isHovered = hoveredMonth === d.month;

                    return (
                      <div 
                        key={index} 
                        className="flex flex-col items-center flex-1 group/bar cursor-pointer"
                        onMouseEnter={() => setHoveredMonth(d.month)}
                        onMouseLeave={() => setHoveredMonth(null)}
                      >
                        <div className="flex items-end gap-[2px] h-32 relative">
                          {/* Delivered bar */}
                          <div 
                            className="w-2.5 sm:w-3.5 rounded-t-sm transition-all duration-300 group-hover/bar:brightness-95 relative"
                            style={{ 
                              height: `${actualPercent}%`, 
                              backgroundColor: '#E950F7',
                              opacity: hoveredMonth && !isHovered ? 0.4 : 1
                            }}
                          >
                            {isHovered && (
                              <div className="absolute top-[-26px] left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[9px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap z-30">
                                {Math.round(scaledActual)}
                              </div>
                            )}
                          </div>
                          {/* Target limit bar */}
                          <div 
                            className="w-2.5 sm:w-3.5 rounded-t-sm transition-all duration-300 group-hover/bar:brightness-95 relative"
                            style={{ 
                              height: `${targetPercent}%`, 
                              backgroundColor: '#138EFF',
                              opacity: hoveredMonth && !isHovered ? 0.4 : 1
                            }}
                          >
                            {isHovered && (
                              <div className="absolute top-[-26px] left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[9px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap z-30">
                                {Math.round(scaledTarget)}
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase">
                          {d.month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Learner Distribution and Top Terminations */}
          <div className="flex flex-col gap-6">
            
            {/* Learner Distribution progress block */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-raleway text-lg font-bold text-gray-800">
                  Learner Distribution
                </h3>
                <p className="text-xs text-gray-400 mt-1">Tier-based allocation metrics</p>
              </div>

              <div className="flex flex-col gap-5 mt-6">
                
                {/* Enterprise Tier */}
                <div>
                  <div className="flex justify-between items-end mb-1.5">
                    <span className="text-xs font-semibold text-gray-700">Enterprise Tier</span>
                    <span className="text-xs font-bold text-[#4A53FA]">45%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#138EFF] to-[#4A53FA] rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>

                {/* Pro Tier */}
                <div>
                  <div className="flex justify-between items-end mb-1.5">
                    <span className="text-xs font-semibold text-gray-700">Pro Tier</span>
                    <span className="text-xs font-bold text-[#00C4CC]">35%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00C4CC] to-[#138EFF] rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>

                {/* Starter Tier */}
                <div>
                  <div className="flex justify-between items-end mb-1.5">
                    <span className="text-xs font-semibold text-gray-700">Starter Tier</span>
                    <span className="text-xs font-bold text-[#E950F7]">15%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#E950F7] rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>

                {/* Free Tier */}
                <div>
                  <div className="flex justify-between items-end mb-1.5">
                    <span className="text-xs font-semibold text-gray-700">Free Tier</span>
                    <span className="text-xs font-bold text-gray-500">5%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#c6c5d9] rounded-full" style={{ width: '5%' }}></div>
                  </div>
                </div>

              </div>

              <div className="mt-6 pt-4 border-t border-gray-50 text-[11px] text-gray-400">
                Calculations based on total {formatNum(valUniqueLearners)} unique learners loaded.
              </div>
            </div>

            {/* Termination Reasons table */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] flex flex-col shadow-sm overflow-hidden flex-1">
              <div className="p-6 border-b border-gray-100 bg-[#FAFBFB]">
                <h3 className="font-raleway text-lg font-bold text-gray-800">
                  Top Termination Reasons
                </h3>
                <p className="text-xs text-gray-400 mt-1">SME feedback on drop-out motivations</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-[#FAFAFA]">
                      <th className="py-3 px-4">Reason</th>
                      <th className="py-3 px-4 text-right">Count</th>
                      <th className="py-3 px-4 text-center">Impact</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-gray-700">
                    {terminationReasons.map((item, index) => (
                      <tr 
                        key={index}
                        className="hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                      >
                        <td className="py-3 px-4 font-semibold text-gray-800">{item.reason}</td>
                        <td className="py-3 px-4 text-right font-medium text-gray-600">{item.count}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            item.impact === 'High' 
                              ? 'bg-red-50 text-[#ba1a1a]' 
                              : item.impact === 'Med' 
                                ? 'bg-orange-50 text-[#FF6105]' 
                                : 'bg-gray-100 text-gray-500'
                          }`}>
                            {item.impact}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
