import type { DetailedHTMLProps, HTMLAttributes } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gmp-map-3d': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, string>;
      'gmp-marker-3d-interactive': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, string>;
    }
  }
}
export {};
