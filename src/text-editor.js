import { LitElement, css, html } from 'lit-element';

class TextEditorElement extends LitElement {

	static get properties() {
		return {
			textData: {
				attribute: false
			},
			filename: {
				attribute: false
			},
			audioFilename: {
				attribute: 'audio-filename',
				type: String
			}
		}
	}

	static get styles() {
		return css`
			:host {
				display: flex;
				flex-direction: column;
				position: relative;
			}
			#toolbar {
				position: absolute;
				top: 10px;
				right: 10px;
				border: 1px solid #ccc;
				border-radius: 5px;
				padding: 7px;
				background-color: #ddd;
				text-align: center;
			}
			#toolbar > p {
				margin: 0
			}
			input {
				display: none;
			}
			textarea {
				box-sizing: border-box;
				flex-grow: 1;
				width: 100%;
			}
		`;
	}

	constructor() {
		super();
		this.textData = null;
		this.filename = null;
		this.audioFilename = 'transcription';
	}

	render() {
		return html`
			<div id="toolbar">
				<p>Text File: ${this.filename}</p>
				<input id="picker" type="file" accept=".txt" @change="${this.handleTextSelection}"></input>
				<button @click="${this.handleLoadClicked}">Load</button>
				<button @click="${this.handleSaveClicked}">Save</button>
			</div>
			<textarea id="textcontainer" placeholder="Start transcribing, or select a txt file from the toolbar.">${this.textData}</textarea>
		`;
	}

	handleLoadClicked() {
		this.shadowRoot.getElementById('picker').click();
	}

	handleSaveClicked() {
		console.log('attempting save');
		const text = this.shadowRoot.getElementById('textcontainer').value;
		const blob = new Blob([text], {
			type: 'text/plain'
		});
		const anchor = document.createElement('a');
		anchor.download = this.filename || this.audioFilename + '.txt';
		anchor.href = window.URL.createObjectURL(blob);
		anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
		anchor.click();
	}

	handleTextSelection(changeEvent) {
		console.log('handled', changeEvent.currentTarget.files);
		if (changeEvent.currentTarget.files.length > 0) {
			const self = this;
			const file = changeEvent.currentTarget.files[0]
			console.log('new file', file);
			self.filename = file.name; // remember the filename so we can use it when we save
			const reader = new FileReader();
			reader.onloadend = function(loadEndEvent) {
				console.log('loaded', loadEndEvent, loadEndEvent.target.result);
				self.textData = loadEndEvent.target.result;
			};
			reader.readAsText(file);
		} else {
			console.log('skipping because no files')
		}
	}
}

customElements.define('text-editor', TextEditorElement);
