'use client'; // Framer Motion requires client components

import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';

const defaultVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const MotionDiv = ({ children, className, ...props }: { children: React.ReactNode, className?: string, props?: any }) => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={defaultVariants} className={className} {...props}>
    {children}
  </motion.div>
);

export const MotionH1 = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.h1 initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={defaultVariants} className={className}>
    {children}
  </motion.h1>
);

export const MotionH2 = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={defaultVariants} className={className}>
    {children}
  </motion.h2>
);
export const MotionH3 = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={defaultVariants} className={className}>
    {children}
  </motion.h3>
);
export const MotionP = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={defaultVariants} className={className}>
    {children}
  </motion.p>
);

export const MotionUl = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.ul initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={defaultVariants} className={className}>
    {children}
  </motion.ul>
);

export const MotionLi = ({ children, className, ...props }: { children: React.ReactNode, className?: string } & HTMLMotionProps<'li'>) => (
  <motion.li
    variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
    className={className}
    {...props} // Spread the rest of the props (including id) onto the motion.li
  >
    {children}
  </motion.li>
);

// Wrapper for images if you want to animate them too
export const MotionImg = ({ src, alt, className }: { src: string, alt: string, className?: string }) => (
   <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={defaultVariants}>
    <img src={src} alt={alt} className={className} loading="lazy" />
   </motion.div>
);