import React from "react";
import styles from "./Question.module.css";

interface QuestionProps {
  question: {
    id: string;
    text: string;
    type: "single" | "multiple" | "short" | "long";
    options?: string[];
  };
  answer: string | string[];
  onAnswerChange: (answer: string | string[]) => void;
}

const Question: React.FC<QuestionProps> = ({ question, answer, onAnswerChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target;
    const { value } = target;

    if (question.type === "single" || question.type === "short" || question.type === "long") {
      onAnswerChange(value);
    } else if (question.type === "multiple" && Array.isArray(answer)) {
      const { checked } = target as HTMLInputElement;
      const updatedAnswer = checked ? [...answer, value] : answer.filter((a) => a !== value);
      onAnswerChange(updatedAnswer);
    }
  };

  return (
    <div className={styles.question}>
      <h3>{question.text}</h3>
      {question.type === "single" && question.options && (
        <div className={styles.options}>
          {question.options.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name={question.id}
                value={option}
                checked={answer === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>
      )}
      {question.type === "multiple" && question.options && (
        <div className={styles.options}>
          {question.options.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                name={question.id}
                value={option}
                checked={Array.isArray(answer) && answer.includes(option)}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>
      )}
      {question.type === "short" && (
        <input type="text" value={answer as string} onChange={handleChange} />
      )}
      {question.type === "long" && <textarea value={answer as string} onChange={handleChange} />}
    </div>
  );
};

export default Question;
