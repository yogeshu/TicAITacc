import Header from "./Header";
import Board from "./Board";
import GameInstruction from "./GameIntruction";


const Game = (props) => {
  const {
    boardInfo,
    currentPlayer,
    id,
    gameSetting: { piece, mode }
  } = props.state;
  const {
    result: { win, draw, pattern }
  } = props.determineWinner();
  const score = mode === "pvp" ? "Player 2" : "Computer";
  const turn = currentPlayer !== piece ? "Player 1" : score;

  return mode !== "" && piece !== "" ? (
    <div className="App reset">
      <Header
        state={props.state}
        score={score}
        turn={turn}
        win={win}
        draw={draw}
      />
      <Board
        pattern={win ? pattern : ""}
        boardInfo={boardInfo}
        onClick={(i) =>
          win || turn === "Computer" ? null : props.handleClick(i)
        }
        determineWinner={props.determineWinner}
        aiMove={currentPlayer !== "" && !win && !draw ? props.aiMove : null}
      />
      <p>{`Game mode: ${mode === "pvb" ? "One Player" : "Two Player"}`}</p>
      <p>{`Game piece: ${piece}`}</p>
      <a className="lnk" onClick={props.resetGame}>
        {"↻Reset game"}
      </a>
    </div>
  ) : (
    <div className="App">
      <GameInstruction
        piece={piece}
        mode={mode}
        setPlayer={props.setPlayer}
        setPiece={props.setPiece}
        resetGame={props.resetGame}
        id={id}
      />
    </div>
  );
};
export default Game;
