import { useRef, useState, useEffect, ReactNode, RefObject } from 'react';

interface AdaptiveModalProps {
  children: ReactNode;
  styles: string;
  targetElementRef: RefObject<HTMLTableRowElement>;
}

function AdaptiveModal({ children, styles, targetElementRef }: AdaptiveModalProps) {
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

    window.addEventListener('resize', calculatePlacement);
    calculatePlacement();

    return () => {
      window.removeEventListener('resize', calculatePlacement);
    };
  }, []);
  return (
    <div ref={modalRef} className={`absolute ${placement === 'above' ? 'bottom-1/2' : 'top-0'} left-1/2 ${styles}`}>
      {children}
    </div>
  );
}

export default AdaptiveModal;
