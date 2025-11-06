import React, { useState, useEffect, useCallback } from 'react';
import { MathChallengeData } from '../types';

interface MathChallengeProps {
  onLoginSuccess: (token: string) => void;
}

const Logo: React.FC = () => (
    <img 
        src="https://gemsweb.xyz/wp-content/uploads/2025/10/Nangula-logo.png" 
        alt="Nangula AI Logo" 
        className="w-48 h-auto mx-auto mb-6"
    />
);

const MathChallenge: React.FC<MathChallengeProps> = ({ onLoginSuccess }) => {
  const [challenge, setChallenge] = useState<MathChallengeData | null>(null);
  const [answer, setAnswer] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateChallenge = useCallback(() => {
    setError('');
    setAnswer('');
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setChallenge({
      sessionId: `session-${Date.now()}`,
      question: `What is ${num1} + ${num2}?`,
    });
    setCorrectAnswer(num1 + num2);
  }, []);

  useEffect(() => {
    generateChallenge();
  }, [generateChallenge]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (parseInt(answer, 10) === correctAnswer) {
        // Simulate successful JWT generation
        const dummyToken = `dummy-jwt-for-demo-${Date.now()}`;
        onLoginSuccess(dummyToken);
      } else {
        setError('Incorrect answer. Please try again.');
        generateChallenge();
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f9f9f9]">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white shadow-xl rounded-2xl">
        <Logo />
        <div className="text-center">
            <h1 className="text-xl font-bold text-gray-800">
                Quick Access
            </h1>
            <p className="mt-2 text-sm text-gray-600">
                To protect against bots, please solve this simple question.
            </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="answer" className="block text-md font-bold text-center text-gray-800">
              {challenge?.question}
            </label>
            <input
              id="answer"
              name="answer"
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
              className="mt-4 block w-full px-4 py-3 bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] text-lg text-center rounded-lg placeholder-gray-500 transition-colors"
              placeholder="Your Answer"
              autoFocus
            />
          </div>

          {error && <p className="text-sm text-center text-red-500">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading || !answer}
              className="group relative w-full flex justify-center py-3 px-4 text-sm font-bold text-white bg-[#D4A017] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4A017] rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-150 ease-in-out"
            >
              {isLoading ? 'Verifying...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MathChallenge;