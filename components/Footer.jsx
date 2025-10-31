import { Box, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";

function Footer() {
  return (
    <Box sx={{ backgroundColor: "primary.main", paddingY: "3rem" }} component="footer">
      <Container>
        <Stack gap="1rem" alignItems="center">
          <Typography variant="h6" color="#fff">More projects I’ve worked on:</Typography>
          <Link
            href="https://github.com/khashayaryaghma"
            target="_blank"
            style={{ color: "#fff", display: "flex", flexDirection: "row", alignItems: "center", gap: "0.75rem" }}
          >
            <GitHubIcon fontSize="large" />
            <Typography>@khashayaryaghma on github</Typography>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
