import {
  Container,
  Typography,
  Box,
  Stack,
  Link as MuiLink,
} from "@mui/material";

export default function SitemapPage() {
  return (
    <Box
      component="section"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}
    >
      <Container maxWidth="md">
        <Stack spacing={3}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Sitemap
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.9 }}
          >
            For search engines and tools, use the XML sitemap:
          </Typography>

          <Typography variant="body1">
            <MuiLink href="/sitemap.xml" underline="hover">
              /sitemap.xml
            </MuiLink>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
