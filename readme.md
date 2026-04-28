# Instead

Instead is a budgeting web app that helps you track income and expenses, then compare your spending against an alternative investment view. It also includes an AI-powered “Financial Fortune” feature that summarizes your transaction history in a witty way.

## Features

- Add income and expense transactions.
- View your running balance.
- Toggle between normal budgeting and the alternative stock-comparison view.
- Compare spending against a selected asset price.
- Generate AI spending insights with Gemini.
- Play feedback sounds and use animated UI transitions.

## Requirements

- A modern browser that supports ES modules.
- A local web server. Opening `index.html` directly from the file system may not work reliably because the app uses module imports and external API requests.
- API keys for:
  - Alpha Vantage
  - Gemini

## Setup

1. Clone or download this project.
2. Open the project folder in VS Code or your preferred editor.
3. Make sure the API keys are set in `js/config.js`.

If you want to keep a separate template, use `js/config.example.js` as a starting point and create your own `js/config.js` file from it.

### API Keys

The app reads both keys from the `Config` object in `js/config.js`:

- `ALPHA_VANTAGE_KEY` is used to fetch the current price of the selected stock symbol.
- `GEMINI_KEY` is used to generate the AI spending insight.

Example structure:

```js
export const Config = {
  ALPHA_VANTAGE_KEY: "your-alpha-vantage-key",
  GEMINI_KEY: "your-gemini-key",
};
```

### Where to get the keys

- Alpha Vantage: create a free API key from the Alpha Vantage website.
- Gemini: create an API key from Google AI Studio / the Gemini API console.

## Run the App

Use any local static server. A few easy options:

- VS Code Live Server extension.
- `python3 -m http.server` from the project root.
- `npx serve` or a similar static file server.

Then open the local URL in your browser and use the app normally.

## How It Works

- Add a transaction using the form.
- The balance updates immediately.
- Toggle the reality switch to see spending converted into stock-share equivalents.
- Click the AI button to generate a summary of your transaction history.

If Alpha Vantage hits its rate limit or returns an invalid symbol, the app falls back to a default stock price so the interface still works.

## Project Structure

- `index.html` - App shell and UI layout.
- `styles.css` - Application styling.
- `js/main.js` - Main event wiring and rendering.
- `js/classes/Transaction.js` - Transaction model.
- `js/classes/BudgetManager.js` - Balance and market-data logic.
- `js/services/alpha-vantage.js` - Stock price API integration.
- `js/services/gemini.js` - AI insight API integration.
- `js/config.js` - API key configuration.
- `js/config.example.js` - Example configuration template.

## Notes

- Audio and animation assets live under `assets/`.
- The app defaults to comparing against `AAPL`.
- If you change the API keys in `js/config.js`, refresh the page before testing again.

## Troubleshooting

- If the page is blank, make sure you are running a local server instead of opening the HTML file directly.
- If the AI insight fails, verify that `GEMINI_KEY` is valid.
- If market data fails, verify that `ALPHA_VANTAGE_KEY` is valid and that the symbol exists.
