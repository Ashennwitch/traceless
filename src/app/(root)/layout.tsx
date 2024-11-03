'use client';

// src/app/(root)/layout.tsx
import dynamic from 'next/dynamic';
import { ClerkProvider } from '@clerk/nextjs';
import Footer from "../../components/Footer";
import '../globals.css';

const Navbar = dynamic(() => import('../../components/Navbar'), { ssr: false });

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
            <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            </body>
            </html>
        </ClerkProvider>
    );
}
