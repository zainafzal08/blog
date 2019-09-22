// from broofa
// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

function wait(s) {
    return new Promise((resolve) =>{
        setTimeout(() => resolve(), s)
    })
}

const taglines = [
    'They call them commands but my computer treats them more like suggestions',
    'I don\'t tell the computer what to do, it tells me',
    'You\'d think i\'d know how to code huh',
    'GrAphIc DeSiGn iS My PaSsIoN',
    'PHP stands for phat hhhnnnggghhh python',
    'You heard right, i am 100% that bitch',
    'UI tip #123, When in doubt, slap a gradient on it',
    'UI tip #12, Use shadows to convey elevation and to add a spooky twist',
    'UI tip #1, Use a border radius so kids don\'t cut themselves on your cards',
    'UI tip #1233, Don\'t support IE, for your own sanity just let it go'
]

const lines = [
    {type: 'input', text: 'ssh blog'},
    {type: 'output', text: 'Connection Established.'},
    {type: 'input', text: 'ls'},
    {type: 'output', text: 'profile title gen_tagline posts'},
    {type: 'input', text: 'load profile'},
    {type: 'show', target: 'profile'},
    {type: 'input', text: 'load title'},
    {type: 'show', target: 'title'},
    {type: 'show', target: 'underline'},
    {type: 'input', text: './gen_tagline > tagline'},
    {type: 'generate_tagline'},
    {type: 'input', text: 'ls posts | wc -l'},
    {type: 'output', text: '0'}
]

function getLine(promptText) {
    const line = document.createElement('div')
    line.className = 'line'
    const prompt = document.createElement('span')
    prompt.className = 'highlight'
    prompt.innerText = promptText
    line.appendChild(prompt)
    return line
}

function simulateOutput(text) {
    const line = getLine('>')
    const textNode = document.createTextNode(text)
    line.appendChild(textNode)
    document.getElementById('output').appendChild(line)
    document.getElementById('output').scrollTop = document.getElementById('output').scrollHeight;
}

async function simulateInput(text) {
    const line = getLine('$')
    const textNode = document.createElement('span')
    textNode.id = uuidv4()
    line.appendChild(textNode)
    document.getElementById('output').appendChild(line)
    document.getElementById('output').scrollTop = document.getElementById('output').scrollHeight;
    let delay = 85;
    if (localStorage.getItem('animation') === 'false')
        delay = 0;
    let i = 0;
    while (i <= text.length) {
        const fragment = text.substr(0,i)
        await wait(delay)
        document.getElementById(textNode.id).innerText = fragment
        i++
    }
}

async function main() {
    for(const line of lines) {
        if (line.type === 'input') {
            await simulateInput(line.text)
        } else if(line.type === 'show') {
            document.getElementById(line.target).classList.remove('hidden')
        } else if (line.type === 'generate_tagline') {
            const tagline = taglines[Math.floor(Math.random() * taglines.length)];
            document.getElementById('tagline').innerText = tagline;
            document.getElementById('tagline').classList.remove('hidden')
        } else {
            simulateOutput(line.text)
        }
    }
}

window.onload = function () {
    if (localStorage.getItem('animation') === null)
        localStorage.setItem('animation', 'true')
    main()
}