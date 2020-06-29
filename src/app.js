import { LitElement, css, html } from 'lit-element';
import './keyboard-hints.js';
import './media-manager.js';
import './media-player.js';
import './text-editor.js';

// Extend the LitElement base class
class TranscriptionAppElement extends LitElement {

	static get properties() {
		return {
			audioFile: {
				attribute: false
			},
			audioData: {
				attribute: false
			},
			textFile: {
				attribute: false
			}
		}
	}

	static get styles() {
		return css`
			:host {
				display: flex;
				flex-direction: column;
				height: 100%;
			}
			header {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
			}
			keyboard-hints {
				width: 260px;
			}
			media-manager {
				flex-grow: 0;
			}
			text-editor {
				flex-grow: 1;
			}
		`;
	}

	constructor() {
		super();
		this.audioFile = null;
		this.audioData = null;
		this.textFile = null;
	}

	render() {
		return html`
			<header>
				<h1>Transcription Tool</h1>
				${this.audioData?
					html`
						<media-player audio-data="${this.audioData}"></media-player>
						<keyboard-hints></keyboard-hints>
					`:
					html``
				}
			</header>
			${this.audioFile?
				html`<text-editor audio-filename="${this.audioFile.name}"></text-editor>`:
				html`<media-manager @audio-loaded="${this.handleAudioLoaded}"></media-manager>`
			}`;
	}
	
	handleAudioLoaded(event) {
		this.audioFile = event.detail.file;
		this.audioData = event.detail.data;
	}
}

customElements.define('transcription-app', TranscriptionAppElement);
