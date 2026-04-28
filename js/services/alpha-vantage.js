import { Config } from "../config.js";

const ALPHA_VANTAGE_KEY = Config.ALPHA_VANTAGE_KEY;

export const AlphaVantageService = {
  async getAssetPrice(symbol = "AAPL") {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data["Note"] || data["Information"]) {
        const msg = data["Note"] || data["Information"];
        console.warn("ALPHA VANTAGE LIMIT REACHED:", msg);

        throw new Error("RATE_LIMIT_REACHED");
      }

      const quote = data["Global Quote"];

      if (quote && quote["05. price"]) {
        return parseFloat(quote["05. price"]);
      } else {
        throw new Error("INVALID_SYMBOL");
      }
    } catch (error) {
      throw error;
    }
  },
};
