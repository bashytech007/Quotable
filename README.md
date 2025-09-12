# Quote Explorer

A dynamic web application that fetches and displays inspirational quotes from the Quotable API. Built with vanilla JavaScript, HTML, and CSS as part of a JavaScript Weekend Class project.

## Features

- **Random Quote Display**: Automatically loads a random quote when the page opens
- **New Quote Button**: Fetch fresh quotes with a single click
- **Copy to Clipboard**: Share your favorite quotes instantly
- **Search Functionality**: Find quotes by keywords (life, success, coding, etc.)
- **Error Handling**: Graceful error messages with retry functionality
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean interface with smooth animations and gradients

## Live Demo

[View Live Demo](https://your-username.github.io/quote-explorer) *(Update with your actual GitHub Pages URL)*

## How to Run

### Prerequisites
- Modern web browser
- Node.js (for running tests)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/quote-explorer.git
   cd quote-explorer
   ```

2. **Start a local server** (Required for API calls to work)
   
   **Option A: Using Python**
   ```bash
   python -m http.server 3000
   ```
   
   **Option B: Using Node.js**
   ```bash
   npx http-server -p 3000
   ```
   
   **Option C: Using VS Code Live Server**
   - Install Live Server extension
   - Right-click `index.html` → "Open with Live Server"

3. **Access the application**
   - Open your browser and go to `http://localhost:3000`
   - The app will automatically load your first quote!

## Project Structure

```
quote-explorer/
├── index.html          # Main HTML file
├── style.css           # Styling and responsive design
├── script.js           # JavaScript functionality
├── cypress/
│   └── e2e/
│       └── quote.cy.js # End-to-end tests
├── cypress.config.js   # Cypress configuration
├── package.json        # Node.js dependencies
└── README.md          # This file
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and gradients
- **JavaScript ES6+**: Async/await, Classes, DOM manipulation
- **Quotable API**: External quote data source
- **Cypress**: End-to-end testing framework

## API Usage

This project uses the [Quotable API](https://quotable.io/):
- Random quotes: `https://api.quotable.io/random`
- Search quotes: `https://api.quotable.io/search/quotes?query=keyword`

## Testing

### Running Cypress Tests

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run tests in GUI mode**
   ```bash
   npx cypress open
   ```

3. **Run tests in headless mode**
   ```bash
   npx cypress run
   ```

### Test Coverage

- ✅ App loads successfully with initial quote
- ✅ New Quote button functionality
- ✅ Error handling with failed API requests
- ✅ Copy Quote feature
- ✅ Search functionality
- ✅ Button state management during loading

## Key Features Implemented

### 1. API Integration
- Fetches random quotes on page load
- Handles search queries with keyword filtering
- Proper error handling for network failures

### 2. DOM Interactions
- Dynamic quote display updates
- Interactive buttons with loading states
- Clipboard integration for quote sharing

### 3. Error Handling
- Clear error messages for users
- Retry functionality when API calls fail
- Input validation for search terms

### 4. Responsive Design
- Mobile-first approach
- Smooth animations and transitions
- Modern gradient backgrounds

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+

## Assignment Requirements Met

- ✅ Fetch data from Quotable API
- ✅ Display random quote on page load
- ✅ "New Quote" button functionality
- ✅ "Copy Quote" button with clipboard integration
- ✅ Error handling with clear messages
- ✅ "Retry" button for failed requests
- ✅ Search feature with keyword functionality
- ✅ Clean, responsive UI design
- ✅ Comprehensive Cypress testing


## Acknowledgments

- [Quotable API](https://quotable.io/) for providing the quote data
- JavaScript Weekend Class for the project requirements
- Cypress team for excellent testing tools

---

**Project completed as part of JavaScript Weekend Class**

⭐ If you found this project helpful, please give it a star!