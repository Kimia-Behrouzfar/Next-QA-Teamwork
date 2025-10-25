import clientPromise from "@/app/DataBase/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
    try {
        const client = await clientPromise;
        const db = client.db();

        // همه جواب‌های مربوط به این سوال
        const answers = await db
            .collection("answers")
            .find({ questionId: new ObjectId(params.id) })
            .sort({ createdAt: 1 }) // مرتب‌سازی از قدیم به جدید
            .toArray();

        // تبدیل ObjectId ها به string
        const formattedAnswers = answers.map(a => ({
            ...a,
            _id: a._id.toString(),
            questionId: a.questionId.toString(),
        }));

        return Response.json(formattedAnswers);
    } catch (err) {
        console.error(err);
        return Response.json({ error: "Failed to fetch answers" }, { status: 500 });
    }
}

export async function POST(req, { params }) {
    try {
        const client = await clientPromise;
        const db = client.db();

        const { body, author } = await req.json();

        const newAnswer = {
            questionId: new ObjectId(params.id),
            body,
            author: author || "anonymous",
            createdAt: new Date(),
        };

        const result = await db.collection("answers").insertOne(newAnswer);

        return Response.json({ success: true, id: result.insertedId.toString() });
    } catch (err) {
        console.error(err);
        return Response.json({ error: "Failed to submit answer" }, { status: 500 });
    }
}
