import "./CardImage.css";

function CardImage({ image, onImageChange }) {
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
        <img src={image} alt="Card" className="card__image-content" />
      </div>
    );
  }
}

export default CardImage;
