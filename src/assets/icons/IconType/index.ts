import { DetailedHTMLProps, SVGAttributes } from 'react';

export interface IconProps extends DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> {
  active?: boolean;
  dimensions?: { width?: number; height?: number };
  color?: string;
}
