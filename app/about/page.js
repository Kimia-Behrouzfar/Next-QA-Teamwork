import { Container, Stack, Typography } from "@mui/material";

function page() {
  return (
    <Container>
      <Stack>
        <Typography variant="h2" component="h1"  mb={5}>
          About us
        </Typography>
        <Typography >
        Welcome to Q & A—where knowledge meets curiosity! We are a community-driven platform designed to bring together people seeking answers with those who have the expertise to help. Our mission is to make information accessible, accurate, and helpful to everyone, from experts in specialized fields to everyday users with unique experiences. By fostering an open space for questions and solutions, we aim to empower users to share their knowledge, learn new things, and make informed decisions. Join us and become part of a supportive community that values collaboration, respect, and the pursuit of understanding.
        </Typography>
      </Stack>
    </Container>
  );
}

export default page;
