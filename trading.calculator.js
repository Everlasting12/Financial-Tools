function loadOptionProfitCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Option Premium (₹)</label>
                    <input type="text" id="optPremium" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="Price per unit" oninput="handleNumberInput(event); clearError('optPremium')" onblur="formatInputNumber(event)">
                    <p id="optPremium-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Lot Size</label>
                    <input type="text" id="optLot" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" 
                           placeholder="e.g., 50 (Nifty)" oninput="handleNumberInput(event); clearError('optLot')">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Market Price at Expiry (₹)</label>
                    <input type="text" id="optExpiry" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" 
                           placeholder="Price at close" oninput="handleNumberInput(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Option Type</label>
                    <select id="optAction" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg bg-white">
                        <option value="buy">Buy (Long)</option>
                        <option value="sell">Sell (Short)</option>
                    </select>
                </div>
                <button onclick="calculateOptionPL()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">Calculate Profit/Loss</button>
            </div>
            <div id="optResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-indigo-600 to-blue-700">
                    <h3 class="text-lg font-semibold mb-4">Trade Summary</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="The final profit or loss amount for the total position.">Net P&L:</span>
                            <span class="text-4xl font-bold" id="optPL">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span title="The percentage return on the premium paid.">ROI (%):</span>
                            <span class="text-xl font-bold" id="optROI">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateOptionPL() {
  const premium =
    parseFormattedNumber(document.getElementById("optPremium").value) || 0;
  const lot =
    parseFormattedNumber(document.getElementById("optLot").value) || 0;
  const expiry =
    parseFormattedNumber(document.getElementById("optExpiry").value) || 0;
  const action = document.getElementById("optAction").value;

  if (premium <= 0 || lot <= 0) return;

  let pl = (expiry - premium) * lot;
  if (action === "sell") pl = -pl;

  const roi = (pl / (premium * lot)) * 100;

  document.getElementById("optPL").textContent =
    (pl >= 0 ? "+" : "") + "₹" + formatNumber(pl.toFixed(2));
  document.getElementById("optROI").textContent = roi.toFixed(2) + "%";
  document.getElementById("optResult").classList.remove("hidden");
}
function loadMarginCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Total Position Value (₹)</label>
                    <input type="text" id="marTotal" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" 
                           placeholder="Price * Quantity" oninput="handleNumberInput(event); clearError('marTotal')" onblur="formatInputNumber(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Margin Required (%)</label>
                    <input type="text" id="marPercent" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" 
                           placeholder="e.g., 20">
                </div>
                <button onclick="calculateMargin()" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold cursor-pointer">Calculate Required Funds</button>
            </div>
            <div id="marResult" class="hidden animate-fade-in">
                <div class="bg-gray-50 rounded-xl p-6 space-y-4 border border-gray-200">
                    <div class="flex justify-between">
                        <span class="text-gray-600" title="The actual cash you need to maintain in your account for this trade.">Required Cash:</span>
                        <span class="font-bold text-gray-900 text-xl" id="marCash">-</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600" title="The multiplier effect on your capital.">Leverage:</span>
                        <span class="font-bold text-indigo-600 text-xl" id="marLeverage">-</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateMargin() {
  const total =
    parseFormattedNumber(document.getElementById("marTotal").value) || 0;
  const percent =
    parseFormattedNumber(document.getElementById("marPercent").value) || 0;

  if (total <= 0 || percent <= 0) return;

  const cash = total * (percent / 100);
  const leverage = 100 / percent;

  document.getElementById("marCash").textContent =
    "₹" + formatNumber(cash.toFixed(2));
  document.getElementById("marLeverage").textContent =
    leverage.toFixed(1) + "x";
  document.getElementById("marResult").classList.remove("hidden");
}
function loadBrokerageCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="grid grid-cols-2 gap-4">
                    <div class="input-group">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Buy Price (₹)</label>
                        <input type="text" id="broBuy" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" oninput="handleNumberInput(event)">
                    </div>
                    <div class="input-group">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Sell Price (₹)</label>
                        <input type="text" id="broSell" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" oninput="handleNumberInput(event)">
                    </div>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                    <input type="text" id="broQty" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" oninput="handleNumberInput(event)">
                </div>
                <button onclick="calculateBrokerage()" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold cursor-pointer">Calculate Net P&L</button>
            </div>
            <div id="broResult" class="hidden animate-fade-in">
                <div class="bg-gray-50 rounded-xl p-6 space-y-3">
                    <div class="flex justify-between text-lg font-bold">
                        <span title="Profit or loss after deducting all charges.">Net Profit/Loss:</span>
                        <span id="broNetPL">-</span>
                    </div>
                    <hr>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600" title="Includes Brokerage, STT, Exchange Charges, and GST.">Total Tax & Charges:</span>
                        <span id="broCharges">-</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600" title="The price movement needed to cover costs.">Breakeven Price:</span>
                        <span id="broBreakeven">-</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateBrokerage() {
  const buy =
    parseFormattedNumber(document.getElementById("broBuy").value) || 0;
  const sell =
    parseFormattedNumber(document.getElementById("broSell").value) || 0;
  const qty =
    parseFormattedNumber(document.getElementById("broQty").value) || 0;

  const turnover = (buy + sell) * qty;
  // Approximation for Equity Intraday (Brokerage + STT + SEBI + GST)
  const charges = turnover * 0.0007;
  const grossPL = (sell - buy) * qty;
  const netPL = grossPL - charges;
  const breakeven = charges / qty + buy;

  document.getElementById("broNetPL").textContent =
    "₹" + formatNumber(netPL.toFixed(2));
  document.getElementById("broNetPL").className =
    netPL >= 0 ? "text-green-600" : "text-red-600";
  document.getElementById("broCharges").textContent =
    "₹" + formatNumber(charges.toFixed(2));
  document.getElementById("broBreakeven").textContent =
    "₹" + formatNumber(breakeven.toFixed(2));
  document.getElementById("broResult").classList.remove("hidden");
}
function loadStopLossCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Entry Price (₹)</label>
                    <input type="text" id="slEntry" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" oninput="handleNumberInput(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Risk Percentage (%)</label>
                    <input type="text" id="slRisk" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g., 2">
                </div>
                <button onclick="calculateStopLoss()" class="w-full bg-red-500 text-white py-3 rounded-lg font-semibold cursor-pointer">Calculate Stop Loss</button>
            </div>
            <div id="slResult" class="hidden animate-fade-in">
                <div class="bg-red-50 p-6 rounded-xl border border-red-200">
                    <span class="block text-sm text-red-600 mb-1" title="The price level where you should exit to limit losses.">Stop Loss Price:</span>
                    <span class="text-3xl font-bold text-red-700" id="slValue">-</span>
                </div>
            </div>
        </div>
    `;
}

function calculateStopLoss() {
  const entry =
    parseFormattedNumber(document.getElementById("slEntry").value) || 0;
  const risk =
    parseFormattedNumber(document.getElementById("slRisk").value) || 0;
  if (entry <= 0) return;
  const sl = entry * (1 - risk / 100);
  document.getElementById("slValue").textContent =
    "₹" + formatNumber(sl.toFixed(2));
  document.getElementById("slResult").classList.remove("hidden");
}

function loadTrailingStopCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Current Market Price (₹)</label>
                    <input type="text" id="tsLTP" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" oninput="handleNumberInput(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Trailing Gap (₹)</label>
                    <input type="text" id="tsGap" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Points below market price">
                </div>
                <button onclick="calculateTrailingStop()" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold cursor-pointer">Update Trailing SL</button>
            </div>
            <div id="tsResult" class="hidden animate-fade-in">
                <div class="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <span class="block text-sm text-blue-600 mb-1" title="The moving price level used to lock in profits.">New Trailing SL:</span>
                    <span class="text-3xl font-bold text-blue-700" id="tsValue">-</span>
                </div>
            </div>
        </div>
    `;
}

function calculateTrailingStop() {
  const ltp = parseFormattedNumber(document.getElementById("tsLTP").value) || 0;
  const gap = parseFormattedNumber(document.getElementById("tsGap").value) || 0;
  document.getElementById("tsValue").textContent =
    "₹" + formatNumber((ltp - gap).toFixed(2));
  document.getElementById("tsResult").classList.remove("hidden");
}

function loadFuturesPLCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="grid grid-cols-2 gap-4">
                    <div class="input-group">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Entry Price (₹)</label>
                        <input type="text" id="futEntry" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" oninput="handleNumberInput(event)">
                    </div>
                    <div class="input-group">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Exit Price (₹)</label>
                        <input type="text" id="futExit" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" oninput="handleNumberInput(event)">
                    </div>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Contract Lot Size</label>
                    <input type="text" id="futLot" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g., 25 (BankNifty)">
                </div>
                <button onclick="calculateFuturesPL()" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold cursor-pointer">Calculate P&L</button>
            </div>
            <div id="futResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white bg-gradient-to-r from-gray-700 to-gray-900">
                    <span class="block text-sm opacity-80 mb-1" title="The total gain or loss from the futures position.">Futures Net P&L:</span>
                    <span class="text-4xl font-bold" id="futValue">-</span>
                </div>
            </div>
        </div>
    `;
}

function calculateFuturesPL() {
  const entry =
    parseFormattedNumber(document.getElementById("futEntry").value) || 0;
  const exit =
    parseFormattedNumber(document.getElementById("futExit").value) || 0;
  const lot =
    parseFormattedNumber(document.getElementById("futLot").value) || 0;

  const pl = (exit - entry) * lot;

  document.getElementById("futValue").textContent =
    (pl >= 0 ? "+" : "") + "₹" + formatNumber(pl.toFixed(2));
  document.getElementById("futResult").classList.remove("hidden");
}
