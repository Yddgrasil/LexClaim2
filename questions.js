const questionContainer = document.getElementById('question-container');
const answerButtonsContainer = document.getElementById('answer-buttons-container');
const jaButton = document.getElementById('ja-button');
const neinButton = document.getElementById('nein-button');
const backButton = document.getElementById('back-button');

let currentQuestionIndex = 0;
let questions = [];
let definitions = {};

fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        return fetch('definitions.json');
    })
    .then(response => response.json())
    .then(data => {
        definitions = data;
        showQuestion(questions[currentQuestionIndex]);
    });

function showQuestion(question) {
    let questionText = question.text;
    let definitionText = "";

    if (question.definedTerms) {
        // Replace defined terms with their definitions
        for (const term of question.definedTerms) {
            const definition = definitions[term.id];
            if (definition) {
                const regex = new RegExp(`#${term.id}\\b`, "g");
                const dfnTag = `<dfn title="${definition}">${term.text}</dfn>`;
                questionText = questionText.replace(regex, dfnTag);
                definitionText += `<p><b>${term.text}:</b> ${definition}</p>`;
            }
        }
    }

    console.log(`New question: ${questionText}`);
    questionContainer.innerHTML = questionText;
    definitionContainer.innerHTML = definitionText;
}

function handleDfnMouseEnter(event) {
    const definition = event.target.getAttribute('title');
    const popover = document.createElement('div');
    popover.classList.add('definition-popover');
    popover.textContent = definition;
    event.target.appendChild(popover);
}

function handleDfnMouseLeave(event) {
    const popover = event.target.querySelector('.definition-popover');
    event.target.removeChild(popover);
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
