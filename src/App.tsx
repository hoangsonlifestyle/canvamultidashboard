import React, { useState } from 'react';
import { CategoryFilter, DateRange } from './types';
import LoginScreen from './components/LoginScreen';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import RunrateDashboard from './components/RunrateDashboard';
import RegistrationDashboard from './components/RegistrationDashboard';
import FeedbackDashboard from './components/FeedbackDashboard';

export default function App() {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');

  // Tab State: 'runrate' | 'registration' | 'feedback'
  const [currentTab, setCurrentTab] = useState<'runrate' | 'registration' | 'feedback'>('runrate');

  // Filters State
  const [category, setCategory] = useState<CategoryFilter>('All');
  const [dateRange, setDateRange] = useState<DateRange>({
    label: 'Start date — End date',
    startDate: null,
    endDate: null,
  });

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    // Reset filters
    setCategory('All');
    setDateRange({
      label: 'Start date — End date',
      startDate: null,
      endDate: null,
    });
    // Default to runrate tab
    setCurrentTab('runrate');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white text-[#1a1c1c] antialiased">
      {/* Sidebar on left */}
      <Sidebar 
        currentTab={currentTab} 
        onChangeTab={setCurrentTab} 
        onLogout={handleLogout} 
      />

      {/* Main Content Pane on right */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header containing Filters and user Profile */}
        <Header 
          currentTab={currentTab}
          onChangeTab={setCurrentTab}
          category={category}
          onChangeCategory={setCategory}
          dateRange={dateRange}
          onChangeDateRange={setDateRange}
          userEmail={userEmail}
          onLogout={handleLogout}
        />

        {/* Dynamic active Dashboard View portals */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {currentTab === 'runrate' && (
            <RunrateDashboard 
              category={category} 
              dateRange={dateRange} 
            />
          )}

          {currentTab === 'registration' && (
            <RegistrationDashboard 
              category={category} 
              dateRange={dateRange} 
            />
          )}

          {currentTab === 'feedback' && (
            <FeedbackDashboard 
              category={category} 
              dateRange={dateRange} 
            />
          )}
        </main>
      </div>
    </div>
  );
}
