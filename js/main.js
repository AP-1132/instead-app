import { BudgetManager } from "./classes/BudgetManager.js";
import { Animations } from "./animation.js";
import { GeminiService } from "./services/gemini.js";

const app = new BudgetManager();
let isAlternativeView = false;

const form = document.getElementById("transaction-form");
const list = document.getElementById("transaction-list");
const toggle = document.getElementById("reality-toggle");
const aiBtn = document.getElementById("generate-ai-btn");
const soundIncome = document.getElementById("sound-income");
const soundExpense = document.getElementById("sound-expense");

window.addEventListener("DOMContentLoaded", async () => {
  Animations.revealDashboard();

  await app.updateMarketData("AAPL");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const type = category === "Income" ? "Income" : "Expense";

  const oldBalance = app.totalBalance;
  const newEntry = app.addTransaction(name, amount, category, type);

  type === "Income" ? soundIncome.play() : soundExpense.play();

  Animations.animateBalance(oldBalance, app.totalBalance);

  renderList();
  form.reset();
});

toggle.addEventListener("change", (e) => {
  isAlternativeView = e.target.checked;
  Animations.toggleRealityView(isAlternativeView);
  renderList();
});

list.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = parseFloat(e.target.dataset.id);
    const liElement = e.target.closest("li");
    const oldBalance = app.totalBalance;

    app.removeTransaction(id);

    await Animations.animateDeleteTransaction(liElement);

    Animations.animateBalance(oldBalance, app.totalBalance);
    renderList();
  }
});

aiBtn.addEventListener("click", async () => {
  if (aiBtn.disabled) return;
  if (app.transactions.length === 0) {
    document.getElementById("ai-text").innerText = "Add some data first!";
    return;
  }

  aiBtn.disabled = true;
  aiBtn.innerText = "Processing...";

  const loadingAnim = Animations.animateAILoading();

  const insight = await GeminiService.generateInsight(app.transactions);

  loadingAnim.kill();
  document.getElementById("ai-text").innerText = "";

  Animations.animateAIResult(insight);

  aiBtn.disabled = false;
  aiBtn.innerText = "Analyze My Habits";
});

function renderList() {
  list.innerHTML = "";
  app.transactions.forEach((t) => {
    const li = document.createElement("li");
    li.className = "transaction-item";

    const displayValue = isAlternativeView
      ? `${t.calculateOppCost(app.currentAssetPrice)} Shares`
      : t.getFormattedAmount();

    li.innerHTML = `
            <div class="item-info">
                <span class="name">${t.name}</span>
                <span class="cat">${t.category}</span>
            </div>
              <div class="item-right">
        <span class="amount ${t.type.toLowerCase()}">${displayValue}</span>
        <button class="delete-btn" data-id="${t.id}">&times;</button>
    </div>
        `;
    list.prepend(li);
    Animations.animateNewTransaction(li);
  });
}
