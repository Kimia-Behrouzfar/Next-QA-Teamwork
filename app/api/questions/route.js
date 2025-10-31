import connectDB from "@/lib/connectDB";
import Answer from "@/models/answer.model";
import Question from "@/models/question.model";

export async function GET() {
  try {
    await connectDB();
    const questions = await Question.find();

    return new Response(JSON.stringify(questions), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error fetching questions:", error);
    return new Response("Failed to fetch questions", { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const { name, description } = await request.json();
    const newQuestion = new Question({ name, description });
    await newQuestion.save();

    return new Response(JSON.stringify(newQuestion), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error fetching questions:", error);
    return new Response("Failed to fetch questions", { status: 500 });
  }
}

//! PUT method maybe not needed
export async function PUT(request) {
  try {
    await connectDB();
    const { id, name, description } = await request.json();
    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    return new Response(JSON.stringify(updatedQuestion), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error updating question:", error);
    return new Response("Failed to update question", { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const { id } = await request.json();
    await Answer.deleteMany({ questionId: id });
    const question = await Question.findByIdAndDelete(id);

    return new Response(JSON.stringify(question), { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting question:", error);
    return new Response("Failed to delete question", { status: 500 });
  }
}