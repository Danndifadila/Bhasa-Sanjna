import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import api from './api';

// Initialize the root element for React rendering
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Function to fetch and render translations
async function renderTranslations() {
  try {
    // Fetch all translations from the API
    const { translations } = await api.getAllTranslations();

    // Create a container to hold the translations
    const container = document.createElement('div');
    container.id = 'translations-container';
    document.body.appendChild(container);

    // Dynamically generate and append translation elements
    translations.forEach(({ video, text }) => {
      const translationDiv = document.createElement('div');
      translationDiv.innerHTML = `
        <h3>${video}</h3>
        <p>${text}</p>
      `;
      container.appendChild(translationDiv);
    });
  } catch (error) {
    // Log an error message if the API call fails
    console.error('Failed to fetch and display translations:', error);
  }
}

// Call the function to render translations
renderTranslations();