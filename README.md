# Movie Finder App
A sleek, modern React app to search and browse movies easily, styled with Tailwind CSS and powered by The Movie Database (TMDb) API and Appwrite backend for trending search tracking.

## Live Demo
This app is currently not deployed or publicly accessible.

## Getting Started
To see the app in action locally:

### Clone this repository

```bash
git clone <repo-url>
```

### Install dependencies

```bash
npm install
```

### Create a .env file with the following environment variables:

```ini
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
```

### Run the development server

```bash
npm run dev
```

Open your browser at http://localhost:3000 (or the port indicated in your terminal).

## Features
Search Movies: Type in the search box to find movies by title using TMDb API. Debounced input ensures efficient API usage.

Trending Movies: Displays a trending movie list, updated in real-time by tracking search counts via Appwrite database.

Movie Cards: Responsive grid layout with movie posters, titles, ratings, and descriptions.

Styling: Uses Tailwind CSS with custom fonts and gradients for a modern, clean UI.

Loading and Error States: Shows a spinner during API calls and error messages on failures.

## How it works
### API Integration:

Fetches movies from TMDb API — either trending/popular movies or search results.

Uses fetch with bearer token authorization for requests.

### Trending Movies Tracking:

On every successful search, the app calls an Appwrite function (updateSearchCount) to increment the count of that search term in the database.

The trending list is populated from Appwrite documents sorted by highest search counts.

### React Hooks:

useState manages UI state such as search input, loading status, movie lists, and error messages.

useEffect fetches data when the component mounts and when the debounced search term changes.

useDebounce delays search input handling for better performance and user experience.

### Styling:

Custom fonts loaded from Google Fonts (Bebas Neue, DM Sans).

Tailwind CSS classes with some custom layer styles for typography, layout, and interactive effects.

Responsive design with a flexible grid system.

## Project Structure
App.jsx - Main component handling data fetching, state, and rendering.

components/Search.jsx - Search input component.

components/MovieCard.jsx - Individual movie card component.

components/Spinner.jsx - Loading spinner.

appwrite.js - API wrapper to interact with Appwrite database.

index.css - Tailwind and custom styles.

## Notes
You must provide your own TMDb API key and Appwrite backend credentials for the app to function.

The backend Appwrite instance handles search term tracking and trending movie data.

This project is a demonstration and is not currently deployed live.

## License
MIT License
