import { useThrottle } from './useThrottle';

/**
 * Hook that wraps a function with throttling to be triggered on scroll events.
 * @param {VoidFunction} func - The function to be called on scroll events.
 * @returns {VoidFunction} - The wrapped function with throttling applied.
 */
export const useScroll = (func: VoidFunction): VoidFunction => useThrottle(func, 500);
