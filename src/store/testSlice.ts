import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Question {
  id: string;
  text: string;
  type: "single" | "multiple" | "short" | "long";
  options?: string[];
}

interface TestState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: { [key: string]: string | string[] };
}

const initialState: TestState = {
  questions: [
    {
      id: "q1",
      text: "Вопрос 1",
      type: "single",
      options: ["Вариант 1", "Вариант 2", "Вариант 3"],
    },
    {
      id: "q2",
      text: "Вопрос 2",
      type: "multiple",
      options: ["Вариант A", "Вариант B", "Вариант C"],
    },
    { id: "q3", text: "Вопрос 3", type: "short" },
    { id: "q4", text: "Вопрос 4", type: "long" },
  ],
  currentQuestionIndex: 0,
  answers: {},
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    nextQuestion(state) {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    prevQuestion(state) {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    setAnswer(state, action: PayloadAction<{ questionId: string; answer: string | string[] }>) {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
  },
});

export const { nextQuestion, prevQuestion, setAnswer } = testSlice.actions;
export default testSlice.reducer;
