import { useState, useEffect } from "react";
import { fetchQuestions } from "../../Service/apiService";
import "./index.css"; // Import the CSS file

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        console.log("Fetching questions...");
        const data = await fetchQuestions();
        console.log("Questions fetched:", data);
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    loadQuestions();
  }, []);

  const handleOptionClick = (questionId, selectedOption) => {
    console.log("Selected Option:", selectedOption);
    const question = questions.find((q) => q.id === questionId);
    if (!question) {
      console.error("Question not found for ID:", questionId);
      return;
    }
    const correct = question.correct_answer === selectedOption;
    setSelectedOption(selectedOption);
    setIsCorrect(correct);
    setAnswers({ ...answers, [questionId]: selectedOption });

    setTimeout(() => {
      setSelectedOption(null);
      setIsCorrect(null);
      handleNextQuestion();
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  if (questions.length === 0) {
    return <p className="loading">Loading questions...</p>;
  }

  if (isQuizCompleted) {
    const score = Object.keys(answers).reduce((acc, questionId) => {
      const question = questions.find((q) => q.id === parseInt(questionId));
      if (question && question.correct_answer === parseInt(answers[questionId])) {
        acc++;
      }
      return acc;
    }, 0);

    return (
      <div className="quiz-completed">
        <h1>Quiz Completed!</h1>
        <p>You scored {score} out of {questions.length}.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    console.error("No question found at index:", currentQuestionIndex);
    return <p className="error">Error loading question.</p>;
  }

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Welcome to the Quiz!</h1>
      <div className="quiz-box">
        <h2 className="question-number">Question {currentQuestionIndex + 1} of {questions.length}</h2>
        <p className="quiz-question">{currentQuestion.question}</p>
        <div className="options-container">
          {["option_a", "option_b", "option_c", "option_d"].map((optionKey, index) => {
            const optionValue = currentQuestion[optionKey];
            if (!optionValue) {
              console.warn("Option missing for:", optionKey);
              return null;
            }
            const isSelected = selectedOption === index + 1;
            const buttonClass = isSelected
              ? isCorrect ? "correct" : "incorrect"
              : "";

            return (
              <button
                key={index}
                className={`quiz-option ${buttonClass}`}
                onClick={() => handleOptionClick(currentQuestion.id, index + 1)}
                disabled={selectedOption !== null}
              >
                {optionValue}
              </button>
            );
          })}
        </div>
      </div>
      <button
        className="next-question-button"
        onClick={handleNextQuestion}
        disabled={selectedOption === null}
      >
        {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
      </button>
    </div>
  );
};

export default Quiz;
