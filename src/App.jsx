import { useState } from "react"

export default function Game (){
    const [history , setHistory] = useState([Array(30).fill(null)])
    const [currentMove ,setCurrentMove ] = useState(0)
    const xIsNext = currentMove % 2 === 0 
    const currentSquare = history[currentMove]

    function handlePlay (nextSquares){
        const historyNext = [...history.slice(0,currentMove +1), nextSquares]
        setHistory(historyNext)
        setCurrentMove(historyNext.length - 1)
    }

    function jumpTo (nextMove){
        setCurrentMove(nextMove)
    }

    const moves = history.map((squares,move)=>{
        let description;
        if (move > 0){
            description = "Your move # " + move 
        } else {
            description = "Let start !!! "
        }
        return (
            <li key = {move}>
                <button onClick={()=>jumpTo(move)}> {description} </button>
            </li>
        )
    })
    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    )
}

function Board ({xIsNext , squares , onPlay }) {
    function handleClick (i){
        if (squares[i] || calculateWinner(squares)) {
            return 
        }
        const nextSquare = squares.slice()
        if (xIsNext){
            nextSquare[i] = "X"
        }else {
            nextSquare[i] = "O"
        }
        onPlay(nextSquare)
    
    }
    const winner = calculateWinner(squares)
    let status ;
    if ( winner ){
        status = "The winner is: " + winner 
    }else {
        status = "Next play : " + (xIsNext ? "X" : "O")
    }
 return (
    < >
        <div className="status "> {status} </div>
        <div className="board-row">      
        <Square value={squares[0]} onSquareClick={()=>handleClick(0)} />
        <Square value={squares[1]} onSquareClick={()=>handleClick(1)} />
        <Square value={squares[2]} onSquareClick={()=>handleClick(2)} />
        <Square value={squares[3]} onSquareClick={()=>handleClick(3)} />
        <Square value={squares[4]} onSquareClick={()=>handleClick(4)} />
        <Square value={squares[5]} onSquareClick={()=>handleClick(5)} />
        </div>
        <div className="board-row">      
        <Square value={squares[6]} onSquareClick={()=>handleClick(6)} />
        <Square value={squares[7]} onSquareClick={()=>handleClick(7)} />
        <Square value={squares[8]} onSquareClick={()=>handleClick(8)} /> 
        <Square value={squares[9]} onSquareClick={()=>handleClick(9)} />
        <Square value={squares[10]} onSquareClick={()=>handleClick(10)} />
        <Square value={squares[11]} onSquareClick={()=>handleClick(11)} />  
        </div>    
        <div className="board-row">      
        <Square value={squares[12]} onSquareClick={()=>handleClick(12)} />
        <Square value={squares[13]} onSquareClick={()=>handleClick(13)} />
        <Square value={squares[14]} onSquareClick={()=>handleClick(14)} /> 
        <Square value={squares[15]} onSquareClick={()=>handleClick(15)} />
        <Square value={squares[16]} onSquareClick={()=>handleClick(16)} />
        <Square value={squares[17]} onSquareClick={()=>handleClick(17)} />  
        </div>
        <div className="board-row">      
        <Square value={squares[18]} onSquareClick={()=>handleClick(18)} />
        <Square value={squares[19]} onSquareClick={()=>handleClick(19)} />
        <Square value={squares[20]} onSquareClick={()=>handleClick(20)} /> 
        <Square value={squares[21]} onSquareClick={()=>handleClick(21)} />
        <Square value={squares[22]} onSquareClick={()=>handleClick(22)} />
        <Square value={squares[23]} onSquareClick={()=>handleClick(23)} />  
        </div>
        <div className="board-row">      
        <Square value={squares[24]} onSquareClick={()=>handleClick(24)} />
        <Square value={squares[25]} onSquareClick={()=>handleClick(25)} />
        <Square value={squares[26]} onSquareClick={()=>handleClick(26)} /> 
        <Square value={squares[27]} onSquareClick={()=>handleClick(27)} />
        <Square value={squares[28]} onSquareClick={()=>handleClick(28)} />
        <Square value={squares[29]} onSquareClick={()=>handleClick(29)} />  
        </div>
    </>
 )
}


function Square ({value , onSquareClick}){
    return (
        <button className="square" onClick={onSquareClick} > 
            {value }
        </button>
    )
}

function calculateWinner (squares) {
    const lines = [
        [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5],
        [6, 7, 8, 9], [7, 8, 9, 10], [8, 9, 10, 11],
        [12, 13, 14, 15], [13, 14, 15, 16], [14, 15, 16, 17],
        [18, 19, 20, 21], [19, 20, 21, 22], [20, 21, 22, 23],
        [24, 25, 26, 27], [25, 26, 27, 28], [26, 27, 28, 29],

        // Vertical lines
        [0, 6, 12, 18], [6, 12, 18, 24], [1, 7, 13, 19], [7, 13, 19, 25],
        [2, 8, 14, 20], [8, 14, 20, 26], [3, 9, 15, 21], [9, 15, 21, 27],
        [4, 10, 16, 22], [10, 16, 22, 28], [5, 11, 17, 23], [11, 17, 23, 29],

        // Diagonal lines
        [0, 7, 14, 21], [1, 8, 15, 22], [2, 9, 16, 23],
        [6, 13, 20, 27], [7, 14, 21, 28], [8, 15, 22, 29],
        [3, 8, 13, 18], [4, 9, 14, 19], [5, 10, 15, 20],
        [9, 14, 19, 24], [10, 15, 20, 25], [11, 16, 21, 26]
    ]
    for (let i = 0; i < lines.length ; i++){
        const [a,b,c,d] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] ===squares [c] && squares[a] === squares[d] ){
            return squares[a]
        }
    }
    return null
}