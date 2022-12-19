import {
  Box,
  Button,
  createTheme,
  IconButton,
  PaletteMode,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import "./App.css";
import Dropdown from "./components/Dropdown";
import { getRandomImages } from "./store/slices/BreedSlice";
import ImagesModal from "./components/Modal";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import CustomHeading from "./components/CustomHeading";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import getDesignTokens from "./colorPalette/getPalette";
import { ColorModeContext } from "./context/Context";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const combinations = useSelector(
    (state: RootState) => state.breed.combinations
  );

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function getImages() {
    dispatch(getRandomImages()).then(() => {
      handleOpen();
    });
  }

  const [mode, setMode] = useState<PaletteMode>("light");
  console.log("mode,", mode);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box sx={{ backgroundColor: "background.default" }}>
          <Box
            sx={{
              textAlign: "right",
              pr: 2,
            }}
          >
            <Typography component="span" variant="body2" color="text.secondary">
              {theme.palette.mode} mode
            </Typography>
            <IconButton
              sx={{ ml: 1, color: "text.primary" }}
              onClick={colorMode.toggleColorMode}
              // color="primary"
            >
              {theme.palette.mode === "light" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Box>
          <Container
            maxWidth="md"
            sx={{
              pt: 10,
              minHeight: "100vh",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 1,
                mb: 5,
              }}
            >
              <CustomHeading text="Breed" />
              <CustomHeading text="Sub-breed" />
              <CustomHeading text="Image Count" />

              <Button
                variant="contained"
                sx={{ m: 1, backgroundColor: "background.paper" }}
                onClick={getImages}
              >
                Action
              </Button>

              <ImagesModal open={open} handleClose={handleClose} />
            </Box>

            <Box
              sx={{
                color: "background.hover",
                ".MuiBox-root .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "background.hover",
                },
                ".MuiBox-root .Mui-focused": {
                  color: "text.primary",
                },
              }}
            >
              {combinations.map((item, index) => (
                <Dropdown id={Number(index)} key={"dropdown" + index} />
              ))}
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
