import "./UiOverlay.css";
import ResizeHandle from "./ResizeHandle.jsx";

function UiOverlay({ imageRect, onImageRectChange, containerRef }) {
  if (!imageRect || !containerRef?.current) return null;

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

  const containerRect = containerRef.current.getBoundingClientRect();

  const screenRect = {
    left: containerRect.left + imageRect.left,
    top: containerRect.top + imageRect.top,
    width: imageRect.width,
    height: imageRect.height,
  };

  function handleResize(corner, { x, y }) {
    const offsetX = x - containerRect.left;
    const offsetY = y - containerRect.top;

    let newRect = { ...imageRect };
    switch (corner) {
      case "top-left": {
        const dx = offsetX - imageRect.left;
        const dy = offsetY - imageRect.top;
        newRect = {
          left: offsetX,
          top: offsetY,
          width: imageRect.width - dx,
          height: imageRect.height - dy,
        };
        break;
      }
      case "top-right": {
        const dx = offsetX - (imageRect.left + imageRect.width);
        const dy = offsetY - imageRect.top;
        newRect = {
          left: imageRect.left,
          top: offsetY,
          width: imageRect.width + dx,
          height: imageRect.height - dy,
        };
        break;
      }
      case "bottom-left": {
        const dx = offsetX - imageRect.left;
        const dy = offsetY - (imageRect.top + imageRect.height);
        newRect = {
          left: offsetX,
          top: imageRect.top,
          width: imageRect.width - dx,
          height: imageRect.height + dy,
        };
        break;
      }
      case "bottom-right": {
        const dx = offsetX - (imageRect.left + imageRect.width);
        const dy = offsetY - (imageRect.top + imageRect.height);
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
        left: screenRect.left,
        top: screenRect.top,
        width: screenRect.width,
        height: screenRect.height,
      }}
    >
      <ResizeHandle
        position={{ x: screenRect.left, y: screenRect.top }}
        onImageRectChange={({ x, y }) => handleResize("top-left", { x, y })}
      />
      <ResizeHandle
        position={{ x: screenRect.left + screenRect.width, y: screenRect.top }}
        onImageRectChange={({ x, y }) => handleResize("top-right", { x, y })}
      />
      <ResizeHandle
        position={{ x: screenRect.left, y: screenRect.top + screenRect.height }}
        onImageRectChange={({ x, y }) => handleResize("bottom-left", { x, y })}
      />
      <ResizeHandle
        position={{
          x: screenRect.left + screenRect.width,
          y: screenRect.top + screenRect.height,
        }}
        onImageRectChange={({ x, y }) => handleResize("bottom-right", { x, y })}
      />
    </div>
  );
}

export default UiOverlay;
