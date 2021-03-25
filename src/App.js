import React, { Component} from 'react'
import './App.css';
import Game from './components/Game'
// Thiis combination of win event gtak
const winSet = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

//  finding the ultimate play on the game that favors the computer
//  const bestSpot = minimax(this.board, this.player.aiPlayer)
class Algorithm {
  constructor(node, aiPlayer, huPlayer) {
    this.node = node;
    this.aiPlayer = aiPlayer;
    this.huPlayer = huPlayer;
  }

  convert(board) {
    let newarr = [];
    board.forEach(function (e, i) {
      // this is for to avoid error for i - 0 
      if (e === null) {
        newarr.push(i);
      } else {
        newarr.push(e);
      }
    });
    return newarr;
  }

  // finding the ultimate play on the game that favors the computer
  bestSpot() {
    // console.log(this.minimax(this.node, this.aiPlayer))
    return this.minimax(this.convert(this.node), this.aiPlayer).index;
  }
  // the main minimax function
  minimax(newBoard, player) {
    //available spots
    let availSpots = this.emptyIndexies(newBoard);

    // checks for the terminal states such as win, lose, and tie and returning a value accordingly
    if (this.winning(newBoard, this.huPlayer)) {
      return { score: -10 };
    } else if (this.winning(newBoard, this.aiPlayer)) {
      return { score: 10 };
    } else if (availSpots.length === 0) {
      return { score: 0 };
    }

    // an array to collect all the objects
    let moves = [];

    // loop through available spots
    for (let i = 0; i < availSpots.length; i++) {
      //create an object for each and store the index of that spot that was stored as a number in the object's index key
      let move = {};
      move.index = newBoard[availSpots[i]];

      // set the empty spot to the current player
      newBoard[availSpots[i]] = player;

      //if collect the score resulted from calling minimax on the opponent of the current player
      if (player === this.aiPlayer) {
        let result = this.minimax(newBoard, this.huPlayer);
        move.score = result.score;
      } else {
        let result = this.minimax(newBoard, this.aiPlayer);
        move.score = result.score;
      }

      //reset the spot to empty
      newBoard[availSpots[i]] = move.index;

      // push the object to the array
      moves.push(move);
    }

    // if it is the computer's turn loop over the moves and choose the move with the highest score
    let bestMove;
    if (player === this.aiPlayer) {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      // else loop over the moves and choose the move with the lowest score
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    // return the chosen move (object) from the array to the higher depth
    return moves[bestMove];
  }

  // returns the available spots on the board
  emptyIndexies(board) {
    return board.filter((s) => s !== "O" && s !== "X");
  }

  // winning combinations using the board indexies for instace the first win could be 3 xes in a row
  winning(board, player) {
    for (let i = 0; i < winSet.length; i++) {
      let [a, b, c] = winSet[i];
      if (
        board[a] === player &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return true;
      }
    }
    return false;
  }
}


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      boardInfo: Array(9).fill(null),
      currentPlayer: "",
      p1IsNext: true,
      gameSetting: {
        mode: "",
        piece: ""
      },
      score: {
        player1: 0,
        player2: 0
      }
    }

    this.determineWinner = this.determineWinner.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.setPlayer = this.setPlayer.bind(this)
    this.resetGame = this.resetGame.bind(this)
    this.setPiece = this.setPiece.bind(this)
    this.aiMove = this.aiMove.bind(this)

  }

  setPlayer(mode) {
    this.setState({
      currentPlayer: "",
      gameSetting: {...this.state.gameSetting, mode:mode},
      score: {
        player1: 0,
        player2: 0
      }
    })
  }

  setPiece(piece) {
      
    this.setState({
      currentPlayer: this.state.p1IsNext ? piece === "X" ? "O" : "X" : piece,
      gameSetting: {...this.state.gameSetting, piece:piece}
    })
  }

  aiMove() {
    const {boardInfo, currentPlayer, gameSetting: {mode, piece}} = this.state

    if(mode === "pvb" && currentPlayer === piece)  {
      const aiPlayer = piece === "O" ? "X" : "O"
      const i = new Algorithm(boardInfo.slice(), aiPlayer, piece)
      const a = i.bestSpot()
      this.handleClick(a)
    }
  }

  handleClick(index) {
    const {boardInfo, currentPlayer} = this.state
    const newBoardInfo = boardInfo.slice() 
    const player = currentPlayer === "O" ? "X" : "O"

    newBoardInfo[index] = player

    this.setState( {
      boardInfo: newBoardInfo,
      currentPlayer: player
    })
  }

  determineWinner() {
    const {boardInfo, currentPlayer, p1IsNext, gameSetting: {piece}, score: {player1, player2}} = this.state
    const reset = (win) => setTimeout(() => {
      this.setState(
        {
          boardInfo: Array(9).fill(null),
          currentPlayer: !p1IsNext ? piece === "X" ? "O" : "X" : piece,
          p1IsNext: !p1IsNext,
          score: {
            player1: (piece === currentPlayer && win) ? player1 + 1 : player1,
            player2: (piece !== currentPlayer && win) ? player2 + 1 : player2
          }
        }
    )}, 3000)
    let win = false
    let pattern = []
    for (let i=0; i<winSet.length; i++) {
      let [a,b,c] = winSet[i]

      if (boardInfo[a] && boardInfo[a] === boardInfo[b] && boardInfo[a] === boardInfo[c]) {
        win = !win
        pattern = [a,b,c]
      }
    }

    if (win) {
      reset(true)
      return {result: {win: true, draw: false, pattern: pattern}}
    } else if (boardInfo.indexOf(null) === -1) {
      reset(false)
      return {result: {win: false, draw: true, pattern: pattern}}
    } else {
      return {result: {win: false, draw: false,  pattern: pattern}}
    }
  }

  resetGame() {
    this.setState({
      boardInfo: Array(9).fill(null),
      currentPlayer: "",
      p1IsNext: !this.state.p1IsNext,
      gameSetting: {
        mode: "",
        piece: ""
      },
      score: {
        player1: 0,
        player2: 0
      }
    })
  }

  render() {

    return (
      <Game state={this.state}
        determineWinner={this.determineWinner}
      setPlayer={this.setPlayer}
      setPiece={this.setPiece}
      resetGame={this.resetGame}
      aiMove={this.aiMove}
      handleClick={this.handleClick}
      />
    )

  }
}

 
export default App;
// export default App;
