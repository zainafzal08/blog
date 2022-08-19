import { LitElement, html, css } from "lit";
import { query } from "lit/decorators.js";

export class PostActions extends LitElement {
  @query("#share-btn") shareButton?: HTMLButtonElement;
  @query("#share-btn-floating") shareButtonFloating?: SVGElement;

  private onScroll = () => void this.handleScroll();

  static styles = [
    css`
      .floating {
        position: fixed;
        bottom: 8px;
        --width: 200px;
        width: var(--width);
        display: flex;
        align-items: center;
        justify-content: space-around;
        left: calc(50% - var(--width) / 2);
        height: 48px;
        border-radius: 32px;
        background: var(--secondary-accent-color);
        z-index: 1;
        transform: translateY(0px);
        transition: all 200ms;
      }
      .in-place {
        width: 100%;
        display: flex;
        box-sizing: border-box;
        padding: 3rem 1rem 2rem 1rem;
        justify-content: space-between;
        align-items: center;
      }
      .in-place button {
        padding: 0.5rem 2rem;
        border: 2px solid var(--text-primary);
        border-radius: 32px;
        font-size: 1rem;
        color: var(--text-primary);
        cursor: pointer;
      }
      .in-place button:hover {
        background: rgba(0, 0, 0, 0.08);
      }
      :host([data-hidden]) .floating {
        transform: translateY(calc(110% + 8px));
        opacity: 0;
      }
      .floating button {
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
        display: grid;
        place-items: center;
        padding: 0;
        width: 38px;
        height: 38px;
        border-radius: 50%;
      }
      :host svg {
        width: 24px;
        height: 24px;
        color: white;
      }
      .floating button:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      #share-btn {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #share-btn .done-text {
        display: none;
        align-items: center;
        justify-content: center;
      }
      #share-btn .normal-text {
        display: block;
      }
      #share-btn.done .done-text {
        display: flex;
      }
      #share-btn.done .done-text svg {
        width: 0.9rem;
        height: 0.9rem;
        margin-right: 0.5rem;
        color: var(--text-primary);
      }
      #share-btn.done .normal-text {
        display: none;
      }

      @keyframes bounce {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.15);
        }
        100% {
          transform: scale(1);
        }
      }

      #share-btn-floating .normal-icon {
        display: block;
      }
      #share-btn-floating .done-icon {
        display: none;
      }
      #share-btn-floating.done .normal-icon {
        display: none;
      }
      #share-btn-floating.done .done-icon {
        display: block;
        animation: bounce 0.25s linear;
      }
    `,
  ];

  private handleScroll() {
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    const threshold = 100;
    const maxScroll = scrollHeight - window.innerHeight;
    if (window.scrollY > maxScroll - threshold) {
      this.toggleAttribute("data-hidden", true);
    } else {
      this.toggleAttribute("data-hidden", false);
    }
  }

  private async share() {
    const url = location.href;
    const shareData = { url };
    if (navigator.share && navigator.canShare(shareData)) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(url);
      this.shareButton!.classList.toggle("done", true);
      this.shareButtonFloating!.classList.toggle("done", true);
      setTimeout(() => this.shareButton!.classList.toggle("done", false), 3000);
      setTimeout(
        () => this.shareButtonFloating!.classList.toggle("done", false),
        3000
      );
    }
  }

  private goToTop() {
    window.scrollTo(0, 0);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("scroll", this.onScroll);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("scroll", this.onScroll);
  }

  render() {
    return html`
      <div class="in-place">
        <a href="/"><button>Go Home</button></a>
        <button id="share-btn" @click=${() => this.share()}>
          <span class="normal-text">Share this post</span>
          <span class="done-text">
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"
              />
            </svg>
            Copied!</span
          >
        </button>
        <button @click=${() => this.goToTop()}>Back to Top</button>
      </div>
      <div class="floating">
        <a href="/">
          <button>
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"
              />
            </svg>
          </button>
        </a>
        <button id="share-btn-floating" @click=${() => this.share()}>
          <svg class="normal-icon" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z"
            />
          </svg>
          <svg class="done-icon" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"
            />
          </svg>
        </button>
        <button @click=${() => this.goToTop()}>
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M8,11H11V21H13V11H16L12,7L8,11M4,3V5H20V3H4Z"
            />
          </svg>
        </button>
      </div>
    `;
  }
}

customElements.define("post-actions", PostActions);
