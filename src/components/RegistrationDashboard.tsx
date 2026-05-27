import React, { useState } from 'react';
import { 
  MapPin, 
  Globe, 
  HelpCircle, 
  ArrowUpRight,
  MoreVertical,
  MousePointer,
  Heart
} from 'lucide-react';
import { CategoryFilter, DateRange, RegionDistribution, IndustryDistribution } from '../types';

interface RegistrationDashboardProps {
  category: CategoryFilter;
  dateRange: DateRange;
}

export default function RegistrationDashboard({ category, dateRange }: RegistrationDashboardProps) {
  const [activeGeoTab, setActiveGeoTab] = useState<'location' | 'industry'>('location');
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

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

  // KPI source state
  const kpiTotalResponses = 14208 * mult;
  const kpiUniqueRegistrations = 11845 * mult;

  const locationsData: RegionDistribution[] = [
    { name: 'Ho Chi Minh City', registrations: Math.round(5230 * mult), percentage: 36.8, type: 'local' },
    { name: 'Hanoi', registrations: Math.round(3845 * mult), percentage: 27.0, type: 'local' },
    { name: 'Da Nang', registrations: Math.round(1120 * mult), percentage: 7.8, type: 'local' },
    { name: 'Khác/Other (Vietnam)', registrations: Math.round(2850 * mult), percentage: 20.0, type: 'local' },
    { name: 'International', registrations: Math.round(1163 * mult), percentage: 8.4, type: 'international' },
  ];

  const industryData: IndustryDistribution[] = [
    { name: 'Retail / E-com', registrations: Math.round(3978 * mult), percentage: 28.0 },
    { name: 'F&B Services', registrations: Math.round(3125 * mult), percentage: 22.0 },
    { name: 'Creative Agency', registrations: Math.round(2841 * mult), percentage: 20.0 },
    { name: 'IT & Software', registrations: Math.round(2131 * mult), percentage: 15.0 },
    { name: 'Others', registrations: Math.round(2133 * mult), percentage: 15.0 },
  ];

  const categoryResponses = [
    { name: 'Regular', count: Math.round(9235 * mult), percentage: 65, color: '#4A53FA' },
    { name: 'Partner', count: Math.round(2842 * mult), percentage: 20, color: '#E950F7' },
    { name: 'Offline event', count: Math.round(1421 * mult), percentage: 10, color: '#FF6105' },
    { name: 'Other', count: Math.round(710 * mult), percentage: 5, color: '#FF3B4B' },
  ];

  // Modules height representation
  const modules = [
    { name: 'Module 1', height: '75%', color: '#00C4CC' },
    { name: 'Module 2', height: '75%', color: '#4A53FA' },
    { name: 'Module 3', height: '85%', color: '#992BFF' },
    { name: 'Module 4', height: '45%', color: '#E950F7' },
    { name: 'Module 5', height: '55%', color: '#13A3B5' },
  ];

  // Daily submissions data VN SVG plotting coordinates
  const dailyPath = "M 0,105 C 100,115 150,55 250,50 C 350,45 400,85 500,75 C 600,65 650,25 750,30 C 850,35 900,65 1000,60";

  // Real-time registration heatmap hours monolith
  const heatmapDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Matrix weights mapping to simulate different purple-blue intensities
  // Mon to Sun, 24 values each
  const heatWeights: Record<string, number[]> = {
    'Mon': [1,1,1,1,2,3,4,4,3,2,1,1,2,3,4,3,2,1,1,1,1,1,1,1],
    'Tue': [1,1,1,1,2,3,4,4,3,2,1,1,2,3,4,3,2,1,1,1,1,1,1,1],
    'Wed': [1,1,1,1,2,3,4,4,3,2,1,1,2,3,4,3,2,1,1,1,1,1,1,1],
    'Thu': [1,1,1,1,2,3,4,4,3,2,1,1,2,3,4,3,2,1,1,1,1,1,1,1],
    'Fri': [1,1,1,1,2,3,4,4,3,2,1,1,2,3,4,3,2,1,1,1,1,1,1,1],
    'Sat': [1,1,1,1,2,3,4,4,3,2,1,1,2,3,4,3,2,1,1,1,1,1,1,1],
    'Sun': [1,1,1,1,2,3,4,4,3,2,1,1,2,3,4,3,2,1,1,1,1,1,1,1],
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

  return (
    <div className="flex-1 overflow-y-auto bg-[#F9F9F9] p-4 md:p-10 pt-28 md:pt-28 pb-24 min-h-screen">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-raleway text-[30px] leading-[24px] font-extrabold text-[#1A1F36] tracking-tight">
              Registration Analytics
            </h1>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Learner demographics and acquisition insights. <span className="font-semibold text-[#4A53FA]">({category} Category)</span>
            </p>
          </div>
        </div>

        {/* Bento Grid KPIs with colored upper borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* KPI 1 */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all duration-300 border-t-4 border-t-[#00C4CC] relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#00C4CC]/5 rounded-full group-hover:scale-150 transition-all duration-500"></div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-raleway">Total Responses</p>
            <div className="flex items-end gap-3.5">
              <h3 className="font-raleway text-[26px] font-extrabold text-gray-800">{formatNum(kpiTotalResponses)}</h3>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-0.5 mb-1.5 shrink-0 select-none">
                ↑ 12%
              </span>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all duration-300 border-t-4 border-t-[#7D2AE8] relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#7D2AE8]/5 rounded-full group-hover:scale-150 transition-all duration-500"></div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-raleway">Unique Registrations</p>
            <div className="flex items-end gap-3.5">
              <h3 className="font-raleway text-[26px] font-extrabold text-gray-800">{formatNum(kpiUniqueRegistrations)}</h3>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-0.5 mb-1.5 shrink-0 select-none">
                ↑ 8%
              </span>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all duration-300 border-t-4 border-t-[#E950F7] relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#E950F7]/5 rounded-full group-hover:scale-150 transition-all duration-500"></div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-raleway">TOP Channel</p>
            <div className="flex items-end justify-between w-full h-10">
              <h3 className="font-raleway text-[26px] font-black text-gray-800 truncate">Fanpage</h3>
              <span className="text-[10px] font-bold text-gray-500 mb-1.5 select-none shrink-0 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded">
                42% Total
              </span>
            </div>
          </div>

          {/* KPI 4 */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all duration-300 border-t-4 border-t-[#4A53FA] relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#4A53FA]/5 rounded-full group-hover:scale-150 transition-all duration-500"></div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-raleway">Top Industry</p>
            <div className="flex items-end justify-between w-full h-10">
              <h3 className="font-raleway text-[26px] font-bold text-gray-800 truncate max-w-[120px]">Retail & E-com</h3>
              <span className="text-[10px] font-bold text-gray-500 mb-1.5 select-none shrink-0 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded">
                28% Total
              </span>
            </div>
          </div>

        </div>

        {/* Main Charts Grid Block */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Registration by Module - Span 2 Columns */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm lg:col-span-2 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-raleway text-lg font-bold text-gray-800">Registration by Module</h3>
                <p className="text-xs text-gray-400 mt-1">Average allocations per course chapter modules</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
            </div>

            {/* Custom Interactive Module graph */}
            <div className="flex-grow min-h-[220px] relative flex flex-col justify-end">
              <div className="flex-1 flex gap-4 h-48 border-b border-l border-gray-200 relative px-4 pb-1">
                {/* Y Axis Indicators */}
                <div className="absolute left-[-26px] top-0 bottom-0 flex flex-col justify-between text-[10px] text-gray-400 font-bold">
                  <span>4k</span>
                  <span>3k</span>
                  <span>2k</span>
                  <span>1k</span>
                  <span>0</span>
                </div>

                {/* Dashed Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pr-4">
                  <div className="w-full border-t border-dashed border-gray-100 h-0"></div>
                  <div className="w-full border-t border-dashed border-gray-100 h-0"></div>
                  <div className="w-full border-t border-dashed border-gray-100 h-0"></div>
                  <div className="w-full border-t border-dashed border-[#F1F5F9] h-0"></div>
                </div>

                {/* Modules bars */}
                {modules.map((m) => {
                  const isHovered = hoveredModule === m.name;
                  return (
                    <div 
                      key={m.name}
                      onMouseEnter={() => setHoveredModule(m.name)}
                      onMouseLeave={() => setHoveredModule(null)}
                      className="flex-1 flex flex-col justify-end group/mod cursor-pointer relative items-center"
                    >
                      <div 
                        className="w-10 sm:w-12 hover:brightness-95 transition-all duration-300 rounded-t shadow-sm relative"
                        style={{ 
                          height: m.height, 
                          backgroundColor: m.color,
                          opacity: hoveredModule && !isHovered ? 0.45 : 1
                        }}
                      >
                        {isHovered && (
                          <div className="absolute top-[-26px] left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[9px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap z-30">
                            {formatNum(14208 * mult * (parseFloat(m.height) / 100))} responses
                          </div>
                        )}
                      </div>
                      <span className="absolute bottom-[-22px] text-[10px] font-bold text-gray-400 uppercase">
                        {m.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="h-6"></div>
          </div>

          {/* Channel doughnut layout */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-raleway text-lg font-bold text-gray-800">Channel Sources</h3>
                <p className="text-xs text-gray-400 mt-1">Primary response mediums</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative my-4">
              {/* Conic-gradient Donut Chart */}
              <div 
                className="relative w-36 h-36 rounded-full flex items-center justify-center shadow-md border border-gray-50" 
                style={{ 
                  background: 'conic-gradient(#00C4CC 0% 45%, #5f39fe 45% 75%, #E950F7 75% 90%, #e2e8f0 90% 100%)' 
                }}
              >
                <div className="absolute w-26 h-26 bg-white rounded-full flex items-center justify-center flex-col shadow-inner">
                  <span className="font-raleway text-2xl font-black text-gray-800">45%</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Fanpage</span>
                </div>
              </div>

              {/* Legend List */}
              <div className="w-full mt-6 flex flex-col gap-2 text-xs font-semibold">
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00C4CC]"></div>
                    <span className="text-gray-700 font-medium">Fanpage</span>
                  </div>
                  <span className="text-gray-800 font-bold">45%</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#5f39fe]"></div>
                    <span className="text-gray-700 font-medium">Partner</span>
                  </div>
                  <span className="text-gray-800 font-bold">30%</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E950F7]"></div>
                    <span className="text-gray-700 font-medium">Community</span>
                  </div>
                  <span className="text-gray-800 font-bold">15%</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                    <span className="text-gray-700 font-medium">Khác/Other</span>
                  </div>
                  <span className="text-gray-800 font-bold">10%</span>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Bottom Area: Age & Previous Usage / Geography & Industry */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Demographics vertical stack */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm flex flex-col gap-6">
            
            {/* Age distribution */}
            <div>
              <h3 className="font-raleway text-lg font-bold text-gray-800 mb-4">
                Age Distribution
              </h3>
              <div className="space-y-3 font-semibold">
                
                <div className="flex items-center gap-3 text-xs md:text-sm">
                  <span className="w-12 text-gray-500 text-right">18-24</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00C4CC] to-[#4A53FA] rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <span className="w-8 text-right font-bold text-gray-800">25%</span>
                </div>

                <div className="flex items-center gap-3 text-xs md:text-sm">
                  <span className="w-12 text-gray-500 text-right">25-34</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00C4CC] to-[#4A53FA] rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="w-8 text-right font-bold text-gray-800">45%</span>
                </div>

                <div className="flex items-center gap-3 text-xs md:text-sm">
                  <span className="w-12 text-gray-500 text-right">35-44</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00C4CC] to-[#4A53FA] rounded-full opacity-60" style={{ width: '20%' }}></div>
                  </div>
                  <span className="w-8 text-right font-bold text-gray-800">20%</span>
                </div>

                <div className="flex items-center gap-3 text-xs md:text-sm">
                  <span className="w-12 text-gray-500 text-right font-medium">45+</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00C4CC] to-[#4A53FA] rounded-full opacity-35" style={{ width: '10%' }}></div>
                  </div>
                  <span className="w-8 text-right font-bold text-gray-800">10%</span>
                </div>

              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Previous Canva experience */}
            <div>
              <h3 className="font-raleway text-lg font-bold text-gray-800 mb-4">
                Previous Canva Usage
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100/50 transition-colors">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">New Users</p>
                  <p className="text-xl font-bold text-[#1A1F36]">34%</p>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100/50 transition-colors">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Existing (Sometimes)</p>
                  <p className="text-xl font-bold text-[#1A1F36]">42%</p>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl col-span-2 flex items-center justify-between hover:bg-gray-100/50 transition-colors">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 font-raleway">Existing (Pro)</p>
                    <p className="text-xl font-bold text-[#7D2AE8]">24%</p>
                  </div>
                  <span className="text-[10px] bg-green-100 text-green-700 font-extrabold uppercase px-2.5 py-1 rounded-full">
                    High Value
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Geography & Industry selection view */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-raleway text-lg font-bold text-gray-800 mb-3 block">
                Top Regions &amp; Industries
              </h3>
              
              {/* Tabs */}
              <div className="flex gap-4 border-b border-[#F1F5F9] mb-4">
                <button 
                  onClick={() => setActiveGeoTab('location')}
                  className={`pb-2.5 text-xs md:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                    activeGeoTab === 'location' 
                      ? 'text-[#4A53FA] border-b-[#4A53FA]' 
                      : 'text-gray-400 border-b-transparent hover:text-gray-600'
                  }`}
                >
                  By Location
                </button>
                <button 
                  onClick={() => setActiveGeoTab('industry')}
                  className={`pb-2.5 text-xs md:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                    activeGeoTab === 'industry' 
                      ? 'text-[#4A53FA] border-b-[#4A53FA]' 
                      : 'text-gray-400 border-b-transparent hover:text-gray-600'
                  }`}
                >
                  By Industry
                </button>
              </div>
            </div>

            {/* List Tab tables */}
            {activeGeoTab === 'location' ? (
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                      <th className="py-2.5 font-bold">Region/City</th>
                      <th className="py-2.5 font-bold text-right">Registrations</th>
                      <th className="py-2.5 font-bold text-right">% of Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-gray-700">
                    {locationsData.map((loc, index) => (
                      <tr key={index} className="border-b last:border-0 border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="py-3 flex items-center gap-2 font-semibold">
                          {loc.type === 'local' ? (
                            <MapPin className="w-4 h-4 text-[#4A53FA]" />
                          ) : (
                            <Globe className="w-4 h-4 text-purple-500" />
                          )}
                          <span className="text-[#1a1c1c]">{loc.name}</span>
                        </td>
                        <td className="py-3 text-right font-medium">{formatNum(loc.registrations)}</td>
                        <td className="py-3 text-right font-bold text-gray-600">{loc.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                      <th className="py-2.5 font-bold">SME Industry Segment</th>
                      <th className="py-2.5 font-bold text-right">Registrations</th>
                      <th className="py-2.5 font-bold text-right">% of Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-gray-700">
                    {industryData.map((ind, index) => (
                      <tr key={index} className="border-b last:border-0 border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="py-3 font-semibold text-gray-800">{ind.name}</td>
                        <td className="py-3 text-right font-medium">{formatNum(ind.registrations)}</td>
                        <td className="py-3 text-right font-bold text-gray-600">{ind.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
              <span>Showing top representation sets</span>
            </div>
          </div>

        </div>

        {/* Daily Submissions VN Curved Area SVG Graph */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="font-raleway text-lg font-bold text-gray-800">Daily submissions (VN)</h3>
            <p className="text-xs text-gray-400 mt-1">Acquisition timeline represented via date filters</p>
          </div>

          <div className="w-full h-40 relative">
            <div className="flex w-full h-full gap-4">
              
              {/* Y Axis indicators */}
              <div className="flex flex-col justify-between items-end pb-8 text-[10px] text-[#767587] font-bold w-8">
                <span>100</span>
                <span>75</span>
                <span>50</span>
                <span>25</span>
                <span className="translate-y-[2px]">0</span>
              </div>

              {/* Canvas layout */}
              <div className="flex-1 relative">
                <svg className="w-full h-[120px] overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 120">
                  <defs>
                    <linearGradient id="chartGradientMain" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#4a53fa" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#4a53fa" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Guideline indicators */}
                  <line x1="0" y1="0" x2="1000" y2="0" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="30" x2="1000" y2="30" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="60" x2="1000" y2="60" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="90" x2="1000" y2="90" stroke="#F1F5F9" strokeWidth="1" />
                  
                  {/* Baseline indicator */}
                  <line x1="0" y1="120" x2="1000" y2="120" stroke="#D1D5DB" strokeWidth="1.5" />

                  {/* Polygon Gradient Fills curves */}
                  <path d="M 0,105 C 100,115 150,55 250,50 C 350,45 400,85 500,75 C 600,65 650,25 750,30 C 850,35 900,65 1000,60 V 120 H 0 Z" fill="url(#chartGradientMain)" />
                  <path d={dailyPath} fill="none" stroke="#4a53fa" strokeLinecap="round" strokeWidth="3" />

                </svg>

                {/* X Axis overlay text labels */}
                <div className="absolute bottom-0 left-0 w-full flex justify-between text-[10px] text-[#767587] font-bold tracking-wider">
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

        {/* Dynamic heatmap grids registration times and sources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-stretch">
          
          {/* Heatmap registration source */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
            <div>
              <h3 className="font-raleway text-lg font-bold text-gray-800">Registration time (VN)</h3>
              <p className="text-xs text-gray-400 mt-1">Timezone Asia/Ho_Chi_Minh analytics</p>
            </div>

            <div className="flex flex-col mt-4">
              
              {/* Hours timeline index block */}
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

              {/* Weekend Heat Matrix lines */}
              <div className="flex flex-col gap-1">
                {heatmapDays.map((day) => (
                  <div key={day} className="flex items-center">
                    <span className="w-8 text-[10px] font-bold text-gray-400 text-right mr-3">{day}</span>
                    <div className="flex-1 grid grid-cols-24 gap-1 h-3 flex-wrap">
                      {heatWeights[day].map((weight, index) => (
                        <div 
                          key={index} 
                          title={`${day} Hour ${index}: weight ${weight}`}
                          className={`h-3 rounded-[2px] transition-all hover:scale-110 cursor-pointer ${getHeatColor(weight)}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Heat map indicator legends */}
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

          {/* New responses by category donut representation */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
            <div>
              <h3 className="font-raleway text-[#1A1F36] text-lg font-bold">Total responses by category</h3>
              <p className="text-xs text-gray-400 mt-1">Breakdown of registration source types</p>
            </div>

            <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-6 py-4">
              
              {/* Conic representation donut layout background overlay */}
              <div className="relative w-32 h-32 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'conic-gradient(#4A53FA 0% 65%, #E950F7 65% 85%, #FF6105 85% 95%, #FF3B4B 95% 100%)' }}>
                <div className="absolute w-24 h-24 bg-white rounded-full flex items-center justify-center flex-col shadow-inner select-none">
                  <span className="font-raleway text-lg font-black text-gray-800">{category === 'All' ? '14.2k' : formatNum(14208 * mult)}</span>
                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Total</span>
                </div>
              </div>

              {/* Categories list indicators */}
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
