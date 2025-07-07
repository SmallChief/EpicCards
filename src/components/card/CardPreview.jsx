import "./Card.css";
import RichtextArea from "./RichtextArea";

function CardPreview({ card }) {
  return (
    <div className="card card--preview">
      <div className="card__bg"></div>
      <div className="card__header">
        <div 
          className="card__text-row card__text-row--left"
          style={{
            color: card?.textTopLeft ? (card?.textTopLeftOptions?.color || "#000000") : "transparent",
            fontSize: card?.textTopLeftOptions?.fontSize + "px" || "12px",
            fontWeight: card?.textTopLeftOptions?.bold ? "bold" : "normal",
            fontStyle: card?.textTopLeftOptions?.italic ? "italic" : "normal",
            textDecoration: card?.textTopLeftOptions?.underline ? "underline" : "none",
            textAlign: "left",
          }}
        >
          {card?.textTopLeft || "Placeholder"}
        </div>
        <div 
          className="card__text-row card__text-row--right"
          style={{
            color: card?.textTopRight ? (card?.textTopRightOptions?.color || "#000000") : "transparent",
            fontSize: card?.textTopRightOptions?.fontSize + "px" || "12px",
            fontWeight: card?.textTopRightOptions?.bold ? "bold" : "normal",
            fontStyle: card?.textTopRightOptions?.italic ? "italic" : "normal",
            textDecoration: card?.textTopRightOptions?.underline ? "underline" : "none",
            textAlign: "right",
          }}
        >
          {card?.textTopRight || "Placeholder"}
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
      <div 
        className="card__title"
        style={{
          color: card?.title ? "inherit" : "transparent",
        }}
      >
        {card?.title || "Placeholder Title"}
      </div>
      {/* <div className="card__description">{card?.description}</div> */}
      <RichtextArea
        card={card}
        onUpdateDescription={() => {
          console.warn("Cannot not edit a preview card");
        }}
      />
    </div>
  );
}

export default CardPreview;
