import "./CardImage.css";

function CardImage() {
  return (
    <div className="card__image">
      <input type="file" name="image-input" id="image-input" />
      <label htmlFor="image-input" className="card__image-label">
        <span className="card__image-placeholder">Click to upload image</span>
      </label>
    </div>
  );
}

export default CardImage;
