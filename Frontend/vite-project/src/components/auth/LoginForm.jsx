import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      const message =
        err.response?.data?.message || 'Invalid credentials or server error. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {error && (
        <div
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            padding: '12px 14px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#fca5a5',
            fontSize: '13px',
          }}
        >
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      <Input
        label="Email Address"
        type="email"
        placeholder="name@company.com"
        icon={Mail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        icon={Lock}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div style={{ marginTop: '8px', marginBottom: '24px' }}>
        <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
          Sign In to Workspace
        </Button>
      </div>

      <div
        style={{
          textAlign: 'center',
          fontSize: '13px',
          color: '#a1a1aa',
          borderTop: '1px solid #27272a',
          paddingTop: '20px',
        }}
      >
        Don't have an account?{' '}
        <Link
          to="/signup"
          style={{
            color: '#ffffff',
            fontWeight: '600',
            textDecoration: 'none',
          }}
        >
          Create account
        </Link>
      </div>
    </form>
  );
};
