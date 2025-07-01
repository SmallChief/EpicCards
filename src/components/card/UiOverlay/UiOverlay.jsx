import "./UiOverlay.css";
import ResizeHandle from "./ResizeHandle.jsx";

function UiOverlay({
  imageRect,
  onImageRectChange,
  containerRef,
  aspectRatio,
  onDeleteImage,
}) {
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

  function handleResize(corner, { x }) {
    const offsetX = x - containerRect.left;

    let newRect = { ...imageRect };
    switch (corner) {
      case "top-left": {
        const dx = offsetX - imageRect.left;
        let newWidth = imageRect.width - dx;
        let newHeight = newWidth / aspectRatio;
        // Calculate the new top position
        const bottom = imageRect.top + imageRect.height;
        const newTop = bottom - newHeight;
        newRect = {
          left: offsetX,
          top: newTop,
          width: newWidth,
          height: newHeight,
        };
        break;
      }
      case "top-right": {
        const dx = offsetX - (imageRect.left + imageRect.width);
        let newWidth = imageRect.width + dx;
        let newHeight = newWidth / aspectRatio;
        // Calculate the new top position
        const bottom = imageRect.top + imageRect.height;
        const newTop = bottom - newHeight;
        newRect = {
          left: imageRect.left,
          top: newTop,
          width: newWidth,
          height: newHeight,
        };
        break;
      }
      case "bottom-left": {
        const dx = offsetX - imageRect.left;
        let newWidth = imageRect.width - dx;
        let newHeight = newWidth / aspectRatio;
        newRect = {
          left: offsetX,
          top: imageRect.top,
          width: newWidth,
          height: newHeight,
        };
        break;
      }
      case "bottom-right": {
        const dx = offsetX - (imageRect.left + imageRect.width);
        let newWidth = imageRect.width + dx;
        let newHeight = newWidth / aspectRatio;
        newRect = {
          left: imageRect.left,
          top: imageRect.top,
          width: newWidth,
          height: newHeight,
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
      {/* Delete Button */}
      <button
        className="ui-overlay__delete"
        onMouseDown={(e) => {
          e.stopPropagation(); // Prevent click from propagating to the overlay
          e.preventDefault(); // Prevent default button behavior
          onDeleteImage();
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default UiOverlay;
