const question=document.querySelector('#question');
const choices=Array.from(document.querySelectorAll('.choice-text'));
const progressText=document.querySelector('#progressText');
const scoreText=document.querySelector('#score');
const progressBarFull=document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
	{
		question: 'What is the capital of China?',
		choice1: 'Beijing',
		choice2: 'Tokyo',
		choice3: 'Copenhagen',
		choice4: 'Shanghai',
		answer: 1
	},

	{
		question: 'Who is the author of "Harry Potter"?',
		choice1: 'John Milton',
		choice2: 'Charles Dickens',
		choice3: 'J.K. Rowling',
		choice4: 'George Orwell',
		answer: 3
	},

	{
		question: 'Who played the role of Iron Man in Avengers Endgame?',
		choice1: 'Chris Evans',
		choice2: 'Robert Downey Jr.',
		choice3: 'Chris Hemsworth',
		choice4: 'Mark Ruffalo',
		answer: 2
	},

	{
		question: 'What is the full form of CPU ?',
		choice1: 'Central Processing Unit',
		choice2: 'Computer Programming Unit',
		choice3: 'Central Programming Unit',
		choice4: 'Computer Preparation Unit',
		answer: 1
	},

	{
		question: 'Where was Covid 19 first discovered?',
		choice1: 'Nagasaki, Japan',
		choice2: 'Wuhan, China',
		choice3: 'New York, USA',
		choice4: 'Busan, South Korea',
		answer: 2
	}
]

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
	questionCounter=0;
	score=0;
	availableQuestions = [...questions];
	getNewQuestion();
}

getNewQuestion = () => {
	if(availableQuestions.length === 0 ||
		questionCounter > MAX_QUESTIONS){
		localStorage.setItem('mostRecentScore',score);
		return window.location.assign("end.html");
	} 
	questionCounter ++;
	progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;

	progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;

	const questionsIndex = Math.floor(Math.random()*availableQuestions.length);
	currentQuestion = availableQuestions[questionsIndex];
	question.innerText = currentQuestion.question;

	choices.forEach(choice =>{
		// to see what choice the user is clicking at
		const number = choice.dataset['number'];
		choice.innerText = currentQuestion['choice' + number];
	})

	availableQuestions.splice(questionsIndex,1);

	acceptingAnswers = true;
}

choices.forEach(choice =>{
	choice.addEventListener('click',e => {
		if(!acceptingAnswers)
			return;
		acceptingAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset['number'];

		let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
		if(classToApply === 'correct'){
			incrementScore(SCORE_POINTS);
		}

		selectedChoice.parentElement.classList.add(classToApply);

		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply);
			getNewQuestion();
		},100);

	})
})

incrementScore = num => {
	score +=num;
	scoreText.innerText = score + "/" + (MAX_QUESTIONS*SCORE_POINTS);
}

startGame();



