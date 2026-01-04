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
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
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
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
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
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
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
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
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
                    <label class="block text-sm font-medium text-gray-700 mb-2">Initial Investment (₹)</label>
                    <input type="text" id="xirrInitial" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g., 1,00,000" oninput="handleNumberInput(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Final/Current Value (₹)</label>
                    <input type="text" id="xirrFinal" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g., 1,50,000" oninput="handleNumberInput(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Investment Duration (Years)</label>
                    <input type="text" id="xirrYears" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g., 3.5">
                </div>
                <button onclick="calculateXIRR()" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold">Calculate Annualized Return</button>
            </div>
            <div id="xirrResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white bg-indigo-700">
                    <span class="block text-sm opacity-80 mb-1" title="The annualized internal rate of return for your investment.">Annualized Return (XIRR/CAGR):</span>
                    <span class="text-4xl font-bold" id="xirrValue">-</span>
                </div>
            </div>
        </div>
    `;
}

function calculateXIRR() {
  const p = parseFormattedNumber(document.getElementById("xirrInitial").value);
  const f = parseFormattedNumber(document.getElementById("xirrFinal").value);
  const t = parseFloat(document.getElementById("xirrYears").value);
  if (!p || !f || !t) return;
  const cagr = (Math.pow(f / p, 1 / t) - 1) * 100;
  document.getElementById("xirrValue").textContent = cagr.toFixed(2) + "%";
  document.getElementById("xirrResult").classList.remove("hidden");
}

function loadPositionSizeCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Total Trading Capital (₹)</label>
                    <input type="text" id="psCap" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" oninput="handleNumberInput(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Risk per Trade (%)</label>
                    <input type="text" id="psRiskPct" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" value="1">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Stop Loss Amount per Share (₹)</label>
                    <input type="text" id="psSl" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Entry Price - SL Price">
                </div>
                <button onclick="calculatePositionSize()" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold">Calculate Quantity</button>
            </div>
            <div id="psResult" class="hidden animate-fade-in">
                <div class="bg-gray-50 p-6 rounded-xl border">
                    <span class="block text-sm text-gray-600" title="The maximum number of shares you should buy to stay within your risk limit.">Recommended Quantity:</span>
                    <span class="text-3xl font-bold" id="psQty">-</span>
                </div>
            </div>
        </div>
    `;
}

function calculatePositionSize() {
  const cap = parseFormattedNumber(document.getElementById("psCap").value);
  const risk = parseFloat(document.getElementById("psRiskPct").value) / 100;
  const sl = parseFloat(document.getElementById("psSl").value);
  if (!cap || !sl) return;
  const qty = (cap * risk) / sl;
  document.getElementById("psQty").textContent = Math.floor(qty) + " Shares";
  document.getElementById("psResult").classList.remove("hidden");
}

function loadStepUpSIPCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Monthly SIP Amount (₹)</label>
                    <input type="text" id="ssSip" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" oninput="handleNumberInput(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Annual Step-Up (%)</label>
                    <input type="text" id="ssStep" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" value="10">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Expected Return (%)</label>
                    <input type="text" id="ssRate" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" value="12">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tenure (Years)</label>
                    <input type="text" id="ssYears" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g., 20">
                </div>
                <button onclick="calculateStepUp()" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold">Calculate Future Value</button>
            </div>
            <div id="ssResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white bg-indigo-700">
                    <span class="block text-sm opacity-80 mb-1" title="The total maturity value including your annual increments.">Maturity Amount:</span>
                    <span class="text-4xl font-bold" id="ssFinal">-</span>
                </div>
            </div>
        </div>
    `;
}

function calculateStepUp() {
  let sip = parseFormattedNumber(document.getElementById("ssSip").value);
  const step = parseFloat(document.getElementById("ssStep").value) / 100;
  const rate = parseFloat(document.getElementById("ssRate").value) / 100 / 12;
  const years = parseInt(document.getElementById("ssYears").value);

  let totalValue = 0;
  for (let i = 1; i <= years * 12; i++) {
    totalValue = (totalValue + sip) * (1 + rate);
    if (i % 12 === 0) sip *= 1 + step;
  }

  document.getElementById("ssFinal").textContent =
    "₹" + formatNumber(Math.round(totalValue));
  document.getElementById("ssResult").classList.remove("hidden");
}

function loadSWPCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Lumpsum Amount (₹)</label>
                    <input type="text" id="swpPrincipal" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" oninput="handleNumberInput(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Monthly Withdrawal (₹)</label>
                    <input type="text" id="swpWithdrawal" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" oninput="handleNumberInput(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Expected Return (%)</label>
                    <input type="text" id="swpRate" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" value="8">
                </div>
                <button onclick="calculateSWP()" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold">Calculate Balance</button>
            </div>
            <div id="swpResult" class="hidden animate-fade-in">
                <div class="bg-gray-50 p-6 rounded-xl border space-y-3">
                    <p class="text-sm text-gray-600" title="Balance remaining after 10 years of withdrawal.">Balance after 10 Years:</p>
                    <p class="text-3xl font-bold text-indigo-700" id="swpFinal">-</p>
                </div>
            </div>
        </div>
    `;
}

function calculateSWP() {
  let balance = parseFormattedNumber(
    document.getElementById("swpPrincipal").value
  );
  const withdrawal = parseFormattedNumber(
    document.getElementById("swpWithdrawal").value
  );
  const r = parseFloat(document.getElementById("swpRate").value) / 100 / 12;

  for (let m = 1; m <= 120; m++) {
    // Calculate for 10 years
    balance = balance * (1 + r) - withdrawal;
    if (balance < 0) {
      balance = 0;
      break;
    }
  }

  document.getElementById("swpFinal").textContent =
    "₹" + formatNumber(Math.round(balance));
  document.getElementById("swpResult").classList.remove("hidden");
}

function loadDividendYieldCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Current Stock Price (₹)</label>
                    <input type="text" id="divPrice" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 2500" oninput="handleNumberInput(event); clearError('divPrice')" onblur="formatInputNumber(event)">
                    <p id="divPrice-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Annual Dividend per Share (₹)</label>
                    <input type="text" id="divAmount" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 50" oninput="handleNumberInput(event); clearError('divAmount')" onblur="formatInputNumber(event)">
                    <p id="divAmount-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <button onclick="calculateDividendYield()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">Calculate Yield</button>
            </div>
            <div id="divResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-teal-500 to-emerald-600">
                    <h3 class="text-lg font-semibold mb-4">Dividend Analysis</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="The percentage return on your investment in the form of dividends.">Dividend Yield (%):</span>
                            <span class="text-4xl font-bold" id="divYieldFinal">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateDividendYield() {
  const price = parseFormattedNumber(document.getElementById("divPrice").value);
  const div = parseFormattedNumber(document.getElementById("divAmount").value);
  if (!price || !div) return;

  const yieldVal = (div / price) * 100;
  document.getElementById("divYieldFinal").textContent =
    yieldVal.toFixed(2) + "%";
  document.getElementById("divResult").classList.remove("hidden");
}
function loadRiskRewardCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Entry Price (₹)</label>
                    <input type="text" id="rrEntry" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g., 500" oninput="handleNumberInput(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Target Price (₹)</label>
                    <input type="text" id="rrTarget" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g., 550" oninput="handleNumberInput(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Stop Loss (₹)</label>
                    <input type="text" id="rrStop" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g., 480" oninput="handleNumberInput(event)">
                </div>
                <button onclick="calculateRR()" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold">Calculate Ratio</button>
            </div>
            <div id="rrResult" class="hidden animate-fade-in">
                <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600" title="The ratio comparing potential profit to potential loss. A ratio of 1:2 or higher is usually preferred.">Risk-to-Reward Ratio:</span>
                        <span class="text-3xl font-bold text-indigo-700" id="rrRatioValue">-</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateRR() {
  const entry = parseFormattedNumber(document.getElementById("rrEntry").value);
  const target = parseFormattedNumber(
    document.getElementById("rrTarget").value
  );
  const stop = parseFormattedNumber(document.getElementById("rrStop").value);

  if (!entry || !target || !stop) return;

  const risk = Math.abs(entry - stop);
  const reward = Math.abs(target - entry);
  const ratio = reward / risk;

  document.getElementById("rrRatioValue").textContent =
    "1 : " + ratio.toFixed(2);
  document.getElementById("rrResult").classList.remove("hidden");
}

function loadBreakEvenCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Total Fixed Costs (₹)</label>
                    <input type="text" id="beFixedCosts" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., Rent, Salaries, Insurance"
                           oninput="handleNumberInput(event); clearError('beFixedCosts')"
                           onblur="formatInputNumber(event)">
                    <p id="beFixedCosts-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Variable Cost per Unit (₹)</label>
                    <input type="text" id="beVariableCost" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., Materials, Packaging"
                           oninput="handleNumberInput(event); clearError('beVariableCost')"
                           onblur="formatInputNumber(event)">
                    <p id="beVariableCost-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Selling Price per Unit (₹)</label>
                    <input type="text" id="beSellingPrice" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., Final price to customer"
                           oninput="handleNumberInput(event); clearError('beSellingPrice')"
                           onblur="formatInputNumber(event)">
                    <p id="beSellingPrice-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateBreakEven()" 
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                    Calculate Breakeven Point
                </button>
            </div>

            <div id="beResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-indigo-600 to-purple-700">
                    <h3 class="text-lg font-semibold mb-4">Breakeven Analysis</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="The number of units you need to sell to cover all your costs.">Breakeven Units:</span>
                            <span class="text-4xl font-bold" id="beUnits">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span title="The total sales revenue required to reach a zero-profit, zero-loss state.">Breakeven Sales:</span>
                            <span class="text-xl font-bold" id="beSalesAmount">-</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-xl p-6">
                    <h4 class="font-semibold text-gray-900 mb-3">Profitability Metrics</h4>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600" title="The amount each unit sold contributes toward covering fixed costs.">Contribution Margin:</span>
                            <span class="font-medium text-gray-900" id="beContribution">-</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600" title="The percentage of each sale that contributes to covering fixed costs.">Contribution Ratio:</span>
                            <span class="font-medium text-gray-900" id="beRatio">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateBreakEven() {
  const fixedCosts = parseFormattedNumber(
    document.getElementById("beFixedCosts").value
  );
  const variableCost = parseFormattedNumber(
    document.getElementById("beVariableCost").value
  );
  const sellingPrice = parseFormattedNumber(
    document.getElementById("beSellingPrice").value
  );

  let valid = true;

  if (!fixedCosts || fixedCosts < 0) {
    showError("beFixedCosts", "Please enter valid fixed costs");
    valid = false;
  }
  if (!variableCost || variableCost < 0) {
    showError("beVariableCost", "Please enter valid variable cost");
    valid = false;
  }
  if (!sellingPrice || sellingPrice <= variableCost) {
    showError(
      "beSellingPrice",
      "Selling price must be higher than variable cost"
    );
    valid = false;
  }

  if (!valid) return;

  // 1. Contribution Margin = Selling Price - Variable Cost
  const contributionMargin = sellingPrice - variableCost;

  // 2. Breakeven Units = Fixed Costs / Contribution Margin
  const breakevenUnits = fixedCosts / contributionMargin;

  // 3. Breakeven Sales = Breakeven Units * Selling Price
  const breakevenSales = breakevenUnits * sellingPrice;

  // 4. Contribution Ratio = (Contribution Margin / Selling Price) * 100
  const contributionRatio = (contributionMargin / sellingPrice) * 100;

  // Update UI
  document.getElementById("beUnits").textContent =
    Math.ceil(breakevenUnits).toLocaleString() + " Units";
  document.getElementById("beSalesAmount").textContent =
    "₹" + formatNumber(Math.round(breakevenSales));
  document.getElementById("beContribution").textContent =
    "₹" + formatNumber(contributionMargin.toFixed(2));
  document.getElementById("beRatio").textContent =
    contributionRatio.toFixed(2) + "%";

  document.getElementById("beResult").classList.remove("hidden");
}

function loadLumpsumInvestmentCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Total Investment (₹)</label>
                    <input type="text" id="lumPrincipal" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g., 1,00,000" oninput="handleNumberInput(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Expected Return (%)</label>
                    <input type="text" id="lumRate" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" value="12">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tenure (Years)</label>
                    <input type="text" id="lumYears" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g., 5">
                </div>
                <button onclick="calculateLumpsum()" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold">Calculate Maturity</button>
            </div>
            <div id="lumResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white bg-indigo-700 mb-4">
                    <span class="block text-sm opacity-80 mb-1" title="The total amount your one-time investment will grow to.">Maturity Value:</span>
                    <span class="text-4xl font-bold" id="lumFinalVal">-</span>
                </div>
                <div class="bg-gray-50 p-6 rounded-xl border">
                    <div class="flex justify-between">
                        <span class="text-gray-600" title="The net profit earned on top of your investment.">Total Wealth Gained:</span>
                        <span class="font-bold text-gray-900" id="lumProfit">-</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateLumpsum() {
  const P = parseFormattedNumber(document.getElementById("lumPrincipal").value);
  const r =
    parseFormattedNumber(document.getElementById("lumRate").value) / 100;
  const n = parseFormattedNumber(document.getElementById("lumYears").value);

  if (!P || !r || !n) return;

  const FV = P * Math.pow(1 + r, n);
  document.getElementById("lumFinalVal").textContent =
    "₹" + formatNumber(Math.round(FV));
  document.getElementById("lumProfit").textContent =
    "₹" + formatNumber(Math.round(FV - P));
  document.getElementById("lumResult").classList.remove("hidden");
}

function loadSTPCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Initial Amount in Source Fund (₹)</label>
                    <input type="text" id="stpSource" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" oninput="handleNumberInput(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Monthly Transfer Amount (₹)</label>
                    <input type="text" id="stpAmount" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" oninput="handleNumberInput(event)">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="input-group">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Source Fund Return (%)</label>
                        <input type="text" id="stpSrcRate" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" value="5">
                    </div>
                    <div class="input-group">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Target Fund Return (%)</label>
                        <input type="text" id="stpTgtRate" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" value="12">
                    </div>
                </div>
                <button onclick="calculateSTP()" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold">Calculate STP Strategy</button>
            </div>
            <div id="stpResult" class="hidden animate-fade-in">
                <div class="bg-gray-50 rounded-xl p-6 space-y-4">
                    <div class="flex justify-between">
                        <span class="text-gray-600" title="The final estimated value of the target fund after all transfers.">Target Fund Value:</span>
                        <span class="font-bold text-green-600" id="stpFinalTgt">-</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600" title="The remaining balance in the source fund (if any) after the duration.">Remaining Source Balance:</span>
                        <span class="font-bold text-gray-900" id="stpFinalSrc">-</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateSTP() {
  let srcBal = parseFormattedNumber(document.getElementById("stpSource").value);
  const transfer = parseFormattedNumber(
    document.getElementById("stpAmount").value
  );
  const srcR =
    parseFormattedNumber(document.getElementById("stpSrcRate").value) /
    100 /
    12;
  const tgtR =
    parseFormattedNumber(document.getElementById("stpTgtRate").value) /
    100 /
    12;

  if (!srcBal || !transfer) return;

  let tgtBal = 0;
  const months = Math.min(600, Math.floor(srcBal / transfer)); // Duration based on funds available

  for (let m = 1; m <= months; m++) {
    srcBal = (srcBal - transfer) * (1 + srcR);
    tgtBal = (tgtBal + transfer) * (1 + tgtR);
  }

  document.getElementById("stpFinalTgt").textContent =
    "₹" + formatNumber(Math.round(tgtBal));
  document.getElementById("stpFinalSrc").textContent =
    "₹" + formatNumber(Math.round(srcBal));
  document.getElementById("stpResult").classList.remove("hidden");
}
function loadMutualFundReturnCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Total Amount Invested (₹)</label>
                    <input type="text" id="mfInvested" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" oninput="handleNumberInput(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Current Market Value (₹)</label>
                    <input type="text" id="mfCurrent" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" oninput="handleNumberInput(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Investment Duration (Years)</label>
                    <input type="text" id="mfDuration" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g., 2.5">
                </div>
                <button onclick="calculateMF()" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold">Calculate CAGR</button>
            </div>
            <div id="mfResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white bg-indigo-700">
                    <span class="block text-sm opacity-80 mb-1" title="The annual compounded growth rate of your mutual fund investment.">Annualized Return (CAGR):</span>
                    <span class="text-4xl font-bold" id="mfCAGR">-</span>
                </div>
            </div>
        </div>
    `;
}

function calculateMF() {
  const P = parseFormattedNumber(document.getElementById("mfInvested").value);
  const V = parseFormattedNumber(document.getElementById("mfCurrent").value);
  const t = parseFloat(document.getElementById("mfDuration").value);

  if (!P || !V || !t) return;

  const cagr = (Math.pow(V / P, 1 / t) - 1) * 100;
  document.getElementById("mfCAGR").textContent = cagr.toFixed(2) + "%";
  document.getElementById("mfResult").classList.remove("hidden");
}
