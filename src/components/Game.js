import React from 'react'


import Header from './Header'
import Board from './Board'
import GameInstruction from './GameIntruction'
const Game = ()=>{
    return(
        <div> <Header/> 
        
         <Board/>
         <GameInstruction/>
         </div>
    )
}
export default Game;