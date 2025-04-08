class SignTranslatePopup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
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
            <div class="container" id="popup" style="display: none;">
                <sign-translate></sign-translate>
                <div class="translation-box" id="translation-result">
                    <p><strong>Translation Result:</strong></p>
                </div>
                <button id="close-popup">Close</button>
            </div>
        `;
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#open-popup').addEventListener('click', () => this.openPopup());
    this.shadowRoot.querySelector('#close-popup').addEventListener('click', () => this.closePopup());
    this.shadowRoot.querySelector('#overlay').addEventListener('click', () => this.closePopup());
    this.loadTranslation();
  }

  openPopup() {
    this.shadowRoot.querySelector('#popup').style.display = 'flex';
    this.shadowRoot.querySelector('#overlay').style.display = 'block';
  }

  closePopup() {
    this.shadowRoot.querySelector('#popup').style.display = 'none';
    this.shadowRoot.querySelector('#overlay').style.display = 'none';
  }

  updateTranslation(text) {
    const resultBox = this.shadowRoot.querySelector('#translation-result');
    resultBox.innerHTML += `<p>${text}</p>`;
    this.saveTranslation(resultBox.innerHTML);
  }

  saveTranslation(content) {
    localStorage.setItem('signTranslation', content);
  }

  loadTranslation() {
    const savedTranslation = localStorage.getItem('signTranslation');
    if (savedTranslation) {
      this.shadowRoot.querySelector('#translation-result').innerHTML = savedTranslation;
    }
  }
}

customElements.define('sign-translate-popup', SignTranslatePopup);
