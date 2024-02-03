// const debug = true;
const quotes = [
    { id: 1, quote: 'I\'ll be back!', url: 'https://www.imdb.com/title/tt0088247/' },
    { id: 2, quote: 'You\'ve angered the robot!' },
    { id: 3, quote: 'Bleep Bleep Bloop' },
    { id: 4, quote: 'We are the robots', url: 'https://www.youtube.com/watch?v=D_8Pma1vHmw' },
    { id: 5, quote: '011010000110100100100001', url: 'https://duckduckgo.com/?q=hi!+in+binary&ia=answer' },
    { id: 6, quote: 'What...am...I?', url: 'https://www.imdb.com/title/tt0343818/' },
    { id: 7, quote: 'Sometimes to create, one must first destroy', url: 'https://www.imdb.com/title/tt1446714/' },
    { id: 8, quote: 'I am completely operational, and all my circuits are functioning perfectly.', url: 'https://www.imdb.com/title/tt0062622/' }
];
const state = document.querySelector('.robot[data-state]');
const robot = document.querySelector('.robot-emoji');
const text = document.querySelector('.robot-text');

const message = 'Hello Human, Click/Tap me!';

let initialText = null;
let clicked = false;
let count = 0;

function renderBubble(quote, url) {
    url && text.classList.contains('bubble') ?
    text.classList.add('bubble--link') :
    text.classList.remove('bubble--link');
    text.innerHTML = url ? `<a href='${url}'>${quote}</a>` : quote;
    text.style.opacity = 1;
}

function renderQuote() {
    if (count >= quotes.length) {
        count = 0;
    }
    if (!clicked) {
        const { quote, url } = [...quotes][count];

        text.style.opacity = 0;

        setTimeout(function () {
            renderBubble(quote, url);
            clicked = false;
        }, 250);

        count += 1;
        clicked = true;
    }
}

function start() {
    state.setAttribute('data-state', 'on');
    robot.setAttribute('tabindex', 0);
    initialText = text.textContent;
    text.innerHTML = message;
    robot.onclick = renderQuote;
}

function stop() {
    state.setAttribute('data-state', 'off');
    robot.removeAttribute('tabindex');
    text.innerHTML = initialText;
    text.classList.contains('bubble--link') && text.classList.remove('bubble--link');
    initialText = null;
    robot.onclick = null;
}

document.addEventListener('DOMContentLoaded', start)

if (typeof debug !== 'undefined' && debug) {
    window.stop = stop;
    window.start = start;
}

export {message};
