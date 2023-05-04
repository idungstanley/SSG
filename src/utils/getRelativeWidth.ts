const windowWidth = window.innerWidth;

export const getRelativeWidth = (percent: number) => Math.round(windowWidth * (percent / 100)) + 'px';
