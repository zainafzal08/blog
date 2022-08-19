import { LitElement, html, css } from "lit";

export class PostList extends LitElement {
  tags: string[];
  query: string;

  static get properties() {
    return {
      tags: { type: Array },
      query: { type: String },
    };
  }

  constructor() {
    super();
    this.tags = [];
    this.query = "";
  }

  private noSearchResultsMessage?: HTMLDivElement;

  static styles = [
    css`
      .search {
        width: calc(100% - 2rem);
        background: var(--input-surface);
        padding: 1rem;
        height: 1rem;
        border-radius: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .search input {
        width: 100%;
        outline: none;
        background: none;
        border: none;
        margin: 0;
        padding: 0 1rem;
        font-size: 1.1rem;
        color: var(--text-primary);
      }

      .search svg {
        width: 1.5rem;
        height: 1.5rem;
        color: var(--text-secondary);
      }

      .search-help {
        width: 100%;
        font-size: 0.8rem;
        color: var(--text-secondary);
      }

      .search-help span {
        color: var(--accent-color);
        font-weight: bold;
      }

      ul {
        width: 100%;
        margin-top: 3rem;
        padding: 0;
      }
      ul .empty-state {
        width: 100%;
        height: 200px;
        display: none;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      ul .empty-state svg {
        width: 48px;
        height: 48px;
        color: var(--text-muted);
      }
      ul .empty-state p {
        font-size: 0.8rem;
        color: var(--text-muted);
      }
    `,
  ];

  private onInputChange(target: HTMLInputElement) {
    const rawQuery = target.value;
    this.tags = Array.from(rawQuery.matchAll(/#(\w+)/gi)).map((m) => m[1]);
    const text = rawQuery
      .replace(/#(\w+)/gi, "")
      .replace(/\s+/, " ")
      .replace(/\s*$/, "")
      .replace(/^\s*/, "")
      .toLowerCase();
    this.query = text;

    let displayedPosts = 0;
    for (const post of this.querySelectorAll("li")) {
      const title = (
        post.querySelector(".title")! as HTMLParagraphElement
      ).innerText.toLowerCase();
      const tags = Array.from(post.querySelectorAll("p span")).map((t) =>
        (t as HTMLSpanElement).innerText.substring(1)
      );

      let tagMatch = true;
      if (this.tags.length > 0) {
        // The user has specified a tag, we can not show results that aren't
        // tagged.
        tagMatch = false;
        const searchTags = new Set(this.tags.map((t) => t.toLowerCase()));
        for (const tag of tags) {
          if (searchTags.has(tag)) {
            tagMatch = true;
            break;
          }
        }
      }
      if (title.includes(text) && tagMatch) {
        post.style.display = "flex";
        displayedPosts++;
      } else {
        post.style.display = "none";
      }
    }
    if (displayedPosts === 0) {
      this.noSearchResultsMessage!.style.display = "flex";
    } else {
      this.noSearchResultsMessage!.style.display = "none";
    }
  }

  firstUpdated() {
    this.noSearchResultsMessage =
      this.renderRoot.querySelector(".empty-state")!;
  }

  render() {
    let searchHelp;
    if (this.tags.length === 0 && !this.query) {
      searchHelp = html`Use <span>#tag</span> to search for a tag.`;
    } else {
      let prefix;
      if (this.query) {
        prefix = `Searching for "${this.query}" in posts tagged`;
      } else {
        prefix = `Searching for posts tagged`;
      }

      let message;
      if (this.tags.length === 0) {
        message = html`with anything`;
      } else if (this.tags.length === 1) {
        const tag = this.tags[0];
        message = html`<span>${tag}</span>`;
      } else {
        const tagElems = [];
        for (let i = 0; i < this.tags.length; i++) {
          const tag = this.tags[i];
          if (i === this.tags.length - 1) {
            tagElems.push(html`or <span> ${tag}</span>.`);
          } else if (i === this.tags.length - 2) {
            tagElems.push(html`<span>${tag} </span>`);
          } else {
            tagElems.push(html`<span>${tag}, </span>`);
          }
        }
        message = tagElems;
      }
      searchHelp = html`${prefix} ${message}`;
    }

    return html`
      <div class="search">
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
          />
        </svg>
        <input
          @input=${(e: InputEvent) =>
            this.onInputChange(e.target as HTMLInputElement)}
          type="text"
        />
      </div>
      <p class="search-help">${searchHelp}</p>

      <ul class="posts">
        <slot></slot>
        <div class="empty-state">
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19.31 18.9L22.39 22L21 23.39L17.88 20.32C17.19 20.75 16.37 21 15.5 21C13 21 11 19 11 16.5C11 14 13 12 15.5 12C18 12 20 14 20 16.5C20 17.38 19.75 18.21 19.31 18.9M15.5 19C16.88 19 18 17.88 18 16.5C18 15.12 16.88 14 15.5 14C14.12 14 13 15.12 13 16.5C13 17.88 14.12 19 15.5 19M21 4V6H3V4H21M3 16V14H9V16H3M3 11V9H21V11H18.97C17.96 10.37 16.77 10 15.5 10C14.23 10 13.04 10.37 12.03 11H3Z"
            />
          </svg>
          <p>No posts match that query</p>
        </div>
      </ul>
    `;
  }
}

customElements.define("post-list", PostList);
