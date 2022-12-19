import { PaletteMode } from "@mui/material";
import colors from "./palette";
const { dark, light } = colors;

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: { main: light[900] },
          background: {
            default: light[50],
            paper: light[900],
            hover: light[400],
          },
          text: {
            primary: light[900],
            secondary: light[600],
          },
        }
      : {
          primary: { main: dark[900] },
          background: {
            default: dark[900],
            paper: dark[500],
            hover: dark[400],
          },
          text: {
            primary: dark[200],
            secondary: dark[100],
          },
        }),
  },
});

export default getDesignTokens;
