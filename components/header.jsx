"use client";

import { useStoreUser } from '@/hooks/use-store-user';
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import React from 'react'
import {BarLoader } from "react-spinners"

const Header = () => {

  const {isLoading } = useStoreUser();

  return (
    <header className="fixed top-0 w-full border bg-white/95 backdrop-blur z-50 supports-[backdrop-filter]:bg:white/60">
    <nav>
      <SignedOut>
              <SignInButton />
              <SignUpButton>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
    </nav>

    {isLoading && <BarLoader width={"100%"} color="#36d7b7" />}
    </header>
  )
}

export default Header;
