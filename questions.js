const questionContainer = document.getElementById('question-container');
const answerButtonsContainer = document.getElementById('answer-buttons-container');
const jaButton = document.getElementById('ja-button');
const neinButton = document.getElementById('nein-button');
const backButton = document.getElementById('back-button');

let currentQuestionIndex = 0;
let questions = [];

fetch('test.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        showQuestion(questions[currentQuestionIndex]);
    });

function showQuestion(question) {
    questionContainer.innerText = question.text;
}

function transition(event) {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestionIndex >= questions.length - 1) {
        // There are no more questions, so redirect to a final page
        window.location.href = 'final-page.html';
        return;
    }

    const nextQuestionIndex = getNextQuestionIndex(currentQuestion, event);

    if (nextQuestionIndex === -1) {
        // No next question exists for the given event, so redirect to the next HTML page
        window.location.href = currentQuestion.options.find(option => option.value === event).next;
        return;
    }

    currentQuestionIndex = nextQuestionIndex;
    showQuestion(questions[currentQuestionIndex]);
}

function getNextQuestionIndex(question, event) {
    const option = question.options.find(option => option.value === event);

    if (option && option.next) {
        // A next question exists for the given event
        return questions.findIndex(question => question.id === option.next);
    }

    // No next question exists for the given event
    return -1;
}

jaButton.addEventListener('click', () => {
    transition('yes');
});

neinButton.addEventListener('click', () => {
    transition('no');
});

backButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(questions[currentQuestionIndex]);
    }
});
