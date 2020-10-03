export default class View{

	constructor(){
		this.playerGo = 'player-go'; // css element for outputting turn
	}

	updateDom(domObj){
		let selectedBox = document.getElementById('pos' + domObj.id);
		selectedBox.src = domObj.path;
	}

	outputPlayersGo(player, symbol){
		this.outputToPlayerBox();
		let playerGo = document.getElementById(this.playerGo);
		let header = playerGo.getElementsByTagName('h3')[0];
		header.innerText = "It's Your Go Player " + player;
	}

	outputWinner(player, winningData){
		this.outputToPlayerBox("Player " + player + " Wins!");
		this.getFinalTable(winningData);
		this.outputModal("Player " + player + " Wins!" + "\nWin Move: " + winningData.move
			 + "\nBoard will be output here and winning line highlighted.");
	}

	outputItsADraw(){
		this.outputToPlayerBox("It's A Draw");
		this.outputModal("It's A Draw");
	}

	setPlayer(player){
		this.outputToPlayerBox("It's Your Go Player " + player);
	}

	outputToPlayerBox(message){
		let playerGo = document.getElementById(this.playerGo);
		let header = playerGo.getElementsByTagName('h3')[0];
		header.innerText = message;
	}

	outputModal(message){
		let modal = document.getElementById("modal-box");
		let inner = modal.getElementsByClassName('modal-content')[0];
		let pTagTextInModal = inner.getElementsByTagName('p')[0];
		pTagTextInModal.innerText = message;
		modal.style.display = "block";
	}

	resetBoard(){
		for(let count=0;count<9;count++){
			let imageBox = document.getElementById('pos' + count);
			imageBox.src = 'images/blank.png';
		}
	}

	setScore(score){
		let row1 = document.getElementById('t1');
		row1.cells[1].innerText = score[1];
		row1.cells[2].innerText = score[0];
		row1.cells[3].innerText = score[2];
		
		let row2 = document.getElementById('t2');
		row2.cells[1].innerText = score[4];
		row2.cells[2].innerText = score[3];
		row2.cells[3].innerText = score[5];
		
		// in the instance where scores are equal, both players
		// are in first place, so change table accordingly:
		(score[0] === score[3])? row2.cells[0].innerText = 1: row2.cells[0].innerText = 2;
	}

	prepPlayingArea(playerOneSymbol){
		document.getElementById("choose-symbol").style.display = "none";
		document.getElementById("board-box").style.display = "block";
		document.getElementById("leaderboard").style.display = "inline";
		document.getElementById("player-go").style.display = "block";
		document.getElementById("btn-reset").style.display = "inline";

		if(playerOneSymbol != "O") this.swapSymbolOnTableStartup();
	}

	swapSymbolOnTableStartup(){
		document.getElementById('t1').cells[3].innerText = "X";
		document.getElementById('t2').cells[3].innerText = "O";
	}

	getFinalTable(winningData){

		console.log(winningData.finalBoard);
	}
}