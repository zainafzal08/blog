const input = document.getElementById('search');
const help = document.getElementById('search-help');
let allPosts = [];

// stolen https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
function intersection(setA, setB) {
    var _intersection = new Set();
    for (var elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem);
        }
    }
    return _intersection;
}

async function init() {
    const r = await fetch('/meta.json');
    if (r.status !== 200)
        error('Failed to fetch meta data');
    
    try {
        const meta = await r.json();
        const posts = meta.posts;
        for(const k of Object.keys(posts)) {
            posts[k].tags = new Set(posts[k].tags);
            allPosts.push({
                ...posts[k],
                id: k
            });
        }
    } catch(e) {
        error(`Unable to parse meta data: '${e.message}'`);
    }

    input.addEventListener('input', () => {
        const text = input.value;
        updateHelp(text);
        updateSearch(text);
    });

    const params =(new URL(document.location)).searchParams;
    if (params.get('tag'))
        input.value = '#'+params.get('tag');


    updateHelp(input.value);
    updateSearch(input.value);
    ready();
}

function ready() {
    document.querySelector('[data-cover]').style.display = 'none';
    document.body.style.overflowY = 'scroll';
}

function error(message) {
    const root = document.querySelector('[data-cover]');
    root.innerHTML = '';
    const heading = document.createElement('h1');
    heading.className = 'error-heading';
    heading.innerText = 'Uh oh';
    const details = document.createElement('p');
    details.className = 'error-message';
    details.innerText = message;
    root.appendChild(heading);
    root.appendChild(details);
    window.scrollTo(0, 0);
}

function createDomTag(t) {
    const span = document.createElement('span');
    span.innerText = `#${t} `;
    return span;
}

function clearChildren(node) {
    while(node.firstChild) {
        node.firstChild.remove();
    }
}

function setHelp(nodes) {
    clearChildren(help);
    for(const node of nodes) {
        if (typeof(node) === 'string')
            help.appendChild(document.createTextNode(node));
        else
            help.appendChild(node);
    }
}

function parseInput(text) {
    const tagRegex = /#([\w-_]+)/g;
    const allTags = [...text.matchAll(tagRegex)].map(x => x[1]);
    const search = text.replace(tagRegex,'').replace(/\s*$/,'').replace(/^\s*/,'');
    return [allTags, search];
}

function updateHelp(text) {
    if (text === '') {
        setHelp([
            'Search for a post with regex, use ',
            createDomTag('tag'),
            ' to search for a tag'
        ]);
        return;
    }

    let [tags, search] = parseInput(text);

    tags = tags.map(m => createDomTag(m));
    let nodes = [`Showing posts`];
    if (search !== '') nodes.push(` with titles like '${search}'`)
    if (tags.length !== 0) {
        nodes.push(' which are tagged ');
        nodes = nodes.concat(tags);
    }

    setHelp(nodes);
}

function getFromLocalStorage(k) {
    if (localStorage.getItem(k) === null) {
        localStorage.setItem(k, JSON.stringify({
            read: false
        }));
    }
    return JSON.parse(localStorage.getItem(k));
}

function renderPostSummary(post) {
    const root = document.querySelector('main');
    let template = document.getElementById('post-summary-template').content.cloneNode(true);
    template.querySelector('[data-title]').innerText = post.title;
    template.querySelector('[data-link]').setAttribute('href', `/post#${post.link}`);
    template.querySelector('[data-posted]').innerText = moment(post.posted, 'DD/MM/YY hh:mm:ssa').format('MMMM Do YYYY, h:mm a');
    for(const tag of post.tags) {
        const a = document.createElement('a');
        a.setAttribute('href', `/?tag=${tag}`);
        a.innerText = `#${tag}`;
        template.querySelector('[data-tags]').appendChild(a);
    }
    const icon = document.createElement('i');
    const postRead = getFromLocalStorage(post.id).read;
    icon.className = `mdi mdi-${postRead ? 'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline'}`;
    template.querySelector('[data-read]').setAttribute('data-tooltip', postRead ? 'Read' : 'Unread');
    template.querySelector('[data-read]').appendChild(icon);
    root.appendChild(template);
}
function updateSearch(text) {
    const [tags, search] = parseInput(text);
    let posts = [];
    const root = document.querySelector('main');
    clearChildren(root);
    posts = allPosts;
    if (tags.length > 1) {
        posts = posts.filter(x => {
            const tagSet = new Set(tags);
            return intersection(tagSet, x.tags).size > 0
        });
    }
    if (search !== '') {
        posts = posts.filter(x => (new RegExp(search)).exec(x.title));
    }
    // fill template 
    for(const post of posts) {
        renderPostSummary(post);
    }
}

window.onload = init;