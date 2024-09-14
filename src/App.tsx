import Court from "./components/Court/Court";
import Start from "./components/Start/Start";
import "./App.css";
import { useState } from "react";

function App() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  return (
    <>
      <div className="container">
        {!gameStarted && (
          <Start
            player1={player1}
            player2={player2}
            setPlayer1={setPlayer1}
            setPlayer2={setPlayer2}
            setGameStarted={setGameStarted}
          />
        )}
        {gameStarted && (
          <Court rows={7} cols={9} player1="Joe" player2="Mike"></Court>
        )}
      </div>
    </>
  );
}

export default App;
