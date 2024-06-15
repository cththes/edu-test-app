import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TestState {
  questions: string[];
  currentQuestionIndex: number;
  answers: { [key: string]: string };
}

const initialState: TestState = {
  questions: ["Вопрос 1", "Вопрос 2", "Вопрос 3"],
  currentQuestionIndex: 0,
  answers: {}
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<string[]>) {
      state.questions = action.payload;
    },
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
    setAnswer(state, action: PayloadAction<{ questionId: string; answer: string }>) {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    }
  }
});

export const { setQuestions, nextQuestion, prevQuestion, setAnswer } = testSlice.actions;
export default testSlice.reducer;
