import { wpx, hpx } from './utils/dimensions';

export type ThemeMods = 'dark' | 'light';

export const themeVariantsConst = [
  'primary',
  'secondary',
  'text',
  'background',
] as const;

export type ThemeVariants = (typeof themeVariantsConst)[number];

export type FontVariants =
  | 'h1'
  | 'h2'
  | 'body-large'
  | 'body-medium'
  | 'body-small';

export type FontWeights = 'bold' | 'semi-bold' | 'regular';

export type BaseTheme = {
  typography: {
    fonts: Record<Fonts, string>;
    sizes: Record<FontVariants, number>;
  };
  colors: Record<string, string>;
  sizing: {
    'base-width': number;
    'base-height': number;
  };
};

export type ColorTheme = Record<ThemeVariants, string>;

export type Fonts = 'bold' | 'semi-bold' | 'regular';

export const createTheme = (theme: ThemeMods): ColorTheme => {
  const isLightMode = theme === 'light';

  return {
    primary: isLightMode ? '#EF626C' : '#a2474d',
    secondary: isLightMode ? '#fc9094' : '#e58487',
    text: isLightMode ? '#202327' : '#FFFFFF',
    background: isLightMode ? '#fff1f0' : '#29191b',
  };
};

export const baseTheme: BaseTheme = {
  typography: {
    fonts: {
      bold: 'Poppins-Bold',
      'semi-bold': 'Poppins-Medium',
      regular: 'Poppins-Regular',
    },
    sizes: {
      h1: 32,
      h2: 20,
      'body-large': 18,
      'body-medium': 16,
      'body-small': 14,
    },
  },
  colors: {
    black: '#202327',
    white: '#FFFFFF',
    error: '#DB1414',
    success: '#20C53C',
  },
  sizing: {
    'base-width': wpx(4),
    'base-height': hpx(4),
  },
};
