import { SignUp } from '@clerk/nextjs';
import React from 'react';

const SignUpPage = () => {
  return (
    <SignUp routing="path" path="/sign-up" />
  );
};

export default SignUpPage;
