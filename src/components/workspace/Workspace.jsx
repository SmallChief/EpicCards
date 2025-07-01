import "./Workspace.css";

function Workspace({ children, onDeleteCard, showDeleteButton }) {
  return (
    <div className="workspace">
      {children}
      {showDeleteButton && (
        <button className="workspace__delete-btn" onClick={onDeleteCard}>
          Delete Card
        </button>
      )}
    </div>
  );
}

export default Workspace;
