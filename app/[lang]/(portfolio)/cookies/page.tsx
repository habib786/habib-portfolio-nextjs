import {
  Container,
  Typography,
  Box,
  Stack,
  Link as MuiLink,
} from "@mui/material";

export default function CookiePolicyPage() {
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
            Cookie Policy
          </Typography>

          <Typography color="text.secondary">
            Last updated: {new Date().toLocaleDateString()}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.9 }}
          >
            This site may use cookies or local storage to remember preferences
            (for example: selected language and theme) and to measure site
            performance.
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.9 }}
          >
            You can clear cookies in your browser settings at any time.
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.9 }}
          >
            Questions? Email{" "}
            <MuiLink href="mailto:contact@habibfarooq.com" underline="hover">
              contact@habibfarooq.com
            </MuiLink>
            .
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
