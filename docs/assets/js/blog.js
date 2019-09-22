// maps dom elements with attribute data-[id] to functions
// which take in these elements and the value of the data attribute
// so they can mutate the element.

const triggers = {
    timestamp(elem, ts) {
        elem.innerText = moment.unix(parseFloat(ts)).format("MMMM Do YYYY, h:mm:ss a");
    },
    sidebartoggle(elem) {
        const sidebar = document.getElementsByClassName('sidebar')[0];
        elem.addEventListener('click', () => sidebar.classList.toggle('expanded'));
    }
}


function init() {
    // process
    for(const trigger of Object.keys(triggers)) {
        for(const elem of document.querySelectorAll(`[data-${trigger}]`)) {
            triggers[trigger](elem, elem.dataset[trigger]);
        }
    }
}

window.onload = init;