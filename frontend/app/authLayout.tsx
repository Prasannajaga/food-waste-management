'use client';

import { useEffect, useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './landingpage/sidebar';

export default function ClientLayout({
  children}: {
  children: React.ReactNode; 
}) {
  // State to track logged-in status based on localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Sync with localStorage on mount
  useEffect(() => {
    const loggedIn = Boolean(localStorage.getItem('loggedIn'));
    setIsLoggedIn(loggedIn);
  }, []);

  return isLoggedIn ? (
    <SidebarProvider>
      <AppSidebar />
      <main className="container mx-4">
        <article className="w-full p-4">
          <SidebarTrigger className="mb-4" />
          {children}
        </article>
      </main>
    </SidebarProvider>
  ) : (
    <>{children}</>
  );
}