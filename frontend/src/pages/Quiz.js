import React, { useState } from "react";
import "./Quiz.css";

function Quiz() {
  const questions = [
    {
      question: "Who developed Python?",
      options: ["Guido van Rossum", "Dennis Ritchie", "James Gosling", "Tim Berners-Lee"],
      answer: 0
    },
    {
      question: "What is the correct file extension for Python files?",
      options: [".pt", ".py", ".pyt", ".python"],
      answer: 1
    },
    {
      question: "Which keyword is used to define a function in Python?",
      options: ["func", "def", "function", "define"],
      answer: 1
    },
    {
      question: "Output of: print(3 * 'Hi')",
      options: ["HiHiHi", "Error", "Hi*3", "3Hi"],
      answer: 0
    },
    {
      question: "Python is a ___ language.",
      options: ["Compiled", "Markup", "High-level", "Machine"],
      answer: 2
    }
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (optionIndex) => {
    if (optionIndex === questions[current].answer) {
      setScore(score + 1);
    }

    const next = current + 1;

    if (next < questions.length) {
      setCurrent(next);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="quiz-container">
        <h2>✅ Quiz Completed!</h2>
        <p>Your Score: {score} / {questions.length}</p>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>{questions[current].question}</h2>

      {questions[current].options.map((opt, index) => (
        <button
          key={index}
          className="option-btn"
          onClick={() => handleAnswer(index)}
        >
          {opt}
        </button>
      ))}

      <p className="progress">
        Question {current + 1} / {questions.length}
      </p>
    </div>
  );
}

export default Quiz;