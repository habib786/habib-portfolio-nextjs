"use client";

import { Box, Container, Grid, Skeleton, Stack } from "@mui/material";

export default function ProjectsLoading() {
  return (
    <Box
      sx={{
        bgcolor: "var(--background)",
        minHeight: "100vh",
        pb: { xs: 10, md: 20 },
      }}
    >
      <Box
        sx={{
          bgcolor: "var(--primary)",
          position: "relative",
          pt: { xs: 12, md: 20 },
          pb: { xs: 20, md: 30 },
          overflow: "hidden",
          color: "white",
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 6, md: 4 }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Skeleton
                variant="text"
                width="40%"
                height={80}
                sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
              />
              <Skeleton
                variant="text"
                width="60%"
                height={80}
                sx={{ bgcolor: "rgba(255,255,255,0.2)", mt: -2 }}
              />
              <Skeleton
                variant="rectangular"
                width={150}
                height={40}
                sx={{
                  bgcolor: "rgba(255,255,255,0.15)",
                  borderRadius: 1,
                  mt: 4,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Skeleton
                variant="rounded"
                sx={{ height: { xs: 250, md: 350 }, borderRadius: 4 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ mt: { xs: 8, md: 12 } }}>
        <Box sx={{ px: { md: 4 } }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">
            {[...Array(6)].map((_, i) => (
              <Box key={i} className={i % 2 === 1 ? "md:translate-y-48" : ""}>
                <Skeleton
                  variant="rounded"
                  sx={{
                    height: { xs: 280, md: i % 2 === 0 ? 480 : 400 },
                    borderRadius: "10px",
                  }}
                />
              </Box>
            ))}
          </div>
        </Box>
      </Container>
    </Box>
  );
}
