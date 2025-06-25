import "./App.css";
import Menu from "./menu/Menu.jsx";
import Workspace from "./workspace/Workspace.jsx";
import Card from "./card/Card.jsx";

function App() {
  return (
    <>
      <Menu />
      <Workspace>
        <Card /> {/* To be replaced with dynamic content later */}
      </Workspace>
    </>
  );
}

export default App;
