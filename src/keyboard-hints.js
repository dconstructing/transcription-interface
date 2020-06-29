import { LitElement, css, html } from 'lit-element';

class KeyboardHintsElement extends LitElement {

	static get styles() {
		return css`
			:host {
				text-align: center;
				display: flex;
				flex-direction: column;
				background-color: #ddd;
				border-radius: 7px;
				padding: 6px;
			}
			:host > div {
				display: flex;
				flex-direction: row;
				justify-content: space-evenly;
			}
			:host > div > div {
				width: 80px;
				text-align: center;
			}
		`;
	}

	render() {
		return html`
			<div>
				<div>Back</div>
				<div>Play/Pause</div>
				<div>Forward</div>
			</div>
			<div>
				<div>ctrl-F6</div>
				<div>ctrl-F7</div>
				<div>ctrl-F8</div>
			</div>
		`;
	}
}

customElements.define('keyboard-hints', KeyboardHintsElement);
