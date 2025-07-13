import { SignIn } from '@clerk/nextjs';
import React from 'react';

const SignInPage = () => {
  return (
    <SignIn routing="path" path="/sign-in" />
  );
};

export default SignInPage;
