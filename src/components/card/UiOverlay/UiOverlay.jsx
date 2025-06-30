import "./UiOverlay.css";
import ResizeHandle from "./ResizeHandle.jsx";

function UiOverlay({ imageRect, onImageRectChange }) {
  if (!imageRect) return null;

  // Ensure the imageRect is valid
  if (
    !imageRect ||
    typeof imageRect.left !== "number" ||
    typeof imageRect.top !== "number" ||
    typeof imageRect.width !== "number" ||
    typeof imageRect.height !== "number"
  ) {
    return null;
  }

  function handleResize(corner, { x, y }) {
    let newRect = { ...imageRect };
    switch (corner) {
      case "top-left": {
        const dx = x - imageRect.left;
        const dy = y - imageRect.top;
        newRect = {
          left: x,
          top: y,
          width: imageRect.width - dx,
          height: imageRect.height - dy,
        };
        break;
      }
      case "top-right": {
        const dx = x - (imageRect.left + imageRect.width);
        const dy = y - imageRect.top;
        newRect = {
          left: imageRect.left,
          top: y,
          width: imageRect.width + dx,
          height: imageRect.height - dy,
        };
        break;
      }
      case "bottom-left": {
        const dx = x - imageRect.left;
        const dy = y - (imageRect.top + imageRect.height);
        newRect = {
          left: x,
          top: imageRect.top,
          width: imageRect.width - dx,
          height: imageRect.height + dy,
        };
        break;
      }
      case "bottom-right": {
        const dx = x - (imageRect.left + imageRect.width);
        const dy = y - (imageRect.top + imageRect.height);
        newRect = {
          left: imageRect.left,
          top: imageRect.top,
          width: imageRect.width + dx,
          height: imageRect.height + dy,
        };
        break;
      }
      default:
        console.warn("Unknown resize corner:", corner);
        return;
    }
    if (onImageRectChange) {
      onImageRectChange(newRect);
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
        onImageRectChange={({ x, y }) => handleResize("top-left", { x, y })}
      />
      <ResizeHandle
        position={{ x: imageRect.left + imageRect.width, y: imageRect.top }}
        onImageRectChange={({ x, y }) => handleResize("top-right", { x, y })}
      />
      <ResizeHandle
        position={{ x: imageRect.left, y: imageRect.top + imageRect.height }}
        onImageRectChange={({ x, y }) => handleResize("bottom-left", { x, y })}
      />
      <ResizeHandle
        position={{
          x: imageRect.left + imageRect.width,
          y: imageRect.top + imageRect.height,
        }}
        onImageRectChange={({ x, y }) => handleResize("bottom-right", { x, y })}
      />
    </div>
  );
}

export default UiOverlay;
