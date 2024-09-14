import React from "react";
import styles from "./Start.module.css";
import { IStartProps } from "../../interfaces/app.interface";
import Input from "../Input/Input";

const Start: React.FC<IStartProps> = ({
  player1,
  player2,
  setPlayer1,
  setPlayer2,
  setGameStarted,
}) => {
  return (
    <div className={styles.startGameContainer}>
      <h1 className={styles.title}>Dots and Boxes</h1>
      <Input placeholder="First Player" setValue={setPlayer1} />
      <Input placeholder="Second Player" setValue={setPlayer2} />
      <button
        className={styles.startGameButton}
        onClick={() => setGameStarted(true)}
        disabled={!player1 || !player2}
      >
        Start Game
      </button>
    </div>
  );
};

export default Start;
