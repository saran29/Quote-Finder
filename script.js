const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");


let quotesApi = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
//display new quote
function newQuote() {
    showLoadingSpinner();
    //pick random quote from quotes array
    const quote = quotesApi[Math.floor(Math.random() * quotesApi.length)];
    //Check if author field is blank 
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    //Check quote length to determine styling
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;
    hideLoadingSpinner();
}

async function getQuotes() {
    showLoadingSpinner();
    const url = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(url);
        quotesApi = await response.json();
        newQuote();
    } catch (error) {
        // alert(`Error: ${error}`);
        getQuotes();
    }
}

//Tweet new quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}
twitterButton.addEventListener('click', tweetQuote);
newQuoteButton.addEventListener('click', newQuote)

getQuotes();