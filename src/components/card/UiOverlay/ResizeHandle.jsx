import "./ResizeHandle.css";

function ResizeHandle({ position, onResize }) {
  // Handle mouse down event to start resizing
  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Store initial mouse position
    const startX = e.clientX;
    const startY = e.clientY;

    // Store initial position
    const startPosition = { ...position };

    // Handle mouse move event to resize
    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      // Calculate new position based on mouse movement
      const newPosition = {
        x: startPosition.x + dx,
        y: startPosition.y + dy,
      };

      console.log("Resizing to:", newPosition);

      // Call the onResize callback with the new position
      onResize(newPosition);
    };

    // Handle mouse up event to stop resizing
    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    // Attach event listeners for mouse move and mouse up
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    // Render a resize handle at the specified position
    <div
      className="resize-handle"
      style={{
        left: position.x,
        top: position.y,
        width: "10px",
        height: "10px",
        cursor: "nwse-resize",
      }}
      onMouseDown={handleMouseDown}
    ></div>
  );
}

export default ResizeHandle;
