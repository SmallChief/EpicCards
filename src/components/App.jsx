import "./App.css";
import Menu from "./menu/Menu.jsx";
import Workspace from "./workspace/Workspace.jsx";
import Sidebar from "./workspace/Sidebar.jsx";
import Card from "./card/Card.jsx";
import CardListView from "./card/CardListView.jsx";
import { useState } from "react";

function App() {
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [view, setView] = useState("workspace"); // "workspace" or "list"

  const newCardTemplate = {
    id: null,
    title: "",
    description: "",
    textTopLeft: "",
    textTopLeftOptions: {
      color: "#000000", // Default color
      fontSize: "12", // Default font size
      bold: false, // Default bold
      italic: false, // Default italic
      underline: false, // Default underline
    },
    textTopRight: "",
    textTopRightOptions: {
      color: "#000000", // Default color
      fontSize: "12", // Default font size
      bold: false, // Default bold
      italic: false, // Default italic
      underline: false, // Default underline
    },
    backgroundColor: "#ffffff", // Default background color
    image: null, // Initially no image
    imageRect: null, // Initial image rectangle
    imageAspectRatio: 1, // Default aspect ratio
  };

  // Test data
  const testCards = [
    {
      id: 1,

      // Text fields
      title: "Test Card",
      description: [
        {
          type: "paragraph",
          content: "This is a new Card!",
        },
      ],
      textTopLeft: "Text Top-Left",
      // Text options
      textTopLeftOptions: {
        color: "#0000ff",
        fontSize: "16",
        bold: true,
        italic: false,
        underline: false,
      },
      textTopRight: "Text Top-Right",
      // Text options
      textTopRightOptions: {
        color: "#ff0000",
        fontSize: "15",
        bold: false,
        italic: true,
        underline: false,
      },
      backgroundColor: "#f0f0f0", // Default background color
      image: null, // Initially no image
      imageName: "", // Initially no image name
      imageRect: null, // Initial image rectangle
      imageAspectRatio: 1, // Default aspect ratio
    },
    {
      id: 2,
      title: "Another Card",
      description: [
        {
          type: "paragraph",
          content: "This is another Card!",
        },
      ],
      textTopLeft: "Text 2 Top-Left",
      textTopRight: "Text 2 Top-Right",
      image: null, // Initially no image
      imageName: "", // Initially no image name
      imageRect: null, // Initial image rectangle
      imageAspectRatio: 1, // Default aspect ratio
    },
    {
      id: 3,
      title: "Third Card",
      description: [
        {
          type: "paragraph",
          content: "This is the third Card!",
        },
      ],
      textTopLeft: "Text 3 Top-Left",
      textTopRight: "Text 3 Top-Right",
      backgroundColor:"#cccccc",
      image: null, // Initially no image
      imageName: "", // Initially no image name
      imageRect: null, // Initial image rectangle
      imageAspectRatio: 1, // Default aspect ratio
    },
  ];

  // Adding a test card for demonstration
  if (cards.length === 0) {
    setCards(testCards);
    setCurrentCard(testCards[0]);
  }

  function addCard() {
    const newCard = {
      ...newCardTemplate,
      id: cards.length > 0 ? Math.max(...cards.map((c) => c.id)) + 1 : 1, // Generate a new ID
    };
    setCards((prevCards) => [...prevCards, newCard]);
    setCurrentCard(newCard);
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

  function deleteCurrentCard() {
    if (!currentCard) return;
    setCards((prev) => prev.filter((c) => c.id !== currentCard.id));
    setCurrentCard(null);
    setView("list");
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

  function handleImageAlignLeft() {
    if (currentCard) {
      updateCard(currentCard.id, {
        imageRect: { ...currentCard.imageRect, left: 0 },
      });
    }
  }

  function handleImageAlignRight() {
    if (currentCard && currentCard.imageRect) {
      // Find the image container element
      const container = document.querySelector(".card__image");
      const containerWidth = container ? container.offsetWidth : 0;
      const imageWidth = currentCard.imageRect.width || 0;
      const newLeft = containerWidth - imageWidth;

      updateCard(currentCard.id, {
        imageRect: { ...currentCard.imageRect, left: newLeft },
      });
    }
  }

  function handleImageAlignTop() {
    if (currentCard) {
      updateCard(currentCard.id, {
        imageRect: { ...currentCard.imageRect, top: 0 },
      });
    }
  }

  function handleImageAlignBottom() {
    if (currentCard && currentCard.imageRect) {
      // Find the image container element
      const container = document.querySelector(".card__image");
      const containerHeight = container ? container.offsetHeight : 0;
      const imageHeight = currentCard.imageRect.height || 0;
      const newTop = containerHeight - imageHeight;
      updateCard(currentCard.id, {
        imageRect: { ...currentCard.imageRect, top: newTop },
      });
    }
  }

  function handleImageAlignCenter() {
    if (currentCard && currentCard.imageRect) {
      // Find the image container element
      const container = document.querySelector(".card__image");
      const containerWidth = container ? container.offsetWidth : 0;
      const imageWidth = currentCard.imageRect.width || 0;
      const newLeft = (containerWidth - imageWidth) / 2;
      const newTop =
        (container.offsetHeight - currentCard.imageRect.height) / 2;
      updateCard(currentCard.id, {
        imageRect: { ...currentCard.imageRect, left: newLeft, top: newTop },
      });
    }
  }

  function handleUpdateTextTopLeftOptions(options) {
    if (currentCard) {
      updateCard(currentCard.id, {
        textTopLeftOptions: { ...currentCard.textTopLeftOptions, ...options },
      });
    }
  }

  function handleUpdateTextTopRightOptions(options) {
    if (currentCard) {
      updateCard(currentCard.id, {
        textTopRightOptions: { ...currentCard.textTopRightOptions, ...options },
      });
    }
  }

  function handleChangeBackgroundColor (color) {
    if (currentCard) {
      updateCard(currentCard.id, { backgroundColor: color });
    }
  }

  return (
    <>
      <Menu
        onNewCard={addCard}
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
        <Workspace
          onDeleteCard={deleteCurrentCard}
          showDeleteButton={!!currentCard}
        >
          <Sidebar
            card={currentCard}
            onDeleteCard={deleteCurrentCard}
            onChangeBackgroundColor={handleChangeBackgroundColor}
            onChangeTextTopLeftOptions={handleUpdateTextTopLeftOptions}
            onChangeTextTopRightOptions={handleUpdateTextTopRightOptions}
            onDeleteImage={() =>
              updateCard(currentCard.id, { image: null, imageRect: null })
            }
            onImageAlignLeft={handleImageAlignLeft}
            onImageAlignRight={handleImageAlignRight}
            onImageAlignTop={handleImageAlignTop}
            onImageAlignBottom={handleImageAlignBottom}
            onImageAlignCenter={handleImageAlignCenter}
          />
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
