const questions = [
    {
      content: "Which artist released the album '21'?",
      answers: ["Adele", "ABBA", "Aerosmith", "Blur"],
      correctAnswerIndex: 0,// Adele
      indexQuestion:0
    },
    {
      content: "Which artist is known for the hit song 'Dancing Queen'?",
      answers: ["Adele", "ABBA", "Aerosmith", "Blur"],
      correctAnswerIndex: 1, // ABBA
      indexQuestion:1
    },
    {
      content: "Which artist is the lead singer of the band 'Aerosmith'?",
      answers: ["Adele", "ABBA", "Aerosmith", "Blur"],
      correctAnswerIndex: 2, // Aerosmith
      indexQuestion:2
    },
    {
      content: "Which artist released the album 'The Times They Are a-Changin'?",
      answers: ["Adele", "ABBA", "Aerosmith", "Bob Dylan"],
      correctAnswerIndex: 3, // Bob Dylan
      indexQuestion:3
    },
    {
      content: "Which artist is known for the hit song 'Like a Rolling Stone'?",
      answers: ["Adele", "ABBA", "Aerosmith", "Bob Dylan"],
      correctAnswerIndex: 3, // Bob Dylan
      indexQuestion:4

    },
    {
      content: "Which artist released the album '25'?",
      answers: ["Adele", "ABBA", "Aerosmith", "Blur"],
      correctAnswerIndex: 0, // Adele
      indexQuestion:5
    },
    {
      content: "Which artist is known for the hit song 'Waterloo'?",
      answers: ["Adele", "ABBA", "Aerosmith", "Blur"],
      correctAnswerIndex: 1, // ABBA
      indexQuestion:6
    },
    {
      content: "Which artist is known as the 'Bad Boys from Boston'?",
      answers: ["Adele", "ABBA", "Aerosmith", "Blur"],
      correctAnswerIndex: 2, // Aerosmith
      indexQuestion:7
    },
    {
      content: "Which artist released the album 'Parklife'?",
      answers: ["Adele", "ABBA", "Aerosmith", "Blur"],
      correctAnswerIndex: 3, // Blur
      indexQuestion:8
    },
    {
      content: "Which artist is known for the hit song 'The Man in the Long Black Coat'?",
      answers: ["Adele", "ABBA", "Aerosmith", "Bob Dylan"],
      correctAnswerIndex: 3,// Bob Dylan
      indexQuestion:9
    },
    // Add even more questions about the artists or any other topics you'd like.
  ];

    let currentLevel = 1;
    let points = 0;
    let previousQuestionIndexes = [];
    let currentQuestion;

    function playAgain() {
      currentLevel = 1;
      points = 0;
      previousQuestionIndexes = [];
      showNextQuestion();
    }

    function getRandomQuestion() {
        const remainingQuestions = questions.filter((_, index) => !previousQuestionIndexes.includes(index));
        const randomQuestion = remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)];
        console.log(randomQuestion);
        return randomQuestion;
      }


function checkAnswer(selectedIndex) {
  const buttons = document.querySelectorAll("button");
  console.log(currentQuestion);

  if (selectedIndex === currentQuestion.correctAnswerIndex) {
    buttons[selectedIndex].classList.add("correct");
    points++;
  } else {
    buttons[selectedIndex].classList.add("incorrect");
    buttons[currentQuestion.correctAnswerIndex].classList.add("correct");
  }

  // Disable buttons temporarily to prevent multiple clicks
  buttons.forEach(button => button.disabled = true);

  setTimeout(() => {
    if (currentLevel < 3) {
      previousQuestionIndexes.push(currentQuestion.indexQuestion);
      currentLevel++;
      showNextQuestion();
    } else {
      showResult();
    }
  }, 2000); // 2 seconds delay to show the next question or result
}

function showNextQuestion() {
  const questionContainer = document.getElementById("question-container");
  const nextQuestion = getRandomQuestion();
  currentQuestion=nextQuestion;
  console.log(nextQuestion);

  questionContainer.innerHTML = `
    <h2>Level ${currentLevel}: ${nextQuestion.content}</h2>
    <ul>
      <li><button onclick="checkAnswer(0)">${nextQuestion.answers[0]}</button></li>
      <li><button onclick="checkAnswer(1)">${nextQuestion.answers[1]}</button></li>
      <li><button onclick="checkAnswer(2)">${nextQuestion.answers[2]}</button></li>
      <li><button onclick="checkAnswer(3)">${nextQuestion.answers[3]}</button></li>
    </ul>
  `;

  // Re-enable buttons after showing the new question
  const buttons = document.querySelectorAll("button");
  buttons.forEach(button => button.disabled = false);
}

function showResult() {
      const questionContainer = document.getElementById("question-container");
      questionContainer.innerHTML = `
        <h2>Congratulations! You have completed the quiz.</h2>
        <p>Total Points: ${points}</p>
        <button onclick="playAgain()">Play Again</button>
      `;
    }

    // Show a random question when the page loads
    showNextQuestion();