import "./Card.css";
import CardImage from "./CardImage.jsx";
import UiOverlay from "./UiOverlay/UiOverlay.jsx";
import { useState, useCallback } from "react";

function Card({ card, updateCard }) {
  const [imageFocused, setImageFocused] = useState(false);

  // Handle image focus state on click
  function handleImageFocus() {
    setImageFocused(true);
  }

  // Handle image blur state on click outside
  function handleImageBlur() {
    setImageFocused(false);
  }

  const getImageMeta = useCallback((url, cb) => {
    const img = new Image();
    img.onload = () => {
      cb({
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: img.naturalWidth / img.naturalHeight,
      });
    };
    img.src = url;
  }, []);

  function handleImageChange(image) {
    if (card) {
      const imageUrl = URL.createObjectURL(image);
      getImageMeta(imageUrl, (meta) => {
        const newRect = {
          left: 0,
          top: 0,
          width: meta.width || 200, // Default width if not available
          height: meta.height || 200, // Default height if not available
        };
        updateCard(card.id, {
          image: imageUrl,
          imageRect: newRect,
          imageAspectRatio: meta.aspectRatio || 1, // Default aspect ratio if not available
        });
      });
    }
  }

  const handleImageRectChange = useCallback(
    (newRect) => {
      if (card) {
        updateCard(card.id, { imageRect: newRect });
      }
    },
    [card, updateCard]
  );

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
        imageRect={card?.imageRect}
        onImageChange={handleImageChange}
        onImageMove={handleImageRectChange}
        onImageFocus={handleImageFocus}
        onImageBlur={handleImageBlur}
      />
      {imageFocused && (
        <UiOverlay
          imageRect={card?.imageRect}
          onImageRectChange={handleImageRectChange}
        />
      )}

      <div className="card__title">Card Title</div>
      <div className="card__description">Card Description</div>
    </div>
  );
}

export default Card;
