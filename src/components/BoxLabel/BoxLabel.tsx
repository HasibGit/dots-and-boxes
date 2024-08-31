import { IBoxLabelProps } from "../../interfaces/app.interface";

const BoxLabel: React.FC<IBoxLabelProps> = ({ label }) => {
  return (
    <div style={{ marginLeft: "58px" }}>
      <h1>{label.charAt(0)}</h1>
    </div>
  );
};

export default BoxLabel;
