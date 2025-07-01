import "./Menu.css";
import Button from "../buttons/Button.jsx";

function Menu({ onNewCard, onExport }) {
  return (
    <div id="menu">
      <Button label="New Card" onClick={onNewCard} />
      <Button label="Export" onClick={onExport} />
    </div>
  );
}

export default Menu;
