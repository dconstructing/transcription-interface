import { LitElement, css, html } from 'lit-element';

class MediaManagerElement extends LitElement {

	static get properties() {
		return {
			filename: {
				attribute: false
			}
		}
	}

	static get styles() {
		return css`
			:host {
				text-align: center;
				right: 10px;
				top: 10px;
			}
			p {
				margin: 0;
			}
			input {
				display: none;
			}
		`;
	}

	constructor() {
		super();
		this.filename = null;
	}

	render() {
		return html`
			${this.filename?
				html`<p>Loading ${this.filename}</p>`:
				html`
					<input id="picker" type="file" @change="${this.handleAudioSelection}"></input>
					<button @click="${this.handleLoadClicked}">Load audio file</button>
				`
			}
		`;
	}

	handleLoadClicked() {
		this.shadowRoot.getElementById('picker').click();
	}

	handleAudioSelection(changeEvent) {
		console.log('handled', changeEvent.currentTarget.files);
		if (changeEvent.currentTarget.files.length > 0) {
			const self = this;
			const file = changeEvent.currentTarget.files[0]
			console.log('new file', file);
			self.filename = file.name; // remember the filename so we can display it
			const reader = new FileReader();
			reader.onloadend = function(loadEndEvent) {
				console.log('loaded', loadEndEvent, loadEndEvent.target.result);
				const event = new CustomEvent('audio-loaded', {
					detail: {
						file: file,
						data: loadEndEvent.target.result
					}
				});
				self.dispatchEvent(event);
			};
			reader.readAsDataURL(file);
		} else {
			console.log('skipping because no files')
		}
	}
}

customElements.define('media-manager', MediaManagerElement);
