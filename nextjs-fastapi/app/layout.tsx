import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import './globals.css'

import { Inter } from "next/font/google";
import Navbar from '@/Components/NavBar';
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: 'Clerk Next.js Quickstart',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter} antialiased`}>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <Navbar />
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}