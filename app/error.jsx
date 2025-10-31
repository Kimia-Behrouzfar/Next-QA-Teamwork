"use client";

import { Container, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Error({ error, reset }) {
  const router = useRouter();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          textAlign: "center",
          gap: 3,
        }}
      >
        <Typography variant="h3" component="h1" color="error" gutterBottom>
          Oops! Something went wrong
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          {error?.message ||
            "We encountered an unexpected error. Please try again."}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" onClick={() => reset()} size="large">
            Try Again
          </Button>

          <Button
            variant="outlined"
            onClick={() => router.push("/")}
            size="large"
          >
            Go Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
