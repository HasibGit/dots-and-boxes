import { InputProps } from "../../interfaces/app.interface";
import styles from "./Input.module.css";

const Input: React.FC<InputProps> = ({ placeholder, setValue }) => {
  return (
    <div className={styles.inputBox}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        required
      />
    </div>
  );
};

export default Input;
