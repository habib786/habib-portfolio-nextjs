import {
  Container,
  Typography,
  Box,
  Stack,
  Link as MuiLink,
} from "@mui/material";

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </Typography>

          <Typography color="text.secondary">
            Last updated: {new Date().toLocaleDateString()}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.9 }}
          >
            This site collects only what it needs to operate (for example:
            analytics, performance metrics, and messages you submit via the
            contact form). No sensitive data is sold to third parties.
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
