// EQUITY & MUTUAL FUND CALCULATORS

// Stock Average Calculator
function loadStockAverageCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">First Purchase</h3>
                
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Number of Shares</label>
                    <input type="text" id="shares1" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 100"
                           oninput="handleNumberInput(event); clearError('shares1')"
                           onblur="formatInputNumber(event)">
                    <p id="shares1-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Price per Share (₹)</label>
                    <input type="text" id="price1" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 150.50"
                           oninput="handleNumberInput(event); clearError('price1')"
                           onblur="formatInputNumber(event)">
                    <p id="price1-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <h3 class="text-lg font-semibold text-gray-900 mb-4 pt-4">Second Purchase</h3>
                
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Number of Shares</label>
                    <input type="text" id="shares2" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 50"
                           oninput="handleNumberInput(event); clearError('shares2')"
                           onblur="formatInputNumber(event)">
                    <p id="shares2-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Price per Share (₹)</label>
                    <input type="text" id="price2" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 180.75"
                           oninput="handleNumberInput(event); clearError('price2')"
                           onblur="formatInputNumber(event)">
                    <p id="price2-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateStockAverage()" 
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate Average
                </button>
            </div>

            <div id="stockAverageResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">Results</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span>Total Shares:</span>
                            <span class="text-2xl font-bold" id="totalShares">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Total Investment:</span>
                            <span class="text-2xl font-bold" id="totalInvestment">-</span>
                        </div>
                        <div class="flex justify-between items-center pt-3 border-t border-white border-opacity-30">
                            <span>Average Price:</span>
                            <span class="text-3xl font-bold" id="averagePrice">-</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-xl p-6">
                    <h4 class="font-semibold text-gray-900 mb-3">Breakdown</h4>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">First Purchase:</span>
                            <span class="font-medium" id="invest1">-</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Second Purchase:</span>
                            <span class="font-medium" id="invest2">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateStockAverage() {
  const shares1 = parseFormattedNumber(
    document.getElementById("shares1").value
  );
  const price1 = parseFormattedNumber(document.getElementById("price1").value);
  const shares2 = parseFormattedNumber(
    document.getElementById("shares2").value
  );
  const price2 = parseFormattedNumber(document.getElementById("price2").value);

  let valid = true;

  if (!shares1 || shares1 <= 0) {
    showError("shares1", "Please enter valid number of shares");
    valid = false;
  }
  if (!price1 || price1 <= 0) {
    showError("price1", "Please enter valid price");
    valid = false;
  }
  if (!shares2 || shares2 <= 0) {
    showError("shares2", "Please enter valid number of shares");
    valid = false;
  }
  if (!price2 || price2 <= 0) {
    showError("price2", "Please enter valid price");
    valid = false;
  }

  if (!valid) return;

  const totalShares = shares1 + shares2;
  const invest1 = shares1 * price1;
  const invest2 = shares2 * price2;
  const totalInvestment = invest1 + invest2;
  const averagePrice = totalInvestment / totalShares;

  document.getElementById("totalShares").textContent =
    formatNumber(totalShares);
  document.getElementById("totalInvestment").textContent =
    "₹" + formatNumber(totalInvestment.toFixed(2));
  document.getElementById("averagePrice").textContent =
    "₹" + formatNumber(averagePrice.toFixed(2));
  document.getElementById("invest1").textContent =
    "₹" + formatNumber(invest1.toFixed(2));
  document.getElementById("invest2").textContent =
    "₹" + formatNumber(invest2.toFixed(2));

  document.getElementById("stockAverageResult").classList.remove("hidden");
}

// Profit/Loss Calculator
function loadProfitLossCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Number of Shares/Units</label>
                    <input type="text" id="plShares" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 100"
                           oninput="handleNumberInput(event); clearError('plShares')"
                           onblur="formatInputNumber(event)">
                    <p id="plShares-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Buy Price (₹)</label>
                    <input type="text" id="buyPrice" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 150.50"
                           oninput="handleNumberInput(event); clearError('buyPrice')"
                           onblur="formatInputNumber(event)">
                    <p id="buyPrice-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Sell Price (₹)</label>
                    <input type="text" id="sellPrice" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 180.75"
                           oninput="handleNumberInput(event); clearError('sellPrice')"
                           onblur="formatInputNumber(event)">
                    <p id="sellPrice-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Brokerage & Charges (%)</label>
                    <input type="text" id="charges" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 0.5"
                           value="0.5"
                           oninput="handleNumberInput(event); clearError('charges')"
                           onblur="formatInputNumber(event)">
                    <p id="charges-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateProfitLoss()" 
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate P&L
                </button>
            </div>

            <div id="plResult" class="hidden animate-fade-in">
                <div id="plCard" class="result-card rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">Profit & Loss</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span>Total Investment:</span>
                            <span class="text-xl font-bold" id="plInvestment">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Total Returns:</span>
                            <span class="text-xl font-bold" id="plReturns">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Total Charges:</span>
                            <span class="text-xl font-bold" id="plCharges">-</span>
                        </div>
                        <div class="flex justify-between items-center pt-3 border-t border-white border-opacity-30">
                            <span>Net P&L:</span>
                            <span class="text-3xl font-bold" id="netPL">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Return (%):</span>
                            <span class="text-2xl font-bold" id="returnPercent">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateProfitLoss() {
  const shares = parseFormattedNumber(
    document.getElementById("plShares").value
  );
  const buyPrice = parseFormattedNumber(
    document.getElementById("buyPrice").value
  );
  const sellPrice = parseFormattedNumber(
    document.getElementById("sellPrice").value
  );
  const chargesPercent = parseFormattedNumber(
    document.getElementById("charges").value
  );

  let valid = true;

  if (!shares || shares <= 0) {
    showError("plShares", "Please enter valid number of shares");
    valid = false;
  }
  if (!buyPrice || buyPrice <= 0) {
    showError("buyPrice", "Please enter valid buy price");
    valid = false;
  }
  if (!sellPrice || sellPrice <= 0) {
    showError("sellPrice", "Please enter valid sell price");
    valid = false;
  }
  if (chargesPercent < 0) {
    showError("charges", "Charges cannot be negative");
    valid = false;
  }

  if (!valid) return;

  const investment = shares * buyPrice;
  const returns = shares * sellPrice;
  const charges = (investment + returns) * (chargesPercent / 100);
  const netPL = returns - investment - charges;
  const returnPercent = (netPL / investment) * 100;

  document.getElementById("plInvestment").textContent =
    "₹" + formatNumber(investment.toFixed(2));
  document.getElementById("plReturns").textContent =
    "₹" + formatNumber(returns.toFixed(2));
  document.getElementById("plCharges").textContent =
    "₹" + formatNumber(charges.toFixed(2));
  document.getElementById("netPL").textContent =
    "₹" + formatNumber(Math.abs(netPL).toFixed(2));
  document.getElementById("returnPercent").textContent =
    returnPercent.toFixed(2) + "%";

  const plCard = document.getElementById("plCard");
  if (netPL >= 0) {
    plCard.className = "profit-bg rounded-xl p-6 text-white mb-4";
  } else {
    plCard.className = "loss-bg rounded-xl p-6 text-white mb-4";
  }

  document.getElementById("plResult").classList.remove("hidden");
}

// CAGR Calculator
function loadCAGRCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Initial Investment (₹)</label>
                    <input type="text" id="cagrInitial" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 100000"
                           oninput="handleNumberInput(event); clearError('cagrInitial')"
                           onblur="formatInputNumber(event)">
                    <p id="cagrInitial-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Final Value (₹)</label>
                    <input type="text" id="cagrFinal" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 250000"
                           oninput="handleNumberInput(event); clearError('cagrFinal')"
                           onblur="formatInputNumber(event)">
                    <p id="cagrFinal-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Investment Period (Years)</label>
                    <input type="text" id="cagrYears" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 5"
                           oninput="handleNumberInput(event); clearError('cagrYears')"
                           onblur="formatInputNumber(event)">
                    <p id="cagrYears-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateCAGR()" 
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate CAGR
                </button>
            </div>

            <div id="cagrResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">CAGR Results</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span>Compound Annual Growth Rate:</span>
                            <span class="text-4xl font-bold" id="cagrRate">-</span>
                        </div>
                        <div class="flex justify-between items-center pt-3 border-t border-white border-opacity-30">
                            <span>Total Gain:</span>
                            <span class="text-2xl font-bold" id="cagrGain">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Absolute Return:</span>
                            <span class="text-xl font-bold" id="cagrAbsolute">-</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-xl p-6">
                    <h4 class="font-semibold text-gray-900 mb-3">Investment Summary</h4>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Initial Amount:</span>
                            <span class="font-medium" id="cagrInitialDisplay">-</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Final Amount:</span>
                            <span class="font-medium" id="cagrFinalDisplay">-</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Duration:</span>
                            <span class="font-medium" id="cagrYearsDisplay">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateCAGR() {
  const initial = parseFormattedNumber(
    document.getElementById("cagrInitial").value
  );
  const final = parseFormattedNumber(
    document.getElementById("cagrFinal").value
  );
  const years = parseFormattedNumber(
    document.getElementById("cagrYears").value
  );

  let valid = true;

  if (!initial || initial <= 0) {
    showError("cagrInitial", "Please enter valid initial investment");
    valid = false;
  }
  if (!final || final <= 0) {
    showError("cagrFinal", "Please enter valid final value");
    valid = false;
  }
  if (!years || years <= 0) {
    showError("cagrYears", "Please enter valid number of years");
    valid = false;
  }
  if (final <= initial) {
    showError(
      "cagrFinal",
      "Final value must be greater than initial investment"
    );
    valid = false;
  }

  if (!valid) return;

  const cagr = (Math.pow(final / initial, 1 / years) - 1) * 100;
  const gain = final - initial;
  const absoluteReturn = ((final - initial) / initial) * 100;

  document.getElementById("cagrRate").textContent = cagr.toFixed(2) + "%";
  document.getElementById("cagrGain").textContent =
    "₹" + formatNumber(gain.toFixed(2));
  document.getElementById("cagrAbsolute").textContent =
    absoluteReturn.toFixed(2) + "%";
  document.getElementById("cagrInitialDisplay").textContent =
    "₹" + formatNumber(initial.toFixed(2));
  document.getElementById("cagrFinalDisplay").textContent =
    "₹" + formatNumber(final.toFixed(2));
  document.getElementById("cagrYearsDisplay").textContent = years + " years";

  document.getElementById("cagrResult").classList.remove("hidden");
}

// SIP Calculator
function loadSIPCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Monthly Investment (₹)</label>
                    <input type="text" id="sipAmount" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 5000"
                           oninput="handleNumberInput(event); clearError('sipAmount')"
                           onblur="formatInputNumber(event)">
                    <p id="sipAmount-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Expected Return Rate (% p.a.)</label>
                    <input type="text" id="sipRate" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 12"
                           value="12"
                           oninput="handleNumberInput(event); clearError('sipRate')"
                           onblur="formatInputNumber(event)">
                    <p id="sipRate-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Time Period (Years)</label>
                    <input type="text" id="sipYears" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 10"
                           oninput="handleNumberInput(event); clearError('sipYears')"
                           onblur="formatInputNumber(event)">
                    <p id="sipYears-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateSIP()" 
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate Returns
                </button>
            </div>

            <div id="sipResult" class="hidden animate-fade-in">
                <div class="profit-bg rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">SIP Returns</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span>Total Investment:</span>
                            <span class="text-xl font-bold" id="sipInvested">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Estimated Returns:</span>
                            <span class="text-xl font-bold" id="sipReturns">-</span>
                        </div>
                        <div class="flex justify-between items-center pt-3 border-t border-white border-opacity-30">
                            <span>Maturity Value:</span>
                            <span class="text-4xl font-bold" id="sipMaturity">-</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-xl p-6">
                    <h4 class="font-semibold text-gray-900 mb-3">Investment Breakdown</h4>
                    <div class="space-y-2">
                        <div class="flex items-center">
                            <div class="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                            <span class="text-sm text-gray-600 flex-1">Your Investment</span>
                            <span class="text-sm font-medium" id="sipInvestedPercent">-</span>
                        </div>
                        <div class="flex items-center">
                            <div class="w-4 h-4 bg-green-500 rounded mr-2"></div>
                            <span class="text-sm text-gray-600 flex-1">Wealth Gained</span>
                            <span class="text-sm font-medium" id="sipGainPercent">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateSIP() {
  const monthlyAmount = parseFormattedNumber(
    document.getElementById("sipAmount").value
  );
  const annualRate = parseFormattedNumber(
    document.getElementById("sipRate").value
  );
  const years = parseFormattedNumber(document.getElementById("sipYears").value);

  let valid = true;

  if (!monthlyAmount || monthlyAmount <= 0) {
    showError("sipAmount", "Please enter valid monthly amount");
    valid = false;
  }
  if (!annualRate || annualRate <= 0) {
    showError("sipRate", "Please enter valid return rate");
    valid = false;
  }
  if (!years || years <= 0) {
    showError("sipYears", "Please enter valid time period");
    valid = false;
  }

  if (!valid) return;

  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  const totalInvested = monthlyAmount * months;

  // Future Value of SIP formula
  const maturityValue =
    monthlyAmount *
    (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate));
  const estimatedReturns = maturityValue - totalInvested;

  const investedPercent = ((totalInvested / maturityValue) * 100).toFixed(1);
  const gainPercent = ((estimatedReturns / maturityValue) * 100).toFixed(1);

  document.getElementById("sipInvested").textContent =
    "₹" + formatNumber(totalInvested.toFixed(2));
  document.getElementById("sipReturns").textContent =
    "₹" + formatNumber(estimatedReturns.toFixed(2));
  document.getElementById("sipMaturity").textContent =
    "₹" + formatNumber(maturityValue.toFixed(2));
  document.getElementById("sipInvestedPercent").textContent =
    investedPercent + "%";
  document.getElementById("sipGainPercent").textContent = gainPercent + "%";

  document.getElementById("sipResult").classList.remove("hidden");
}

function loadXIRRCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The total amount of money you initially invested.">Initial Investment (₹)</label>
                    <input type="text" id="xirrInitial" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 1,00,000" oninput="handleNumberInput(event); clearError('xirrInitial')" onblur="formatInputNumber(event)">
                    <p id="xirrInitial-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The current market value or the total amount received at the end.">Current/Final Value (₹)</label>
                    <input type="text" id="xirrFinal" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 1,50,000" oninput="handleNumberInput(event); clearError('xirrFinal')" onblur="formatInputNumber(event)">
                    <p id="xirrFinal-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Total number of years the money was invested.">Investment Duration (Years)</label>
                    <input type="text" id="xirrYears" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 3.5" oninput="handleNumberInput(event); clearError('xirrYears')">
                    <p id="xirrYears-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <button onclick="calculateXIRR()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">Calculate Annualized Return</button>
            </div>
            <div id="xirrResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-indigo-600 to-purple-700">
                    <h3 class="text-lg font-semibold mb-4">Performance Result</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="The Compounded Annual Growth Rate of your investment.">XIRR / CAGR:</span>
                            <span class="text-4xl font-bold" id="xirrValue">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span title="Total absolute profit earned.">Absolute Profit:</span>
                            <span class="text-xl font-bold" id="xirrProfit">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateXIRR() {
  const initial = parseFormattedNumber(
    document.getElementById("xirrInitial").value
  );
  const finalVal = parseFormattedNumber(
    document.getElementById("xirrFinal").value
  );
  const years = parseFloat(document.getElementById("xirrYears").value);

  let valid = true;
  if (!initial || initial <= 0) {
    showError("xirrInitial", "Enter valid investment");
    valid = false;
  }
  if (!finalVal || finalVal <= 0) {
    showError("xirrFinal", "Enter valid final value");
    valid = false;
  }
  if (!years || years <= 0) {
    showError("xirrYears", "Enter valid duration");
    valid = false;
  }
  if (!valid) return;

  const cagr = (Math.pow(finalVal / initial, 1 / years) - 1) * 100;
  const profit = finalVal - initial;

  document.getElementById("xirrValue").textContent = cagr.toFixed(2) + "%";
  document.getElementById("xirrProfit").textContent =
    "₹" + formatNumber(profit.toFixed(2));
  document.getElementById("xirrResult").classList.remove("hidden");
}

function loadPositionSizeCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Total amount of money in your trading account.">Trading Capital (₹)</label>
                    <input type="text" id="psCapital" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 2,00,000" oninput="handleNumberInput(event); clearError('psCapital')" onblur="formatInputNumber(event)">
                    <p id="psCapital-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The maximum percentage of capital you are willing to lose on this trade.">Risk per Trade (%)</label>
                    <input type="text" id="psRisk" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 1" value="1" oninput="handleNumberInput(event); clearError('psRisk')">
                    <p id="psRisk-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The difference between your entry price and your stop-loss price.">Stop Loss Points (₹)</label>
                    <input type="text" id="psPoints" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 20" oninput="handleNumberInput(event); clearError('psPoints')">
                    <p id="psPoints-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <button onclick="calculatePositionSize()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">Calculate Position Size</button>
            </div>
            <div id="psResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-indigo-600 to-purple-700">
                    <h3 class="text-lg font-semibold mb-4">Risk Recommendation</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="The exact number of shares/units you should buy.">Quantity to Buy:</span>
                            <span class="text-4xl font-bold" id="psQty">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span title="The total amount of cash at risk.">Cash at Risk:</span>
                            <span class="text-xl font-bold" id="psCashRisk">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculatePositionSize() {
  const capital = parseFormattedNumber(
    document.getElementById("psCapital").value
  );
  const riskPct = parseFloat(document.getElementById("psRisk").value);
  const slPoints = parseFloat(document.getElementById("psPoints").value);

  let valid = true;
  if (!capital || capital <= 0) {
    showError("psCapital", "Enter valid capital");
    valid = false;
  }
  if (!riskPct || riskPct <= 0) {
    showError("psRisk", "Enter valid risk %");
    valid = false;
  }
  if (!slPoints || slPoints <= 0) {
    showError("psPoints", "Enter valid SL points");
    valid = false;
  }
  if (!valid) return;

  const cashRisk = capital * (riskPct / 100);
  const qty = cashRisk / slPoints;

  document.getElementById("psQty").textContent = Math.floor(qty) + " Units";
  document.getElementById("psCashRisk").textContent =
    "₹" + formatNumber(cashRisk.toFixed(2));
  document.getElementById("psResult").classList.remove("hidden");
}

function loadStepUpSIPCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Amount to be invested at the start.">Initial Monthly SIP (₹)</label>
                    <input type="text" id="suSip" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 10,000" oninput="handleNumberInput(event); clearError('suSip')" onblur="formatInputNumber(event)">
                    <p id="suSip-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Percentage increase in SIP amount every year.">Annual Step-up (%)</label>
                    <input type="text" id="suStep" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 10" value="10" oninput="handleNumberInput(event); clearError('suStep')">
                    <p id="suStep-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Number of years you plan to invest.">Duration (Years)</label>
                    <input type="text" id="suYears" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 20" oninput="handleNumberInput(event); clearError('suYears')">
                    <p id="suYears-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Expected annual rate of return.">Expected Return (%)</label>
                    <input type="text" id="suRate" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 12" value="12" oninput="handleNumberInput(event); clearError('suRate')">
                    <p id="suRate-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <button onclick="calculateStepUpSIP()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">Calculate Growth</button>
            </div>
            <div id="suResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-indigo-600 to-purple-700">
                    <h3 class="text-lg font-semibold mb-4">Step-Up SIP Maturity</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="Final corpus at maturity.">Future Value:</span>
                            <span class="text-4xl font-bold" id="suValue">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span title="Total amount of cash actually invested.">Total Invested:</span>
                            <span class="text-xl font-bold" id="suInvested">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateStepUpSIP() {
  let sip = parseFormattedNumber(document.getElementById("suSip").value);
  const step = parseFloat(document.getElementById("suStep").value) / 100;
  const years = parseInt(document.getElementById("suYears").value);
  const rate = parseFloat(document.getElementById("suRate").value) / 100 / 12;

  let valid = true;
  if (!sip) {
    showError("suSip", "Enter SIP amount");
    valid = false;
  }
  if (!years) {
    showError("suYears", "Enter duration");
    valid = false;
  }
  if (!valid) return;

  let totalFV = 0;
  let totalInvested = 0;

  for (let i = 1; i <= years * 12; i++) {
    totalFV = (totalFV + sip) * (1 + rate);
    totalInvested += sip;
    if (i % 12 === 0) sip *= 1 + step;
  }

  document.getElementById("suValue").textContent =
    "₹" + formatNumber(Math.round(totalFV));
  document.getElementById("suInvested").textContent =
    "₹" + formatNumber(Math.round(totalInvested));
  document.getElementById("suResult").classList.remove("hidden");
}

function loadSWPCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Total initial amount in the fund.">Total Investment (₹)</label>
                    <input type="text" id="swpPrincipal" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 20,00,000" oninput="handleNumberInput(event); clearError('swpPrincipal')" onblur="formatInputNumber(event)">
                    <p id="swpPrincipal-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Amount to withdraw every month.">Monthly Withdrawal (₹)</label>
                    <input type="text" id="swpWithdrawal" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 20,000" oninput="handleNumberInput(event); clearError('swpWithdrawal')" onblur="formatInputNumber(event)">
                    <p id="swpWithdrawal-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Duration of withdrawal plan.">Duration (Years)</label>
                    <input type="text" id="swpYears" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 10" oninput="handleNumberInput(event); clearError('swpYears')">
                    <p id="swpYears-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <button onclick="calculateSWP()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">Estimate Balance</button>
            </div>
            <div id="swpResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-indigo-600 to-purple-700">
                    <h3 class="text-lg font-semibold mb-4">SWP Summary</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="Final balance remaining in the fund.">Remaining Balance:</span>
                            <span class="text-4xl font-bold" id="swpValue">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span title="Total amount withdrawn over the years.">Total Withdrawn:</span>
                            <span class="text-xl font-bold" id="swpTotalWithdrawn">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateSWP() {
  let principal = parseFormattedNumber(
    document.getElementById("swpPrincipal").value
  );
  const withdrawal = parseFormattedNumber(
    document.getElementById("swpWithdrawal").value
  );
  const years = parseFloat(document.getElementById("swpYears").value);
  const rate = 0.08 / 12; // Standard 8% return assumed for SWP funds

  let valid = true;
  if (!principal) {
    showError("swpPrincipal", "Enter total investment");
    valid = false;
  }
  if (!withdrawal) {
    showError("swpWithdrawal", "Enter withdrawal amount");
    valid = false;
  }
  if (!years) {
    showError("swpYears", "Enter duration");
    valid = false;
  }
  if (!valid) return;

  const months = years * 12;
  for (let i = 0; i < months; i++) {
    principal = principal * (1 + rate) - withdrawal;
  }

  document.getElementById("swpValue").textContent =
    "₹" + formatNumber(Math.max(0, Math.round(principal)));
  document.getElementById("swpTotalWithdrawn").textContent =
    "₹" + formatNumber(Math.round(withdrawal * months));
  document.getElementById("swpResult").classList.remove("hidden");
}

function loadDividendYieldCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Price of one share in the market.">Stock Price (₹)</label>
                    <input type="text" id="dyPrice" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 2,500" oninput="handleNumberInput(event); clearError('dyPrice')" onblur="formatInputNumber(event)">
                    <p id="dyPrice-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Total dividend paid per share in a year.">Annual Dividend (₹)</label>
                    <input type="text" id="dyDiv" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 45" oninput="handleNumberInput(event); clearError('dyDiv')" onblur="formatInputNumber(event)">
                    <p id="dyDiv-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <button onclick="calculateDividendYield()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">Calculate Yield</button>
            </div>
            <div id="dyResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-indigo-600 to-purple-700">
                    <h3 class="text-lg font-semibold mb-4">Yield Result</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="The percentage of stock price paid out as dividends annually.">Dividend Yield:</span>
                            <span class="text-4xl font-bold" id="dyValue">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateDividendYield() {
  const price = parseFormattedNumber(document.getElementById("dyPrice").value);
  const dividend = parseFormattedNumber(document.getElementById("dyDiv").value);

  let valid = true;
  if (!price || price <= 0) {
    showError("dyPrice", "Enter valid price");
    valid = false;
  }
  if (!dividend || dividend < 0) {
    showError("dyDiv", "Enter valid dividend");
    valid = false;
  }
  if (!valid) return;

  const yieldPct = (dividend / price) * 100;
  document.getElementById("dyValue").textContent = yieldPct.toFixed(2) + "%";
  document.getElementById("dyResult").classList.remove("hidden");
}
function loadRiskRewardCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Price at which you buy.">Entry Price (₹)</label>
                    <input type="text" id="rrEntry" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 500" oninput="handleNumberInput(event); clearError('rrEntry')" onblur="formatInputNumber(event)">
                    <p id="rrEntry-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Price level to lock in profits.">Target Price (₹)</label>
                    <input type="text" id="rrTarget" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 600" oninput="handleNumberInput(event); clearError('rrTarget')" onblur="formatInputNumber(event)">
                    <p id="rrTarget-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Price level to exit and limit losses.">Stop Loss Price (₹)</label>
                    <input type="text" id="rrStop" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 475" oninput="handleNumberInput(event); clearError('rrStop')" onblur="formatInputNumber(event)">
                    <p id="rrStop-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <button onclick="calculateRiskReward()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">Analyze Ratio</button>
            </div>
            <div id="rrResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-indigo-600 to-purple-700">
                    <h3 class="text-lg font-semibold mb-4">Trade Ratio</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="Potential Profit / Potential Loss.">R:R Ratio:</span>
                            <span class="text-4xl font-bold" id="rrRatio">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateRiskReward() {
  const entry = parseFormattedNumber(document.getElementById("rrEntry").value);
  const target = parseFormattedNumber(
    document.getElementById("rrTarget").value
  );
  const stop = parseFormattedNumber(document.getElementById("rrStop").value);

  let valid = true;
  if (!entry) {
    showError("rrEntry", "Enter entry price");
    valid = false;
  }
  if (!target) {
    showError("rrTarget", "Enter target price");
    valid = false;
  }
  if (!stop) {
    showError("rrStop", "Enter stop loss");
    valid = false;
  }
  if (!valid) return;

  const risk = Math.abs(entry - stop);
  const reward = Math.abs(target - entry);
  const ratio = reward / risk;

  document.getElementById("rrRatio").textContent = "1 : " + ratio.toFixed(2);
  document.getElementById("rrResult").classList.remove("hidden");
}

function loadBreakEvenCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Ongoing costs like rent and salaries that don't change with sales.">Total Fixed Costs (₹)</label>
                    <input type="text" id="beFixed" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 50,000" oninput="handleNumberInput(event); clearError('beFixed')" onblur="formatInputNumber(event)">
                    <p id="beFixed-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The cost of producing one single unit.">Variable Cost per Unit (₹)</label>
                    <input type="text" id="beVar" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 100" oninput="handleNumberInput(event); clearError('beVar')" onblur="formatInputNumber(event)">
                    <p id="beVar-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The price you charge customers per unit.">Selling Price per Unit (₹)</label>
                    <input type="text" id="bePrice" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 250" oninput="handleNumberInput(event); clearError('bePrice')" onblur="formatInputNumber(event)">
                    <p id="bePrice-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <button onclick="calculateBreakEven()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">Calculate Break Even</button>
            </div>
            <div id="beResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-indigo-600 to-purple-700">
                    <h3 class="text-lg font-semibold mb-4">Break-Even Point</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="The number of units you must sell to reach zero profit.">Units Required:</span>
                            <span class="text-4xl font-bold" id="beUnits">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span title="Total revenue needed to reach break-even.">Sales Revenue:</span>
                            <span class="text-xl font-bold" id="beSales">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateBreakEven() {
  const fixed = parseFormattedNumber(document.getElementById("beFixed").value);
  const variable = parseFormattedNumber(document.getElementById("beVar").value);
  const price = parseFormattedNumber(document.getElementById("bePrice").value);

  let valid = true;
  if (!fixed || fixed <= 0) {
    showError("beFixed", "Enter fixed costs");
    valid = false;
  }
  if (!variable || variable < 0) {
    showError("beVar", "Enter variable cost");
    valid = false;
  }
  if (!price || price <= variable) {
    showError("bePrice", "Price must exceed variable cost");
    valid = false;
  }
  if (!valid) return;

  const units = fixed / (price - variable);
  const sales = units * price;

  document.getElementById("beUnits").textContent = Math.ceil(units) + " Units";
  document.getElementById("beSales").textContent =
    "₹" + formatNumber(sales.toFixed(2));
  document.getElementById("beResult").classList.remove("hidden");
}

function loadLumpsumInvestmentCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The one-time amount you want to invest.">Lumpsum Investment (₹)</label>
                    <input type="text" id="lumPrincipal" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 5,00,000" oninput="handleNumberInput(event); clearError('lumPrincipal')" onblur="formatInputNumber(event)">
                    <p id="lumPrincipal-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Expected annual rate of return.">Expected Return (%)</label>
                    <input type="text" id="lumRate" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 12" value="12" oninput="handleNumberInput(event); clearError('lumRate')">
                    <p id="lumRate-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Investment duration in years.">Duration (Years)</label>
                    <input type="text" id="lumYears" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 10" oninput="handleNumberInput(event); clearError('lumYears')">
                    <p id="lumYears-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <button onclick="calculateLumpsum()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">Calculate Maturity</button>
            </div>
            <div id="lumResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-indigo-600 to-purple-700">
                    <h3 class="text-lg font-semibold mb-4">Lumpsum Result</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="Final wealth at the end of duration.">Maturity Value:</span>
                            <span class="text-4xl font-bold" id="lumValue">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span title="Net interest/wealth gained.">Wealth Gained:</span>
                            <span class="text-xl font-bold" id="lumWealth">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateLumpsum() {
  const principal = parseFormattedNumber(
    document.getElementById("lumPrincipal").value
  );
  const rate = parseFloat(document.getElementById("lumRate").value) / 100;
  const years = parseFloat(document.getElementById("lumYears").value);

  let valid = true;
  if (!principal) {
    showError("lumPrincipal", "Enter principal amount");
    valid = false;
  }
  if (!years) {
    showError("lumYears", "Enter duration");
    valid = false;
  }
  if (!valid) return;

  const value = principal * Math.pow(1 + rate, years);
  const wealth = value - principal;

  document.getElementById("lumValue").textContent =
    "₹" + formatNumber(Math.round(value));
  document.getElementById("lumWealth").textContent =
    "₹" + formatNumber(Math.round(wealth));
  document.getElementById("lumResult").classList.remove("hidden");
}

function loadSTPCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Initial lumpsum parked in source fund.">Source Fund Principal (₹)</label>
                    <input type="text" id="stpSource" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 10,00,000" oninput="handleNumberInput(event); clearError('stpSource')" onblur="formatInputNumber(event)">
                    <p id="stpSource-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Amount to transfer to equity fund monthly.">Monthly Transfer (₹)</label>
                    <input type="text" id="stpMonthly" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 50,000" oninput="handleNumberInput(event); clearError('stpMonthly')" onblur="formatInputNumber(event)">
                    <p id="stpMonthly-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="input-group">
                        <label class="block text-sm font-medium text-gray-700 mb-2" title="Assumed return for the source fund (usually lower).">Source ROI (%)</label>
                        <input type="text" id="stpRateSrc" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" value="6">
                    </div>
                    <div class="input-group">
                        <label class="block text-sm font-medium text-gray-700 mb-2" title="Assumed return for the target fund (usually higher).">Target ROI (%)</label>
                        <input type="text" id="stpRateTgt" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" value="12">
                    </div>
                </div>
                <button onclick="calculateSTP()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">Analyze STP</button>
            </div>
            <div id="stpResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-indigo-600 to-purple-700">
                    <h3 class="text-lg font-semibold mb-4">Maturity Summary</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="The final value of the equity (target) fund.">Target Fund Value:</span>
                            <span class="text-4xl font-bold" id="stpTgtVal">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateSTP() {
  let source = parseFormattedNumber(document.getElementById("stpSource").value);
  const transfer = parseFormattedNumber(
    document.getElementById("stpMonthly").value
  );
  const rSrc =
    parseFloat(document.getElementById("stpRateSrc").value) / 100 / 12;
  const rTgt =
    parseFloat(document.getElementById("stpRateTgt").value) / 100 / 12;

  let valid = true;
  if (!source) {
    showError("stpSource", "Enter source principal");
    valid = false;
  }
  if (!transfer) {
    showError("stpMonthly", "Enter transfer amount");
    valid = false;
  }
  if (!valid) return;

  let target = 0;
  const months = Math.floor(source / transfer);

  for (let i = 0; i < months; i++) {
    source = (source - transfer) * (1 + rSrc);
    target = (target + transfer) * (1 + rTgt);
  }

  document.getElementById("stpTgtVal").textContent =
    "₹" + formatNumber(Math.round(target));
  document.getElementById("stpResult").classList.remove("hidden");
}
function loadMutualFundReturnCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Total money put into the mutual fund.">Total Investment (₹)</label>
                    <input type="text" id="mfInvested" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 1,00,000" oninput="handleNumberInput(event); clearError('mfInvested')" onblur="formatInputNumber(event)">
                    <p id="mfInvested-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Current market value of your units.">Current Value (₹)</label>
                    <input type="text" id="mfCurrent" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 1,65,000" oninput="handleNumberInput(event); clearError('mfCurrent')" onblur="formatInputNumber(event)">
                    <p id="mfCurrent-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Number of years invested.">Duration (Years)</label>
                    <input type="text" id="mfYears" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 5" oninput="handleNumberInput(event); clearError('mfYears')">
                    <p id="mfYears-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <button onclick="calculateMFReturn()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">Calculate Annualized Return</button>
            </div>
            <div id="mfResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-indigo-600 to-purple-700">
                    <h3 class="text-lg font-semibold mb-4">Mutual Fund Return</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="Compounded Annual Growth Rate.">CAGR:</span>
                            <span class="text-4xl font-bold" id="mfCagr">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span title="Percentage gain on original investment.">Absolute Return:</span>
                            <span class="text-xl font-bold" id="mfAbs">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateMFReturn() {
  const invested = parseFormattedNumber(
    document.getElementById("mfInvested").value
  );
  const current = parseFormattedNumber(
    document.getElementById("mfCurrent").value
  );
  const years = parseFloat(document.getElementById("mfYears").value);

  let valid = true;
  if (!invested) {
    showError("mfInvested", "Enter invested amount");
    valid = false;
  }
  if (!current) {
    showError("mfCurrent", "Enter current value");
    valid = false;
  }
  if (!years) {
    showError("mfYears", "Enter duration");
    valid = false;
  }
  if (!valid) return;

  const cagr = (Math.pow(current / invested, 1 / years) - 1) * 100;
  const absReturn = ((current - invested) / invested) * 100;

  document.getElementById("mfCagr").textContent = cagr.toFixed(2) + "%";
  document.getElementById("mfAbs").textContent = absReturn.toFixed(2) + "%";
  document.getElementById("mfResult").classList.remove("hidden");
}
