import { useState, useEffect } from "react";
import "./App.css";

const winnerCalculator = (data) => {
  let winnerSet = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winnerSet.length; i++) {
    const [a, b, c] = winnerSet[i];
    if (data[a] && data[a] === data[b] && data[a] === data[c]) {
      return data[a];
    }
  }
  return null;
};

const Navigation = ({ winner, restart }) => {
  return (
    <>
      {winner && <p>Winner: {winner}</p>}
      <button onClick={restart}>Restart Match</button>
    </>
  );
};

function ChessBoard() {
  const [boardHash, setBoardHash] = useState(new Array(9).fill(null));
  // const [boardHash, setBoardHash] = useState([...Array(9).keys()]);
  const [winner, setWinner] = useState();
  const [isX, setIsX] = useState(true);

  useEffect(() => {
    setWinner(winnerCalculator(boardHash));
  }, [boardHash]);

  const onCellClick = (cellNo) => {
    if (boardHash[cellNo] || winner) return;

    let newBoardHash = boardHash.slice();

    if (isX) newBoardHash[cellNo] = "X";
    else newBoardHash[cellNo] = "O";

    setBoardHash(newBoardHash);
    setIsX(!isX);
  };

  const restart = () => {
    setBoardHash(new Array(9).fill(null));
  };

  return (
    <>
      <div className="chess-board">
        {[...Array(9).keys()].map((el) => (
          <div
            key={el}
            className="chess-board_cell"
            onClick={() => onCellClick(el)}
          >
            {boardHash[el]}
          </div>
        ))}
      </div>

      <Navigation winner={winner} restart={restart} />
    </>
  );
}

export default function App() {
  return <ChessBoard />;
}
