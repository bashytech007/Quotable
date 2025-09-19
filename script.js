// Global variables
const baseURL = 'http://api.quotable.io';
let currentQuote = null;

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
});

// Initialize function
function init() {
    bindEvents();
    fetchRandomQuote();
}


function bindEvents() {
    document.getElementById('new-quote-btn').addEventListener('click', fetchRandomQuote);
    document.getElementById('copy-quote-btn').addEventListener('click', copyQuote);
    document.getElementById('retry-btn').addEventListener('click', fetchRandomQuote);
    document.getElementById('search-btn').addEventListener('click', searchQuotes);
    
   
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchQuotes();
        }
    });
}


async function fetchRandomQuote() {
    try {
        showLoading();
        hideError();
        
        const response = await fetch(`${baseURL}/quotes/random`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const quote = Array.isArray(data) ? data[0] : data;
        
        displayQuote(quote);
        currentQuote = quote;
        
    } catch (error) {
        console.error('Error fetching quote:', error);
        showError('Failed to fetch quote. Please check your internet connection and try again.');
    }
}

async function searchQuotes() {
    const searchTerm = document.getElementById('search-input').value.trim();
    
    if (!searchTerm) {
        showError('Please enter a search term');
        return;
    }

     if (searchTerm.toLowerCase() === 'geh geh') {
        showError('u no de shame geh geh wey no serious na him u de take advice from i pour u spit');
        return;
    }

    try {
        showLoading();
        hideError();
        
        const response = await fetch(`${baseURL}/search/quotes?query=${encodeURIComponent(searchTerm)}&limit=10`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.results.length);
            const quote = data.results[randomIndex];
            displayQuote(quote);
            currentQuote = quote;
        } else {
            showError(`No quotes found for "${searchTerm}". Try a different keyword.`);
        }
        
    } catch (error) {
        console.error('Error searching quotes:', error);
        showError('Failed to search quotes. Please try again.');
    }
}


function displayQuote(quote) {
    const quoteTextElement = document.getElementById('quote-text');
    const quoteAuthorElement = document.getElementById('quote-author');
    
    quoteTextElement.textContent = `"${quote.content}"`;
    quoteTextElement.className = 'quote-text';
    quoteAuthorElement.textContent = `— ${quote.author}`;
    
    setButtonsEnabled(true);
}

function showLoading() {
    const quoteTextElement = document.getElementById('quote-text');
    const quoteAuthorElement = document.getElementById('quote-author');
    
    quoteTextElement.textContent = 'Loading...';
    quoteTextElement.className = 'quote-text loading';
    quoteAuthorElement.textContent = '';
    
    setButtonsEnabled(false);
}


function showError(message) {
    const errorContainer = document.getElementById('error-container');
    const errorMessage = document.getElementById('error-message');
    const retryBtn = document.getElementById('retry-btn');
    
    errorMessage.textContent = message;
    errorContainer.style.display = 'block';
    retryBtn.style.display = 'inline-block';
    
    
    document.getElementById('quote-text').textContent = '';
    document.getElementById('quote-author').textContent = '';
    
    setButtonsEnabled(true);
}


function hideError() {
    const errorContainer = document.getElementById('error-container');
    const retryBtn = document.getElementById('retry-btn');
    
    errorContainer.style.display = 'none';
    retryBtn.style.display = 'none';
}

function setButtonsEnabled(enabled) {
    const buttons = ['new-quote-btn', 'copy-quote-btn', 'search-btn'];
    buttons.forEach(btnId => {
        document.getElementById(btnId).disabled = !enabled;
    });
}

async function copyQuote() {
    if (!currentQuote) {
        showError('No quote to copy');
        return;
    }

    const textToCopy = `"${currentQuote.content}" — ${currentQuote.author}`;
    
    try {
        await navigator.clipboard.writeText(textToCopy);
        showSuccessMessage();
    } catch (error) {
        fallbackCopyTextToClipboard(textToCopy);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showSuccessMessage();
        } else {
            throw new Error('Copy command failed');
        }
    } catch (error) {
        showError('Failed to copy quote to clipboard');
    }

    document.body.removeChild(textArea);
}

// Show success message
function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';
    
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 2000);
}