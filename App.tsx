import React, { useState, useEffect } from 'react';
import MathChallenge from './components/MathChallenge';
import DemoChat from './components/DemoChat';
import LandingPage from './components/LandingPage';

type AppState = 'landing' | 'login' | 'chat';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('nangula-ai-token');
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      if (parsedToken.expiry > Date.now()) {
        setToken(parsedToken.value);
        setAppState('chat'); // Go directly to chat if already logged in
      } else {
        localStorage.removeItem('nangula-ai-token');
      }
    }
  }, []);

  const handleLoginSuccess = (jwt: string) => {
    const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    const tokenData = { value: jwt, expiry };
    localStorage.setItem('nangula-ai-token', JSON.stringify(tokenData));
    setToken(jwt);
    setAppState('chat');
  };

  const handleLogout = () => {
    localStorage.removeItem('nangula-ai-token');
    setToken(null);
    setAppState('landing'); // Go back to landing page on logout
  };

  const handleTryDemo = () => {
    setAppState('login');
  };

  const renderContent = () => {
    switch(appState) {
      case 'landing':
        return <LandingPage onTryDemo={handleTryDemo} />;
      case 'login':
        return <MathChallenge onLoginSuccess={handleLoginSuccess} />;
      case 'chat':
        return <DemoChat onLogout={handleLogout} onGoHome={() => setAppState('landing')} />;
      default:
        return <LandingPage onTryDemo={handleTryDemo} />;
    }
  }

  return (
    <div className="bg-[#E0E0E0] text-[#2D2D2D] min-h-screen antialiased">
      {renderContent()}
    </div>
  );
};

export default App;
