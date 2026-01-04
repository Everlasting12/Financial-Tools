function loadCurrencyCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Amount to Convert</label>
                    <input type="text" id="curAmount" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 100" oninput="handleNumberInput(event); clearError('curAmount')" onblur="formatInputNumber(event)">
                    <p id="curAmount-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Exchange Rate (1 Unit of From = X Units of To)</label>
                    <input type="text" id="curRate" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 83.50" oninput="handleNumberInput(event); clearError('curRate')">
                    <p id="curRate-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <button onclick="calculateCurrency()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">Convert Currency</button>
            </div>
            <div id="curResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-indigo-500 to-blue-600">
                    <h3 class="text-lg font-semibold mb-4">Conversion Result</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="The final value in the destination currency.">Converted Total:</span>
                            <span class="text-4xl font-bold" id="curFinal">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateCurrency() {
  const amount = parseFormattedNumber(
    document.getElementById("curAmount").value
  );
  const rate = parseFormattedNumber(document.getElementById("curRate").value);

  let valid = true;
  if (!amount || amount <= 0) {
    showError("curAmount", "Enter valid amount");
    valid = false;
  }
  if (!rate || rate <= 0) {
    showError("curRate", "Enter valid rate");
    valid = false;
  }
  if (!valid) return;

  const total = amount * rate;
  document.getElementById("curFinal").textContent = formatNumber(
    total.toFixed(2)
  );
  document.getElementById("curResult").classList.remove("hidden");
}
function loadCryptoCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Quantity Owned</label>
                    <input type="text" id="cryQty" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" 
                           placeholder="e.g., 0.5" oninput="handleNumberInput(event); clearError('cryQty')">
                    <p id="cryQty-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Buy Price (₹/$)</label>
                    <input type="text" id="cryBuy" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" 
                           placeholder="Price at which you bought" oninput="handleNumberInput(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Current/Sell Price (₹/$)</label>
                    <input type="text" id="crySell" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" 
                           placeholder="Current market price" oninput="handleNumberInput(event)">
                </div>
                <button onclick="calculateCrypto()" class="w-full bg-gradient-to-r from-orange-500 to-yellow-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">Calculate Crypto Value</button>
            </div>
            <div id="cryResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-500">
                    <h3 class="text-lg font-semibold mb-4">Portfolio Analysis</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="The current market value of your total holdings.">Total Current Value:</span>
                            <span class="text-4xl font-bold" id="cryTotalVal">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span title="Net profit or loss made on the investment.">Profit / Loss:</span>
                            <span class="text-xl font-bold" id="cryPL">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateCrypto() {
  const qty = parseFormattedNumber(document.getElementById("cryQty").value);
  const buy =
    parseFormattedNumber(document.getElementById("cryBuy").value) || 0;
  const sell =
    parseFormattedNumber(document.getElementById("crySell").value) || 0;

  if (!qty || qty <= 0) return;

  const totalVal = qty * sell;
  const pl = (sell - buy) * qty;
  const roi = buy > 0 ? (pl / (buy * qty)) * 100 : 0;

  document.getElementById("cryTotalVal").textContent = formatNumber(
    totalVal.toFixed(2)
  );
  document.getElementById("cryPL").textContent =
    (pl >= 0 ? "+" : "") +
    formatNumber(pl.toFixed(2)) +
    " (" +
    roi.toFixed(2) +
    "%)";
  document.getElementById("cryPL").className =
    pl >= 0 ? "text-green-400 font-bold" : "text-red-400 font-bold";
  document.getElementById("cryResult").classList.remove("hidden");
}
function loadGoldCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Weight in Grams</label>
                    <input type="text" id="goldWeight" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" 
                           placeholder="e.g., 10" oninput="handleNumberInput(event); clearError('goldWeight')">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Gold Purity (Karat)</label>
                    <select id="goldPurity" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg bg-white">
                        <option value="1">24K (Pure Gold)</option>
                        <option value="0.916">22K (Standard Jewelry)</option>
                        <option value="0.75">18K</option>
                        <option value="0.585">14K</option>
                    </select>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Current 24K Rate (₹ per Gram)</label>
                    <input type="text" id="goldRate" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" 
                           placeholder="e.g., 7200" oninput="handleNumberInput(event)">
                </div>
                <button onclick="calculateGold()" class="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">Calculate Gold Value</button>
            </div>
            <div id="goldResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-yellow-600 to-yellow-800">
                    <h3 class="text-lg font-semibold mb-4">Gold Value Result</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="Estimated value based on current 24K price adjusted for purity.">Total Metal Value:</span>
                            <span class="text-4xl font-bold" id="goldFinalVal">-</span>
                        </div>
                    </div>
                </div>
                <p class="text-xs text-gray-500 italic">Note: Making charges and GST (usually 3%) are not included.</p>
            </div>
        </div>
    `;
}

function calculateGold() {
  const weight = parseFormattedNumber(
    document.getElementById("goldWeight").value
  );
  const purity = parseFloat(document.getElementById("goldPurity").value);
  const rate = parseFormattedNumber(document.getElementById("goldRate").value);

  if (!weight || !rate) return;

  const value = weight * rate * purity;
  document.getElementById("goldFinalVal").textContent =
    "₹" + formatNumber(value.toFixed(2));
  document.getElementById("goldResult").classList.remove("hidden");
}
function loadSilverCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                    <div class="flex gap-2">
                        <input type="text" id="silWeight" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g., 500">
                        <select id="silUnit" class="border rounded-lg px-2 bg-gray-50">
                            <option value="g">Grams</option>
                            <option value="kg">KG</option>
                        </select>
                    </div>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Current Silver Rate (₹ per KG)</label>
                    <input type="text" id="silRate" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" 
                           placeholder="e.g., 90000" oninput="handleNumberInput(event)">
                </div>
                <button onclick="calculateSilver()" class="w-full bg-gradient-to-r from-gray-400 to-gray-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">Calculate Silver Value</button>
            </div>
            <div id="silResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-gray-500 to-gray-700">
                    <h3 class="text-lg font-semibold mb-4">Silver Value Result</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="Total value of the silver weight at current market rates.">Total Value:</span>
                            <span class="text-4xl font-bold" id="silFinalVal">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateSilver() {
  const weight = parseFormattedNumber(
    document.getElementById("silWeight").value
  );
  const unit = document.getElementById("silUnit").value;
  const ratePerKg = parseFormattedNumber(
    document.getElementById("silRate").value
  );

  if (!weight || !ratePerKg) return;

  let totalKg = unit === "kg" ? weight : weight / 1000;
  const value = totalKg * ratePerKg;

  document.getElementById("silFinalVal").textContent =
    "₹" + formatNumber(value.toFixed(2));
  document.getElementById("silResult").classList.remove("hidden");
}
