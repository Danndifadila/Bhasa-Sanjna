class MediaUpload extends HTMLElement {
  constructor() {
    super();
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
    this.shadowRoot.querySelector('#upload-btn').addEventListener('click', () => this.uploadVideo());
  }

  uploadVideo() {
    const fileInput = this.shadowRoot.querySelector('#media-upload');
    const videoPreview = this.shadowRoot.querySelector('#video-preview');
    const file = fileInput.files[0];

    if (file) {
      const url = URL.createObjectURL(file);
      videoPreview.src = url;
      videoPreview.style.display = 'block';
      this.processVideo(videoPreview);
    } else {
      videoPreview.style.display = 'none';
    }
  }

  processVideo(video) {
    video.addEventListener('play', () => {
      console.log('Processing video for hand motion detection...');
    });
  }
}

customElements.define('media-upload', MediaUpload);
