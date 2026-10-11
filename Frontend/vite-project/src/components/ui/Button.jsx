import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer px-5 py-3 text-sm';

  const variants = {
    primary:
      'bg-white text-black hover:bg-zinc-200 active:scale-[0.99] font-semibold shadow-lg shadow-white/5 focus:ring-white',
    secondary:
      'bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 active:scale-[0.99] focus:ring-zinc-500',
    outline:
      'bg-transparent text-zinc-300 border border-zinc-800 hover:border-zinc-600 hover:text-white active:scale-[0.99] focus:ring-zinc-400',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      style={{
        width: fullWidth ? '100%' : 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '12px 20px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '600',
        transition: 'all 0.2s ease',
        backgroundColor: variant === 'primary' ? '#ffffff' : variant === 'secondary' ? '#18181b' : 'transparent',
        color: variant === 'primary' ? '#000000' : '#ffffff',
        border: variant === 'outline' || variant === 'secondary' ? '1px solid #27272a' : 'none',
        opacity: disabled || isLoading ? 0.6 : 1,
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
      }}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" size={18} style={{ animation: 'spin 1s linear infinite' }} />}
      {children}
    </button>
  );
};
