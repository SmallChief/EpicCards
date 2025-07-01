import "./Menu.css";
import Button from "../buttons/Button.jsx";

function Menu({ onNewCard, onExport, onImport, onViewToggle }) {
  function handleImport() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (event) => {
      onImport(event.target.files[0]);
    };
    input.click();
  }

  return (
    <div id="menu">
      <Button label="New Card" onClick={onNewCard} />
      <Button label="Export" onClick={onExport} />
      <Button label="Import" onClick={handleImport} />
      <Button label="Toggle List View" onClick={onViewToggle} />
    </div>
  );
}

export default Menu;
