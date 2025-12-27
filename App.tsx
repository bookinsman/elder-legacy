
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { AppView } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);

  return (
    <div className="min-h-screen">
      {view === AppView.LANDING ? (
        <LandingPage onStart={() => setView(AppView.DASHBOARD)} />
      ) : (
        <Dashboard onBack={() => setView(AppView.LANDING)} />
      )}
    </div>
  );
};

export default App;
