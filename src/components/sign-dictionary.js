class Dictionary extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
            <div>
                <button onclick="location.href='dictionary.html'">Sign Language Dictionary</button>
            </div>
        `;
  }
}
customElements.define('sign-dictionary', Dictionary);