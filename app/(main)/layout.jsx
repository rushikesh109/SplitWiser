"use client";

import ChatBot from '@/components/chatbot';
import { Authenticated } from 'convex/react';
import { ThemeProvider } from 'next-themes';
import React from 'react';

const MainLayout = ({ children }) => {
  return (
       <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={false}
      >
    <Authenticated>
      <main className="min-h-screen pt-24 pb-28 px-4 sm:px-6 md:px-8 bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors duration-300">
        <div className="max-w-6xl mx-auto w-full">
          {children}
        </div>
        <ChatBot />
      </main>
    
    </Authenticated>
      </ThemeProvider>
  );
};

export default MainLayout;
