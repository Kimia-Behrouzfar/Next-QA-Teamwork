import clientPromise from "@/app/DataBase/mongodb";
import { ObjectId } from "mongodb";


export async function GET(req, { params }) {
    const client = await clientPromise;
    const db = client.db();

    const question = await db
        .collection("questions")
        .findOne({ _id: new ObjectId(params.id) });

    if (!question) {
        return Response.json({ error: "Question not found" }, { status: 404 });
    }

    return Response.json(question);
}




export async function PUT(req, { params }) {
    const client = await clientPromise;
    const db = client.db();
    const data = await req.json();

    await db.collection("questions").updateOne(
        { _id: new ObjectId(params.id) },
        {
            $set: {
                title: data.title,
                description: data.description,
                updatedAt: new Date(),
            },
        }
    );

    return Response.json({ success: true });
}
