import "./Card.css";
import CardImage from "./CardImage.jsx";
import UiOverlay from "./UiOverlay/UiOverlay.jsx";
import { useState, useCallback } from "react";

function Card({ card, updateCard }) {
  const [imageRect, setImageRect] = useState(null);
  const [imageFocused, setImageFocused] = useState(false);

  // Handle image focus state on click
  function handleImageFocus() {
    setImageFocused(true);
  }

  // Handle image blur state on click outside
  function handleImageBlur() {
    setImageFocused(false);
  }

  function handleImageChange(image) {
    if (card) {
      updateCard(card.id, { image: URL.createObjectURL(image) });
    }
  }

  function handleImageMove(position) {
    if (card) {
      updateCard(card.id, { position });
    }
  }

  // Callback to receive image rect from CardImage
  const handleImageRect = useCallback((rect) => {
    setImageRect(rect);
  }, []);

  return (
    <div className="card">
      <div className="card__bg"></div>
      <div className="card__header">
        <input className="card__text-row" defaultValue="Text Top-Left" />
        <input className="card__text-row" defaultValue="Text Top-Right" />
      </div>
      <CardImage
        image={card?.image}
        position={card?.position || { x: 0, y: 0 }}
        onImageChange={handleImageChange}
        onImageMove={handleImageMove}
        onImageRect={handleImageRect}
        onImageFocus={handleImageFocus}
        onImageBlur={handleImageBlur}
      />
      {imageFocused && (
        <UiOverlay
          position={card?.position || { x: 0, y: 0 }}
          imageRect={imageRect}
        />
      )}

      <div className="card__title">Card Title</div>
      <div className="card__description">Card Description</div>
    </div>
  );
}

export default Card;
