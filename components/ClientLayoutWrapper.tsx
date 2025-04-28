'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './Navbar';

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
  allSectionIds: string[];
  majorSectionIds: string[];
}

type HandleNavClick = (sectionId: string) => void;

const ClientLayoutWrapper: React.FC<ClientLayoutWrapperProps> = ({
  children,
  allSectionIds,
  majorSectionIds,
 }) => {
  // --- Scroll Progress Bar Logic ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // --- Active Section Highlighting Logic ---
  const [activeSection, setActiveSection] = useState<string | null>(majorSectionIds[0] || null);
  const sectionObserverMap = useRef<Map<string, IntersectionObserverEntry | null>>(new Map());
  // REMOVED: isObserverDisabledRef and scrollEndTimeoutRef

  // Function to manually check intersections and update state
  const checkIntersections = useCallback(() => {
    let bestMatchId: string | null = null;
    let minTopBelowHeader = Infinity; // Track the minimum top value for sections below the header
    const headerHeight = 60; // Assuming header height is 60px

    majorSectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const top = rect.top;

        // Check if the section's top is below the header and visible within the viewport
        if (top >= headerHeight && top < window.innerHeight) {
            // Find the section closest to the header (smallest top value >= headerHeight)
            if (top < minTopBelowHeader) {
                minTopBelowHeader = top;
                bestMatchId = id;
            }
        }
    });

    // Fallback to the first section if scrolled very near the top (no section found below header)
    if (bestMatchId === null && window.scrollY < headerHeight) {
        bestMatchId = majorSectionIds[0] || null;
    }

    // Update state only if the best match is found and different
    if (bestMatchId && bestMatchId !== activeSection) {
        setActiveSection(bestMatchId);
    }
  }, [majorSectionIds, activeSection]); // Dependencies

  // Callback for the Intersection Observer
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    // Store the latest entry for each observed element
    entries.forEach(entry => {
        sectionObserverMap.current.set(entry.target.id, entry);
    });

    // Always run the determination logic
    checkIntersections();

  }, [checkIntersections]); // Depends on the checkIntersections function

  // Set up Intersection Observer for ALL sections
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      // Observe changes happening just below the header and down the viewport
      rootMargin: `-${60}px 0px 0px 0px`, // Top margin is header height, bottom margin 0
      threshold: 0 // Trigger immediately
    });

     allSectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          sectionObserverMap.current.set(id, null); // Initialize map
          observer.observe(element);
        }
      });

    return () => {
      allSectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
      observer.disconnect();
      // REMOVED: Timeout clearing
    };
  }, [allSectionIds, handleIntersection]); // Re-run if section IDs or handler changes

  // --- Navigation Click Handler ---
  const handleNavClick: HandleNavClick = useCallback((sectionId) => {
    // REMOVED: Timeout clearing

    setActiveSection(sectionId); // Set active section immediately
    // REMOVED: isObserverDisabledRef.current = true;

    // Programmatic scroll (Keep)
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 64; // Adjust for sticky header
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    // REMOVED: Timeout logic to re-enable observer

  }, []); // Removed checkIntersections dependency

  // --- Generate Nav Items from MAJOR Section IDs ---
  const navItems = majorSectionIds.map(id => ({
    label: id.replace(/-/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
    href: id
  }));

  return (
    <>
      {/* Sticky Navbar - Pass the new handler */}
      <Navbar navItems={navItems} activeSection={activeSection} handleNavClick={handleNavClick} />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed left-0 right-0 h-[5px] origin-left z-[60]"
        style={{ scaleX, backgroundColor: 'var(--color-primary)' }}
      />

      {/* Main Content */}
      <main>{children}</main>

      {/* Optional Footer */}
      <footer className="py-6 mt-12 border-t" style={{ borderColor: 'var(--color-border)'}}>
         <div className="container max-w-4xl mx-auto px-4 text-center text-sm" style={{ color: 'var(--color-muted-foreground)'}}>
            Research Project - Prastab Ghimire - HON 303 - {new Date().getFullYear()}
         </div>
      </footer>
    </>
  );
};

export default ClientLayoutWrapper;