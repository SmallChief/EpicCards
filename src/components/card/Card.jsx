import "./Card.css";
import CardImage from "./CardImage.jsx";
import UiOverlay from "./UiOverlay.jsx";

function Card({ card, updateCard }) {
  function handleImageChange(image) {
    if (card) {
      console.log("Image changed:", image);
      console.log("card:", card);
      updateCard(card.id, { image: URL.createObjectURL(image) });
    }
  }

  return (
    <div className="card">
      <div className="card__bg"></div>
      <div className="card__header">
        <input className="card__text-row" defaultValue="Text Top-Left" />
        <input className="card__text-row" defaultValue="Text Top-Right" />
      </div>
      <CardImage image={card?.image} onImageChange={handleImageChange} />
      <UiOverlay />

      <div className="card__title">Card Title</div>
      <div className="card__description">Card Description</div>
    </div>
  );
}

export default Card;
