/**
 * JS mirror of design-system/tokens.css, for contexts that can't read
 * CSS custom properties: metadata (theme-color), generated OG images.
 * Component styling should use Tailwind utilities, not these values
 * directly — tokens.css is canonical. Keep this file's hex values in
 * sync with tokens.css by hand.
 */

export const colors = {
  ember500: '#db4126',
  ember600: '#b9311b',
  ember800: '#9a2219',
  ember900: '#6e1610',
  ember700: '#7d3528',
  ember950: '#511f19',
  gold300: '#f5d676',
  gold400: '#f0c847',
  cream50: '#f7f2e8',
  cream100: '#efe6d4',
  cream200: '#e2d6be',
  ink: '#141414',
  ink800: '#2a2724',
} as const;

export const fonts = {
  display: "'Fraunces', ui-serif, Georgia, 'Times New Roman', serif",
  displayItalic: "'Fraunces', ui-serif, Georgia, 'Times New Roman', serif",
  body: "'Work Sans', ui-sans-serif, system-ui, -apple-system, sans-serif",
} as const;
