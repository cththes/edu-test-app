import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store'; 
import { setQuestions, nextQuestion, prevQuestion, setAnswer } from '../../store/testSlice';

const Test: React.FC = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.test.questions);
  const currentQuestionIndex = useSelector((state: RootState) => state.test.currentQuestionIndex);
  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    dispatch(nextQuestion());
  };

  const handlePrev = () => {
    dispatch(prevQuestion());
  };

  const handleAnswer = (questionId: string, answer: string) => {
    dispatch(setAnswer({ questionId, answer }));
  };

  return (
    <div>
      <h1>Тестирование</h1>
      {currentQuestion && (
        <div>
          <h2>{currentQuestion}</h2>
          <input 
            type="text"
            onChange={(e) => handleAnswer(`q${currentQuestionIndex}`, e.target.value)}
          />
          <div>
            <button onClick={handlePrev} disabled={currentQuestionIndex === 0}>
              Назад
            </button>
            <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
              Вперед
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
