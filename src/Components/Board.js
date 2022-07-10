import React,{useState, useEffect} from 'react'
import board from '../CSS/Board.css';
import Square from './Square';
const initialState=["","","","","","","","",""] /* initial empty 9 elements */

function Board() {
    const [gameState, setGameState]=useState(initialState);
    const [isXChance,setIsXChance]=useState(false);    /*is x gonna play next or 0, initially keep it as false-means-0 has a chance  */
    /* function to handle square clicked */
    const onSquareClicked=(index)=>{
        let strings = Array.from(gameState);    /*first retrive all the states from gameStates   */
        strings[index]=isXChance?"X":"0";        /*update particular index(square) on which we have clicked , i.e. set X or 0 */ 
        setGameState(strings);                  //set the gameState
        setIsXChance(!isXChance);               // now channge the isxchange
    }
    // anytime this gameState will change(i.e. we click on square) we gonna call the callback function inside useEffect 
    //in that callback function we gonna check the winner
    useEffect(()=>{
       const winner= checkWinner();
       if(winner){
        alert(`Ta da ! ${winner} has won the Game`);
        setGameState(initialState);
       }
    },[gameState]);

    const checkWinner=()=>{
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
       // console.log('Class: App, Function: checkWinner ==', gameState[0], gameState[1], gameState[2]);
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a];  //it will return X or 0
            }
        }
        return null;
    }
  return (
    <>
      <div className="board-header">
        <p className="heading-text">React Tic Tac Toe</p> 
        {/* to create board of 9 squares let's create 3 rows first and inside that create 3 row's in each  */}
        <div className="row jc-center">
          {/* for the squares create new component called square and call it here */}
            <Square className="b-bottom-right" state={gameState[0]} onClick={()=>onSquareClicked(0)} />
            <Square className="b-bottom-right" state={gameState[1]} onClick={()=>onSquareClicked(1)}/>
            <Square className="b-bottom" state={gameState[2]} onClick={()=>onSquareClicked(2)}/>
        </div>
        <div className="row jc-center">
            <Square className="b-bottom-right" state={gameState[3]} onClick={()=>onSquareClicked(3)}/>
            <Square className="b-bottom-right" state={gameState[4]} onClick={()=>onSquareClicked(4)}/>
            <Square className="b-bottom" state={gameState[5]} onClick={()=>onSquareClicked(5)}/>
        </div>
        <div className="row jc-center">
            <Square className="b-right" state={gameState[6]} onClick={()=>onSquareClicked(6)}/>
            <Square className="b-right" state={gameState[7]} onClick={()=>onSquareClicked(7)}/>
            <Square state={gameState[8]} onClick={()=>onSquareClicked(8)}/>
        </div>
        <button className="clear-button" onClick={()=>setGameState(initialState)}>Clear Game</button>
        <p className="fc-aqua fc-white">By Priyanka Pathade</p>
       </div>
    </>
  )
}

export default Board