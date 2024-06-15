import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { nextQuestion, prevQuestion, setAnswer } from "../../store/testSlice";
import Question from "../Question/Question";
import styles from "./TestComponent.module.css";

const TestComponent: React.FC = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.test.questions);
  const currentQuestionIndex = useSelector((state: RootState) => state.test.currentQuestionIndex);
  const answers = useSelector((state: RootState) => state.test.answers);
  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    dispatch(nextQuestion());
  };

  const handlePrev = () => {
    dispatch(prevQuestion());
  };

  const handleAnswerChange = (answer: string | string[]) => {
    dispatch(setAnswer({ questionId: currentQuestion.id, answer }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Тестирование</h1>
        <div className={styles.timer}>16:56</div>
      </div>
      <div className={styles.progress_bar}>
        {questions.map((_, index) => (
          <div key={index} className={index === currentQuestionIndex ? "active" : ""}></div>
        ))}
      </div>
      {currentQuestion && (
        <Question
          question={currentQuestion}
          answer={answers[currentQuestion.id] || (currentQuestion.type === "multiple" ? [] : "")}
          onAnswerChange={handleAnswerChange}
        />
      )}
      <div className={styles.navigation_buttons}>
        <button onClick={handlePrev} disabled={currentQuestionIndex === 0}>
          Назад
        </button>
        <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
          Вперед
        </button>
      </div>
    </div>
  );
};

export default TestComponent;