import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { nextQuestion, prevQuestion, setAnswer, resetTest } from "../../store/testSlice";
import Question from "../Question/Question";
import styles from "./TestComponent.module.css";

const TestComponent: React.FC = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.test.questions);
  const currentQuestionIndex = useSelector((state: RootState) => state.test.currentQuestionIndex);
  const answers = useSelector((state: RootState) => state.test.answers);
  const currentQuestion = questions[currentQuestionIndex];

  const [testCompleted, setTestCompleted] = useState(false);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      dispatch(nextQuestion());
    } else {
      setTestCompleted(true);
    }
  };

  const handlePrev = () => {
    dispatch(prevQuestion());
  };

  const handleAnswerChange = (answer: string | string[]) => {
    dispatch(setAnswer({ questionId: currentQuestion.id, answer }));
  };

  const handleRetakeTest = () => {
    dispatch(resetTest());
    setTestCompleted(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Тестирование</h1>
        <div className={styles.timer}>16:56</div>
      </div>
      <div className={styles.progress_bar}>
        {questions.map((_, index) => (
          <div
            key={index}
            className={`${styles.progress_segment} ${index <= currentQuestionIndex ? styles.active : ""}`}
          ></div>
        ))}
      </div>
      {testCompleted ? (
        <div className={styles.test_completed}>
          <h2>Поздравляем, вы прошли тест!</h2>
          <button onClick={handleRetakeTest}>Пройти заново</button>
        </div>
      ) : (
        <>
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
            <button onClick={handleNext}>
              {currentQuestionIndex < questions.length - 1 ? "Вперед" : "Готово"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TestComponent;
