const highScoresList = document.querySelector('#highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const SCORE_POINTS = 10;
const MAX_QUESTIONS = 5;
highScoresList.innerHTML = highScores.map(score => {
	return `<li class="high-score"> ${score.name} - ${score.score +"/" + (SCORE_POINTS*MAX_QUESTIONS)} </li>`;
}).join('');




