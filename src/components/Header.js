import React from 'react'




const Header = (props)=>{
 const { currentPlayer, gameSetting: {mode,piece}, score: {player1,player2}} = props.state
    return(
        <div>
        <div className="score">
          <div className="score-div">
            <span>{`${"Player 1  "}`} </span>
            <button className="thescore">  {`${player1}`}  -  {`${ player2}`}</button>
            {/* <span className="thescore"> </span> */}
       
            <span style={{margin: 10}}>{`${  props.score  }`}</span>

            {/* <span className="thescore">{`${player2}`}</span> */}
          </div>
        </div>
        <p className="clear">
          {props.win
            ? currentPlayer === piece
              ? "You win!"
              : mode === "pvp"
              ? "Player 2 wins"
              : "Computer wins"
            : props.draw
            ? "Draw"
            : `${props.turn}'s turn`}
        </p>
      </div>
    )
}
export default Header;