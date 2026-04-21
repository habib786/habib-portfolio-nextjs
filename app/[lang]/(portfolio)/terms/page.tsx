import {
  Container,
  Typography,
  Box,
  Stack,
  Link as MuiLink,
} from "@mui/material";

export default function TermsOfServicePage() {
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
            Terms of Service
          </Typography>

          <Typography color="text.secondary">
            Last updated: {new Date().toLocaleDateString()}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.9 }}
          >
            This portfolio is provided “as is” for informational purposes.
            Content may change at any time.
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.9 }}
          >
            If you engage services, deliverables, timelines, and payment terms
            will be defined in a separate written agreement.
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
