import React, { useState, useEffect } from 'react';
import MathChallenge from './components/MathChallenge';
import DemoChat from './components/DemoChat';

type AppState = 'login' | 'chat';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('login');
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('nangula-ai-token');
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      if (parsedToken.expiry > Date.now()) {
        setToken(parsedToken.value);
        setAppState('chat');
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
    setAppState('login');
  };

  return (
    <div className="bg-[#f9f9f9] text-gray-800 min-h-screen antialiased">
      {appState === 'login' ? (
        <MathChallenge onLoginSuccess={handleLoginSuccess} />
      ) : (
        <DemoChat onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;