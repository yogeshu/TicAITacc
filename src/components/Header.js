import React from 'react'




const Header = (props)=>{
 const { currentPlayer, gameSetting: {mode,piece}, score: {player1,player2}} = props.state
    return(
        <div>
        <div className="score">
          <div className="score-div">
            <p>{`${"Player 1"}`}</p>
            <p>{`${player1}`}</p>
          </div>
          <div className="score-div">
            <p>{`${props.score}`}</p>
            <p>{`${player2}`}</p>
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