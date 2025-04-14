class SignTranslatePopup extends HTMLElement {
  constructor() {
    super();
    // Attach shadow DOM
    this.attachShadow({ mode: 'open' });

    // Define the HTML structure and styles
    this.shadowRoot.innerHTML = `
      <style>
        .container {
          display: none;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 20px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          text-align: center;
          z-index: 1000;
          display: flex;
          flex-direction: row;
          gap: 20px;
        }
        .overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }
        .show {
          display: flex;
        }
        button {
          padding: 10px;
          cursor: pointer;
          margin-top: 10px;
        }
        .translation-box {
          width: 200px;
          height: 300px;
          border: 2px solid black;
          padding: 10px;
          overflow-y: auto;
          text-align: left;
          background: #f9f9f9;
        }
      </style>
      <button id="open-popup">Sign Translate</button>
      <div class="overlay" id="overlay"></div>
      <div class="container" id="popup">
        <sign-translate></sign-translate>
        <div class="translation-box" id="translation-result">
          <p><strong>Translation Result:</strong></p>
        </div>
        <button id="close-popup">Close</button>
      </div>
    `;
  }

  connectedCallback() {
    // Add event listeners for opening and closing the popup
    this.shadowRoot.querySelector('#open-popup').addEventListener('click', this.openPopup.bind(this));
    this.shadowRoot.querySelector('#close-popup').addEventListener('click', this.closePopup.bind(this));
    this.shadowRoot.querySelector('#overlay').addEventListener('click', this.closePopup.bind(this));

    // Load saved translations from localStorage
    this.loadTranslation();
  }

  // Open the popup and show the overlay
  openPopup() {
    this.shadowRoot.querySelector('#popup').style.display = 'flex';
    this.shadowRoot.querySelector('#overlay').style.display = 'block';
  }

  // Close the popup and hide the overlay
  closePopup() {
    this.shadowRoot.querySelector('#popup').style.display = 'none';
    this.shadowRoot.querySelector('#overlay').style.display = 'none';
  }

  // Update the translation result and save it to localStorage
  updateTranslation(text) {
    const resultBox = this.shadowRoot.querySelector('#translation-result');
    const newTranslation = document.createElement('p');
    newTranslation.textContent = text;
    resultBox.appendChild(newTranslation);
    this.saveTranslation(resultBox.innerHTML);
  }

  // Save the translation content to localStorage
  saveTranslation(content) {
    localStorage.setItem('signTranslation', content);
  }

  // Load the translation content from localStorage
  loadTranslation() {
    const savedTranslation = localStorage.getItem('signTranslation');
    if (savedTranslation) {
      this.shadowRoot.querySelector('#translation-result').innerHTML = savedTranslation;
    }
  }
}

// Define the custom element
customElements.define('sign-translate-popup', SignTranslatePopup);
