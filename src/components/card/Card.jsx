import "./Card.css";
import CardImage from "./CardImage.jsx";

function Card() {
  return (
    <div className="card">
      <div className="card__bg"></div>
      <div className="card__header">
        <input className="card__text-row" defaultValue="Text Top-Left" />
        <input className="card__text-row" defaultValue="Text Bottom-Left" />
      </div>
      <CardImage />
      <div className="card__title">Card Title</div>
      <div className="card__description">Card Description</div>
    </div>
  );
}

export default Card;
