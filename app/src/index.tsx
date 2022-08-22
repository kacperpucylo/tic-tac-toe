import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {useState} from 'react'

const Square: React.FC<{value: string, onClick: () => void}> = ({value, onClick}) => {

	return (
		<button className='square' onClick={() => {onClick()}}>
			{value}
		</button>
	);
}

const Board: React.FC<{squares: string[], onClick: (i: number) => void}> = ({squares, onClick}) => {

	const renderSquare = (i: number) => {
		return <Square value={squares[i]} onClick={() => onClick(i)} />
	}

	return (
		<div>
			<div className='board-row'>
				{renderSquare(0)}
				{renderSquare(1)}
				{renderSquare(2)}
			</div>
			<div className='board-row'>
				{renderSquare(3)}
				{renderSquare(4)}
				{renderSquare(5)}
			</div>
			<div className='board-row'>
				{renderSquare(6)}
				{renderSquare(7)}
				{renderSquare(8)}
			</div>
		</div>
	)
}

const Game: React.FC = () => {

	const [history, setHistory] = useState<string[][]>([Array(9).fill('')])
	const [xIsNext, setXNext] = useState<boolean>(true)
	const [stepNumber, setStepNumber] = useState<number>(0)
	
	const handleClick = (i: number) => {
		const local_history = history.slice(0, stepNumber + 1)
		const current = local_history[local_history.length - 1]
		const squares = current.slice()
		if (calculateWinner(squares) || squares[i] !== '') {
			return
		}
		squares[i] = xIsNext ? 'X' : 'O'
		setHistory(local_history.concat([squares]))
		setXNext(!xIsNext)	
		setStepNumber(local_history.length)
		console.log(history)
	}
	
	const jumpTo = (step: number) => {
		setStepNumber(step)
		setXNext(step % 2 === 0)
		console.log(current)
	}

	const current = history[stepNumber]
	const winner = calculateWinner(current)

	let status: string;
	if (winner) {
		status = `Winner: ${winner}`
	}
	else {
		status = `Next player: ${xIsNext ? 'X' : 'O'}`
	}

	const moves = history.map((step, move) => {
		const desc = move ? `Go to move #${move}` : 'Go to game start'

		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{desc}</button>
			</li>
		)
	})

	return (
		<div className='game'>
			<div className='game-board'>
				<Board squares={current} onClick={handleClick}/>
			</div>
			<div className='game-info'>
				<div>{status}</div>
				<ol>{moves}</ol>
			</div>
		</div>
	)
}

const calculateWinner = (squares: string[]) => {
	const lines:number[][] = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	for (let i: number = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i]
		if (squares[a] !== '' && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null
}

// ========================================

const elem = document.getElementById("root");

if (elem === null) throw new Error("Root element missing in index.html")

const root = ReactDOM.createRoot(elem);
root.render(<Game />);
