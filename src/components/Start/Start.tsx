import React from "react";
import styles from "./Start.module.css";
import { IStartProps } from "../../interfaces/app.interface";
import Input from "../Input/Input";

const Start: React.FC<IStartProps> = ({
  setPlayer1,
  setPlayer2,
  setGameStarted,
}) => {
  return (
    <div className={styles.startGameContainer}>
      <Input placeholder="First Player" setValue={setPlayer1} />
      <Input placeholder="Second Player" setValue={setPlayer2} />
      <button
        className={styles.startGameButton}
        onClick={() => setGameStarted(true)}
      >
        Start Game
      </button>
    </div>
  );
};

export default Start;
