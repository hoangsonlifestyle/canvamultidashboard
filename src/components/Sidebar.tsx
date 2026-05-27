import React from 'react';
import { TrendingUp, UserPlus, MessageSquare, LogOut, GraduationCap, LayoutDashboard } from 'lucide-react';

interface SidebarProps {
  currentTab: 'runrate' | 'registration' | 'feedback';
  onChangeTab: (tab: 'runrate' | 'registration' | 'feedback') => void;
  onLogout: () => void;
}

export default function Sidebar({ currentTab, onChangeTab, onLogout }: SidebarProps) {
  return (
    <aside id="sidebar" className="hidden md:flex flex-col w-[260px] h-screen sticky top-0 left-0 bg-white border-r border-[#E2E8F0] shadow-sm z-50 shrink-0">
      {/* Brand & Logo Area */}
      <div className="p-6 border-b border-[#F1F5F9] flex flex-col gap-1.5 justify-center">
        <div className="flex items-center gap-2 mb-1">
          <img 
            alt="Canva Academy for SMEs Logo" 
            className="h-9 w-auto object-contain" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi1P0H8rI7zJkaSyrP5gugx_9hZ5SG7nomdK7k5QrYGwT_XTubLPJIDYrRBnMypxROvWUjM64N5xKH6Qcc2cRgF02wOP2DDjQvgv1huG3mCrGjHU23lkI2cSu5bIhp2i1E0WGhoumnhYy102C0NDteEeLzMlm2HEnZr6WdZGRu6BhLUwP2MEBTugibPaXketFdX9M2SYxZO996T2w4aw8iceHba3p3LVGKvNbrOZqY0vgavmM18mpJM0iFxjJTEBLHqgif1Cp2JQeF-hw"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Navigation list */}
      <nav className="flex-1 flex flex-col gap-2 p-4 font-body-md text-sm">
        {/* Runrate Option */}
        <button 
          onClick={() => onChangeTab('runrate')}
          className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold transition-all duration-200 transform active:scale-95 text-left w-full cursor-pointer group ${
            currentTab === 'runrate' 
              ? 'bg-gradient-to-r from-[#138EFF] to-[#4A53FA] text-white shadow-md' 
              : 'text-[#454556] hover:bg-gray-50 hover:text-[#1A1F36]'
          }`}
        >
          <TrendingUp className={`w-5 h-5 transition-transform duration-200 ${currentTab === 'runrate' ? 'text-white' : 'text-[#767587] group-hover:text-[#4A53FA]'}`} />
          <span>Runrate</span>
        </button>

        {/* Registration Option */}
        <button 
          onClick={() => onChangeTab('registration')}
          className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold transition-all duration-200 transform active:scale-95 text-left w-full cursor-pointer group ${
            currentTab === 'registration' 
              ? 'bg-gradient-to-r from-[#138EFF] to-[#4A53FA] text-white shadow-md' 
              : 'text-[#454556] hover:bg-gray-50 hover:text-[#1A1F36]'
          }`}
        >
          <UserPlus className={`w-5 h-5 transition-transform duration-200 ${currentTab === 'registration' ? 'text-white' : 'text-[#767587] group-hover:text-[#4A53FA]'}`} />
          <span>Registration</span>
        </button>

        {/* Feedback Option */}
        <button 
          onClick={() => onChangeTab('feedback')}
          className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold transition-all duration-200 transform active:scale-95 text-left w-full cursor-pointer group ${
            currentTab === 'feedback' 
              ? 'bg-gradient-to-r from-[#138EFF] to-[#4A53FA] text-white shadow-md' 
              : 'text-[#454556] hover:bg-gray-50 hover:text-[#1A1F36]'
          }`}
        >
          <MessageSquare className={`w-5 h-5 transition-transform duration-200 ${currentTab === 'feedback' ? 'text-white' : 'text-[#767587] group-hover:text-[#4A53FA]'}`} />
          <span>Feedback</span>
        </button>
      </nav>

      {/* Footer / Logout Area */}
      <div className="p-4 border-t border-[#F1F5F9] bg-[#FAFBFB]">
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 cursor-pointer text-left"
        >
          <LogOut className="w-4 h-4 text-red-500" />
          <span>Log out account</span>
        </button>
      </div>
    </aside>
  );
}
