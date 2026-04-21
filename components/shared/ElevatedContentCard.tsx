import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

type ElevatedContentCardProps = {
  children: ReactNode;
  padding?: object;
  sx?: object;
};

export default function ElevatedContentCard({
  children,
  padding = { xs: 4, md: 8 },
  sx,
}: ElevatedContentCardProps) {
  return (
    <Box
      sx={{
        bgcolor: "var(--background)",
        p: padding,
        borderRadius: "5px",
        boxShadow: "0 60px 120px rgba(0,0,0,0.1)",
        border: "1px solid rgba(0,0,0,0.05)",
        backgroundImage:
          "linear-gradient(to bottom right, rgba(255,255,255,1), rgba(248,250,252,1))",
        position: "relative",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
