import clientPromise from "@/app/DataBase/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(req, { params }) {
    try {
        const client = await clientPromise;
        const db = client.db();

        const questionId = new ObjectId(params.id);

        // حذف جواب‌های مربوطه
        await db.collection("answers").deleteMany({ questionId });

        // حذف خود سوال
        const result = await db.collection("questions").deleteOne({ _id: questionId });

        if (result.deletedCount === 0) {
            return new Response(JSON.stringify({ error: "Question not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true }));
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Failed to delete question" }), { status: 500 });
    }
}
