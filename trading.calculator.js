function loadOptionProfitCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The price paid (for buy) or received (for sell) per unit of the option.">Option Premium (₹)</label>
                    <input type="text" id="optPremium" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="Price per unit" oninput="handleNumberInput(event); clearError('optPremium')" onblur="formatInputNumber(event)">
                    <p id="optPremium-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The number of units in one contract (e.g., 50 for Nifty, 15 for Bank Nifty).">Lot Size</label>
                    <input type="text" id="optLot" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 50" oninput="handleNumberInput(event); clearError('optLot')">
                    <p id="optLot-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The price of the underlying asset at the time of option expiry or exit.">Market Price at Expiry (₹)</label>
                    <input type="text" id="optExpiry" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="Price at close" oninput="handleNumberInput(event); clearError('optExpiry')" onblur="formatInputNumber(event)">
                    <p id="optExpiry-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Option Action</label>
                    <select id="optAction" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500">
                        <option value="buy">Buy (Long Option)</option>
                        <option value="sell">Sell (Short Option)</option>
                    </select>
                </div>

                <button onclick="calculateOptionPL()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate Profit/Loss
                </button>
            </div>

            <div id="optResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-indigo-600 to-blue-700 shadow-lg">
                    <h3 class="text-lg font-semibold mb-4 border-b border-white border-opacity-20 pb-2">Trade Summary</h3>
                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <span title="Net gain or loss after comparing entry premium with expiry value.">Net P&L:</span>
                            <span class="text-4xl font-bold" id="optPL">-</span>
                        </div>
                        <div class="flex justify-between items-center pt-2">
                            <span title="Return on Investment based on the premium deployed.">ROI (%):</span>
                            <span class="text-xl font-bold" id="optROI">-</span>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-500">Total Premium:</span>
                        <span class="font-semibold text-gray-700" id="optTotalPremiumLabel">₹0</span>
                    </div>
                    <div class="flex justify-between text-sm mt-2">
                        <span class="text-gray-500">Status:</span>
                        <span class="font-bold" id="optStatusLabel">-</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateOptionPL() {
  const premiumInput = document.getElementById("optPremium");
  const lotInput = document.getElementById("optLot");
  const expiryInput = document.getElementById("optExpiry");

  const premium = parseFormattedNumber(premiumInput.value);
  const lot = parseFormattedNumber(lotInput.value);
  const expiry = parseFormattedNumber(expiryInput.value);
  const action = document.getElementById("optAction").value;

  let isValid = true;

  // Validation
  if (!premium || premium <= 0) {
    showError("optPremium", "Please enter a valid premium price");
    isValid = false;
  }
  if (!lot || lot <= 0) {
    showError("optLot", "Please enter a valid lot size");
    isValid = false;
  }
  if (expiryInput.value.trim() === "" || isNaN(expiry) || expiry < 0) {
    showError("optExpiry", "Please enter a valid expiry price");
    isValid = false;
  }

  if (!isValid) return;

  // Logic: P&L = (Exit Price - Entry Price) * Quantity
  // For Buying: Profit if Expiry > Premium
  // For Selling: Profit if Expiry < Premium (Inverse)
  let pl = (expiry - premium) * lot;
  if (action === "sell") {
    pl = -pl;
  }

  const totalPremiumDealt = premium * lot;
  const roi = (pl / totalPremiumDealt) * 100;

  // Update UI
  const plElement = document.getElementById("optPL");
  const statusElement = document.getElementById("optStatusLabel");

  plElement.textContent =
    (pl >= 0 ? "+" : "") + "₹" + formatNumber(pl.toFixed(2));
  document.getElementById("optROI").textContent = roi.toFixed(2) + "%";
  document.getElementById("optTotalPremiumLabel").textContent =
    "₹" + formatNumber(totalPremiumDealt.toFixed(2));

  if (pl >= 0) {
    plElement.className = "text-4xl font-bold text-green-400";
    statusElement.textContent = "PROFIT";
    statusElement.className = "font-bold text-green-600";
  } else {
    plElement.className = "text-4xl font-bold text-red-400";
    statusElement.textContent = "LOSS";
    statusElement.className = "font-bold text-red-600";
  }

  document.getElementById("optResult").classList.remove("hidden");
}
function loadMarginCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The total market value of the shares or contracts you want to trade (Price × Quantity).">Total Position Value (₹)</label>
                    <input type="text" id="marTotal" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 5,00,000" 
                           oninput="handleNumberInput(event); clearError('marTotal')" 
                           onblur="formatInputNumber(event)">
                    <p id="marTotal-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The percentage of the total position value required by the broker as a deposit.">Margin Required (%)</label>
                    <input type="text" id="marPercent" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 20"
                           oninput="handleNumberInput(event); clearError('marPercent')">
                    <p id="marPercent-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateMargin()" 
                        class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate Required Funds
                </button>
            </div>

            <div id="marResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-xl">
                    <h3 class="text-lg font-semibold mb-4 border-b border-white border-opacity-10 pb-2">Margin Summary</h3>
                    <div class="space-y-6">
                        <div class="flex justify-between items-end">
                            <div>
                                <p class="text-slate-400 text-xs uppercase tracking-wider mb-1" title="The actual cash you need to maintain in your account for this trade.">Required Cash</p>
                                <p class="text-3xl font-bold text-green-400" id="marCash">-</p>
                            </div>
                            <div class="text-right">
                                <p class="text-slate-400 text-xs uppercase tracking-wider mb-1" title="The multiplier effect on your capital. Higher leverage increases both potential profit and potential loss.">Leverage</p>
                                <p class="text-3xl font-bold text-indigo-400" id="marLeverage">-</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-xl">
                    <div class="flex">
                        <div class="ml-3">
                            <p class="text-sm text-blue-700">
                                <strong>Trading Note:</strong> Leverage allows you to control a large position with a small amount of capital. However, it significantly increases your risk exposure.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateMargin() {
  const totalInput = document.getElementById("marTotal");
  const percentInput = document.getElementById("marPercent");

  const total = parseFormattedNumber(totalInput.value);
  const percent = parseFormattedNumber(percentInput.value);

  let isValid = true;

  // Inline Error Handling
  if (totalInput.value.trim() === "" || isNaN(total) || total <= 0) {
    showError("marTotal", "Please enter a valid position value");
    isValid = false;
  }

  if (
    percentInput.value.trim() === "" ||
    isNaN(percent) ||
    percent <= 0 ||
    percent > 100
  ) {
    showError("marPercent", "Please enter a valid margin percentage (1-100)");
    isValid = false;
  }

  if (!isValid) return;

  const cash = total * (percent / 100);
  const leverage = 100 / percent;

  // Update Result Card
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
                        <label class="block text-sm font-medium text-gray-700 mb-2" title="The price at which you bought the shares.">Buy Price (₹)</label>
                        <input type="text" id="broBuy" 
                               class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                               placeholder="e.g., 1550.50"
                               oninput="handleNumberInput(event); clearError('broBuy')"
                               onblur="formatInputNumber(event)">
                        <p id="broBuy-error" class="hidden text-red-500 text-sm mt-1"></p>
                    </div>
                    <div class="input-group">
                        <label class="block text-sm font-medium text-gray-700 mb-2" title="The price at which you sold the shares.">Sell Price (₹)</label>
                        <input type="text" id="broSell" 
                               class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                               placeholder="e.g., 1580.00"
                               oninput="handleNumberInput(event); clearError('broSell')"
                               onblur="formatInputNumber(event)">
                        <p id="broSell-error" class="hidden text-red-500 text-sm mt-1"></p>
                    </div>
                </div>
                
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Total number of shares traded.">Quantity</label>
                    <input type="text" id="broQty" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 100"
                           oninput="handleNumberInput(event); clearError('broQty')">
                    <p id="broQty-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                
                <button onclick="calculateBrokerage()" class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate Net P&L
                </button>
            </div>

            <div id="broResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-xl">
                    <h3 class="text-lg font-semibold mb-4 border-b border-white border-opacity-10 pb-2">Trade Summary</h3>
                    <div class="space-y-6">
                        <div>
                            <p class="text-slate-400 text-xs uppercase tracking-wider mb-1" title="Profit or loss after deducting all charges.">Net Profit/Loss</p>
                            <p class="text-4xl font-bold" id="broNetPL">-</p>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4 pt-4 border-t border-white border-opacity-10">
                            <div>
                                <p class="text-slate-400 text-[10px] uppercase tracking-wider mb-1" title="Includes Brokerage, STT, Exchange Charges, and GST.">Total Charges</p>
                                <p class="text-lg font-semibold text-red-400" id="broCharges">-</p>
                            </div>
                            <div class="text-right">
                                <p class="text-slate-400 text-[10px] uppercase tracking-wider mb-1" title="The sell price needed just to cover your costs (Zero profit/loss).">Breakeven</p>
                                <p class="text-lg font-semibold text-blue-400" id="broBreakeven">-</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200 text-xs text-gray-500">
                    <p>* Charges are estimated for Equity Intraday trades including STT, GST, and SEBI charges.</p>
                </div>
            </div>
        </div>
    `;
}

function calculateBrokerage() {
  const buyInput = document.getElementById("broBuy");
  const sellInput = document.getElementById("broSell");
  const qtyInput = document.getElementById("broQty");

  const buy = parseFormattedNumber(buyInput.value);
  const sell = parseFormattedNumber(sellInput.value);
  const qty = parseFormattedNumber(qtyInput.value);

  let isValid = true;

  // Inline Error Handling
  if (!buy || buy <= 0) {
    showError("broBuy", "Enter valid buy price");
    isValid = false;
  }
  if (!sell || sell <= 0) {
    showError("broSell", "Enter valid sell price");
    isValid = false;
  }
  if (!qty || qty <= 0) {
    showError("broQty", "Enter valid quantity");
    isValid = false;
  }

  if (!isValid) return;

  const turnover = (buy + sell) * qty;
  // 0.07% approximate cumulative charge for Intraday (Brokerage + Taxes)
  const charges = turnover * 0.0007;
  const grossPL = (sell - buy) * qty;
  const netPL = grossPL - charges;
  const breakeven = charges / qty + buy;

  // Update Results
  const plElement = document.getElementById("broNetPL");
  plElement.textContent =
    (netPL >= 0 ? "+" : "") + "₹" + formatNumber(netPL.toFixed(2));
  plElement.className =
    "text-4xl font-bold " + (netPL >= 0 ? "text-green-400" : "text-red-400");

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
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The price at which you bought (for Long) or sold (for Short) the asset.">Entry Price (₹)</label>
                    <input type="text" id="slEntry" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 1450.00"
                           oninput="handleNumberInput(event); clearError('slEntry')"
                           onblur="formatInputNumber(event)">
                    <p id="slEntry-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The percentage of the entry price you are willing to lose before exiting the trade.">Risk Percentage (%)</label>
                    <input type="text" id="slRisk" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 2"
                           oninput="handleNumberInput(event); clearError('slRisk')">
                    <p id="slRisk-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Trade Direction</label>
                    <select id="slDirection" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500">
                        <option value="long">Long (Buy)</option>
                        <option value="short">Short (Sell)</option>
                    </select>
                </div>

                <button onclick="calculateStopLoss()" class="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate Stop Loss
                </button>
            </div>

            <div id="slResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4 border-b border-white border-opacity-10 pb-2">Safety Exit Level</h3>
                    <div class="space-y-6">
                        <div>
                            <p class="text-red-100 text-xs uppercase tracking-wider mb-1" title="The price level where you should exit to limit losses.">Stop Loss Price</p>
                            <p class="text-4xl font-bold" id="slValue">-</p>
                        </div>
                        
                        <div class="pt-4 border-t border-white border-opacity-10">
                            <p class="text-red-100 text-[10px] uppercase tracking-wider mb-1">Amount at Risk per Share</p>
                            <p class="text-lg font-semibold" id="slPoints">-</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200 text-xs text-gray-600">
                    <p><strong>Note:</strong> A stop loss helps you manage risk by ensuring you exit a losing trade before it erodes your capital significantly.</p>
                </div>
            </div>
        </div>
    `;
}

function calculateStopLoss() {
  const entryInput = document.getElementById("slEntry");
  const riskInput = document.getElementById("slRisk");
  const direction = document.getElementById("slDirection").value;

  const entry = parseFormattedNumber(entryInput.value);
  const risk = parseFormattedNumber(riskInput.value);

  let isValid = true;

  // Inline Error Handling
  if (!entry || entry <= 0) {
    showError("slEntry", "Please enter a valid entry price");
    isValid = false;
  }
  if (!risk || risk <= 0 || risk >= 100) {
    showError("slRisk", "Enter a valid risk percentage (e.g., 1-99)");
    isValid = false;
  }

  if (!isValid) return;

  let sl;
  let riskPoints;

  if (direction === "long") {
    // Stop loss for Long is below entry
    riskPoints = entry * (risk / 100);
    sl = entry - riskPoints;
  } else {
    // Stop loss for Short is above entry
    riskPoints = entry * (risk / 100);
    sl = entry + riskPoints;
  }

  // Update Results
  document.getElementById("slValue").textContent =
    "₹" + formatNumber(sl.toFixed(2));
  document.getElementById("slPoints").textContent =
    "₹" + formatNumber(riskPoints.toFixed(2));

  document.getElementById("slResult").classList.remove("hidden");
}

function loadTrailingStopCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The current Last Traded Price (LTP) of the stock.">Current Market Price (₹)</label>
                    <input type="text" id="tsLTP" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 1580.45"
                           oninput="handleNumberInput(event); clearError('tsLTP')"
                           onblur="formatInputNumber(event)">
                    <p id="tsLTP-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The fixed distance (in points) you want to maintain between the current price and your stop loss.">Trailing Gap (₹ Points)</label>
                    <input type="text" id="tsGap" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 15"
                           oninput="handleNumberInput(event); clearError('tsGap')">
                    <p id="tsGap-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Trade Direction</label>
                    <select id="tsDirection" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500">
                        <option value="long">Long (Buy)</option>
                        <option value="short">Short (Sell)</option>
                    </select>
                </div>

                <button onclick="calculateTrailingStop()" class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Update Trailing SL
                </button>
            </div>

            <div id="tsResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-blue-700 to-indigo-800 border border-blue-500 shadow-xl">
                    <h3 class="text-lg font-semibold mb-4 border-b border-white border-opacity-10 pb-2">Updated Exit Level</h3>
                    <div class="space-y-6">
                        <div>
                            <p class="text-blue-100 text-xs uppercase tracking-wider mb-1" title="The moving price level used to lock in profits.">New Trailing SL</p>
                            <p class="text-4xl font-bold" id="tsValue">-</p>
                        </div>
                        
                        <div class="pt-4 border-t border-white border-opacity-10">
                            <p class="text-blue-100 text-[10px] uppercase tracking-wider mb-1">Current Maintenance Gap</p>
                            <p class="text-lg font-semibold" id="tsGapDisplay">-</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-xl">
                    <p class="text-xs text-blue-800 leading-relaxed">
                        <strong>Pro Tip:</strong> As the Market Price moves in your favor, recalculate this to move your SL higher (for Long) or lower (for Short) to protect your paper profits.
                    </p>
                </div>
            </div>
        </div>
    `;
}

function calculateTrailingStop() {
  const ltpInput = document.getElementById("tsLTP");
  const gapInput = document.getElementById("tsGap");
  const direction = document.getElementById("tsDirection").value;

  const ltp = parseFormattedNumber(ltpInput.value);
  const gap = parseFormattedNumber(gapInput.value);

  let isValid = true;

  // Inline Error Handling
  if (!ltp || ltp <= 0) {
    showError("tsLTP", "Please enter a valid market price");
    isValid = false;
  }
  if (!gap || gap <= 0) {
    showError("tsGap", "Please enter a valid trailing gap");
    isValid = false;
  } else if (gap >= ltp && direction === "long") {
    showError("tsGap", "Gap cannot be greater than the market price");
    isValid = false;
  }

  if (!isValid) return;

  let trailingSL;
  if (direction === "long") {
    // For Long: SL trails below the price
    trailingSL = ltp - gap;
  } else {
    // For Short: SL trails above the price
    trailingSL = ltp + gap;
  }

  // Update Results
  document.getElementById("tsValue").textContent =
    "₹" + formatNumber(trailingSL.toFixed(2));
  document.getElementById("tsGapDisplay").textContent =
    "₹" + formatNumber(gap.toFixed(2));

  document.getElementById("tsResult").classList.remove("hidden");
}

function loadFuturesPLCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="grid grid-cols-2 gap-4">
                    <div class="input-group">
                        <label class="block text-sm font-medium text-gray-700 mb-2" title="The price at which the futures contract was entered.">Entry Price (₹)</label>
                        <input type="text" id="futEntry" 
                               class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                               placeholder="e.g., 24200.50"
                               oninput="handleNumberInput(event); clearError('futEntry')"
                               onblur="formatInputNumber(event)">
                        <p id="futEntry-error" class="hidden text-red-500 text-sm mt-1"></p>
                    </div>
                    <div class="input-group">
                        <label class="block text-sm font-medium text-gray-700 mb-2" title="The price at which the futures contract was exited or current market price.">Exit Price (₹)</label>
                        <input type="text" id="futExit" 
                               class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                               placeholder="e.g., 24350.00"
                               oninput="handleNumberInput(event); clearError('futExit')"
                               onblur="formatInputNumber(event)">
                        <p id="futExit-error" class="hidden text-red-500 text-sm mt-1"></p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="input-group">
                        <label class="block text-sm font-medium text-gray-700 mb-2" title="The number of units in one contract (e.g., 25 for BankNifty, 50 for Nifty).">Lot Size</label>
                        <input type="text" id="futLot" 
                               class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                               placeholder="e.g., 25"
                               oninput="handleNumberInput(event); clearError('futLot')">
                        <p id="futLot-error" class="hidden text-red-500 text-sm mt-1"></p>
                    </div>
                    <div class="input-group">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Direction</label>
                        <select id="futDirection" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500">
                            <option value="buy">Buy (Long)</option>
                            <option value="sell">Sell (Short)</option>
                        </select>
                    </div>
                </div>

                <button onclick="calculateFuturesPL()" class="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate P&L
                </button>
            </div>

            <div id="futResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-xl">
                    <h3 class="text-lg font-semibold mb-4 border-b border-white border-opacity-10 pb-2">Futures Summary</h3>
                    <div class="space-y-6">
                        <div>
                            <p class="text-slate-400 text-xs uppercase tracking-wider mb-1" title="The total gain or loss from the futures position.">Futures Net P&L</p>
                            <p class="text-4xl font-bold" id="futValue">-</p>
                        </div>
                        
                        <div class="pt-4 border-t border-white border-opacity-10 grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-slate-400 text-[10px] uppercase tracking-wider mb-1">Price Movement</p>
                                <p class="text-lg font-semibold" id="futPoints">-</p>
                            </div>
                            <div class="text-right">
                                <p class="text-slate-400 text-[10px] uppercase tracking-wider mb-1">Total Multiplier</p>
                                <p class="text-lg font-semibold" id="futMultiplier">-</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200 text-xs text-gray-600">
                    <p><strong>Note:</strong> This is a gross P&L calculation. Real-world trading will include taxes (STT), exchange charges, and brokerage.</p>
                </div>
            </div>
        </div>
    `;
}

function calculateFuturesPL() {
  const entryInput = document.getElementById("futEntry");
  const exitInput = document.getElementById("futExit");
  const lotInput = document.getElementById("futLot");
  const direction = document.getElementById("futDirection").value;

  const entry = parseFormattedNumber(entryInput.value);
  const exit = parseFormattedNumber(exitInput.value);
  const lot = parseFormattedNumber(lotInput.value);

  let isValid = true;

  // Validation logic
  if (!entry || entry <= 0) {
    showError("futEntry", "Please enter a valid entry price");
    isValid = false;
  }
  if (!exit || exit <= 0) {
    showError("futExit", "Please enter a valid exit price");
    isValid = false;
  }
  if (!lot || lot <= 0) {
    showError("futLot", "Please enter a valid lot size");
    isValid = false;
  }

  if (!isValid) return;

  let pl;
  let points;

  if (direction === "buy") {
    points = exit - entry;
  } else {
    points = entry - exit;
  }

  pl = points * lot;

  // Update Result UI
  const futValueEl = document.getElementById("futValue");
  futValueEl.textContent =
    (pl >= 0 ? "+" : "") + "₹" + formatNumber(pl.toFixed(2));

  // Dynamic coloring based on profit/loss
  if (pl >= 0) {
    futValueEl.className = "text-4xl font-bold text-green-400";
  } else {
    futValueEl.className = "text-4xl font-bold text-red-400";
  }

  document.getElementById("futPoints").textContent =
    (points >= 0 ? "+" : "") + points.toFixed(2) + " pts";
  document.getElementById("futMultiplier").textContent =
    lot.toLocaleString() + " Units";

  document.getElementById("futResult").classList.remove("hidden");
}
