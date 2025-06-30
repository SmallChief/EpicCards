import "./CardImage.css";
import { useCallback, useEffect, useRef, useState } from "react";

function CardImage({
  image,
  imageRect,
  // imageAspectRatio = 1,
  onImageChange,
  onImageMove,
  onImageRect,
  onImageFocus,
  onImageBlur,
}) {
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const imageStart = useRef({ x: 0, y: 0 });
  const imgRef = useRef(null);

  const handleMouseDown = (e) => {
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };

    imageStart.current = {
      x: imageRect.left,
      y: imageRect.top,
    };
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (dragging) {
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        onImageMove({
          left: imageStart.current.x + dx,
          top: imageStart.current.y + dy,
          width: imageRect.width,
          height: imageRect.height,
        });
      }
    },
    [dragging, onImageMove, imageRect?.width, imageRect?.height]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

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
  }, [dragging, handleMouseMove, handleMouseUp]);

  // Report image rect to parent
  useEffect(() => {
    if (image && imgRef.current && onImageRect) {
      const rect = imgRef.current.getBoundingClientRect();
      onImageRect({
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
      });
    }
  }, [image, onImageRect]);

  // Handle image focus and blur on clicking the image
  const handleFocus = () => {
    if (onImageFocus) onImageFocus();
  };
  const handleBlur = () => {
    if (onImageBlur) onImageBlur();
  };

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
          ref={imgRef}
          src={image}
          style={{
            position: "absolute",
            left: imageRect.left,
            top: imageRect.top,
            width: imageRect.width,
            height: imageRect.height,
          }}
          onMouseDown={handleMouseDown}
          alt="Card"
          className="card__image-content"
          draggable="false"
          tabIndex={0}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    );
  }
}

export default CardImage;
