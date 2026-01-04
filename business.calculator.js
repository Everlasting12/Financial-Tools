function loadNetWorthCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The total market value of everything you own, including cash, real estate, gold, and investments.">Total Assets (₹)</label>
                    <input type="text" id="nwAssets" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 25,00,000" 
                           oninput="handleNumberInput(event); clearError('nwAssets')" 
                           onblur="formatInputNumber(event)">
                    <p id="nwAssets-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The total amount of all your outstanding debts, such as home loans, car loans, credit card balances, and personal loans.">Total Liabilities (₹)</label>
                    <input type="text" id="nwLiabilities" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 5,00,000" 
                           oninput="handleNumberInput(event); clearError('nwLiabilities')" 
                           onblur="formatInputNumber(event)">
                    <p id="nwLiabilities-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateNetWorth()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate Net Worth
                </button>
            </div>

            <div id="nwResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-indigo-600 to-purple-700 shadow-xl border border-white border-opacity-10">
                    <h3 class="text-lg font-semibold mb-4 border-b border-white border-opacity-20 pb-2 text-indigo-50">Wealth Status</h3>
                    <div class="space-y-6">
                        <div>
                            <p class="text-indigo-100 text-xs uppercase tracking-wider mb-1" title="The total value of everything you own minus everything you owe.">Total Net Worth</p>
                            <p class="text-4xl font-bold" id="nwFinal">-</p>
                        </div>
                        
                        <div class="pt-4 border-t border-white border-opacity-10 grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-indigo-100 text-[10px] uppercase tracking-wider mb-1" title="The percentage of your assets that are funded by debt.">Debt-to-Asset Ratio</p>
                                <p class="text-lg font-semibold" id="nwRatio">-</p>
                            </div>
                            <div class="text-right">
                                <p class="text-indigo-100 text-[10px] uppercase tracking-wider mb-1">Financial Health</p>
                                <p class="text-lg font-semibold" id="nwStatus">-</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200 text-xs text-gray-600 leading-relaxed">
                    <p><strong>Pro Tip:</strong> A positive net worth is the goal. If your net worth is negative, focus on aggressive debt repayment and increasing your high-yield assets.</p>
                </div>
            </div>
        </div>
    `;
}

function calculateNetWorth() {
  const assetsInput = document.getElementById("nwAssets");
  const liabilitiesInput = document.getElementById("nwLiabilities");

  const assets = parseFormattedNumber(assetsInput.value);
  const liabilities = parseFormattedNumber(liabilitiesInput.value);

  let isValid = true;

  // Inline Error Handling
  if (assetsInput.value.trim() === "" || isNaN(assets) || assets < 0) {
    showError("nwAssets", "Please enter valid total assets");
    isValid = false;
  }
  if (
    liabilitiesInput.value.trim() === "" ||
    isNaN(liabilities) ||
    liabilities < 0
  ) {
    showError("nwLiabilities", "Please enter valid total liabilities");
    isValid = false;
  }

  if (!isValid) return;

  const netWorth = assets - liabilities;
  const ratio = assets > 0 ? (liabilities / assets) * 100 : 0;

  // Update UI Results
  const finalEl = document.getElementById("nwFinal");
  const statusEl = document.getElementById("nwStatus");

  finalEl.textContent =
    (netWorth >= 0 ? "" : "-") +
    "₹" +
    formatNumber(Math.abs(netWorth).toFixed(0));
  document.getElementById("nwRatio").textContent = ratio.toFixed(2) + "%";

  // Dynamic Status and Styling
  if (netWorth > 0) {
    finalEl.className = "text-4xl font-bold text-green-300";
    if (ratio < 20) {
      statusEl.textContent = "EXCELLENT";
      statusEl.className = "text-lg font-semibold text-green-300";
    } else if (ratio < 50) {
      statusEl.textContent = "GOOD";
      statusEl.className = "text-lg font-semibold text-yellow-300";
    } else {
      statusEl.textContent = "DEBT HEAVY";
      statusEl.className = "text-lg font-semibold text-orange-300";
    }
  } else {
    finalEl.className = "text-4xl font-bold text-red-300";
    statusEl.textContent = "NEGATIVE";
    statusEl.className = "text-lg font-semibold text-red-300";
  }

  document.getElementById("nwResult").classList.remove("hidden");
}
function loadCashFlowCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The total amount of money coming into your household from all sources each month.">Total Monthly Income (₹)</label>
                    <input type="text" id="cfIncome" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 85,000" 
                           oninput="handleNumberInput(event); clearError('cfIncome')" 
                           onblur="formatInputNumber(event)">
                    <p id="cfIncome-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="All monthly outflows including rent, utilities, groceries, EMIs, and lifestyle spending.">Total Monthly Expenses (₹)</label>
                    <input type="text" id="cfExpenses" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 45,000" 
                           oninput="handleNumberInput(event); clearError('cfExpenses')" 
                           onblur="formatInputNumber(event)">
                    <p id="cfExpenses-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateCashFlow()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate Cash Flow
                </button>
            </div>

            <div id="cfResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-indigo-600 to-purple-700 shadow-xl border border-white border-opacity-10">
                    <h3 class="text-lg font-semibold mb-4 border-b border-white border-opacity-20 pb-2 text-indigo-50">Monthly Cash Summary</h3>
                    <div class="space-y-6">
                        <div>
                            <p class="text-indigo-100 text-xs uppercase tracking-wider mb-1" title="The amount of money left over after all expenses are paid.">Net Surplus / Deficit</p>
                            <p class="text-4xl font-bold" id="cfFinal">-</p>
                        </div>
                        
                        <div class="pt-4 border-t border-white border-opacity-10 grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-indigo-100 text-[10px] uppercase tracking-wider mb-1" title="The percentage of your income that remains after expenses.">Savings Rate</p>
                                <p class="text-lg font-semibold" id="cfSavingsRate">-</p>
                            </div>
                            <div class="text-right">
                                <p class="text-indigo-100 text-[10px] uppercase tracking-wider mb-1">Status</p>
                                <p class="text-lg font-semibold" id="cfStatus">-</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200 text-xs text-gray-600 leading-relaxed">
                    <p><strong>Financial Insight:</strong> Aim for a savings rate of 20% or higher. If your cash flow is negative, review your non-essential expenses immediately.</p>
                </div>
            </div>
        </div>
    `;
}

function calculateCashFlow() {
  const incomeInput = document.getElementById("cfIncome");
  const expenseInput = document.getElementById("cfExpenses");

  const income = parseFormattedNumber(incomeInput.value);
  const expenses = parseFormattedNumber(expenseInput.value);

  let isValid = true;

  // Validation
  if (incomeInput.value.trim() === "" || isNaN(income) || income <= 0) {
    showError("cfIncome", "Please enter your total monthly income");
    isValid = false;
  }
  if (expenseInput.value.trim() === "" || isNaN(expenses) || expenses < 0) {
    showError("cfExpenses", "Please enter your total monthly expenses");
    isValid = false;
  }

  if (!isValid) return;

  const surplus = income - expenses;
  const rate = income > 0 ? (surplus / income) * 100 : 0;

  // Update Result UI
  const finalEl = document.getElementById("cfFinal");
  const statusEl = document.getElementById("cfStatus");

  finalEl.textContent =
    (surplus >= 0 ? "+" : "") + "₹" + formatNumber(surplus.toFixed(2));
  document.getElementById("cfSavingsRate").textContent = rate.toFixed(2) + "%";

  // Status and Styling Logic
  if (surplus > 0) {
    finalEl.className = "text-4xl font-bold text-green-300";
    statusEl.textContent = rate >= 30 ? "EXCELLENT" : "HEALTHY";
    statusEl.className = "text-lg font-semibold text-green-300";
  } else if (surplus === 0) {
    finalEl.className = "text-4xl font-bold text-yellow-300";
    statusEl.textContent = "BREAK-EVEN";
    statusEl.className = "text-lg font-semibold text-yellow-300";
  } else {
    finalEl.className = "text-4xl font-bold text-red-300";
    statusEl.textContent = "DEFICIT";
    statusEl.className = "text-lg font-semibold text-red-300";
  }

  document.getElementById("cfResult").classList.remove("hidden");
}
function loadROICalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The total amount of money you originally invested.">Amount Invested (₹)</label>
                    <input type="text" id="roiInitial" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 1,00,000"
                           oninput="handleNumberInput(event); clearError('roiInitial')" 
                           onblur="formatInputNumber(event)">
                    <p id="roiInitial-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The total value of your investment today, or the total amount received after selling.">Final Value / Return Amount (₹)</label>
                    <input type="text" id="roiFinalVal" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 1,25,000"
                           oninput="handleNumberInput(event); clearError('roiFinalVal')" 
                           onblur="formatInputNumber(event)">
                    <p id="roiFinalVal-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateROI()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate ROI
                </button>
            </div>

            <div id="roiResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-indigo-600 to-purple-700 shadow-xl border border-white border-opacity-10">
                    <h3 class="text-lg font-semibold mb-4 border-b border-white border-opacity-20 pb-2 text-white">Investment Performance</h3>
                    <div class="space-y-6">
                        <div>
                            <p class="text-indigo-100 text-xs uppercase tracking-wider mb-1" title="The total percentage gain or loss on your investment.">Total ROI (%)</p>
                            <p class="text-4xl font-bold" id="roiValue">-</p>
                        </div>
                        
                        <div class="pt-4 border-t border-white border-opacity-10 grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-indigo-100 text-[10px] uppercase tracking-wider mb-1" title="The actual profit or loss in currency terms.">Net Profit</p>
                                <p class="text-lg font-semibold" id="roiProfit">-</p>
                            </div>
                            <div class="text-right">
                                <p class="text-indigo-100 text-[10px] uppercase tracking-wider mb-1">Status</p>
                                <p class="text-lg font-semibold" id="roiStatus">-</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200 text-xs text-gray-600">
                    <p><strong>Note:</strong> ROI provides a snapshot of efficiency but does not account for the time duration of the investment. For time-adjusted returns, consider CAGR.</p>
                </div>
            </div>
        </div>
    `;
}

function calculateROI() {
  const initialInput = document.getElementById("roiInitial");
  const finalInput = document.getElementById("roiFinalVal");

  const initial = parseFormattedNumber(initialInput.value);
  const finalVal = parseFormattedNumber(finalInput.value);

  let isValid = true;

  // Inline Validation
  if (initialInput.value.trim() === "" || isNaN(initial) || initial <= 0) {
    showError("roiInitial", "Please enter a valid initial investment");
    isValid = false;
  }
  if (finalInput.value.trim() === "" || isNaN(finalVal)) {
    showError("roiFinalVal", "Please enter a valid final value");
    isValid = false;
  }

  if (!isValid) return;

  const profit = finalVal - initial;
  const roi = (profit / initial) * 100;

  // Update Result UI
  const roiValueEl = document.getElementById("roiValue");
  const statusEl = document.getElementById("roiStatus");

  roiValueEl.textContent = (roi >= 0 ? "+" : "") + roi.toFixed(2) + "%";
  document.getElementById("roiProfit").textContent =
    "₹" + formatNumber(profit.toFixed(2));

  // Dynamic Color and Status
  if (roi >= 0) {
    roiValueEl.className = "text-4xl font-bold text-green-300";
    statusEl.textContent = "PROFIT";
    statusEl.className = "text-lg font-semibold text-green-300";
  } else {
    roiValueEl.className = "text-4xl font-bold text-red-300";
    statusEl.textContent = "LOSS";
    statusEl.className = "text-lg font-semibold text-red-300";
  }

  document.getElementById("roiResult").classList.remove("hidden");
}
function loadBusinessBreakevenCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Ongoing costs that do not change based on production levels, such as rent, salaries, and insurance.">Total Fixed Costs (₹)</label>
                    <input type="text" id="beFixed" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 50,000" 
                           oninput="handleNumberInput(event); clearError('beFixed')" 
                           onblur="formatInputNumber(event)">
                    <p id="beFixed-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The cost of producing one unit, including materials and direct labor.">Variable Cost per Unit (₹)</label>
                    <input type="text" id="beVar" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 150" 
                           oninput="handleNumberInput(event); clearError('beVar')" 
                           onblur="formatInputNumber(event)">
                    <p id="beVar-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The price at which you sell a single unit to customers.">Selling Price per Unit (₹)</label>
                    <input type="text" id="bePrice" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 500"
                           oninput="handleNumberInput(event); clearError('bePrice')" 
                           onblur="formatInputNumber(event)">
                    <p id="bePrice-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateBreakeven()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate Breakeven
                </button>
            </div>

            <div id="beResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-indigo-600 to-purple-700 shadow-xl border border-white border-opacity-10">
                    <h3 class="text-lg font-semibold mb-4 border-b border-white border-opacity-20 pb-2 text-indigo-50">Breakeven Analysis</h3>
                    <div class="space-y-6">
                        <div>
                            <p class="text-indigo-100 text-xs uppercase tracking-wider mb-1" title="The number of units you must sell to cover all your costs.">Units Required</p>
                            <p class="text-4xl font-bold" id="beUnits">-</p>
                        </div>
                        
                        <div class="pt-4 border-t border-white border-opacity-10 grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-indigo-100 text-[10px] uppercase tracking-wider mb-1" title="Total revenue needed to reach zero profit.">Total Sales</p>
                                <p class="text-lg font-semibold" id="beSales">-</p>
                            </div>
                            <div class="text-right">
                                <p class="text-indigo-100 text-[10px] uppercase tracking-wider mb-1" title="Profit per unit after covering variable costs.">Unit Margin</p>
                                <p class="text-lg font-semibold" id="beMargin">-</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p class="text-xs text-gray-600 leading-relaxed">
                        <strong>Business Tip:</strong> To lower your breakeven point, try reducing fixed costs or increasing the gap between selling price and variable costs.
                    </p>
                </div>
            </div>
        </div>
    `;
}

function calculateBreakeven() {
  const fixedInput = document.getElementById("beFixed");
  const varInput = document.getElementById("beVar");
  const priceInput = document.getElementById("bePrice");

  const fixed = parseFormattedNumber(fixedInput.value);
  const variable = parseFormattedNumber(varInput.value);
  const price = parseFormattedNumber(priceInput.value);

  let isValid = true;

  // Validation
  if (fixedInput.value.trim() === "" || isNaN(fixed) || fixed < 0) {
    showError("beFixed", "Please enter valid total fixed costs");
    isValid = false;
  }
  if (varInput.value.trim() === "" || isNaN(variable) || variable < 0) {
    showError("beVar", "Please enter valid variable cost per unit");
    isValid = false;
  }
  if (priceInput.value.trim() === "" || isNaN(price) || price <= 0) {
    showError("bePrice", "Please enter a valid selling price");
    isValid = false;
  } else if (price <= variable) {
    showError("bePrice", "Selling price must be higher than variable cost");
    isValid = false;
  }

  if (!isValid) return;

  const contributionMargin = price - variable;
  const units = fixed / contributionMargin;
  const sales = units * price;

  // Update Result UI
  document.getElementById("beUnits").textContent =
    Math.ceil(units).toLocaleString() + " Units";
  document.getElementById("beSales").textContent =
    "₹" + formatNumber(sales.toFixed(0));
  document.getElementById("beMargin").textContent =
    "₹" + formatNumber(contributionMargin.toFixed(0));

  document.getElementById("beResult").classList.remove("hidden");
}
function loadWorkingCapitalCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Assets that can be converted into cash within one year (Cash, Inventory, Accounts Receivable).">Current Assets (₹)</label>
                    <input type="text" id="wcAssets" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 5,00,000" 
                           oninput="handleNumberInput(event); clearError('wcAssets')" 
                           onblur="formatInputNumber(event)">
                    <p id="wcAssets-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Obligations or debts that are due within one year (Accounts Payable, Short-term Loans).">Current Liabilities (₹)</label>
                    <input type="text" id="wcLiabilities" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 3,00,000" 
                           oninput="handleNumberInput(event); clearError('wcLiabilities')" 
                           onblur="formatInputNumber(event)">
                    <p id="wcLiabilities-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateWorkingCapital()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate Working Capital
                </button>
            </div>

            <div id="wcResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-indigo-600 to-purple-700 shadow-xl border border-white border-opacity-10">
                    <h3 class="text-lg font-semibold mb-4 border-b border-white border-opacity-20 pb-2 text-indigo-50">Liquidity Summary</h3>
                    <div class="space-y-6">
                        <div>
                            <p class="text-indigo-100 text-xs uppercase tracking-wider mb-1" title="Net liquid assets available for day-to-day business operations.">Net Working Capital</p>
                            <p class="text-4xl font-bold" id="wcFinal">-</p>
                        </div>
                        
                        <div class="pt-4 border-t border-white border-opacity-10 grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-indigo-100 text-[10px] uppercase tracking-wider mb-1" title="A ratio used to measure a company's ability to pay short-term obligations.">Current Ratio</p>
                                <p class="text-lg font-semibold" id="wcRatio">-</p>
                            </div>
                            <div class="text-right">
                                <p class="text-indigo-100 text-[10px] uppercase tracking-wider mb-1">Health Status</p>
                                <p class="text-lg font-semibold" id="wcStatus">-</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200 text-xs text-gray-600 leading-relaxed">
                    <p><strong>Analysis:</strong> A Current Ratio below 1.0 indicates potential liquidity issues, while a ratio above 1.5 suggests good short-term financial strength.</p>
                </div>
            </div>
        </div>
    `;
}

function calculateWorkingCapital() {
  const assetsInput = document.getElementById("wcAssets");
  const liabilitiesInput = document.getElementById("wcLiabilities");

  const assets = parseFormattedNumber(assetsInput.value);
  const liabilities = parseFormattedNumber(liabilitiesInput.value);

  let isValid = true;

  // Validation
  if (assetsInput.value.trim() === "" || isNaN(assets) || assets < 0) {
    showError("wcAssets", "Please enter valid current assets");
    isValid = false;
  }
  if (
    liabilitiesInput.value.trim() === "" ||
    isNaN(liabilities) ||
    liabilities < 0
  ) {
    showError("wcLiabilities", "Please enter valid current liabilities");
    isValid = false;
  }

  if (!isValid) return;

  const wc = assets - liabilities;
  const ratio =
    liabilities > 0 ? assets / liabilities : assets > 0 ? Infinity : 0;

  // Update Result UI
  document.getElementById("wcFinal").textContent =
    "₹" + formatNumber(wc.toFixed(0));
  document.getElementById("wcRatio").textContent =
    ratio === Infinity ? "No Debt" : ratio.toFixed(2);

  // Status Logic
  const statusElement = document.getElementById("wcStatus");
  if (ratio >= 1.5) {
    statusElement.textContent = "STRONG";
    statusElement.className = "text-lg font-semibold text-green-300";
  } else if (ratio >= 1.0) {
    statusElement.textContent = "ADEQUATE";
    statusElement.className = "text-lg font-semibold text-yellow-300";
  } else {
    statusElement.textContent = "CRITICAL";
    statusElement.className = "text-lg font-semibold text-red-300";
  }

  document.getElementById("wcResult").classList.remove("hidden");
}
