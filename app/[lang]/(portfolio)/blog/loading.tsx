"use client";

import { Box, Container, Grid, Skeleton, Stack } from "@mui/material";

export default function BlogLoading() {
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
                width="35%"
                height={80}
                sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
              />
              <Skeleton
                variant="text"
                width="50%"
                height={80}
                sx={{ bgcolor: "rgba(255,255,255,0.2)", mt: -2 }}
              />
              <Skeleton
                variant="text"
                width="70%"
                height={30}
                sx={{ bgcolor: "rgba(255,255,255,0.2)", mt: 4 }}
              />
              <Skeleton
                variant="text"
                width="60%"
                height={30}
                sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Skeleton
                variant="rounded"
                sx={{ height: 380, borderRadius: "30%" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container
        maxWidth="xl"
        sx={{ mt: { xs: -10, md: -15 }, position: "relative", zIndex: 10 }}
      >
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 4,
            p: { xs: 3, md: 6 },
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          }}
        >
          <Stack spacing={1} sx={{ mb: { xs: 6, md: 10 } }}>
            <Skeleton variant="text" width={150} height={20} />
            <Skeleton variant="text" width="40%" height={50} />
            <Skeleton variant="text" width="50%" height={50} />
          </Stack>

          <Grid container spacing={5}>
            <Grid size={{ xs: 12, lg: 8 }}>
              <Stack spacing={3}>
                {[...Array(4)].map((_, i) => (
                  <Skeleton
                    key={i}
                    variant="rounded"
                    sx={{ height: 280, borderRadius: 3 }}
                  />
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <Stack spacing={3}>
                <Skeleton
                  variant="rounded"
                  sx={{ height: 300, borderRadius: 3 }}
                />
                <Skeleton
                  variant="rounded"
                  sx={{ height: 200, borderRadius: 3 }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
