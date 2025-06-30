import "./App.css";
import Menu from "./menu/Menu.jsx";
import Workspace from "./workspace/Workspace.jsx";
import Card from "./card/Card.jsx";
import { useState } from "react";

function App() {
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);

  // Test data
  const testCard = {
    id: 1,

    // Text fields
    title: "Test Card",
    description: "This is a test card for demonstration purposes.",
    textTopLeft: "Text Top-Left",
    textTopRight: "Text Top-Right",

    image: null, // Initially no image
    imageRect: null, // Initial image rectangle
    imageAspectRatio: 1, // Default aspect ratio
  };

  // Adding a test card for demonstration
  if (cards.length === 0) {
    setCards([testCard]);
    setCurrentCard(testCard);
  }

  function updateCard(id, changes) {
    setCurrentCard((prevCard) => {
      if (prevCard && prevCard.id === id) {
        return { ...prevCard, ...changes };
      }
      return prevCard;
    });
    setCards((prevCards) =>
      prevCards.map((card) => (card.id === id ? { ...card, ...changes } : card))
    );

    console.log("Card updated:", id, changes);
  }

  return (
    <>
      <Menu />
      <Workspace>
        {currentCard ? (
          <Card card={currentCard} updateCard={updateCard} />
        ) : (
          <Card />
        )}
      </Workspace>
    </>
  );
}

export default App;
