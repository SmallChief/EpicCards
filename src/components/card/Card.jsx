import "./Card.css";

function Card() {
  return (
    <div className="card">
      <div className="card__bg"></div>
      <div className="card__header">
        <span className="card__text-row">Text Top-Left</span>
        <span className="card__text-row">Text Bottom-Left</span>
      </div>
      <div className="card__image"></div>
      <div className="card__title">Card Title</div>
      <div className="card__description">Card Description</div>
    </div>
  );
}

export default Card;
