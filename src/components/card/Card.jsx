import "./Card.css";
import CardImage from "./CardImage.jsx";

function Card({ card, onImageChange }) {
  return (
    <div className="card">
      <div className="card__bg"></div>
      <div className="card__header">
        <input className="card__text-row" defaultValue="Text Top-Left" />
        <input className="card__text-row" defaultValue="Text Top-Right" />
      </div>
      <CardImage image={card?.image} onImageChange={onImageChange} />
      <div className="card__title">Card Title</div>
      <div className="card__description">Card Description</div>
    </div>
  );
}

export default Card;
