import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      await register(username, email, password);
      setSuccess('Account created! Logging you in...');
      
      // Auto login after registration
      setTimeout(async () => {
        try {
          await login(email, password);
          navigate('/dashboard');
        } catch (loginErr) {
          navigate('/login');
        }
      }, 1000);
    } catch (err) {
      const message =
        err.response?.data?.message || 'Registration failed. Please check your inputs.';
      setError(message);
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

      {success && (
        <div
          style={{
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '12px',
            padding: '12px 14px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#86efac',
            fontSize: '13px',
          }}
        >
          <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
          <span>{success}</span>
        </div>
      )}

      <Input
        label="Username"
        type="text"
        placeholder="alex_dev"
        icon={User}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="alex@bytes.app"
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
          Create Account
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
        Already have an account?{' '}
        <Link
          to="/login"
          style={{
            color: '#ffffff',
            fontWeight: '600',
            textDecoration: 'none',
          }}
        >
          Sign in
        </Link>
      </div>
    </form>
  );
};
