import React from 'react';

interface SectionContainerProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ id, children, className = '' }) => {
  return (
    // Using Tailwind utilities for padding and margin - these should work fine
    <section id={id} className={`py-12 md:py-8 scroll-mt-20 ${className}`}>
      {/* Using Tailwind container and max-width */}
      <div className="container max-w-4xl mx-auto px-4">
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;