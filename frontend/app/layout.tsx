import type { Metadata } from "next";
import {  Geist, Geist_Mono } from "next/font/google";
import "./globals.css";  
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./landingpage/sidebar";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food Share",
  description: "Help people in need! feed hunger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

 
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
        <SidebarProvider>
        <AppSidebar />
        <main className="container mx-4">
          <article className="w-full p-4">
            <SidebarTrigger className="mb-4" />
            {children}
            <Toaster></Toaster>
          </article>
        </main>
      </SidebarProvider>
      </body>
    </html>
  );
}
