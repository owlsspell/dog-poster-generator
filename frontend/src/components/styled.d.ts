declare module "@mui/material/styles" {
  interface Theme {
    palette: {
      mode: string;
      primary: { main: string };
      background: { default: string; paper: string };
      text: {
        primary: string;
        secondary: string;
      };
    };
  }

  interface ThemeOptions {
    palette?: {
      mode?: string;
      primary?: { main?: string };
      background?: {
        default?: string;
        paper?: string;
      };
      text?: {
        primary?: string;
        secondary?: string;
      };
    };
  }
}
