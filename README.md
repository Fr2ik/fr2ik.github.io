# Incremental Equipment Game

A simple incremental web game built with Vue 3, Vite, Pinia, and Tailwind CSS.

## Getting Started

Note: This project is configured to bundle everything into a single file. **You can open `index.html` directly in your browser** (using the `file://` protocol) and it will work!

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone or download this repository.
2. Open a terminal in the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

To start the game in development mode with hot-reloading:
```bash
npm run dev
```
After running this command, open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

### Building for Production

To create a production-ready build in the `dist/` directory:
```bash
npm run build
```
To preview the production build:
```bash
npm run preview
```

### Running Tests

To run the unit tests:
```bash
npx vitest run
```

## Features

- **Coins**: Start with 100 coins. Each "Flip Card" costs 10.
- **Character Stats**: Tracks HP, Attack, Defense, and Attack Speed.
- **Equipment**: 8 slots (Weapon, Gloves, Boots, Helmet, Chestplate, Legguards, Ring, Amulet).
- **Rarity Tiers**: Items range from F to A rarity, with scaling stat bonuses.
- **State Management**: Uses Pinia for a reactive and centralized game store.
- **Styling**: Modern, dark-themed UI built with Tailwind CSS v4.
