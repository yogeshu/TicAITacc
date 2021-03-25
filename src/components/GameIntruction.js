

const GameInstruction = (props) =>{
 
  return(
  props.mode === "" ? (
    <div className="title">
      <span className="title-Game">
   X  
      </span>
      <span className="title-GameFu">
        O
      </span>
      <p>Choose your play  mode.</p>
      <button className="btn" onClick={() => props.setPlayer("pvb")}>
        {"with AI"}
      </button>
      <button className="btn" onClick={() => props.setPlayer("pvp")}>
        {"with Player"}
      </button>
    </div>
  ) : (
    <div className="title">
      <p>Choose piece.</p>
      <div className="title-Game piece" > X  </div>
      <input id="thevalue" type="radio" className="btn-radio" value="X" name="X" onClick={(e)=>props.setPiece(e.target.value)} />
      <div className="title-GameFu piece"> O </div>
      <input  type="radio" className="btn-radio" value="O" name="O" onClick={(e)=>props.setPiece(e.target.value)}/>
      <br/>
      <br />
      <a className="lnk" onClick={props.resetGame}>
        {"⇜Back"}
      </a>
    </div>
  )
  )
}
export default GameInstruction;
