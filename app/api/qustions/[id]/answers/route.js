import clientPromise from "@/app/DataBase/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
    const client = await clientPromise;
    const db = client.db();

    const answers = await db
        .collection("answers")
        .find({ questionId: new ObjectId(params.id) })
        .sort({ createdAt: 1 })
        .toArray();

    const safe = answers.map(a => ({ ...a, _id: a._id.toString(), questionId: a.questionId.toString() }));

    return Response.json(safe);
}

export async function POST(req, { params }) {
    const client = await clientPromise;
    const db = client.db();
    const data = await req.json();

    const newAnswer = {
        questionId: new ObjectId(params.id),
        body: data.body,
        author: data.author || "anonymous",
        createdAt: new Date(),
    };

    const result = await db.collection("answers").insertOne(newAnswer);

    return Response.json({ ...newAnswer, _id: result.insertedId.toString(), questionId: params.id });
}
