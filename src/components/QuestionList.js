import React,{useState,useEffect} from "react";
import QuestionItems from "./QuestionItem";

function QuestionList() {
  const [question,setQuestions]=useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((resp) => resp.json())
      .then((questions) => {
        setQuestions(questions);
      });
  }, []);

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then(() => {
        const updatedQuestions = question.filter((query) => query.id !== id);
        setQuestions(updatedQuestions);
      });
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((resp) => resp.json())
      .then((updatedQuestion) => {
        const updatedQuestions = question.map((query) => {
          if (query.id === updatedQuestion.id) return updatedQuestion;
          return query;
        });
        setQuestions(updatedQuestions);
      });
  }

  const questionItems = question.map((query) => (
    <QuestionItems
      key={query.id}
      question={query}
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleAnswerChange}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
