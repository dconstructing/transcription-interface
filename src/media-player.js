// Import the LitElement base class and html helper function
import { LitElement, html } from 'lit-element';

// Extend the LitElement base class
export class MediaPlayer extends LitElement {

	static get properties() {
		return {
			audioData: {
				attribute: 'audio-data',
				type: String
			},
			player: {
				attribute: false
			}
		}
	}

	constructor() {
		super();
		this.audioData = null;
	}

	firstUpdated(changedProperties) {
		console.log('player first updated');
		this.player = this.shadowRoot.getElementById('player');
		const self = this;
		console.log('player', this.player);
		document.addEventListener('keydown', this.handleKeyDown.bind(this));
		if ("mediaSession" in navigator) {
			console.log('creating media session listeners');
			navigator.mediaSession.setActionHandler('play', function(e) {
				// User hit "Play" key.
				console.log('play', e);
				self.playPause();
			});
			navigator.mediaSession.setActionHandler('pause', function(e) {
				// User hit "Pause" key.
				console.log('pause', e);
				self.playPause();
			});
		} else {
			console.log('no media session in navigator');
		}
	}

	/**
	 * Implement `render` to define a template for your element.
	 *
	 * You must provide an implementation of `render` for any element
	 * that uses LitElement as a base class.
	 */
	render() {
		console.log('rendering player');
		/**
		 * `render` must return a lit-html `TemplateResult`.
		 *
		 * To create a `TemplateResult`, tag a JavaScript template literal
		 * with the `html` helper function:
		 * 
		 */
		return html`
			<!-- template content -->
			<audio id="player" controls src="${this.audioData}"></audio>
		`;
	}

	handleKeyDown(keyboardEvent) {
		if (keyboardEvent.ctrlKey) {
			switch (keyboardEvent.key) {
				case 'F7':
					if (this.audioData == 'null') {
						console.warn('select audio file to play');
						return;
					}
					console.log('play/pause');
					this.playPause();
					break;
				case 'F6':
					if (this.audioData == 'null') {
						console.warn('select audio file to play');
						return;
					}
					console.log('back');
					this.skipBack();
					break;
				case 'F8':
					if (this.audioData == 'null') {
						console.warn('select audio file to play');
						return;
					}
					console.log('forward');
					this.skipForward();
					break;
				default:
					// no-op
					return;
			}
		}
	}

	playPause() {
		if (this.player.paused) {
			console.log('playing');
			this.player.play();
		} else {
			console.log('pausing');
			this.player.pause();
		}
	}

	skipBack() {
		let newTime = this.player.currentTime - 3;
		if (newTime < 0) newTime = 0;
		this.player.currentTime = newTime;
	}

	skipForward() {
		let newTime = this.player.currentTime + 3;
		if (newTime > this.player.duration) newTime = this.player.duration;
		this.player.currentTime = newTime;
	}
}
// Register the new element with the browser.
customElements.define('media-player', MediaPlayer);
