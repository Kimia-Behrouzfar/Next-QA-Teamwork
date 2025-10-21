import Questions from "@/components/Questions";
import { getAllData } from "@/utils/dataServices";
import { Container, Typography } from "@mui/material";

async function page() {
  const data = await getAllData();
  
  return (
    <Container>
      <Typography variant="h2" component="h1" textAlign="center" mb="3rem" mt="7rem">
        Questions
      </Typography>
      <Questions data={data} />
    </Container>
  );
}

export default page;
