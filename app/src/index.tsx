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

const Board: React.FC = () => {

	const [squares, setSquares] = useState<string[]>(Array(9).fill(''))
	const [xIsNext, setXNext] = useState<boolean>(true)

	const renderSquare = (i: number) => {
		return <Square value={squares[i]} onClick={() => handleClick(i)} />
	}

	const handleClick = (i: number) => {
		if (calculateWinner(squares) || squares[i] !== '') {
			return ;
		}
		const local_squares = squares.slice()
		local_squares[i] = xIsNext ? 'X' : 'O'
		setSquares(local_squares)
		setXNext(!xIsNext)
	}

	const winner: string | null = calculateWinner(squares)
	let status: string;
	if (winner) {
		status = `Winner: ${winner}`
	}
	else {
		status = `Next player: ${xIsNext ? 'X' : 'O'}`
	}

	return (
		<div>
			<div className='status'>{status}</div>
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
	return (
		<div className='game'>
			<div className='game-board'>
				<Board />
			</div>
			<div className='game-info'>
				<div>{/* status */}</div>
				<ol>{/* TODO */}</ol>
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
