import React, { useState, useRef, useEffect } from 'react';
import { CategoryFilter, DateRange } from '../types';
import { 
  Menu, X, Filter, ChevronDown, Check, Calendar as CalendarIcon,
  ChevronLeft, ChevronRight, LogOut, TrendingUp, UserPlus, MessageSquare 
} from 'lucide-react';

interface HeaderProps {
  currentTab: 'runrate' | 'registration' | 'feedback';
  onChangeTab: (tab: 'runrate' | 'registration' | 'feedback') => void;
  category: CategoryFilter;
  onChangeCategory: (cat: CategoryFilter) => void;
  dateRange: DateRange;
  onChangeDateRange: (range: DateRange) => void;
  userEmail: string;
  onLogout: () => void;
}

export default function Header({
  currentTab,
  onChangeTab,
  category,
  onChangeCategory,
  dateRange,
  onChangeDateRange,
  onLogout
}: HeaderProps) {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const categoryRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const categories: CategoryFilter[] = ['All', 'Regular', 'Partner', 'Offline event', 'Other'];
  
  const datePresets = [
    { label: 'Today' },
    { label: 'Yesterday' },
    { label: 'This week' },
    { label: 'Last week' },
    { label: 'This month' },
    { label: 'Last month' },
    { label: 'This year' },
    { label: 'All time' },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setCategoryOpen(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setDatePickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectPreset = (preset: { label: string }) => {
    setSelectedPreset(preset.label);
  };

  const handleApplyDate = () => {
    if (selectedPreset) {
      onChangeDateRange({ label: selectedPreset, startDate: '01 May 2026', endDate: '31 May 2026' });
    }
    setDatePickerOpen(false);
  };

  const handleResetDate = () => {
    setSelectedPreset(null);
    onChangeDateRange({ label: 'Start date — End date', startDate: null, endDate: null });
    setDatePickerOpen(false);
  };

  return (
    <div className="absolute top-6 left-0 right-0 px-6 lg:px-10 z-[100] flex justify-between items-start pointer-events-none">
      
      {/* Mobile left side (Hamburger) */}
      <div className="flex items-center gap-3 pointer-events-auto mt-1 md:hidden">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-gray-500 bg-white border border-[#E2E8F0] shadow-sm hover:bg-gray-50 rounded-lg cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
        </button>
      </div>

      {/* spacer for desktop */}
      <div className="hidden md:block flex-1"></div>

      {/* Right side controls */}
      <div className="flex flex-wrap justify-end items-center gap-3 pointer-events-auto mt-1 md:mt-0 ml-auto">
        
        {/* Category Dropdown Selection */}
      <div className="relative pointer-events-auto" ref={categoryRef}>
        <button 
          onClick={() => setCategoryOpen(!categoryOpen)}
          className="flex items-center gap-2 bg-white border border-[#E2E8F0] px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors cursor-pointer text-xs md:text-sm text-gray-700 h-10 font-medium"
        >
          <Filter className="w-4 h-4 text-gray-400" />
          <span><strong className="text-[#4A53FA]">{category}</strong></span>
          <ChevronDown className={`w-4 h-4 text-[#767587] transition-transform duration-200 ${categoryOpen ? 'rotate-180' : ''}`} />
        </button>

        {categoryOpen && (
          <div className="absolute right-0 mt-1.5 w-48 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-[60] py-1 animate-slideIn">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onChangeCategory(cat);
                  setCategoryOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-xs md:text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-between ${
                  category === cat ? 'text-[#4A53FA] bg-blue-50/50' : 'text-gray-700'
                }`}
              >
                <span>{cat}</span>
                {category === cat && <Check className="w-4 h-4 text-[#4A53FA]" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Date Range Picker */}
      <div className="relative pointer-events-auto" ref={datePickerRef}>
        <button 
          onClick={() => setDatePickerOpen(!datePickerOpen)}
          className="flex items-center gap-2 bg-white border border-[#E2E8F0] px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors cursor-pointer text-xs md:text-sm text-gray-700 h-10 font-medium"
        >
          <CalendarIcon className="w-4 h-4 text-gray-400" />
          <span className="whitespace-nowrap truncate max-w-[200px]">
            {dateRange.label === 'Start date — End date' ? 'Start date — End date' : dateRange.label}
          </span>
          <ChevronDown className={`w-4 h-4 text-[#767587] transition-transform duration-200 ${datePickerOpen ? 'rotate-180' : ''}`} />
        </button>

        {datePickerOpen && (
          <div className="absolute top-[44px] right-0 w-[280px] sm:w-[500px] bg-white border border-[#E2E8F0] rounded-2xl shadow-xl z-[60] flex flex-col overflow-hidden animate-slideIn">
            <div className="flex flex-col sm:flex-row flex-1">
              
              {/* Left Presets Sidebar */}
              <div className="w-full sm:w-40 border-r border-[#E2E8F0] p-3 flex flex-col gap-1 bg-[#FAFBFB]">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2.5 mb-1.5">Presets</span>
                {datePresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold select-none transition-colors ${
                      selectedPreset === preset.label
                        ? 'text-[#4A53FA] bg-blue-50/80'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Main Calendar View (Structured Mock) */}
              <div className="flex-1 p-4">
                <div className="flex justify-between items-center mb-3">
                  <button type="button" className="p-1 hover:bg-gray-100 rounded-full text-gray-400">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-semibold text-xs md:text-sm text-gray-800 font-raleway">May 2026</span>
                  <button type="button" className="p-1 hover:bg-gray-100 rounded-full text-gray-400">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Weekday indicator */}
                <div className="grid grid-cols-7 gap-y-1 mb-1.5 text-center text-[10px] font-bold text-[#6B7280]">
                  <div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div><div>Su</div>
                </div>

                {/* Days representation */}
                <div className="grid grid-cols-7 gap-y-1 text-center text-xs">
                  {/* Previous Month (April 2026) */}
                  {[27, 28, 29, 30].map(day => (
                    <div key={`prev-${day}`} className="my-0.5">
                      <span className="flex items-center justify-center h-8 w-8 mx-auto text-gray-300 font-medium">{day}</span>
                    </div>
                  ))}
                  
                  {/* May 1 to 11 (Unselected) */}
                  {Array.from({ length: 11 }, (_, i) => i + 1).map((day) => (
                    <div key={day} className="my-0.5">
                      <span className="flex items-center justify-center h-8 w-8 mx-auto text-gray-700 font-medium hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors cursor-pointer">{day}</span>
                    </div>
                  ))}
                  
                  {/* May 12 (Selected Start) */}
                  <div className="my-0.5 bg-[#5A32FA]/10 rounded-l-full relative">
                    <span className="w-8 h-8 flex items-center justify-center mx-auto bg-[#5A32FA] text-white rounded-full font-bold shadow-sm cursor-pointer hover:bg-[#4A20E0] transition-colors relative z-10">12</span>
                  </div>

                  {/* May 13 to 17 (Selected Middle) */}
                  {[13, 14, 15, 16, 17].map((day) => (
                    <div key={day} className="my-0.5 bg-[#5A32FA]/10 font-semibold cursor-pointer text-[#5A32FA] hover:bg-[#5A32FA]/20 transition-colors">
                      <span className="flex items-center justify-center h-8 w-full">{day}</span>
                    </div>
                  ))}

                  {/* May 18 (Selected End) */}
                  <div className="my-0.5 bg-[#5A32FA]/10 rounded-r-full relative">
                    <span className="w-8 h-8 flex items-center justify-center mx-auto bg-[#5A32FA] text-white rounded-full font-bold shadow-sm cursor-pointer hover:bg-[#4A20E0] transition-colors relative z-10">18</span>
                  </div>

                  {/* May 19 to 31 (Unselected) */}
                  {Array.from({ length: 13 }, (_, i) => i + 19).map((day) => (
                    <div key={day} className="my-0.5">
                      <span className="flex items-center justify-center h-8 w-8 mx-auto text-gray-700 font-medium hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors cursor-pointer">{day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Date Selection Footer */}
            <div className="border-t border-[#E2E8F0] p-3 flex justify-between items-center bg-[#FAFBFB]">
              <button 
                onClick={handleResetDate}
                className="text-xs font-semibold text-gray-500 hover:text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Reset
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={() => setDatePickerOpen(false)}
                  className="text-xs font-semibold text-gray-500 hover:text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleApplyDate}
                  className="text-xs font-bold text-white bg-[#4A53FA] hover:bg-[#3A43EA] px-4 py-1.5 rounded-lg shadow-sm transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

      {/* Mobile Drawer Navigation (Visible only when mobileMenuOpen is true) */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 bg-white border border-[#E2E8F0] shadow-xl rounded-2xl z-[80] p-4 flex flex-col gap-3.5 animate-slideDown pointer-events-auto">
          
          {/* Quick selection tabs */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2.5">Dashboard Pages</span>
            <button
              onClick={() => { onChangeTab('runrate'); setMobileMenuOpen(false); }}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg font-bold text-sm ${
                currentTab === 'runrate' ? 'bg-[#5A32FA]/10 text-[#4A53FA]' : 'text-gray-700'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Runrate Overview</span>
            </button>
            <button
              onClick={() => { onChangeTab('registration'); setMobileMenuOpen(false); }}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg font-bold text-sm ${
                currentTab === 'registration' ? 'bg-[#5A32FA]/10 text-[#4A53FA]' : 'text-gray-700'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Registration Analytics</span>
            </button>
            <button
              onClick={() => { onChangeTab('feedback'); setMobileMenuOpen(false); }}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg font-bold text-sm ${
                currentTab === 'feedback' ? 'bg-[#5A32FA]/10 text-[#4A53FA]' : 'text-gray-700'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Feedback Dashboard</span>
            </button>
          </div>

          <hr className="border-gray-100" />

          {/* Quick Filters */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2.5">Category Filter</span>
            <div className="grid grid-cols-2 gap-1.5 px-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onChangeCategory(cat)}
                  className={`text-xs px-2.5 py-2 font-medium border rounded-md transition-colors ${
                    category === cat 
                      ? 'border-[#4A53FA] text-[#4A53FA] bg-blue-50/50' 
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Logout Option */}
          <button 
            onClick={onLogout}
            className="flex items-center justify-center gap-2.5 text-xs font-semibold text-red-600 border border-red-100 bg-red-50/50 px-4 py-2.5 rounded-lg"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out account</span>
          </button>
        </div>
      )}
    </div>
  );
}
