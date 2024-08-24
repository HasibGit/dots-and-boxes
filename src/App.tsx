import Court from "./components/Court/Court";
import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <Court rows={7} cols={9} player1="Joe" player2="Mike"></Court>
      </div>
    </>
  );
}

export default App;
