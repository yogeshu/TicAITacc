const GameInstruction = (props) =>
  props.mode === "" ? (
    <div className="title">
      <p>Choose game type.</p>
      <button className="btn" onClick={() => props.setPlayer("pvb")}>
        {"One Player"}
      </button>
      <button className="btn" onClick={() => props.setPlayer("pvp")}>
        {"Two Player"}
      </button>
    </div>
  ) : (
    <div className="title">
      <p>Choose piece.</p>
      <button className="btn" onClick={() => props.setPiece("X")}>
        {"X"}
      </button>
      <button className="btn" onClick={() => props.setPiece("O")}>
        {"O"}
      </button>
      <br />
      <a className="lnk" onClick={props.resetGame}>
        {"⇜Back"}
      </a>
    </div>
  );
export default GameInstruction;
