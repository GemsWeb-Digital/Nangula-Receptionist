import React, { useState, useEffect, useCallback } from 'react';
import { MathChallengeData } from '../types';

interface MathChallengeProps {
  onLoginSuccess: (token: string) => void;
}

const Logo: React.FC = () => (
    <img 
        src="https://gemsweb.xyz/wp-content/uploads/2025/10/Nangula-logo.png" 
        alt="Nangula AI Logo" 
        className="w-48 h-auto mx-auto mb-6 drop-shadow-sm"
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

    setTimeout(() => {
      if (parseInt(answer, 10) === correctAnswer) {
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
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="neuro-card w-full max-w-sm p-8 space-y-6">
        <Logo />
        <div className="text-center">
            <h1 className="text-xl font-bold text-[#2D2D2D]">
                Quick Access
            </h1>
            <p className="mt-2 text-sm text-[#6B6B6B]">
                To protect against bots, please solve this simple question.
            </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="answer" className="block text-lg font-bold text-center text-[#2D2D2D]">
              {challenge?.question}
            </label>
            <input
              id="answer"
              name="answer"
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
              className="neuro-input mt-4 text-lg text-center"
              placeholder="Your Answer"
              autoFocus
            />
          </div>

          {error && <p className="text-sm text-center text-red-500">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading || !answer}
              className="neuro-button-accent w-full"
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
