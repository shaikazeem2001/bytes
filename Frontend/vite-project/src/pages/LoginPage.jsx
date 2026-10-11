import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { LoginForm } from '../components/auth/LoginForm';
import loginHeroImg from '../assets/login_hero.jpeg';

export const LoginPage = () => {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your Bytes communication account"
      galaxyTitle="Milky Galaxy Network"
      galaxySubtitle="Connecting decentralized teams with low-latency token-verified messaging."
      sideImage={loginHeroImg}
    >
      <LoginForm />
    </AuthLayout>
  );
};
