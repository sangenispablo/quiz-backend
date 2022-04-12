import mongoose from "mongoose";

const QuizSchema = mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  questions: [
    {
      description: {
        type: String,
        required: true,
      },
      answers: [
        {
          text: {
            type: String,
            required: true,
          },
          isCorrect: {
            type: Boolean,
            required: true,
            default: false,
          },
        },
      ],
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Quiz", QuizSchema);
