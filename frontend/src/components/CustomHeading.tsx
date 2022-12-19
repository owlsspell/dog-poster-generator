import { Typography } from "@mui/material";

export default function CustomHeading({ text }: { text: string }) {
  return (
    <Typography
      component="p"
      variant="h6"
      color="text.primary"
      sx={{ m: "auto 15px" }}
    >
      {text}
    </Typography>
  );
}
