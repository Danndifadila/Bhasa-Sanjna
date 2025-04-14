// Define a custom HTML element for the Sign Language Dictionary
class Dictionary extends HTMLElement {
  constructor() {
    super();

    // Attach a shadow DOM to the custom element
    this.attachShadow({ mode: 'open' });

    // Set the inner HTML of the shadow DOM
    this.shadowRoot.innerHTML = `
      <div>
        <!-- Button to navigate to the dictionary page -->
        <button id="navigate-button">Sign Language Dictionary</button>
      </div>
    `;
  }

  connectedCallback() {
    // Add an event listener to the button for better separation of concerns
    const button = this.shadowRoot.querySelector('#navigate-button');
    button.addEventListener('click', () => {
      window.location.href = 'dictionary.html';
    });
  }

  disconnectedCallback() {
    // Clean up event listeners when the element is removed from the DOM
    const button = this.shadowRoot.querySelector('#navigate-button');
    button.removeEventListener('click', () => {
      window.location.href = 'dictionary.html';
    });
  }
}

// Define the custom element
customElements.define('sign-dictionary', Dictionary);