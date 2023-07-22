const questions = [
    // Questions about ABBA
    "Which Swedish pop group was formed in Stockholm in 1972 and is known for hits like 'Dancing Queen' and 'Mamma Mia'?",
    "What was the name of ABBA's first album, released in 1973?",
    "Which member of ABBA was responsible for writing most of the group's songs?",
    // Questions about Adele
    "Which British singer-songwriter released the album '21', which won six Grammy Awards?",
    "What is Adele's full name?",
    "Adele's breakthrough single, released in 2008, was titled?",
    // Questions about Aerosmith
    "Which American rock band was formed in Boston in 1970 and is known for songs like 'Dream On' and 'I Don't Want to Miss a Thing'?",
    "What was the title of Aerosmith's bestselling album, released in 1989?",
    "Who is the lead vocalist of Aerosmith?",
    // Questions about Blur
    "Which English rock band gained popularity in the 1990s with hits like 'Song 2' and 'Parklife'?",
    "Blur's 1994 album that reached critical acclaim is called?",
    "What is the name of Blur's lead singer?",
    // Questions about Bob Dylan
    "Which American singer-songwriter, known for his poetic and influential music, released albums like 'Highway 61 Revisited' and 'Blonde on Blonde'?",
    "What is Bob Dylan's birth name?",
    "Bob Dylan was awarded the Nobel Prize in Literature in which year?",
];

const answers = [
    // Answers
    "ABBA",
    "Ring Ring",
    "Benny Andersson",
    "Adele",
    "Adele Laurie Blue Adkins",
    "Chasing Pavements",
    "Aerosmith",
    "Pump",
    "Steven Tyler",
    "Blur",
    "Parklife",
    "Damon Albarn",
    "Bob Dylan",
    "Robert Allen Zimmerman",
    "2016",
];

let currentQuestion = null;

function getRandomQuestion() {   //החזרת שאלה רנדומלית
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}

function getCorrectAnswer(question) { 
    const index = questions.indexOf(question);
    return answers[index];
}

function showQuestion(question) {
    document.getElementById('question').textContent = question;
    document.getElementById('userAnswer').value = '';
}

function showResult(isCorrect, correctAnswer) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = isCorrect ? 'Correct! Well done!' : `Incorrect! The correct answer is: ${correctAnswer}`;
}

function showNextButton() {
    document.getElementById('submitBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'block';
}

function showSubmitButton() {
    document.getElementById('submitBtn').style.display = 'block';
    document.getElementById('nextBtn').style.display = 'none';
}

function playGame() {
    currentQuestion = getRandomQuestion();
    showQuestion(currentQuestion);
    document.getElementById('resultBox').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('startBtn').addEventListener('click', function () {
        playGame();
        document.getElementById('startBtn').style.display = 'none';
        showSubmitButton();
    });

    document.getElementById('submitBtn').addEventListener('click', function () {
        const userAnswer = document.getElementById('userAnswer').value;
        const correctAnswer = getCorrectAnswer(currentQuestion);

        if (userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
            showResult(true);
        } else {
            showResult(false, correctAnswer);
        }

        showNextButton();
        document.getElementById('resultBox').style.display = 'block';
    });

    document.getElementById('nextBtn').addEventListener('click', function () {
        playGame();
        showSubmitButton();
        document.getElementById('resultBox').style.display = 'none';
    });
});

function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('show-menu');
}
