function genDomTag(tag) {
  const a = document.createElement("a");
  a.setAttribute("href", `/?tag=${tag}`);
  const t = document.createElement("span");
  t.innerText = `#${tag}`;
  t.classList.add("chip");
  a.appendChild(t);
  return a;
}

function ready() {
  document.querySelector("[data-cover]").style.display = "none";
  document.body.style.overflowY = "scroll";
}

function error(message) {
  const root = document.querySelector("[data-cover]");
  root.innerHTML = "";
  const heading = document.createElement("h1");
  heading.className = "error-heading";
  heading.innerText = "Uh oh";
  const details = document.createElement("p");
  details.className = "error-message";
  details.innerText = message;
  root.appendChild(heading);
  root.appendChild(details);
  window.scrollTo(0, 0);
}

function set(field, value) {
  for (const e of document.querySelectorAll(`[data-${field}]`))
    e.innerText = value;
}

function get(field) {
  return document.querySelector(`[data-${field}]`);
}

function render(post, meta, postMeta) {
  // Meta details
  const author = meta.people[postMeta.author];
  const taglist = get("taglist");

  set("title", postMeta.title);
  set("author", author.name);
  set(
    "posted",
    moment(postMeta.posted, "DD/MM/YY hh:mm:ssa").format("MMMM Do YYYY, h:mm a")
  );
  set(
    "updated",
    moment(postMeta.last_updated, "DD/MM/YY hh:mm:ssa").format(
      "MMMM Do YYYY, h:mm a"
    )
  );

  postMeta.tags.map((t) => {
    taglist.appendChild(genDomTag(t));
  });

  get("profile").setAttribute("src", `../assets/images/${author.profile}`);

  // Actual post
  post = post.replace(
    /\!\{(\w+)\}/,
    '<span class="iconify" data-icon="mdi-$1"></span>'
  );

  get("post").innerHTML = marked(post);
  Prism.highlightAll();
}

async function strictFetch(link, field, err) {
  const request = await fetch(link);
  if (request.status !== 200) throw Error(err);
  return request[field]();
}

async function init() {
  const route = window.location.hash.substr(1);
  const metaLink = "/meta.json";
  const postLink = `/markdown/${route}.md`;

  try {
    const meta = await strictFetch(
      metaLink,
      "json",
      "Couldn't fetch meta information"
    );
    const post = await strictFetch(
      postLink,
      "text",
      `Couldn't find blog post with name '${route}'`
    );
    const postMeta = meta.posts[route];
    if (postMeta === undefined)
      throw Error(`No meta data found for post with name '${route}'`);
    await render(post, meta, postMeta);
    localStorage.setItem(
      route,
      JSON.stringify({
        read: true,
      })
    );
    ready();
  } catch (e) {
    error(e.message);
  }
}

window.onload = init;
