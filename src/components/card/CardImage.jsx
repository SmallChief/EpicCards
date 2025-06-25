import "./CardImage.css";
import { useEffect, useRef, useState } from "react";

function CardImage({ image, onImageChange }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setPosition({ x: position.x + dx, y: position.y + dy });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  if (!image) {
    return (
      <div className="card__image">
        <input
          type="file"
          name="image-input"
          id="image-input"
          onChange={(e) => onImageChange(e.target.files[0])}
        />
        <label htmlFor="image-input" className="card__image-label">
          <span className="card__image-placeholder">Click to upload image</span>
        </label>
      </div>
    );
  } else {
    return (
      <div className="card__image">
        <img
          src={image}
          style={{ left: position.x, top: position.y }}
          onMouseDown={handleMouseDown}
          alt="Card"
          className="card__image-content"
          draggable="false"
        />
      </div>
    );
  }
}

export default CardImage;
