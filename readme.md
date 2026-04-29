# Instead

A simple to use budget tracking application with a fun twist comparing transactions to potential stock investments.

## Project Overview

Instead is an interactive financial dashboard designed for spenders who want to transform boring budget tracking into a visual narrative. Traditional financial apps act as passive ledgers, showing users where their money went, but fail to provide the psychological motivation needed to stop impulsive spending.

Instead is built for people like Tom, a 27 year old freelance artist. Tom was inflicted with lifestyle creep. He would constantly make small purchases like expensive coffees and food delivery purchases that felt insignificant but left his savings stagnant. Tom found traditional bank statements to be boring and too stressful. Instead solves this problem by calculating the alternative reality of Tom’s spending. The app shows Tom that his purchases are actually worth a certain amount of shares, shifting his mindset from short term spending to long term accumulation.

## Technical Architecture

### Class Summary

- `Transaction`: Represents an individual financial entry
  - Key Properties: `id`,`name`,`amount`,`category`,`type`.
  - Key Methods: `getFormattedAmount()` handles currency strings, `calculateOppCost(price)` calculates share value
- `BudgetManager`: Manages the collection of transactions and application state.
  - Key Properties: `transactions` array of instances, `totalBalance`, `currentAssetPrice`
  - Key Methods: `addTransaction()`,`removeTransaction()`,`calculateBalance()`,`updateMarketData()` API orchestration.

The application uses composition. The BudgetManager acts as a parent container that instantiates and manages multiple Transaction objects. This structural OOP approach ensures that logic for individual items is encapsulated within the Transaction class, while global state logic remains in the BudgetManager.

### Class Diagram

![Class Diagram](/assets/images/diagram.png)

## Feature Walkthrough

### Dashboard Reveal

![Dashboard](/assets/images/fullscreen-view.png)

Upon loading, a background video loop begins to play. The UI elements slide into place. This is powered by GSAP Timelines and Staggers to create a premium UI feel.

### Transaction Tracking

![Transaction List](/assets/images/transaction-list.png)

Users can log income and expenses with immediate visual and auditory feedback. Users submit a form, the number balance rolls up, the item staggers into the history list, and a sound effect plays depending on whether the transaction was an income or expense.

### Instead View Toggle

![View Toggle](/assets/images/reality-toggle.png)

This card contains a toggle that flips the entire history list from showing the dollar cost to share potential. Users click the custom switch trigger which triggers an animation across all list items. This is driven by the Alpha Vantage API. The API returns the real time stock data for the $AAPL stock (Apple).

### AI Financial Insight

![Insight](/assets/images/insight.png)

This provides a personalized "financial fortune" which is based on the user's actual habits. This insight generation is powered by the Google Gemini API. A user clicks on the "Analyze My Spending Habits" button and a personalized insight will generate.

## API Documentation

### Alpha Vantage API

Endpoint: `GET /query?function=GLOBAL_QUOTE`

This fetches the current market price for a specific symbol (in this case, AAPL). `05. price` is extracted from the JSON response to update `BudgetManager.currentAssetPrice`. Authentication is via a private API key stored in
`config.js`

### Google Gemini API

Endpoint: `POST /v1beta/models/gemini-2.5-flash:generateContent`

This sends a summary of the user's transactions to the AI model. A three sentence witty financial insight is recieved and is rendered via GSAP's TextPlugin.

## Challenges and Decisions

The most difficult challenge of this project was integrating the APIs. Specifically, the Alpha Vantage API. The free tier of this API only allowed 25 API requests per day. During development, it was easy to accidentally hit that limit during testing. If the rate limit was hit, the API returns a note in the JSON instead of a price, which would cause the app's alternative view calculations to return `NaN`.

To address this issue, I implemented a fallback incase the API limit was reached. In the `BudgetManager` class, the market update logic was wrapped in a `try/catch` block. When a limit error is caught, the manager automatically swaps the missing live price for a hardcoded fallback stock price (260 for AAPL).

If I had more time, I would implement perssistent data storage. Currently, the application loses all the data upon refresh. This could be achieved using Firebase. Using Firebase would also allow the implementation of user login and authentication.

Another implementation would be to include other stock options to compare. Currently, the application only compares purchases to Apple stock (AAPL). I would like to include different stock options to compare, such as NVIDIA (NVDA). I would also like to implement other investment options like cryptocurrency, although that would likely require another API to implement.

## How to Run Application

1. Download the project folder and ensure all files are present
2. API Configuration
   - Navigate to `js/config.example.js`. This is an example `config.js` file. You must insert your Alpha Vantage and Google Gemini API keys into their respective strings. Then, rename `config.example.js` to `config.js`

3. Ensure the background video is located at `assets/video/background.mp4` and the audio files are in `assets/audio`.
4. Open `index.html` using a local development server.
5. Input a few expenses in the form, then click the reality toggle to see the transformation. Then click the "Analyze My Spending Habits" button to generate a personalized financial insight.
