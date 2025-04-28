'use client'; // Needs client for state updates

import React from 'react';
import Link from 'next/link';
import { cn } from "@/lib/utils"; // From Shadcn setup

// Define the type for the click handler passed from the parent
type HandleNavClick = (sectionId: string) => void;

interface NavbarProps {
  navItems: { label: string; href: string }[];
  activeSection: string | null;
  handleNavClick: HandleNavClick; // Changed from setActiveSection
}

const Navbar: React.FC<NavbarProps> = ({ navItems, activeSection, handleNavClick }) => {
  // Relying on Tailwind utilities + CSS variables defined in globals.css
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-background)' }}> {/* Use CSS vars for explicit color */}
      <div className="container max-w-4xl mx-auto h-16 flex items-center justify-center px-4"> {/* Centered nav items */}
        <div className="flex gap-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={`#${item.href}`} // Link to section IDs
              onClick={(e) => {
                e.preventDefault(); // Prevent default anchor jump before smooth scroll
                handleNavClick(item.href); // Use the passed handler
              }}
              // Basic interactive styling using Tailwind + CSS variable check
              className={cn(
                "text-sm font-medium transition-colors",
                activeSection === item.href
                  ? "text-primary" // Use class for primary color
                  : "text-muted-foreground hover:text-foreground" // Use classes for colors
              )}
              style={{
                 color: activeSection === item.href ? 'var(--color-primary)' : 'var(--color-muted-foreground)' // Optional: Explicit style for color override if needed
              }}
              onMouseEnter={(e) => { if (activeSection !== item.href) e.currentTarget.style.color = 'var(--color-foreground)' }}
              onMouseLeave={(e) => { if (activeSection !== item.href) e.currentTarget.style.color = 'var(--color-muted-foreground)' }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;