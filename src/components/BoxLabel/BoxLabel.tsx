import { IBoxLabelProps } from "../../interfaces/app.interface";

const BoxLabel: React.FC<IBoxLabelProps> = ({ label, players }) => {
  return (
    <div style={{ marginLeft: "58px" }}>
      <h2 style={label == players[0] ? { color: "red" } : { color: "blue" }}>
        {label.charAt(0).toUpperCase()}
      </h2>
    </div>
  );
};

export default BoxLabel;
