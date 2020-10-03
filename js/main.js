// Howtocodewell.net challenge for September 2010
// Part one of tic tac toe game.
import TicTacToe from './TicTacToe.js';
import View from './View.js';


"use strict";

let game = new TicTacToe();
let view = new View();

let gameOver = false;

let resetPage = () => location.reload();

document.getElementById('board-box').addEventListener('click', processClick);
document.getElementById('btn-reset').addEventListener('click', resetPage);
document.getElementById('btn-player').addEventListener('click', processSymbol);
let span = document.getElementsByClassName("close")[0];


span.onclick = function() {
	modal.style.display = "none";
}

window.onclick = function(event) {
	if (event.target == modal) modal.style.display = "none";
}

const modal = document.getElementById("modal-box");

function processClick(e){
	let idNum = parseInt(e.target.id.replace('pos',''));
	game.processTurn(idNum);

	// Ensures that player is not switched if clicking in populated cell
	if(game.wasTurnProcessed() === true){
		view.updateDom(game.getDomUpdateData());
		gameOver = game.checkIfGameWon();

		if(gameOver === false) game.resetTurnAndFlipPlayer();
	}

	let currentPlayerText = game.getCurrentPlayerText();
	gameOver = game.checkIfGameWon();

	if(gameOver === false){
		view.outputPlayersGo(currentPlayerText, game.getSymbolChar());
		game.hintMode();	// Experimental
		
	} else {
		// Current game finished:
		view.outputPlayersGo(currentPlayerText, game.getSymbolChar());
		view.outputWinner(currentPlayerText, game.getWinningData());
		let score = game.updateScore();
		game.resetGameVariables();
		view.resetBoard();

		let playerTurn = game.switchStartingPlayer();
		view.setPlayer(playerTurn['numVal'], playerTurn['textVal']);
		view.setScore(score);
	}
	
	if(game.areTherePositionsLeft() === false && gameOver === false){
		view.outputItsADraw();
		game.resetGameVariables();
		view.resetBoard();

		let playerTurn = game.switchStartingPlayer();
		view.setPlayer(playerTurn['numVal'], playerTurn['textVal']);
	} 
}

function processSymbol(){
	game.setPlayerSymbol(radioButtonValue());
	view.prepPlayingArea(game.getPlayerOneSymbol());
}

// Symbol that player one chooses
function radioButtonValue(){
	let radioValue = 0;
	let radios = document.getElementsByName('radio');
	for(let count = 0;count < radios.length; count++) {
		if(radios[count].checked) {
			radioValue = parseInt(radios[count].value);
		}
	}
	return radioValue;
}