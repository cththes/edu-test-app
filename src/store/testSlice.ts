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
      text: "Какой хук используется для управления состоянием в функциональных компонентах React?",
      type: "single",
      options: ["useState", "useEffect", "useReducer"],
    },
    {
      id: "q2",
      text: "Какие типы данных поддерживает JavaScript?",
      type: "multiple",
      options: ["String", "Number", "Boolean", "Array", "Object", "Symbol", "Undefined", "Null"],
    },
    { 
      id: "q3", 
      text: "Что такое виртуальный DOM?", 
      type: "long" 
    },
    { 
      id: "q4", 
      text: "Объясните разницу между `let`, `const` и `var` в JavaScript.", 
      type: "long" 
    },
    {
      id: "q5",
      text: "Какую функцию выполняет метод `useEffect` в React?",
      type: "single",
      options: ["Управление состоянием", "Побочные эффекты", "Изменение DOM"],
    },
    {
      id: "q6",
      text: "Что такое замыкание в JavaScript?",
      type: "long"
    },
    {
      id: "q7",
      text: "Какие методы массива существуют в JavaScript?",
      type: "multiple",
      options: ["map", "filter", "reduce", "foreach", "every", "some", "concat", "join"],
    },
    {
      id: "q8",
      text: "Что такое Flexbox в CSS?",
      type: "long"
    },
    {
      id: "q9",
      text: "Какие значения могут принимать свойства `display` в CSS?",
      type: "multiple",
      options: ["block", "inline", "inline-block", "flex", "grid", "none"],
    },
    {
      id: "q10",
      text: "Объясните модель коробки (box model) в CSS.",
      type: "long"
    },
    {
      id: "q11",
      text: "Какой метод используется для центрирования элемента по вертикали и горизонтали с помощью Flexbox?",
      type: "short"
    },
    {
      id: "q12",
      text: "Перечислите известные вам CSS препроцессоры.",
      type: "long"
    },
    {
      id: "q13",
      text: "Как можно центрировать элемент по вертикали и горизонтали с помощью Flexbox?",
      type: "long"
    },
    {
      id: "q14",
      text: "Какие селекторы существуют в CSS?",
      type: "multiple",
      options: ["Классовый", "Идентификатор", "Атрибутный", "Псевдоклассовый", "Псевдоэлементов"],
    },
    {
      id: "q15",
      text: "Как подключить внешний CSS файл к HTML документу?",
      type: "single",
      options: ["<link>", "<style>", "<script>", "<meta>"],
    },
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
    resetTest(state) {
      state.currentQuestionIndex = 0;
      state.answers = {};
    },
  },
});

export const { nextQuestion, prevQuestion, setAnswer, resetTest } = testSlice.actions;
export default testSlice.reducer;
