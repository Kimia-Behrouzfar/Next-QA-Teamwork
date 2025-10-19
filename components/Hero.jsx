import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

const styles = {
  root: {
    padding: { xs: "7rem 0", md: "10rem 0" },
  },
};

export const Hero = () => {
  return (
    <Container component="section">
      <Stack gap="4rem" direction="row" justifyContent="space-between" alignItems="center" sx={styles.root}>
        <Box component="article" sx={{ maxWidth: "40rem" }}>
          <Typography gutterBottom variant="h6" letterSpacing={"5px"}>
            Find your Answers
          </Typography>
          <Typography component="h1" variant="h3" gutterBottom fontWeight="bold">
            Questions and Answers
          </Typography>
          <Typography gutterBottom marginBottom="2rem" variant="subtitle1">
            Looking for answers? You've come to the right place! Our community is here to help with reliable, insightful answers to all your questions. Whether
            you're here to learn, share your expertise, or just browse, we’re excited to have you.
          </Typography>
          <Link href={"/questions"}>
            <Button variant="contained">Go to Questions</Button>
          </Link>
        </Box>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Image src={"/qa.jpg"} width={400} height={270} alt="qa" />
        </Box>
      </Stack>
    </Container>
  );
};
