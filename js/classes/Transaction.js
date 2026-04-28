export class Transaction {
  constructor(name, amount, category, type) {
    this.id = Date.now() + Math.random();
    this.name = name;
    this.amount = parseFloat(amount);
    this.category = category;
    this.type = type; // to categorize transaction as income or expense
    this.date = new Date().toLocaleDateString();
  }

  getFormattedAmount() {
    return this.type === "Income"
      ? `+$${this.amount.toFixed(2)}`
      : `-$${this.amount.toFixed(2)}`;
  }

  calculateOppCost(assetPrice) {
    return (this.amount / assetPrice).toFixed(4);
  }
}
