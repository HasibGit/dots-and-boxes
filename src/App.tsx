import Court from "./components/Court/Court";
import Start from "./components/Start/Start";
import "./App.css";
import { useState } from "react";
import { MenuOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

function App() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  return (
    <>
      <div className="container">
        {gameStarted && (
          <div className="game-header-container">
            <h3 className="game-header">
              {player1} vs {player2}
            </h3>
            <div
              style={{ display: "flex", justifyContent: "end", gap: "10px" }}
            >
              <Tooltip title="Restart Game">
                <Button color="primary" icon={<RedoOutlined />}></Button>
              </Tooltip>

              <Tooltip title="Main Menu">
                <Button
                  color="primary"
                  icon={<MenuOutlined />}
                  onClick={() => setGameStarted(false)}
                ></Button>
              </Tooltip>
            </div>
          </div>
        )}
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

        <p className="footer">Designed and Developed by - MD Hasib Ullah</p>
      </div>
    </>
  );
}

export default App;
