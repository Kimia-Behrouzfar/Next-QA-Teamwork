import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Answer from "@/models/answer.model";
const connectDB = async () => {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(process.env.MONGO_URI);
};

// 🟩 GET — گرفتن جواب‌ها
export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const questionId = searchParams.get("questionId");
        if (!questionId) return NextResponse.json({ error: "questionId required" }, { status: 400 });

        const answers = await Answer.find({ questionId }).sort({ createdAt: -1 });
        return NextResponse.json(answers, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch answers" }, { status: 500 });
    }
}

// 🟦 POST — ایجاد جواب جدید
export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const answer = await Answer.create(body);
        return NextResponse.json(answer, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to create answer" }, { status: 500 });
    }
}

// 🟧 PUT — ویرایش جواب
export async function PUT(req) {
    try {
        await connectDB();
        const { id, content } = await req.json();

        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        const updated = await Answer.findByIdAndUpdate(id, { content }, { new: true });
        return NextResponse.json(updated, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to update answer" }, { status: 500 });
    }
}

// 🟥 DELETE — حذف جواب
export async function DELETE(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        await Answer.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to delete answer" }, { status: 500 });
    }
}
