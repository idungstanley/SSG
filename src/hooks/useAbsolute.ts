import { useEffect, useRef, useState } from 'react';

export interface Cords {
  top: number;
  left: number;
}

/**
 * Hook that calculates the absolute position coordinates of an element based on its relative position.
 * @template T - The type of the update parameter.
 * @param {T} update - The parameter that triggers the enumeration of coordinates.
 * @param {number} blockHeight - The height of the dropdown.
 * @returns {Object} - An object containing a ref and the calculated coordinates.
 *                    - relativeRef: A ref to attach to the element to track its position.
 *                    - cords: An object with the calculated top and left coordinates for absolute positioning.
 */
export function useAbsolute<T>(
  update: T,
  blockHeight: number,
  position?: string
): { cords: Cords; relativeRef: React.RefObject<HTMLDivElement> } {
  const RELATIVE_HEIGHT = 20;

  const relativeRef = useRef<HTMLDivElement>(null);

  const [cords, setCords] = useState<Cords>({ top: 0, left: 0 });

  useEffect(() => {
    const isOverflowBottom = (y: number) => y + RELATIVE_HEIGHT + blockHeight > window.innerHeight;

    const isOverflowTop = (y: number) => y + RELATIVE_HEIGHT < 0;

    if (relativeRef.current) {
      const { x, y } = relativeRef.current.getBoundingClientRect();

      const xCord = x + RELATIVE_HEIGHT;
      const yCord =
        isOverflowBottom(y) || position === 'bottom'
          ? window.innerHeight - blockHeight - RELATIVE_HEIGHT
          : isOverflowTop(y)
          ? RELATIVE_HEIGHT
          : y + RELATIVE_HEIGHT;

      setCords({ top: yCord, left: xCord });
    }
  }, [update]);

  return { relativeRef, cords };
}
