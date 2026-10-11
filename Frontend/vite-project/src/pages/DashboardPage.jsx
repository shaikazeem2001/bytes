import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosInstance';
import { LogOut, UserCheck, Shield, Users, RefreshCw, Key } from 'lucide-react';
import { Button } from '../components/ui/Button';
import logoImg from '../assets/logo.jpeg';

export const DashboardPage = () => {
  const { user, logout, accessToken } = useAuth();
  const [usersList, setUsersList] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchUsers = async () => {
    setLoadingUsers(true);
    setErrorMsg('');
    try {
      const response = await api.get('/getusers');
      setUsersList(response.data.allusers || []);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to fetch users list');
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Navigation */}
      <header
        style={{
          borderBottom: '1px solid #27272a',
          backgroundColor: '#09090b',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={logoImg}
            alt="Logo"
            style={{
              height: '40px',
              maxWidth: '160px',
              objectFit: 'contain',
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#18181b',
              border: '1px solid #27272a',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '13px',
              color: '#a1a1aa',
            }}
          >
            <UserCheck size={16} style={{ color: '#22c55e' }} />
            <span style={{ color: '#ffffff', fontWeight: '600' }}>{user?.username}</span>
            <span>({user?.email})</span>
          </div>

          <Button variant="outline" onClick={logout} style={{ padding: '8px 14px', fontSize: '13px' }}>
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          maxWidth: '1100px',
          width: '100%',
          margin: '0 auto',
          padding: '36px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* Welcome Hero Banner */}
        <div
          className="animate-fade-in"
          style={{
            backgroundColor: '#09090b',
            border: '1px solid #27272a',
            borderRadius: '24px',
            padding: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#38bdf8',
                fontSize: '12px',
                fontWeight: '700',
                marginBottom: '8px',
                letterSpacing: '0.5px',
              }}
            >
              <Shield size={14} />
              AUTHENTICATED SESSION ACTIVE
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px', color: '#ffffff' }}>
              Welcome back, {user?.username}! 👋
            </h1>
            <p style={{ fontSize: '14px', color: '#a1a1aa', maxWidth: '600px' }}>
              Your connection to the Bytes backend is secured with dual-token authentication (In-memory Access Token + HttpOnly Refresh Cookie).
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#121215',
              border: '1px solid #27272a',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              minWidth: '220px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#a1a1aa' }}>
              <Key size={14} style={{ color: '#c084fc' }} />
              In-Memory Access Token
            </div>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                color: '#22c55e',
                wordBreak: 'break-all',
                maxHeight: '36px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {accessToken ? `${accessToken.substring(0, 24)}...` : 'Active'}
            </div>
          </div>
        </div>

        {/* Protected Users List Section */}
        <div
          style={{
            backgroundColor: '#09090b',
            border: '1px solid #27272a',
            borderRadius: '24px',
            padding: '28px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Users size={20} style={{ color: '#ffffff' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff' }}>
                Protected Users Directory
              </h3>
            </div>

            <Button variant="secondary" onClick={fetchUsers} isLoading={loadingUsers} style={{ padding: '8px 14px', fontSize: '13px' }}>
              <RefreshCw size={14} />
              Refresh Directory
            </Button>
          </div>

          {errorMsg && (
            <div style={{ padding: '14px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5', borderRadius: '12px', fontSize: '13px', marginBottom: '16px' }}>
              {errorMsg}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
            {usersList.map((u) => (
              <div
                key={u._id}
                style={{
                  backgroundColor: '#121215',
                  border: '1px solid #1c1c21',
                  borderRadius: '16px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: '#18181b',
                    border: '1px solid #27272a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    color: '#ffffff',
                    fontSize: '16px',
                  }}
                >
                  {u.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff' }}>{u.username}</div>
                  <div style={{ fontSize: '12px', color: '#a1a1aa' }}>{u.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
