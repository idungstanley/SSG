import { useRef, useState, useEffect, ReactNode } from 'react';

interface AdaptiveModalProps {
  children: ReactNode;
  styles: string;
}

function AdaptiveModal({ children, styles }: AdaptiveModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const targetElementRef = useRef<HTMLDivElement>(null);
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

        if (spaceBelow >= modalElement.offsetHeight) {
          setPlacement('below');
        } else if (spaceAbove >= modalElement.offsetHeight) {
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
    <div ref={targetElementRef} className="relative">
      <div ref={modalRef} className={`absolute ${placement === 'above' ? 'bottom-1/2' : 'top-0'} left-1/2 ${styles}`}>
        {children}
      </div>
    </div>
  );
}

export default AdaptiveModal;
