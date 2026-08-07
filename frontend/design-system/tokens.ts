/**
 * JS mirror of design-system/tokens.css, for contexts that can't read
 * CSS custom properties: metadata (theme-color), generated OG images.
 * Component styling should use Tailwind utilities, not these values
 * directly — tokens.css is canonical. Keep this file's hex values in
 * sync with tokens.css by hand.
 */

export const colors = {
  navy950: '#0f1b30',
  navy900: '#17253f',
  navy700: '#2c3e63',
  navy500: '#62759e',
  cream50: '#fbf7ee',
  cream100: '#f4efe1',
  cream200: '#eae0c8',
  gold400: '#d9b166',
  gold500: '#c2953a',
  gold600: '#9c7527',
  ink: '#201d17',
} as const;

export const fonts = {
  display: "'Fraunces', ui-serif, Georgia, 'Times New Roman', serif",
  body: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
} as const;
