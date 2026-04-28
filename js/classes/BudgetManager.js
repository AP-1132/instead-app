import { Transaction } from "./Transaction.js";
import { AlphaVantageService } from "../services/alpha-vantage.js";

export class BudgetManager {
  constructor() {
    this.transactions = [];
    this.totalBalance = 0;
    this.currentAssetPrice = 0; // default value prior to API fetch
    this.selectedSymbol = "AAPL";
  }

  addTransaction(name, amount, category, type) {
    const newEntry = new Transaction(name, amount, category, type);

    this.transactions.push(newEntry);
    this.calculateBalance();

    return newEntry;
  }

  removeTransaction(id) {
    this.transactions = this.transactions.filter((t) => t.id !== id);
    this.calculateBalance();
  }

  calculateBalance() {
    this.totalBalance = this.transactions.reduce((acc, current) => {
      return current.type === "Income"
        ? acc + current.amount
        : acc - current.amount;
    }, 0);
  }

  async updateMarketData(symbol) {
    this.selectedSymbol = symbol || this.selectedSymbol;

    try {
      const price = await AlphaVantageService.getAssetPrice(
        this.selectedSymbol,
      );
      this.currentAssetPrice = price;
    } catch (error) {
      if (error.message === "RATE_LIMIT_REACHED") {
        console.info("Using Fallback Prices (API Limit Reached)");
      } else {
        console.error("Market Data Error:", error.message);
      }

      this.currentAssetPrice = 260;
    }
  }

  getAlternativeSummary() {
    return this.transactions.map((t) => {
      return {
        name: t.name,
        shares: t.calculateOppCost(this.currentAssetPrice),
        symbol: this.selectedSymbol,
      };
    });
  }
}
