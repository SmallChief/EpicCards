import "./UiOverlay.css";

function UiOverlay({ imageRect }) {
  if (!imageRect) return null;
  return (
    <div
      id="ui-overlay"
      style={{
        position: "fixed",
        left: imageRect.left,
        top: imageRect.top,
        width: imageRect.width,
        height: imageRect.height,
      }}
    ></div>
  );
}

export default UiOverlay;
