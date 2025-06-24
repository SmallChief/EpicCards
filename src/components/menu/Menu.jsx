import "./Menu.css";
import Button from "../buttons/Button.jsx";

function Menu() {
  return (
    <div id="menu">
      <Button label="New Card" onClick={() => console.log("New Card")} />
      <Button label="Export" onClick={() => console.log("Export")} />
      <Button label="Settings" onClick={() => console.log("Settings")} />
    </div>
  );
}

export default Menu;
