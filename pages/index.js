import Head from "next/head";
import {useEffect, useState} from "react";

const WINNING_COMBO = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const INITIAL_BOARD = {
  0: "",
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
};
export default function Home() {
  const [xTurn, setXTurn] = useState(true);
  const [won, setWon] = useState(false);
  const [wonCombo, setWonCombo] = useState([]);
  const [boardData, setBoardData] = useState(INITIAL_BOARD);
  const [modalTitle, setModalTitle] = useState("");
  const [score, setScore] = useState({x: 0, ties: 0, o: 0});

  useEffect(() => {
    checkResult();
  }, [boardData]);
  const updateBoardData = (idx) => {
    if (!!boardData[idx] || won) return;

    setBoardData({...boardData, [idx]: xTurn === true ? "X" : "O"});
    setXTurn(!xTurn);
  };
  const checkResult = () => {
    let hasWinner = false;
    // Check winner
    WINNING_COMBO.map((bd) => {
      const [a, b, c] = bd;
      if (!!boardData[a] && boardData[a] === boardData[b] && boardData[b] === boardData[c]) {
        setWon(true);
        setWonCombo([a, b, c]);

        if (!xTurn) {
          setModalTitle(`Player X Won!`);
          setScore({...score, x: score.x + 1 })
        } else {
          setModalTitle(`Player O Won!`);
          setScore({...score, o: score.o + 1 })
        }

        hasWinner = true;
      }
    });

    if (!hasWinner) {
      // Check draw
      const isBoardFull = Object.keys(boardData).every((key) => !!boardData[key]);
      if (isBoardFull) {
        setModalTitle("Match Draw!");
        setScore({...score, ties: score.ties + 1 })
      }
    }
  };

  const reset = () => {
    setBoardData(INITIAL_BOARD);
    setXTurn(true);
    setWon(false);
    setWonCombo([]);
    setModalTitle("");
  };

  return (
    <div className="container">
      <Head>
        <title>Tic Tac Toe</title>
      </Head>

      <div className="game">
        <div className="menu">
          <div className="name">Tic Tac Toe</div>

          <div className="turn">
            {xTurn === true ? "X Turn" : "O Turn"}
          </div>
        </div>

        <div className="board">
          {[...Array(9)].map((_, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  updateBoardData(index);
                }}
                className={`square ${
                  wonCombo.includes(index) ? `highlight-${!xTurn ? "x" : "o"}` : ""
                }`}
              >
                {boardData[index]}
              </div>
            );
          })}
        </div>

        <div className="score">
          {Object.keys(score).map(key => {
            return (
              <div className={"item " + key} key={key}>
                <div className="label">{key}</div>
                <div className="count">{score[key]}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`modal ${modalTitle ? "show" : ""}`}>
        <div className="title">{modalTitle}</div>
        <button onClick={reset} className="button">New Game</button>
      </div>
    </div>
  );
}
