import "./Sidebar.css";
import RichtextArea from "../card/RichtextArea.jsx";

function Sidebar({
  card,
  onDeleteCard,
  onChangeTextTopLeftOptions,
  onChangeTextTopRightOptions,
  onDeleteImage,
  onImageAlignLeft,
  onImageAlignRight,
  onImageAlignTop,
  onImageAlignBottom,
  onImageAlignCenter,
}) {
  const txtLeftArgs = card.textTopLeftOptions || {};
  const txtRightArgs = card.textTopRightOptions || {};

  return (
    <div className="sidebar">
      {/* Card Inputs */}
      <h3>Text Content</h3>
      <div className="sidebar__card-inputs">
        <h4>Top Left Text:</h4>
        <label>
          Color:
          <input
            type="color"
            value={txtLeftArgs.color || "#000000"}
            onChange={(e) =>
              onChangeTextTopLeftOptions({ color: e.target.value })
            }
          />
        </label>
        <h4>Font</h4>
        <label>
          Size
          <input
            type="number"
            min="8"
            max="16"
            defaultValue="12"
            value={txtLeftArgs.fontSize}
            onChange={(e) =>
              onChangeTextTopLeftOptions({ fontSize: e.target.value })
            }
          />
        </label>
        <div>
          Style
          <label class="checkbox-label">
            <span>Bold</span>
            <input
              type="checkbox"
              name="tul_txt-opt-bold"
              value="bold"
              checked={txtLeftArgs.bold || false}
              onChange={(e) =>
                onChangeTextTopLeftOptions({ bold: e.target.checked })
              }
            />
          </label>
          <label class="checkbox-label">
            <span>Italic</span>
            <input
              type="checkbox"
              name="tul_txt-opt-italic"
              value="italic"
              checked={txtLeftArgs.italic || false}
              onChange={(e) =>
                onChangeTextTopLeftOptions({ italic: e.target.checked })
              }
            />
          </label>
          <label class="checkbox-label">
            <span>Underline</span>
            <input
              type="checkbox"
              name="tul_txt-opt-underline"
              value="underline"
              checked={txtLeftArgs.underline || false}
              onChange={(e) =>
                onChangeTextTopLeftOptions({ underline: e.target.checked })
              }
            />
          </label>
        </div>

        <div className="divider"></div>
        <h4>Top Right Text:</h4>
        <label>
          Color:
          <input
            type="color"
            value={txtRightArgs.color || "#000000"}
            onChange={(e) =>
              onChangeTextTopRightOptions({ color: e.target.value })
            }
          />
        </label>
        <h4>Font</h4>
        <label>
          Size
          <input
            type="number"
            min="8"
            max="16"
            defaultValue="12"
            value={txtRightArgs.fontSize}
            onChange={(e) =>
              onChangeTextTopRightOptions({ fontSize: e.target.value })
            }
          />
        </label>
        <div>
          Style
          <label className="checkbox-label">
            <span>Bold</span>
            <input
              type="checkbox"
              name="tur_txt-opt-bold"
              value="bold"
              checked={txtRightArgs.bold || false}
              onChange={(e) =>
                onChangeTextTopRightOptions({ bold: e.target.checked })
              }
            />
          </label>
          <label className="checkbox-label">
            <span>Italic</span>
            <input
              type="checkbox"
              name="tur_txt-opt-italic"
              value="italic"
              checked={txtRightArgs.italic || false}
              onChange={(e) =>
                onChangeTextTopRightOptions({ italic: e.target.checked })
              }
            />
          </label>
          <label className="checkbox-label">
            <span>Underline</span>
            <input
              type="checkbox"
              name="tur_txt-opt-underline"
              value="underline"
              checked={txtRightArgs.underline || false}
              onChange={(e) =>
                onChangeTextTopRightOptions({ underline: e.target.checked })
              }
            />
          </label>
        </div>

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
