# EpicCards

EpicCards is a modern, interactive card editor and manager built with React and Vite. It allows you to create, edit, preview, and organize custom cards with images and text, all in a clean and responsive interface.

## Features

- **Create and Edit Cards**: Add new cards with custom titles, descriptions, and text fields.
- **Image Upload and Manipulation**: Upload images to cards, move and resize them interactively.
- **List and Workspace Views**: Toggle between a list of all cards and a focused workspace for editing a single card.
- **Import/Export**: Save your card collection to a JSON file or import cards from a file.
- **Responsive UI**: Works well on desktop and modern browsers.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SmallChief/EpicCards.git
   cd EpicCards
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the App

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### Building for Production

To build the app for production:

```bash
npm run build
# or
yarn build
```

To preview the production build:

```bash
npm run preview
# or
yarn preview
```

## Project Structure

- `src/components/` — React components for cards, buttons, menus, overlays, and workspace
- `src/assets/` — Static assets (images, etc.)
- `public/` — Public files and favicon
- `index.html` — Main HTML entry point
- `vite.config.js` — Vite configuration

## Contributing

Contributions are welcome! Please open issues or pull requests for bug fixes, new features, or improvements.

## License

This project is licensed under the MIT License.
