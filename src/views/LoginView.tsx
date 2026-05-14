import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Hash } from 'lucide-react';

type Props = {
  onLogin: (name: string, email: string) => void;
};

export default function LoginView({ onLogin }: Props) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(isSignup ? name : 'Manvi', email);
  };

  return (
    <div className="login-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="login-card"
      >
        <div className="login-header">
          <div className="logo">
            <Hash size={32} className="text-accent" />
          </div>
          <h1>{isSignup ? 'Create Account' : 'Welcome back'}</h1>
          <p>The minimal productivity sanctuary for students.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {isSignup && (
            <div className="input-field">
              <User size={18} />
              <input 
                type="text" 
                placeholder="Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
          )}
          <div className="input-field">
            <Mail size={18} />
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-field">
            <Lock size={18} />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="login-btn">
            <span>{isSignup ? 'Sign Up' : 'Sign In'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isSignup ? 'Already have an account?' : 'New here?'}
            <button onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? 'Sign In' : 'Create Account'}
            </button>
          </p>
        </div>
      </motion.div>

      <style>{`
        .login-container {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f7f7f8;
          font-family: 'Inter', sans-serif;
        }

        .login-card {
          width: 100%;
          max-width: 400px;
          background: #fff;
          padding: 48px;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          border: 1px solid #efeff1;
        }

        .login-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .logo {
          margin-bottom: 24px;
          display: flex;
          justify-content: center;
        }

        .text-accent {
          color: #a78bfa;
        }

        .login-header h1 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1b;
          margin-bottom: 8px;
        }

        .login-header p {
          font-size: 0.9rem;
          color: #6e6e73;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .input-field {
          display: flex;
          align-items: center;
          gap: 12px;
          background-color: #f7f7f8;
          border: 1px solid #efeff1;
          border-radius: 8px;
          padding: 12px 16px;
          color: #6e6e73;
          transition: all 0.2s;
        }

        .input-field:focus-within {
          background-color: #fff;
          border-color: #a78bfa;
          color: #a78bfa;
          box-shadow: 0 0 0 4px rgba(167, 139, 250, 0.1);
        }

        .input-field input {
          background: transparent;
          border: none;
          outline: none;
          flex: 1;
          color: #1a1a1b;
          font-size: 0.95rem;
          font-family: inherit;
        }

        .login-btn {
          margin-top: 8px;
          height: 48px;
          background-color: #1a1a1b;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .login-btn:hover {
          background-color: #000;
          transform: translateY(-1px);
        }

        .login-footer {
          margin-top: 32px;
          text-align: center;
        }

        .login-footer p {
          font-size: 0.9rem;
          color: #6e6e73;
        }

        .login-footer button {
          background: none;
          border: none;
          color: #a78bfa;
          font-weight: 600;
          margin-left: 8px;
          cursor: pointer;
        }

        .login-footer button:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
