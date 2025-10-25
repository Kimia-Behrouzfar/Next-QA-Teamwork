import connectDB from "@/lib/connectDB";
import Answer from "@/models/answer.model";
import Question from "@/models/question.model";

export async function GET(_, context) {
  try {
    await connectDB();
    const { skills } = await context.params;
    const findQuestionId = await Question.findOne({ name: skills });
    const answers = await Answer.find({ questionId: findQuestionId._id });

    return new Response(JSON.stringify(answers), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error fetching answers:", error);
    return new Response("Failed to fetch answers", { status: 500 });
  }
}

export async function POST(request, context) {
  try {
    await connectDB();
    const { content } = await request.json();
    const { skills } = await context.params;

    const findQuestionId = await Question.findOne({ name: skills });

    const newAnswer = new Answer({ content, questionId: findQuestionId._id });
    await newAnswer.save();

    return new Response(JSON.stringify(newAnswer), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error fetching answers:", error);
    return new Response("Failed to fetch answers", { status: 500 });
  }
}

export async function PUT(request, context) {
  {
    try {
      await connectDB();
      const { id, content } = await request.json();
      const updatedAnswer = await Answer.findByIdAndUpdate(
        id,
        { content },
        { new: true }
      );
      return new Response(JSON.stringify(updatedAnswer), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("❌ Error updating answer:", error);
      return new Response("Failed to update answer", { status: 500 });
    }
  }
}

export async function DELETE(request, context) {
  try {
    await connectDB();
    const { id } = await request.json();
    const deletedAnswer = await Answer.findByIdAndDelete(id);
    return new Response(JSON.stringify(deletedAnswer), { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting answer:", error);
    return new Response("Failed to delete answer", { status: 500 });
  }
}
