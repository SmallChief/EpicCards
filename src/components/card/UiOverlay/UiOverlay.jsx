import "./UiOverlay.css";
import ResizeHandle from "./ResizeHandle.jsx";

function UiOverlay({ imageRect }) {
  if (!imageRect) return null;

  // Ensure the imageRect is valid
  if (
    !imageRect ||
    !imageRect.left ||
    !imageRect.top ||
    !imageRect.width ||
    !imageRect.height
  ) {
    return null;
  }

  function handleResize(corner, { x, y }) {
    switch (corner) {
      case "top-left":
        // Handle top-left resize logic
        console.log("Resizing from top-left", { x, y });
        break;
      case "top-right":
        // Handle top-right resize logic
        console.log("Resizing from top-right", { x, y });
        break;
      case "bottom-left":
        // Handle bottom-left resize logic
        console.log("Resizing from bottom-left", { x, y });
        break;
      case "bottom-right":
        // Handle bottom-right resize logic
        console.log("Resizing from bottom-right", { x, y });
        break;
      default:
        console.warn("Unknown resize corner:", corner);
        return;
    }
  }

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
    >
      <ResizeHandle
        position={{ x: imageRect.left, y: imageRect.top }}
        onResize={({ x, y }) => handleResize("top-left", { x, y })}
      />
    </div>
  );
}

export default UiOverlay;
