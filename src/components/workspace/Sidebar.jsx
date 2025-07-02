import "./Sidebar.css";
import RichtextArea from "../card/RichtextArea.jsx";

function Sidebar({
  card,
  onDeleteCard,
  onChangeTitle,
  onChangeDescription,
  onChangeTextTopLeft,
  onChangeTextTopRight,
  onDeleteImage,
  onImageAlignLeft,
  onImageAlignRight,
  onImageAlignTop,
  onImageAlignBottom,
  onImageAlignCenter,
}) {
  function handleUpdateDescription(document) {
    const newDescription = document;
    if (card) {
      onChangeDescription(newDescription);
    }
  }

  return (
    <div className="sidebar">
      {/* Card Inputs */}
      <h3>Text Content</h3>
      <div className="sidebar__card-inputs">
        <label>
          Top Left Text:
          <input
            type="text"
            value={card.textTopLeft}
            onChange={onChangeTextTopLeft}
          />
        </label>
        <label>
          Top Right Text:
          <input
            type="text"
            value={card.textTopRight}
            onChange={onChangeTextTopRight}
          />
        </label>
        <label>
          Card Title:
          <input type="text" value={card.title} onChange={onChangeTitle} />
        </label>
        <label>
          Card Description:
          <RichtextArea
            card={card}
            onUpdateDescription={handleUpdateDescription}
          />
        </label>

        <div className="divider"></div>
        <h3>Image</h3>
        {card.image ? (
          <>
            <p className="image__file-name">
              <strong>File Name:</strong>
              <br /> {card.imageName}
            </p>

            {/* Image Placement Buttons */}
            <h5>Align Image</h5>
            <div className="sidebar__image-placement">
              <button className="sidebar__image-btn" onClick={onImageAlignTop}>
                Top
              </button>
              <button
                className="sidebar__image-btn"
                onClick={onImageAlignBottom}
              >
                Bottom
              </button>
              <button className="sidebar__image-btn" onClick={onImageAlignLeft}>
                Left
              </button>
              <button
                className="sidebar__image-btn"
                onClick={onImageAlignRight}
              >
                Right
              </button>
              <button
                className="sidebar__image-btn"
                onClick={onImageAlignCenter}
                style={{ gridColumn: "span 2" }}
              >
                Center
              </button>
            </div>

            <button
              className="sidebar__image-delete-btn"
              onClick={onDeleteImage}
            >
              Delete Image
            </button>
          </>
        ) : (
          <p className="sidebar__no-image">
            No image uploaded. Click the placeholder to upload.
          </p>
        )}
        <div className="divider"></div>
      </div>

      <button className="sidebar__delete-btn" onClick={onDeleteCard}>
        Delete Card
      </button>
    </div>
  );
}
export default Sidebar;
