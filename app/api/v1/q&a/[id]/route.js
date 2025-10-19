import { v4 } from "uuid";
import { data } from "../route";

export async function GET(req, { params }) {
  const obj = data.find((item) => {
    return params.id === item.id;
  });

  return Response.json(obj);
}

export async function PATCH(req, { params }) {
  const body = await req.json();
  const index = data.findIndex((user) => user.id === params.id);

  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("editA");
  if (query) {
    const ansIn = data[index].answers.findIndex((ans) => ans.id === query);
    data[index].answers[ansIn].ansText = body.text;
    const editedAns = data[index].answers[ansIn];
    return Response.json(editedAns);
  }

  data[index].answers.push({ ...body, id: v4() });
  return Response.json(data[index]);
}

export async function DELETE(req, { params }) {
  const index = data.findIndex((user) => user.id === params.id);
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("delA");
  if (query) {
    const ansIn = data[index].answers.findIndex((ans) => ans.id === query);
    data[index].answers.splice(ansIn, 1);
    const deletedAns = data[index].answers[ansIn];
    return Response.json(deletedAns);
  }
  const deleted = data[index];
  data.splice(index, 1);
  return Response.json(deleted);
}
