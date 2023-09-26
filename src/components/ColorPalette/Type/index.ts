export interface HSLColor {
  a?: number;
  h: number;
  l: number;
  s: number;
}

export interface RGBColor {
  a?: number;
  b: number;
  g: number;
  r: number;
}

export type Color = string | HSLColor | RGBColor;

export interface ColorResult {
  hex: string;
  hsl: HSLColor;
  rgb: RGBColor;
}
