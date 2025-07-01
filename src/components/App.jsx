import "./App.css";
import Menu from "./menu/Menu.jsx";
import Workspace from "./workspace/Workspace.jsx";
import Card from "./card/Card.jsx";
import CardListView from "./card/CardListView.jsx";
import { useState } from "react";

function App() {
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [view, setView] = useState("workspace"); // "workspace" or "list"

  // Test data
  const testCards = [
    {
      id: 1,

      // Text fields
      title: "Test Card",
      description: "",
      textTopLeft: "Text Top-Left",
      textTopRight: "Text Top-Right",

      image: null, // Initially no image
      imageRect: null, // Initial image rectangle
      imageAspectRatio: 1, // Default aspect ratio
    },
    {
      id: 2,
      title: "Another Card",
      description: "This is another test card.",
      textTopLeft: "Text 2 Top-Left",
      textTopRight: "Text 2 Top-Right",
      image: null, // Initially no image
      imageRect: null, // Initial image rectangle
      imageAspectRatio: 1, // Default aspect ratio
    },
    {
      id: 3,
      title: "Third Card",
      description: "This is the third test card.",
      textTopLeft: "Text 3 Top-Left",
      textTopRight: "Text 3 Top-Right",
      image: null, // Initially no image
      imageRect: null, // Initial image rectangle
      imageAspectRatio: 1, // Default aspect ratio
    },
  ];

  // Adding a test card for demonstration
  if (cards.length === 0) {
    setCards(testCards);
    setCurrentCard(testCards[0]);
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

  function handleExport() {
    const cardData = JSON.stringify(cards, null, 2);
    const blob = new Blob([cardData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cards.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedCards = JSON.parse(event.target.result);
        setCards(importedCards);
        if (importedCards.length > 0) {
          setCurrentCard(importedCards[0]);
        }
      } catch (error) {
        console.error("Error importing cards:", error);
      }
    };
    reader.readAsText(file);
  }

  function handleViewToggle() {
    setView(view === "workspace" ? "list" : "workspace");
  }

  return (
    <>
      <Menu
        onExport={handleExport}
        onImport={handleImport}
        onViewToggle={handleViewToggle}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          margin: "1rem",
        }}
      ></div>
      {view === "workspace" ? (
        <Workspace>
          {currentCard ? (
            <Card card={currentCard} updateCard={updateCard} />
          ) : (
            <Card />
          )}
        </Workspace>
      ) : (
        <CardListView
          cards={cards}
          onSelectCard={(card) => {
            setCurrentCard(card);
            setView("workspace");
          }}
        />
      )}
    </>
  );
}

export default App;
