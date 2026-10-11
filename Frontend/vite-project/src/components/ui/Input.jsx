import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = ({
  label,
  type = 'text',
  error,
  icon: Icon,
  placeholder,
  value,
  onChange,
  name,
  id,
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', marginBottom: '16px' }}>
      {label && (
        <label
          htmlFor={id || name}
          style={{
            fontSize: '13px',
            fontWeight: '500',
            color: '#a1a1aa',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>
            {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
          </span>
        </label>
      )}

      <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
        {Icon && (
          <div
            style={{
              position: 'absolute',
              left: '14px',
              color: '#71717a',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <Icon size={18} />
          </div>
        )}

        <input
          id={id || name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          style={{
            width: '100%',
            backgroundColor: '#09090b',
            color: '#ffffff',
            border: error ? '1px solid #ef4444' : '1px solid #27272a',
            borderRadius: '12px',
            padding: '12px 14px',
            paddingLeft: Icon ? '42px' : '14px',
            paddingRight: isPassword ? '42px' : '14px',
            fontSize: '14px',
            outline: 'none',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}
          onFocus={(e) => {
            if (!error) e.target.style.borderColor = '#ffffff';
          }}
          onBlur={(e) => {
            if (!error) e.target.style.borderColor = '#27272a';
          }}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '14px',
              background: 'none',
              border: 'none',
              color: '#71717a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0',
            }}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <span style={{ fontSize: '12px', color: '#ef4444', marginTop: '2px' }}>
          {error}
        </span>
      )}
    </div>
  );
};
