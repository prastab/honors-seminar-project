'use client'; // Framer Motion requires client components

import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';

const defaultVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Define a type for the MotionDiv props
type MotionDivProps = {
  children: React.ReactNode;
} & HTMLMotionProps<'div'>;

export const MotionDiv = ({ children, className, variants, initial, whileInView, viewport, ...rest }: MotionDivProps) => (
  <motion.div
    initial={initial ?? "hidden"}
    whileInView={whileInView ?? "visible"}
    viewport={viewport ?? { once: true, amount: 0.3 }}
    variants={variants ?? defaultVariants}
    className={className}
    {...rest}
  >
    {children}
  </motion.div>
);

// --- Other Components ---

// Use a more specific constraint: keyof HTMLElementTagNameMap
type MotionElementProps<T extends keyof HTMLElementTagNameMap> = {
    children: React.ReactNode;
} & HTMLMotionProps<T>;

// Ensure the tag passed (e.g., 'h1') is a valid key in HTMLElementTagNameMap
export const MotionH1 = ({ children, className, ...rest }: MotionElementProps<'h1'>) => (
  <motion.h1 initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={defaultVariants} className={className} {...rest}>
    {children}
  </motion.h1>
);

export const MotionH2 = ({ children, className, ...rest }: MotionElementProps<'h2'>) => (
  <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={defaultVariants} className={className} {...rest}>
    {children}
  </motion.h2>
);

export const MotionH3 = ({ children, className, ...rest }: MotionElementProps<'h3'>) => (
  <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={defaultVariants} className={className} {...rest}>
    {children}
  </motion.h3>
);

export const MotionP = ({ children, className, ...rest }: MotionElementProps<'p'>) => (
  <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={defaultVariants} className={className} {...rest}>
    {children}
  </motion.p>
);

export const MotionUl = ({ children, className, ...rest }: MotionElementProps<'ul'>) => (
  <motion.ul initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={defaultVariants} className={className} {...rest}>
    {children}
  </motion.ul>
);

// MotionLi already correctly uses HTMLMotionProps<'li'> which is fine
export const MotionLi = ({ children, className, ...props }: { children: React.ReactNode, className?: string } & HTMLMotionProps<'li'>) => (
  <motion.li
    variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
    className={className}
    {...props}
  >
    {children}
  </motion.li>
);

// MotionImg wrapper
type MotionImgProps = {
    src: string;
    alt: string;
    imgClassName?: string;
} & Omit<HTMLMotionProps<'div'>, 'children'>;

export const MotionImg = ({ src, alt, className, imgClassName, ...rest }: MotionImgProps) => (
   <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={defaultVariants}
      className={className}
      {...rest}
    >
    <img src={src} alt={alt} className={imgClassName} loading="lazy" />
   </motion.div>
);