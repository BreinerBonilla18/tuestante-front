import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PublicPageMotionProps {
  children: ReactNode;
  revealSections?: boolean;
}

export function PublicPageMotion({ children, revealSections = true }: PublicPageMotionProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!revealSections) return;

    const sections = pageRef.current?.querySelectorAll<HTMLElement>('section, article');
    if (!sections?.length) return;

    sections.forEach((section) => section.classList.add('public-scroll-reveal'));

    if (shouldReduceMotion || !('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('public-scroll-reveal-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('public-scroll-reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [revealSections, shouldReduceMotion]);

  return (
    <motion.div
      ref={pageRef}
      className="public-page-motion"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}>
      {children}
    </motion.div>
  );
}
