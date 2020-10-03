// All game logic is held in this class.
// The first part of the challenge is purely an HTML/CSS challenge, but
// the game is currently working as a two player game in JS.

// The class also contains additional experimental code for a human vs 
// computer mode. At present, output is sent to the console log as hints.
// This should eventually be data used for the human vs computer mode.

export default class TicTacToe {

	constructor(){

		// All possible winning positions.
		// 0 is top-left corner.
		this.winPositions = {
			0:[0,1,2],
			1:[3,4,5],
			2:[6,7,8],
			3:[0,3,6],
			4:[1,4,7],
			5:[2,5,8],
			6:[0,4,8],
			7:[2,4,6]
		};

		// Array only needs to be one dimensional.
		this.board = Array(
			0,0,0,
			0,0,0,
			0,0,0
		);

		this.score = [[0, 'Player One'], [0, 'Player Two']];

		this.symbol = ['nought', 'cross'];
		this.gameOver = false;
		this.gameWon = false;
		this.currentPlayer = 1;
		this.currentPlayerText = "One";
		this.currentPlayerSymbolIndex = 0;
		this.currentOpponent = 2;
		
		this.winMove = null;
		this.turnProcessed = false;
		this.winningPlayer = 0;
		this.idNum = null;
		this.randInt = 0;
		this.playerGoFirst = 1;

		this.playerOneSymbol = 'O';
		this.playerOneSymbolIndex = 0;
		this.playerTwoSymbol = 'X';
		this.playerTwoSymbolIndex = 1;

		// Experimental at present.
		// For computer opponent logic:
		this.sequence = "";
		this.currentTurn = 0;
		this.corner = Array(0, 2, 6, 8);
		this.middle = 4;
		this.edge = Array(1, 3, 5, 7);
		this.oppositeCorner = Array(
			[0, 8],
			[2, 6],
			[6, 2],
			[8, 0]
		);
	}

	resetBoard(){
		this.board = Array(
			0,0,0,
			0,0,0,
			0,0,0
		);
	}

	processTurn(idNum){
		this.turnProcessed = false;

		if(this.isSelectedPositionBlank(idNum) === true){
			let rand = this.rndInt();
			this.placeSymbol(idNum);
			this.updateBoard();
			this.turnProcessed = true;
			this.idNum = idNum;
			this.randInt = rand;
			this.updateSequence(idNum); 			// Experimental
			this.currentTurn++;
		}
	}

	getBoard(){
		return this.board;
	}

	getCurrentPlayer(){
		return this.currentPlayer;
	}

	getCurrentPlayerText(){
		return this.currentPlayerText;
	}

	areTherePositionsLeft(){
		this.positionsLeft = false;
		for(let count=0;count<this.board.length;count++){
			if(this.board[count] === 0) this.positionsLeft = true;
		}
		return this.positionsLeft;
	}

	placeSymbol(position){
		position = parseInt(position);
		this.board[position] = this.currentPlayer;
	}

	switchPlayer(){
		if(this.currentPlayer === 1){
			this.currentPlayer = 2
			this.currentPlayerText = "Two";
			this.currentPlayerSymbolIndex = this.playerTwoSymbolIndex;
			this.currentOpponent = 1;
		 } else {
			this.currentPlayer = 1;
			this.currentPlayerText = "One";
			this.currentPlayerSymbolIndex = this.playerOneSymbolIndex;
			this.currentOpponent = 2;
		 } 
	}

	switchStartingPlayer(){
		if(this.playerGoFirst ===1){
			this.playerGoFirst = 2;
			this.currentPlayer = 2
			this.currentPlayerText = "Two";
			this.currentPlayerSymbolIndex = this.playerTwoSymbolIndex;
			this.currentOpponent = 1;
		} else {
			this.playerGoFirst = 1;
			this.currentPlayer = 1;
			this.currentPlayerText = "One";
			this.currentPlayerSymbolIndex = this.playerOneSymbolIndex;
			this.currentOpponent = 2;
		}

		return { numVal: this.playerGoFirst,
				textVal: this.currentPlayerText};
	}

	setPlayerSymbol(choice){
		if(parseInt(choice) === 1){
			this.playerOneSymbol = 'X';
			this.playerTwoSymbol = 'O';
			this.playerOneSymbolIndex = 1;
			this.playerTwoSymbolIndex = 0;
		}
	}

	getPlayerOneSymbol(){
		return this.playerOneSymbol;
	}

	checkIfGameWon(){
		for(let count=0;count<=7;count++){
			if(this.board[this.winPositions[count][0]] === this.currentPlayer && 
				this.board[this.winPositions[count][1]] === this.currentPlayer && 
				this.board[this.winPositions[count][2]] === this.currentPlayer){ 
					this.gameWon = true;
					this.winningPlayer = this.currentPlayer;
					this.winMove = count;
					console.log("Win move = " + count);
				}
			}
		return this.gameWon;
	}

	getSymbol(){
		return (this.currentPlayer === 1)? this.symbol[this.playerOneSymbolIndex]:
			this.symbol[this.playerTwoSymbolIndex]
	}

	getSymbolChar(){
		return (this.currentPlayer === 1) ? this.playerOneSymbol: this.playerTwoSymbol;
	}

	isSelectedPositionBlank(position){
		return(this.board[position] === 0);
	}

	updateBoard(idNum){
		this.board[idNum] = this.currentPlayer;
	}

	rndInt(){
		return Math.floor(Math.random() * 2) + 1; //[1 or 2]
	}

	wasTurnProcessed(){
		return (this.turnProcessed === true)? true: this.turnProcessed;
	}

	getDomUpdateData(){
		let returnData = {};

		if(this.wasTurnProcessed() === true){
			returnData = {
				path: "images/" + this.getSymbol() + this.randInt  + ".png",
				symbol: this.getSymbolChar(),
				id: this.idNum
			};
		}
		return returnData;
	}

	resetTurnAndFlipPlayer(){
		this.switchPlayer();
		this.randInt = 0;
		this.idNum = null;
		this.turnProcessed = false;
	}

	resetGameVariables(){
		this.resetBoard();
		this.gameOver = false;
		this.gameWon = false;
		this.currentPlayer = 1;  // Keep track who went first last time
		this.winMove = null;
		this.turnProcessed = false;
		this.winningPlayer = 0;
		this.currentPlayerText = "Zero";
		this.idNum = null;
		this.randInt = 0;
		this.currentTurn = 0;
		this.sequence = "";
	}

	checkForYourWinningMove(){
		return this.checkForWin(this.currentPlayer);
	}

	checkForOpponentWinningMove(){
		return this.checkForWin(this.currentOpponent);
	}

	checkForWin(player){
		let boardVals = [];
		let length = Object.keys(this.winPositions).length;
		let returnArr = [];

		for(let count=0;count<length;count++){
			boardVals.push(this.board[this.winPositions[count][0]]);
			boardVals.push(this.board[this.winPositions[count][1]]);
			boardVals.push(this.board[this.winPositions[count][2]]);
			let blanks = boardVals.filter(number => number === 0);
			let oppGoes = boardVals.filter(number => number === player);

			if(blanks.length === 1 && oppGoes.length === 2){
				let ind = boardVals.lastIndexOf(0);
				returnArr.push(this.winPositions[count][ind]);
			}

			boardVals = [];
		}
		return returnArr;
	}

	updateScore(){
		this.score[this.currentPlayer-1][0] += 1;

		if(this.score[0][0] >= this.score[1][0]) {
			return Array(
				this.score[0][0],this.score[0][1], this.playerOneSymbol, 
				this.score[1][0],this.score[1][1], this.playerTwoSymbol);
		}
		return Array(this.score[1][0],this.score[1][1], this.playerTwoSymbol, 
			this.score[0][0],this.score[0][1], this.playerOneSymbol);
	}

	// Experimental at present.
	// The sequence will be used to work out the computer opponents turn.
	// After the first few turns of the sequence, it should be possible to
	// resort to working out the opponents next winning move, to counter it.
	updateSequence(idNum){
		let code = "";
		if(this.corner.includes(idNum)) code = "C"; // Corner
		if(this.edge.includes(idNum)) code = "E";	// Edge
		if(idNum === this.middle) code = "M";		// Middle

		this.sequence += code;
		console.log("Turn: " + this.currentTurn + " Sequence: " + this.sequence);
		this.strategy(idNum);
	}

	strategy(idNum){
		// instead of using 0 use a var because opponent order can change (+1)
		if(this.currentTurn === 0){
			if(this.sequence === "M"){
				console.log("Your best strategy is to go into a corner.");
			}
			if(this.sequence === "C" || this.sequence === "E"){
				console.log("Your best strategy is to go into the middle.");
			}
		}
		
		if(this.currentTurn === 2){ 
			if(this.sequence === "CMC"){
				console.log("Your best strategy is to go into a side (1, 3, 5, 7 or 9) to avoid a trap.");
			}
			if(this.sequence === "EMC"){
				let opp = this.getOppositeCorner(idNum);
				console.log("Your best strategy is to go to the opposite corner to avoid a trap. Position " + opp);
			}
		}
	}

	hintMode(){
		let result = [];
		console.log("**Player: " + this.currentPlayerText + " **");
		
		result = this.checkForYourWinningMove();
		if(result.length > 0){ 
			console.log("You can win at position: " + result.toString());
		}

		result = this.checkForOpponentWinningMove();
		if(result.length > 0){ 
			console.log("Your opponent can win at position: " + result.toString());
		}
	}

	getOppositeCorner(idNum){
		for(let count= 0; count<this.oppositeCorner.length;count++){
			if(this.oppositeCorner[count][0] === idNum) return this.oppositeCorner[count][1];
		}
	}

	buildFinalBoard(){
		let finalBoard = [];
		
		for(let count=0;count < this.board.length; count++){
			let pieceFound = ' ';
			if(this.board[count] !== 0){
				pieceFound = (this.board[count] === 1)? this.playerOneSymbol:this.playerTwoSymbol ;
			}
			finalBoard.push(pieceFound);
		}

		return finalBoard;
	}

	getWinningData(){
		let finalBoard = this.buildFinalBoard();

		return {
			p1: this.playerOneSymbol,
			p2: this.playerTwoSymbol,
			board: this.board,
			move: this.winMove,
			finalBoard: finalBoard
		};
	}
}
