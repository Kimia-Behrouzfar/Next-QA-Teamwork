"use client";
import { Box, Typography, Button, Grid, useTheme } from "@mui/material";
import Image from "next/image";

export default function FAQSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        py: 10,
        px: 32,

        backgroundColor: isDark ? "#121212" : "#fff",
      }}
    >
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle1"
            sx={{
              color: isDark ? "#bbb" : "#555",

              letterSpacing: "1px",
              textTransform: "capitalize",
              mb: 1,
            }}
          >
            Find your Answers
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: isDark ? "#fff" : "#111",
              fontSize: { xs: "2rem", md: "2.8rem" },
            }}
          >
            Questions and Answers
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: isDark ? "#ccc" : "#333",
              mb: 4,
              lineHeight: 1.7,
              maxWidth: "600px",
            }}
          >
            Looking for answers? You’ve come to the right place! Our community
            is here to help with reliable, insightful answers to all your
            questions. Whether you’re here to learn, share your expertise, or
            just browse, we’re excited to have you.
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              fontWeight: "bold",
              textTransform: "uppercase",
              px: 4,
              py: 1.2,
              borderRadius: "8px",
              boxShadow: isDark
                ? "0px 2px 6px rgba(0,0,0,0.5)"
                : "0px 2px 6px rgba(0,0,0,0.2)",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            Go to Questions
          </Button>
        </Grid>

        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 450 }}>
            <Image
              src="/qa.jpg"
              alt="Q&A illustration"
              width={450}
              height={280}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                objectFit: "contain",
                filter: isDark ? "brightness(0.9)" : "none",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
