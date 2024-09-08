import Court from "./components/Court/Court";
import Start from "./components/Start/Start";
import "./App.css";
import { useState } from "react";

function App() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  return (
    <>
      <div className="container">
        {(!player1 || !player2) && (
          <Start setPlayer1={setPlayer1} setPlayer2={setPlayer2} />
        )}
        {player1 && player2 && (
          <Court rows={7} cols={9} player1="Joe" player2="Mike"></Court>
        )}
      </div>
    </>
  );
}

export default App;
