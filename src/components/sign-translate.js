class SignTranslate extends HTMLElement {
  constructor() {
    super();
    // Attach shadow DOM and set up the component's HTML structure
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

    // Initialize the media stream
    this.stream = null;
  }

  connectedCallback() {
    // Add event listeners for the start and stop buttons
    this.shadowRoot.querySelector('#start').addEventListener('click', this.startCamera.bind(this));
    this.shadowRoot.querySelector('#stop').addEventListener('click', this.stopCamera.bind(this));
  }

  async startCamera() {
    try {
      // Request access to the user's camera
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Set the video element's source to the camera stream
      this.shadowRoot.querySelector('#video').srcObject = this.stream;
    } catch (error) {
      // Log any errors that occur while accessing the camera
      console.error('Error accessing camera:', error);
    }
  }

  stopCamera() {
    if (this.stream) {
      // Stop all tracks in the media stream
      this.stream.getTracks().forEach((track) => track.stop());
      // Clear the video element's source
      this.shadowRoot.querySelector('#video').srcObject = null;
      this.stream = null; // Reset the stream to null
    }
  }
}

// Define the custom element
customElements.define('sign-translate', SignTranslate);
