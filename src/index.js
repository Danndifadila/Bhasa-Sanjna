import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import api from './api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



async function renderTranslations() {

  try {
    const data = await api.getAllTranslations(); 

    data.translations.forEach((item) => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${item.video}</h3>
        <p>${item.text}</p>\
      `;
    });
  } catch (error) {
    console.error("Gagal menampilkan data:", error);
  }
}

renderTranslations();