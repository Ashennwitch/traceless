// src/components/ui/Navbar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <div className="text-green-600 text-2xl font-bold">
                    <Link href="/">Traceless</Link>
                </div>

                {/* Menu Toggle Button (Mobile) */}
                <button
                    className="block md:hidden text-gray-600 focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>

                {/* Links */}
                <div className={`md:flex items-center space-x-8 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
                    <Link href="#features" className="text-gray-700 hover:text-green-600 transition">
                        Features
                    </Link>
                    <Link href="#about" className="text-gray-700 hover:text-green-600 transition">
                        About
                    </Link>
                    <Link href="#contact" className="text-gray-700 hover:text-green-600 transition">
                        Contact
                    </Link>
                    <Link href="#get-started" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition">
                        Get Started
                    </Link>

                    {/* Conditionally Render Sign In / User Button */}
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
}
