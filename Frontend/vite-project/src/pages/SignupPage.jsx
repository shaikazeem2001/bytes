import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { SignupForm } from '../components/auth/SignupForm';
import signupHeroImg from '../assets/signup_hero.jpeg';

export const SignupPage = () => {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join the Bytes communication platform"
      galaxyTitle="Cosmic Data Infrastructure"
      galaxySubtitle="Empowering modern engineering teams with high-speed secure collaboration."
      sideImage={signupHeroImg}
    >
      <SignupForm />
    </AuthLayout>
  );
};
