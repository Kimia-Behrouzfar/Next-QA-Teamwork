import clientPromise from "/DataBase/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const questions = await db.collection("questions").find().toArray();
  return Response.json(questions);
}

export async function DELETE(req) {
  const id = req.url.split("/").pop();
  const client = await clientPromise;
  const db = client.db();
  await db.collection("questions").deleteOne({ _id: new ObjectId(id) });
  return Response.json({ success: true });
}
