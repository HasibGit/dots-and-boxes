import Court from "./components/Court/Court";
import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <Court rows={7} cols={9}></Court>
      </div>
    </>
  );
}

export default App;
