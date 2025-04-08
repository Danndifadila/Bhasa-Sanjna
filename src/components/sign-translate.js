class SignTranslate extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
            <style>
                div {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                }
                video {
                    width: 100%;
                    max-width: 500px;
                    border: 2px solid black;
                }
                button {
                    padding: 10px;
                    cursor: pointer;
                }
            </style>
            <div>
                <video id="video" autoplay playsinline></video>
                <button id="start">Start Camera</button>
                <button id="stop">Stop Camera</button>
                <div id="result"></div>
            </div>
        `;

    this.stream = null;
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#start').addEventListener('click', () => this.startCamera());
    this.shadowRoot.querySelector('#stop').addEventListener('click', () => this.stopCamera());
  }

  async startCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.shadowRoot.querySelector('#video').srcObject = this.stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.shadowRoot.querySelector('#video').srcObject = null;
    }
  }
}

customElements.define('sign-translate', SignTranslate);
