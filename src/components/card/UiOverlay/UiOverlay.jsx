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

  /* 
  Resize logic notes:
  - corner is clicked
  - mouse is moved
  - calculate new position/size:
    - calculate the difference in mouse position from the initial click
    - adjust the rectangle's position or size based on the corner being resized
  - keep the aspect ratio:
    - calculate the aspect ratio of the original rectangle
    - apply the same ratio to the new dimensions
  - resize using opposite corner as an anchor:
    - calculate the new position based on the opposite corner
    - adjust the rectangle's position and size accordingly
  */

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
      <ResizeHandle
        position={{ x: imageRect.left + imageRect.width, y: imageRect.top }}
        onResize={({ x, y }) => handleResize("top-right", { x, y })}
      />
      <ResizeHandle
        position={{
          x: imageRect.left,
          y: imageRect.top + imageRect.height,
        }}
        onResize={({ x, y }) => handleResize("bottom-left", { x, y })}
      />
      <ResizeHandle
        position={{
          x: imageRect.left + imageRect.width,
          y: imageRect.top + imageRect.height,
        }}
        onResize={({ x, y }) => handleResize("bottom-right", { x, y })}
      />
    </div>
  );
}

export default UiOverlay;
