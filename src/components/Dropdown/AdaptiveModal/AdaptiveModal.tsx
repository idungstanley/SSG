import React, { useRef, useState, useEffect, ReactNode, RefObject } from 'react';

interface AdaptiveModalProps {
  children: ReactNode;
  styles: string;
  targetElementRef: RefObject<HTMLTableCellElement>;
  toggleFn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdaptiveModal({ children, styles, targetElementRef, toggleFn }: AdaptiveModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState<'above' | 'below'>('below');

  useEffect(() => {
    const calculatePlacement = () => {
      const modalElement = modalRef.current;
      const targetElement = targetElementRef.current;

      if (modalElement && targetElement) {
        const targetRect = targetElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const scrollY = window.scrollY || window.pageYOffset;

        const spaceBelow = viewportHeight - (targetRect.bottom - scrollY);
        const spaceAbove = targetRect.top - scrollY;

        if (spaceBelow >= modalElement.offsetHeight && spaceAbove >= modalElement.offsetHeight) {
          // Both space below and space above are sufficient
          // Decide placement based on which space has more room
          if (spaceBelow > spaceAbove) {
            setPlacement('below');
          } else {
            setPlacement('above');
          }
        } else if (spaceBelow >= modalElement.offsetHeight) {
          // Only space below is sufficient
          setPlacement('below');
        } else if (spaceAbove >= modalElement.offsetHeight) {
          // Only space above is sufficient
          setPlacement('above');
        }
      }
    };

    calculatePlacement();

    const handleResize = () => {
      calculatePlacement();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, [targetElementRef]);

  const modalStyles = `absolute ${
    placement === 'above' ? 'bottom-full' : 'top-1/2'
  } left-1/2 bg-white z-50 transform -translate-x-1/2 ${styles}`;

  return (
    <div ref={modalRef} className={modalStyles} onMouseLeave={() => toggleFn(false)}>
      {children}
    </div>
  );
}
