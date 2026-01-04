function loadCurrencyCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The total amount of money in the source currency you wish to convert.">Amount to Convert</label>
                    <input type="text" id="curAmount" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 1,000" 
                           oninput="handleNumberInput(event); clearError('curAmount')" 
                           onblur="formatInputNumber(event)">
                    <p id="curAmount-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The current market price to exchange 1 unit of the base currency for the target currency.">Exchange Rate (1 From = X To)</label>
                    <input type="text" id="curRate" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 83.50" 
                           oninput="handleNumberInput(event); clearError('curRate')">
                    <p id="curRate-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateCurrency()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Convert Currency
                </button>
            </div>

            <div id="curResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-indigo-600 to-blue-700 shadow-xl">
                    <h3 class="text-lg font-semibold mb-4 border-b border-white border-opacity-20 pb-2">Conversion Summary</h3>
                    <div class="space-y-6">
                        <div>
                            <p class="text-indigo-100 text-xs uppercase tracking-wider mb-1" title="The total value after conversion.">Total Converted Amount</p>
                            <p class="text-4xl font-bold" id="curFinal">-</p>
                        </div>
                        
                        <div class="pt-4 border-t border-white border-opacity-10 grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-indigo-100 text-[10px] uppercase tracking-wider mb-1">Base Amount</p>
                                <p class="text-lg font-semibold" id="curBaseDisplay">-</p>
                            </div>
                            <div class="text-right">
                                <p class="text-indigo-100 text-[10px] uppercase tracking-wider mb-1">Applied Rate</p>
                                <p class="text-lg font-semibold" id="curRateDisplay">-</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-xl">
                    <p class="text-xs text-blue-800 leading-relaxed">
                        <strong>Note:</strong> Exchange rates fluctuate constantly. This calculation uses the rate provided and does not include bank margins or transaction fees.
                    </p>
                </div>
            </div>
        </div>
    `;
}

function calculateCurrency() {
  const amountInput = document.getElementById("curAmount");
  const rateInput = document.getElementById("curRate");

  const amount = parseFormattedNumber(amountInput.value);
  const rate = parseFormattedNumber(rateInput.value);

  let isValid = true;

  // Inline Validation
  if (!amount || amount <= 0) {
    showError("curAmount", "Please enter a valid amount to convert");
    isValid = false;
  }
  if (!rate || rate <= 0) {
    showError("curRate", "Please enter a valid exchange rate");
    isValid = false;
  }

  if (!isValid) return;

  const total = amount * rate;

  // Update Result UI
  document.getElementById("curFinal").textContent = formatNumber(
    total.toFixed(2)
  );
  document.getElementById("curBaseDisplay").textContent = formatNumber(
    amount.toFixed(2)
  );
  document.getElementById("curRateDisplay").textContent = rate.toFixed(4);

  document.getElementById("curResult").classList.remove("hidden");
}
function loadCryptoCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The total amount of the specific cryptocurrency you hold.">Quantity Owned</label>
                    <input type="text" id="cryQty" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                           placeholder="e.g., 0.005" 
                           oninput="handleNumberInput(event); clearError('cryQty')">
                    <p id="cryQty-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The price per unit at which you purchased the asset.">Buy Price (₹/$)</label>
                    <input type="text" id="cryBuy" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                           placeholder="e.g., 5500000" 
                           oninput="handleNumberInput(event); clearError('cryBuy')"
                           onblur="formatInputNumber(event)">
                    <p id="cryBuy-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The current market price or the price you plan to sell at.">Current/Sell Price (₹/$)</label>
                    <input type="text" id="crySell" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:orange-500 focus:border-transparent" 
                           placeholder="e.g., 6200000" 
                           oninput="handleNumberInput(event); clearError('crySell')"
                           onblur="formatInputNumber(event)">
                    <p id="crySell-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateCrypto()" class="w-full bg-gradient-to-r from-orange-500 to-yellow-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate Portfolio Value
                </button>
            </div>

            <div id="cryResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-500 shadow-xl">
                    <h3 class="text-lg font-semibold mb-4 border-b border-white border-opacity-10 pb-2">Portfolio Analysis</h3>
                    <div class="space-y-6">
                        <div>
                            <p class="text-gray-400 text-xs uppercase tracking-wider mb-1" title="The current market value of your total holdings.">Total Current Value</p>
                            <p class="text-4xl font-bold" id="cryTotalVal">-</p>
                        </div>
                        
                        <div class="pt-4 border-t border-white border-opacity-10">
                            <p class="text-gray-400 text-xs uppercase tracking-wider mb-1" title="Net profit or loss made on the investment.">Profit / Loss (ROI%)</p>
                            <p class="text-2xl font-bold" id="cryPL">-</p>
                        </div>
                    </div>
                </div>

                <div class="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-xl">
                    <p class="text-xs text-orange-800 leading-relaxed">
                        <strong>Note:</strong> Crypto markets are highly volatile. This calculation is based on the prices provided and does not include exchange fees or gas costs.
                    </p>
                </div>
            </div>
        </div>
    `;
}

function calculateCrypto() {
  const qtyInput = document.getElementById("cryQty");
  const buyInput = document.getElementById("cryBuy");
  const sellInput = document.getElementById("crySell");

  const qty = parseFormattedNumber(qtyInput.value);
  const buy = parseFormattedNumber(buyInput.value);
  const sell = parseFormattedNumber(sellInput.value);

  let isValid = true;

  // Inline Error Validation
  if (!qty || qty <= 0) {
    showError("cryQty", "Please enter a valid quantity owned");
    isValid = false;
  }
  if (!buy || buy <= 0) {
    showError("cryBuy", "Please enter a valid buy price");
    isValid = false;
  }
  if (!sell || sell <= 0) {
    showError("crySell", "Please enter a valid current/sell price");
    isValid = false;
  }

  if (!isValid) return;

  const totalVal = qty * sell;
  const pl = (sell - buy) * qty;
  const roi = (pl / (buy * qty)) * 100;

  // Update Result UI
  document.getElementById("cryTotalVal").textContent = formatNumber(
    totalVal.toFixed(2)
  );

  const plElement = document.getElementById("cryPL");
  plElement.textContent =
    (pl >= 0 ? "+" : "") +
    formatNumber(pl.toFixed(2)) +
    " (" +
    roi.toFixed(2) +
    "%)";

  // Dynamic Color Coding for P&L
  if (pl >= 0) {
    plElement.className = "text-2xl font-bold text-green-400";
  } else {
    plElement.className = "text-2xl font-bold text-red-400";
  }

  document.getElementById("cryResult").classList.remove("hidden");
}
function loadGoldCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The total weight of gold in grams.">Weight in Grams</label>
                    <input type="text" id="goldWeight" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" 
                           placeholder="e.g., 10.00" 
                           oninput="handleNumberInput(event); clearError('goldWeight')">
                    <p id="goldWeight-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Select the purity of your gold. 24K is 99.9% pure.">Gold Purity (Karat)</label>
                    <div class="relative">
                        <select id="goldPurity" 
                                class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-yellow-500 appearance-none cursor-pointer">
                            <option value="1">24K (99.9% Pure)</option>
                            <option value="0.916">22K (Standard Jewelry - 91.6%)</option>
                            <option value="0.75">18K (75.0%)</option>
                            <option value="0.585">14K (58.5%)</option>
                        </select>
                        <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The current market price for 1 gram of 24K (pure) gold.">Current 24K Rate (₹ per Gram)</label>
                    <input type="text" id="goldRate" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" 
                           placeholder="e.g., 7,500" 
                           oninput="handleNumberInput(event); clearError('goldRate')"
                           onblur="formatInputNumber(event)">
                    <p id="goldRate-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateGold()" class="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate Gold Value
                </button>
            </div>

            <div id="goldResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-yellow-600 to-yellow-800 border border-yellow-400 shadow-xl">
                    <h3 class="text-lg font-semibold mb-4 border-b border-white border-opacity-20 pb-2">Valuation Summary</h3>
                    <div class="space-y-6">
                        <div>
                            <p class="text-yellow-100 text-xs uppercase tracking-wider mb-1" title="Estimated value based on current 24K price adjusted for selected purity.">Total Metal Value</p>
                            <p class="text-4xl font-bold" id="goldFinalVal">-</p>
                        </div>
                        
                        <div class="pt-4 border-t border-white border-opacity-10 grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-yellow-100 text-[10px] uppercase tracking-wider mb-1">Effective Rate</p>
                                <p class="text-lg font-semibold" id="goldEffRate">-</p>
                            </div>
                            <div class="text-right">
                                <p class="text-yellow-100 text-[10px] uppercase tracking-wider mb-1">Purity Factor</p>
                                <p class="text-lg font-semibold" id="goldPurityDisplay">-</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
                    <p class="text-xs text-yellow-800 leading-relaxed italic">
                        <strong>Note:</strong> This calculation is for the raw gold value only. When buying jewelry, expect additional Making Charges (5%–20%) and GST (3%) on the final bill.
                    </p>
                </div>
            </div>
        </div>
    `;
}

function calculateGold() {
  const weightInput = document.getElementById("goldWeight");
  const rateInput = document.getElementById("goldRate");
  const purityFactor = parseFloat(document.getElementById("goldPurity").value);

  const weight = parseFormattedNumber(weightInput.value);
  const rate24k = parseFormattedNumber(rateInput.value);

  let isValid = true;

  // Validation
  if (!weight || weight <= 0) {
    showError("goldWeight", "Please enter valid weight in grams");
    isValid = false;
  }
  if (!rate24k || rate24k <= 0) {
    showError("goldRate", "Please enter current 24K gold rate");
    isValid = false;
  }

  if (!isValid) return;

  // Calculation
  const effectiveRate = rate24k * purityFactor;
  const totalValue = weight * effectiveRate;

  // Update Result UI
  document.getElementById("goldFinalVal").textContent =
    "₹" + formatNumber(totalValue.toFixed(2));
  document.getElementById("goldEffRate").textContent =
    "₹" + formatNumber(effectiveRate.toFixed(0)) + "/g";

  // Display Purity label based on value
  const purityText = document
    .getElementById("goldPurity")
    .options[document.getElementById("goldPurity").selectedIndex].text.split(
      " "
    )[0];
  document.getElementById("goldPurityDisplay").textContent = purityText;

  document.getElementById("goldResult").classList.remove("hidden");
}
function loadSilverCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The total weight of the silver you want to value.">Weight</label>
                    <div class="flex gap-2">
                        <div class="flex-grow">
                            <input type="text" id="silWeight" 
                                   class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
                                   placeholder="e.g., 500"
                                   oninput="handleNumberInput(event); clearError('silWeight')">
                        </div>
                        <div class="relative">
                            <select id="silUnit" 
                                    class="h-full px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-medium focus:ring-2 focus:ring-gray-500 cursor-pointer appearance-none pr-8">
                                <option value="g">Grams</option>
                                <option value="kg">KG</option>
                            </select>
                            <div class="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>
                    <p id="silWeight-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The current market price for 1 Kilogram of silver.">Current Silver Rate (₹ per KG)</label>
                    <input type="text" id="silRate" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
                           placeholder="e.g., 92,000" 
                           oninput="handleNumberInput(event); clearError('silRate')"
                           onblur="formatInputNumber(event)">
                    <p id="silRate-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateSilver()" class="w-full bg-gradient-to-r from-gray-500 to-gray-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate Silver Value
                </button>
            </div>

            <div id="silResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-gray-600 to-gray-800 border border-gray-400 shadow-xl">
                    <h3 class="text-lg font-semibold mb-4 border-b border-white border-opacity-10 pb-2 text-gray-100">Market Valuation</h3>
                    <div class="space-y-6">
                        <div>
                            <p class="text-gray-300 text-xs uppercase tracking-wider mb-1" title="Total value of the silver weight at current market rates.">Total Estimated Value</p>
                            <p class="text-4xl font-bold" id="silFinalVal">-</p>
                        </div>
                        
                        <div class="pt-4 border-t border-white border-opacity-10 grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-gray-300 text-[10px] uppercase tracking-wider mb-1">Calculated KG</p>
                                <p class="text-lg font-semibold text-gray-100" id="silKgDisplay">-</p>
                            </div>
                            <div class="text-right">
                                <p class="text-gray-300 text-[10px] uppercase tracking-wider mb-1">Applied Rate</p>
                                <p class="text-lg font-semibold text-gray-100" id="silRateDisplay">-</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-100 rounded-xl p-4 border border-gray-200 text-xs text-gray-600">
                    <p><strong>Note:</strong> Valuation is based on raw metal price. Retail purchases usually include GST (3%) and additional making charges.</p>
                </div>
            </div>
        </div>
    `;
}

function calculateSilver() {
  const weightInput = document.getElementById("silWeight");
  const rateInput = document.getElementById("silRate");
  const unit = document.getElementById("silUnit").value;

  const weight = parseFormattedNumber(weightInput.value);
  const ratePerKg = parseFormattedNumber(rateInput.value);

  let isValid = true;

  // Validation
  if (!weight || weight <= 0) {
    showError("silWeight", "Please enter a valid weight");
    isValid = false;
  }
  if (!ratePerKg || ratePerKg <= 0) {
    showError("silRate", "Please enter the current market rate per KG");
    isValid = false;
  }

  if (!isValid) return;

  // Calculation Logic
  let totalKg = unit === "kg" ? weight : weight / 1000;
  const value = totalKg * ratePerKg;

  // Update Result UI
  document.getElementById("silFinalVal").textContent =
    "₹" + formatNumber(value.toFixed(2));
  document.getElementById("silKgDisplay").textContent =
    totalKg.toFixed(3) + " KG";
  document.getElementById("silRateDisplay").textContent =
    "₹" + formatNumber(ratePerKg.toFixed(0));

  document.getElementById("silResult").classList.remove("hidden");
}
