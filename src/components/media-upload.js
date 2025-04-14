class MediaUpload extends HTMLElement {
  constructor() {
    super();
    // Attach shadow DOM and initialize the component's inner HTML
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <div>
        <label for="media-upload">Choose Media From Device</label>
        <input type="file" id="media-upload" accept="video/*">
        <button id="upload-btn">Upload</button>
        <video id="video-preview" controls style="display: none;"></video>
      </div>
    `;
  }

  connectedCallback() {
    // Add event listener for the upload button
    this.shadowRoot.querySelector('#upload-btn').addEventListener('click', this.uploadVideo.bind(this));
  }

  uploadVideo() {
    const fileInput = this.shadowRoot.querySelector('#media-upload');
    const videoPreview = this.shadowRoot.querySelector('#video-preview');
    const file = fileInput.files[0];

    if (file) {
      // Create a URL for the selected file and display the video
      const url = URL.createObjectURL(file);
      videoPreview.src = url;
      videoPreview.style.display = 'block';

      // Process the video for additional functionality
      this.processVideo(videoPreview);
    } else {
      // Hide the video preview if no file is selected
      videoPreview.style.display = 'none';
    }
  }

  processVideo(video) {
    // Add an event listener to handle video playback
    video.addEventListener('play', () => {
      console.log('Processing video for hand motion detection...');
      // Additional processing logic can be added here
    });
  }
}

// Define the custom element
customElements.define('media-upload', MediaUpload);
