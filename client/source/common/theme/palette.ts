import { PaletteOptions } from '@mui/material/styles';

export enum Colors {
  DarkGreen = '#F44336',
  DarkRed = '#263238',
  LightGreen = '#FEF0EF',
  LightRed = '#C7E18F',
  LightWhite = '#ffffff',
  PrimaryTextColor = '#263238',
  White = '#FFFFFF',
  SecondaryTextColor = '#546E7A',
  // TODO: Fix this color
  LightGrey = '#FFFFFF',
}

export const palette: PaletteOptions = {
  background: {
    default: '#f4f6f8',
    paper: Colors.White,
  },
  common: {
    white: Colors.White,
  },
  grey: {
    100: '#B2B2B2',
    200: '#727272',
    300: '#263238',
    50: '#E0E0E0',
  },
  primary: {
    contrastText: Colors.White,
    dark: '#b23823',
    light: '#ff735b',
    main: '#FF5033',
  },
  secondary: {
    dark: Colors.LightGrey,
    light: Colors.LightWhite,
    main: Colors.White,
  },
  success: {
    main: '#4CAf50',
  },
  text: {
    primary: Colors.PrimaryTextColor,
    secondary: Colors.SecondaryTextColor,
  },
  warning: {
    main: '#FF9800',
  },
};

export const profileBackgroundColors = [
  '#FFB69F',
  '#EB9EC3',
  '#CDC0FF',
  '#B4C6FF',
  '#C7E18F',
  '#FFE091',
];

const getColorBasedForIndex = (colorList: string[]) => (index: number) =>
  colorList[index % colorList.length];

export const getProfileColorForIndex = getColorBasedForIndex(profileBackgroundColors);
