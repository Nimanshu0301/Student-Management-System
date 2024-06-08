import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ExamComponent() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const courseID = sessionStorage.getItem('CourseID');

  useEffect(() => {
    if (courseID) {
      fetchQuestions(courseID);
    }
  }, [courseID]);

  const fetchQuestions = async (courseID) => {
    try {
      const response = await fetch(`https://nxb4401.uta.cloud/php/questions.php?courseID=${courseID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
        setSelectedAnswers(Array(data.length).fill(''));
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleAnswerSelect = (questionIndex, selectedOption) => {
    let numericValue;
    switch (selectedOption) {
      case 'Option1':
        numericValue = 1;
        break;
      case 'Option2':
        numericValue = 2;
        break;
      case 'Option3':
        numericValue = 3;
        break;
      case 'Option4':
        numericValue = 4;
        break;
      default:
        numericValue = 0; // Handle other cases if any
    }

    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = numericValue;
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    const userID = sessionStorage.getItem('UserID');

    if (userID && courseID) {
      const answers = selectedAnswers.map((selectedOption, index) => {
        const question = questions[index]; // Get the corresponding question
        const questionID = question.ID; // Access the ID of the question
        const isCorrect = Number(selectedOption) === Number(question.Answer) ? 'Yes' : 'No';

        return {
          UserID: parseInt(userID),
          QuestionID: questionID,
          StudentAnswer: selectedOption,
          Correct: isCorrect,
          CourseID: courseID, // Include CourseID in each answer object
        };
      });

      try {
        setLoading(true);

        const response = await fetch('https://nxb4401.uta.cloud/php/submitExam.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ answers }),
        });

        if (response.ok) {
          setLoading(false);
          alert('All Answers submitted successfully');
          navigate('/GiveExam')
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        setLoading(false);
        alert('Error submitting answers');
        console.error('Error posting answers:', error);
      }
    }
  };

  const unansweredQuestions = selectedAnswers.some(answer => answer === '');

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '20px 0' }}>
        Exam Portal
      </h1>
      {questions.length > 0 ? (
        <form>
          {questions.map((question, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <p style={{ fontWeight: 'bold' }}>{`${index + 1}. ${question.Questions}`}</p>
              <div>
                {Object.keys(question)
                  .filter(key => key.startsWith('Option'))
                  .map((optionKey, optionIndex) => (
                    <div key={optionIndex} style={{ marginBottom: '10px' }}>
                      <label>
                        <input
                          type="radio"
                          name={`question_${index}`}
                          value={optionKey}
                          checked={selectedAnswers[index] === optionIndex + 1}
                          onChange={() => handleAnswerSelect(index, optionKey)}
                        />
                        <span style={{ marginLeft: '10px' }}>{question[optionKey]}</span>
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={unansweredQuestions || loading}
            style={{
              backgroundColor: loading ? 'grey' : '#007bff',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              borderRadius: '5px',
              marginTop: '20px',
            }}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
