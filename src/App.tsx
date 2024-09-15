import Court from "./components/Court/Court";
import Start from "./components/Start/Start";
import "./App.css";
import { useState } from "react";

function App() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  return (
    <>
      <div className="container">
        {!gameStarted && (
          <Start
            player1={player1}
            player2={player2}
            rows={rows}
            cols={cols}
            setPlayer1={setPlayer1}
            setPlayer2={setPlayer2}
            setRows={setRows}
            setCols={setCols}
            setGameStarted={setGameStarted}
          />
        )}
        {gameStarted && (
          <Court
            rows={rows}
            cols={cols}
            player1={player1}
            player2={player2}
            setGameStarted={setGameStarted}
          ></Court>
        )}
      </div>
    </>
  );
}

export default App;
