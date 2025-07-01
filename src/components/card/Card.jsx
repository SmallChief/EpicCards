import "./Card.css";
import CardImage from "./CardImage.jsx";
import UiOverlay from "./UiOverlay/UiOverlay.jsx";
import { useState, useCallback, useRef } from "react";

function Card({ card, updateCard }) {
  const [imageFocused, setImageFocused] = useState(false);
  const imageContainerRef = useRef(null);

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

  function calcInitialImageRect(image, aspectRatio, maxWidth) {
    if (!image || !aspectRatio)
      return { left: 0, top: 0, width: 200, height: 200 };

    const width = Math.min(maxWidth, image.width);
    const height = width / aspectRatio;

    return {
      left: 0,
      top: 0,
      width,
      height,
    };
  }

  function handleImageChange(image) {
    if (card) {
      const imageUrl = URL.createObjectURL(image);
      getImageMeta(imageUrl, (meta) => {
        // Calculate initial rectangle based on image metadata
        const initialRect = calcInitialImageRect(
          meta,
          meta.aspectRatio, // Default aspect ratio if not available
          imageContainerRef.current?.offsetWidth || 200 // Default max width if container not available
        );

        updateCard(card.id, {
          image: imageUrl,
          imageRect: initialRect,
          imageAspectRatio: meta.aspectRatio || 1, // Default aspect ratio if not available
        });
      });
    }
  }

  function handleDeleteImage() {
    if (card) {
      updateCard(card.id, {
        image: null,
        imageRect: null,
        imageAspectRatio: null,
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

  function handleUpdateTextTopLeft(e) {
    const newText = e.target.value;
    if (card) {
      updateCard(card.id, { textTopLeft: newText });
    }
  }

  function handleUpdateTextTopRight(e) {
    const newText = e.target.value;
    if (card) {
      updateCard(card.id, { textTopRight: newText });
    }
  }

  function handleUpdateTitle(e) {
    const newTitle = e.target.value;
    if (card) {
      updateCard(card.id, { title: newTitle });
    }
  }

  function handleUpdateDescription(e) {
    const newDescription = e.target.value;
    if (card) {
      updateCard(card.id, { description: newDescription });
    }
  }

  return (
    <div className="card">
      <div className="card__bg"></div>
      <div className="card__header">
        <input
          className="card__text-row"
          defaultValue="Text Top-Left"
          onChange={handleUpdateTextTopLeft}
        />
        <input
          className="card__text-row"
          defaultValue="Text Top-Right"
          onChange={handleUpdateTextTopRight}
        />
      </div>
      <CardImage
        image={card?.image}
        position={card?.position || { x: 0, y: 0 }}
        imageRect={card?.imageRect}
        onImageChange={handleImageChange}
        onImageMove={handleImageRectChange}
        onImageFocus={handleImageFocus}
        onImageBlur={handleImageBlur}
        containerRef={imageContainerRef}
      />
      {imageFocused && (
        <UiOverlay
          containerRef={imageContainerRef}
          imageRect={card?.imageRect}
          aspectRatio={card?.imageAspectRatio}
          onImageRectChange={handleImageRectChange}
          onDeleteImage={handleDeleteImage}
        />
      )}

      <input
        type="text"
        name="title"
        id="title"
        className="card__title"
        onChange={handleUpdateTitle}
      />
      <textarea
        className="card__description"
        onChange={handleUpdateDescription}
      >
        Card Description
      </textarea>
    </div>
  );
}

export default Card;
