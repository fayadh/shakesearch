// declare module '@mui/material/styles' {
//   interface Palette {
//     border: {
//       primary: string;
//     };
//   }

//   interface PaletteOptions {
//     border?: {
//       primary?: string;
//     };
//   }
// }

import { Theme } from '@mui/material/styles';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
