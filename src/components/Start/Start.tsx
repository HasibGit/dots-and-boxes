import React from "react";
import styles from "./Start.module.css";
import { IStartProps } from "../../interfaces/app.interface";
import Input from "../Input/Input";

const Start: React.FC<IStartProps> = ({
  player1,
  player2,
  rows,
  cols,
  setPlayer1,
  setPlayer2,
  setRows,
  setCols,
  setGameStarted,
}) => {
  return (
    <div className={styles.startGameContainer}>
      <h1 className={styles.title}>Dots and Boxes</h1>
      <Input
        type="text"
        placeholder="First Player"
        value={player1}
        setValue={setPlayer1}
      />
      <Input
        type="text"
        placeholder="Second Player"
        value={player2}
        setValue={setPlayer2}
      />
      <Input type="number" placeholder="Rows" value={rows} setValue={setRows} />
      <Input
        type="number"
        placeholder="Columns"
        value={cols}
        setValue={setCols}
      />

      <button
        className={styles.startGameButton}
        onClick={() => setGameStarted(true)}
        disabled={!player1 || !player2 || !rows || !cols}
      >
        Start Game
      </button>
    </div>
  );
};

export default Start;
