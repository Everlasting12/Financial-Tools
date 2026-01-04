function loadNetWorthCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Total Assets (₹)</label>
                    <input type="text" id="nwAssets" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="Cash, property, investments" oninput="handleNumberInput(event); clearError('nwAssets')" onblur="formatInputNumber(event)">
                    <p id="nwAssets-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Total Liabilities (₹)</label>
                    <input type="text" id="nwLiabilities" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="Loans, debts, mortgages" oninput="handleNumberInput(event); clearError('nwLiabilities')" onblur="formatInputNumber(event)">
                    <p id="nwLiabilities-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <button onclick="calculateNetWorth()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">Calculate Net Worth</button>
            </div>
            <div id="nwResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">Wealth Status</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="The total value of everything you own minus everything you owe.">Total Net Worth:</span>
                            <span class="text-4xl font-bold" id="nwFinal">-</span>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 rounded-xl p-6">
                    <h4 class="font-semibold text-gray-900 mb-3">Asset-Debt Ratio</h4>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600" title="The percentage of your assets that are funded by debt.">Debt-to-Asset Ratio:</span>
                            <span class="font-medium text-gray-900" id="nwRatio">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateNetWorth() {
  const assets =
    parseFormattedNumber(document.getElementById("nwAssets").value) || 0;
  const debts =
    parseFormattedNumber(document.getElementById("nwLiabilities").value) || 0;
  const netWorth = assets - debts;
  const ratio = assets > 0 ? (debts / assets) * 100 : 0;

  document.getElementById("nwFinal").textContent =
    "₹" + formatNumber(netWorth.toFixed(2));
  document.getElementById("nwRatio").textContent = ratio.toFixed(2) + "%";
  document.getElementById("nwResult").classList.remove("hidden");
}
function loadCashFlowCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Total Monthly Income (₹)</label>
                    <input type="text" id="cfIncome" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="Salary, rent, dividends" oninput="handleNumberInput(event); clearError('cfIncome')" onblur="formatInputNumber(event)">
                    <p id="cfIncome-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Total Monthly Expenses (₹)</label>
                    <input type="text" id="cfExpenses" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="Rent, food, EMI, bills" oninput="handleNumberInput(event); clearError('cfExpenses')" onblur="formatInputNumber(event)">
                    <p id="cfExpenses-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <button onclick="calculateCashFlow()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">Calculate Cash Flow</button>
            </div>
            <div id="cfResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">Monthly Surplus</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="The amount of money left over after all expenses are paid.">Net Cash Flow:</span>
                            <span class="text-4xl font-bold" id="cfFinal">-</span>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 rounded-xl p-6 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-600" title="The percentage of your income that you are able to save.">Savings Rate:</span>
                        <span class="font-medium text-gray-900" id="cfSavingsRate">-</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateCashFlow() {
  const income =
    parseFormattedNumber(document.getElementById("cfIncome").value) || 0;
  const expenses =
    parseFormattedNumber(document.getElementById("cfExpenses").value) || 0;
  const surplus = income - expenses;
  const rate = income > 0 ? (surplus / income) * 100 : 0;

  document.getElementById("cfFinal").textContent =
    "₹" + formatNumber(surplus.toFixed(2));
  document.getElementById("cfSavingsRate").textContent = rate.toFixed(2) + "%";
  document.getElementById("cfResult").classList.remove("hidden");
}
function loadROICalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Amount Invested (₹)</label>
                    <input type="text" id="roiInitial" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           oninput="handleNumberInput(event); clearError('roiInitial')" onblur="formatInputNumber(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Final Value / Return Amount (₹)</label>
                    <input type="text" id="roiFinalVal" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           oninput="handleNumberInput(event); clearError('roiFinalVal')" onblur="formatInputNumber(event)">
                </div>
                <button onclick="calculateROI()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold cursor-pointer">Calculate ROI</button>
            </div>
            <div id="roiResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">Investment Performance</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="The total percentage gain or loss on your investment.">Total ROI:</span>
                            <span class="text-4xl font-bold" id="roiValue">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span title="The actual profit in currency terms.">Total Profit:</span>
                            <span class="text-xl font-bold" id="roiProfit">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateROI() {
  const initial =
    parseFormattedNumber(document.getElementById("roiInitial").value) || 0;
  const finalVal =
    parseFormattedNumber(document.getElementById("roiFinalVal").value) || 0;
  if (initial === 0) return;
  const profit = finalVal - initial;
  const roi = (profit / initial) * 100;

  document.getElementById("roiValue").textContent = roi.toFixed(2) + "%";
  document.getElementById("roiProfit").textContent =
    "₹" + formatNumber(profit.toFixed(2));
  document.getElementById("roiResult").classList.remove("hidden");
}
function loadBusinessBreakevenCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Total Fixed Costs (₹)</label>
                    <input type="text" id="beFixed" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="Rent, salaries, insurance" oninput="handleNumberInput(event)" onblur="formatInputNumber(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Variable Cost per Unit (₹)</label>
                    <input type="text" id="beVar" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="Materials, labor per item" oninput="handleNumberInput(event)" onblur="formatInputNumber(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Selling Price per Unit (₹)</label>
                    <input type="text" id="bePrice" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           oninput="handleNumberInput(event)" onblur="formatInputNumber(event)">
                </div>
                <button onclick="calculateBreakeven()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold cursor-pointer">Calculate Breakeven</button>
            </div>
            <div id="beResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">Breakeven Analysis</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="The number of units you must sell to cover all your costs.">Breakeven Units:</span>
                            <span class="text-4xl font-bold" id="beUnits">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span title="The total sales revenue needed to reach the breakeven point.">Breakeven Sales:</span>
                            <span class="text-xl font-bold" id="beSales">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateBreakeven() {
  const fixed =
    parseFormattedNumber(document.getElementById("beFixed").value) || 0;
  const variable =
    parseFormattedNumber(document.getElementById("beVar").value) || 0;
  const price =
    parseFormattedNumber(document.getElementById("bePrice").value) || 0;

  const margin = price - variable;
  if (margin <= 0) {
    alert("Selling price must be higher than variable cost.");
    return;
  }

  const units = fixed / margin;
  const sales = units * price;

  document.getElementById("beUnits").textContent = Math.ceil(units) + " Units";
  document.getElementById("beSales").textContent =
    "₹" + formatNumber(sales.toFixed(2));
  document.getElementById("beResult").classList.remove("hidden");
}
function loadWorkingCapitalCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Current Assets (₹)</label>
                    <input type="text" id="wcAssets" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="Cash, Inventory, Receivables" oninput="handleNumberInput(event)" onblur="formatInputNumber(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Current Liabilities (₹)</label>
                    <input type="text" id="wcLiabilities" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="Payables, Short-term debt" oninput="handleNumberInput(event)" onblur="formatInputNumber(event)">
                </div>
                <button onclick="calculateWorkingCapital()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold cursor-pointer">Calculate Working Capital</button>
            </div>
            <div id="wcResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">Liquidity Summary</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="Net liquid assets available for day-to-day business operations.">Working Capital:</span>
                            <span class="text-4xl font-bold" id="wcFinal">-</span>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 rounded-xl p-6 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-600" title="A ratio used to measure a company's ability to pay short-term obligations.">Current Ratio:</span>
                        <span class="font-medium text-gray-900" id="wcRatio">-</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateWorkingCapital() {
  const assets =
    parseFormattedNumber(document.getElementById("wcAssets").value) || 0;
  const liabilities =
    parseFormattedNumber(document.getElementById("wcLiabilities").value) || 0;
  const wc = assets - liabilities;
  const ratio = liabilities > 0 ? assets / liabilities : 0;

  document.getElementById("wcFinal").textContent =
    "₹" + formatNumber(wc.toFixed(2));
  document.getElementById("wcRatio").textContent = ratio.toFixed(2);
  document.getElementById("wcResult").classList.remove("hidden");
}
