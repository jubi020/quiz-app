const userName = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const MAX_SCORES = 2;    // WHAT'S THIS FOR????????
const SCORE_POINTS = 10;
const MAX_QUESTIONS = 5;
finalScore.innerText = mostRecentScore + "/" + (SCORE_POINTS*MAX_QUESTIONS);
username.addEventListener('keyup', () => {
	saveScoreBtn.removeAttribute('disabled');
}); 

saveHighScore = (e) =>{
	e.preventDefault();
	const score = {
		score:mostRecentScore,
		name:userName.value
	};

	highScores.push(score);
	highScores.sort((a,b) => {
		return b.score - a.score;
	});

	highScores.splice(5);

	localStorage.setItem('highScores',JSON.stringify(highScores));
	window.location.assign('');

}












