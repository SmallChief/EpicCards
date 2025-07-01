import "./Card.css";

function CardPreview({ card }) {
  return (
    <div className="card card--preview">
      <div className="card__bg"></div>
      <div className="card__header">
        <div className="card__text-row card__text-row--left">
          {card?.textTopLeft}
        </div>
        <div className="card__text-row card__text-row--right">
          {card?.textTopRight}
        </div>
      </div>
      <div className="card__image" style={{ position: "relative" }}>
        {card?.image ? (
          <img
            src={card.image}
            alt="Card"
            className="card__image-content"
            style={{
              position: "absolute",
              left: card.imageRect?.left || 0,
              top: card.imageRect?.top || 0,
              width: card.imageRect?.width || "100%",
              height: card.imageRect?.height || "auto",
            }}
            draggable="false"
          />
        ) : (
          <div
            className="card__image-placeholder"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f0f0f0",
              color: "#aaa",
              fontSize: 14,
              borderRadius: 8,
              border: "1px dashed #ccc",
            }}
          >
            No Image
          </div>
        )}
      </div>
      <div className="card__title">{card?.title}</div>
      <div className="card__description">{card?.description}</div>
    </div>
  );
}

export default CardPreview;
