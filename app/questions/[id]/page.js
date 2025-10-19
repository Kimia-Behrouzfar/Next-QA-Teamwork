import Answers from "@/components/Answers";
import { getQues } from "@/utils/dataServices";
import { Container } from "@mui/material";

async function page({ params }) {
  const data = await getQues(params.id);
  return (
    <Container>
      <Answers data={data} />
    </Container>
  );
}

export default page;
