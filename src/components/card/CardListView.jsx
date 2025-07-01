import CardPreview from "./CardPreview.jsx";
import "./Card.css";
import "./CardListView.css";

function CardListView({ cards, onSelectCard }) {
  return (
    <div className="card-list-view">
      {cards && cards.length > 0 ? (
        <div className="card-list-view__grid">
          {cards.map((card) => (
            <div
              key={card.id}
              className="card-list-view__item"
              onClick={() => onSelectCard && onSelectCard(card)}
              style={{ cursor: onSelectCard ? "pointer" : "default" }}
            >
              <CardPreview card={card} />
            </div>
          ))}
        </div>
      ) : (
        <div>No cards to display.</div>
      )}
    </div>
  );
}

export default CardListView;
