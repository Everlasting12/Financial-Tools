function loadInflationCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Current Amount (₹)</label>
                    <input type="text" id="infAmount" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 1,00,000" oninput="handleNumberInput(event); clearError('infAmount')" onblur="formatInputNumber(event)">
                    <p id="infAmount-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Inflation Rate (%)</label>
                    <input type="text" id="infRate" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 6" oninput="handleNumberInput(event); clearError('infRate')" onblur="formatInputNumber(event)">
                    <p id="infRate-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Time Period (Years)</label>
                    <input type="text" id="infYears" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 10" oninput="handleNumberInput(event); clearError('infYears')" onblur="formatInputNumber(event)">
                    <p id="infYears-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <button onclick="calculateInflation()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">Calculate Impact</button>
            </div>
            <div id="infResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">Future Cost Analysis</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="What the current amount will be worth in terms of purchasing power after the given years.">Future Value:</span>
                            <span class="text-4xl font-bold" id="infFutureVal">-</span>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 rounded-xl p-6 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-600" title="The extra amount you need to pay for the same item due to price rises.">Additional Cost:</span>
                        <span class="font-medium text-gray-900" id="infExtra">-</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateInflation() {
  const amount = parseFormattedNumber(
    document.getElementById("infAmount").value
  );
  const rate = parseFormattedNumber(document.getElementById("infRate").value);
  const years = parseFormattedNumber(document.getElementById("infYears").value);

  let valid = true;
  if (!amount || amount <= 0) {
    showError("infAmount", "Enter valid amount");
    valid = false;
  }
  if (!rate || rate < 0) {
    showError("infRate", "Enter valid rate");
    valid = false;
  }
  if (!years || years <= 0) {
    showError("infYears", "Enter valid years");
    valid = false;
  }
  if (!valid) return;

  const futureValue = amount * Math.pow(1 + rate / 100, years);
  const extra = futureValue - amount;

  document.getElementById("infFutureVal").textContent =
    "₹" + formatNumber(futureValue.toFixed(2));
  document.getElementById("infExtra").textContent =
    "₹" + formatNumber(extra.toFixed(2));
  document.getElementById("infResult").classList.remove("hidden");
}
function loadFutureValueCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Initial Investment (₹)</label>
                    <input type="text" id="fvPrincipal" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 5,00,000" oninput="handleNumberInput(event); clearError('fvPrincipal')" onblur="formatInputNumber(event)">
                    <p id="fvPrincipal-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Expected Return (%)</label>
                    <input type="text" id="fvRate" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 12" oninput="handleNumberInput(event); clearError('fvRate')" onblur="formatInputNumber(event)">
                    <p id="fvRate-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Duration (Years)</label>
                    <input type="text" id="fvYears" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 15" oninput="handleNumberInput(event); clearError('fvYears')" onblur="formatInputNumber(event)">
                    <p id="fvYears-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <button onclick="calculateFV()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">Calculate Future Value</button>
            </div>
            <div id="fvResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">Investment Maturity</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="The total amount your investment will grow to after the specified period.">Total Maturity Value:</span>
                            <span class="text-4xl font-bold" id="fvFinal">-</span>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 rounded-xl p-6 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-600" title="The total profit or wealth generated on top of your principal.">Wealth Gained:</span>
                        <span class="font-medium text-gray-900" id="fvWealth">-</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateFV() {
  const principal = parseFormattedNumber(
    document.getElementById("fvPrincipal").value
  );
  const rate = parseFormattedNumber(document.getElementById("fvRate").value);
  const years = parseFormattedNumber(document.getElementById("fvYears").value);

  let valid = true;
  if (!principal || principal <= 0) {
    showError("fvPrincipal", "Enter valid amount");
    valid = false;
  }
  if (!rate || rate <= 0) {
    showError("fvRate", "Enter valid rate");
    valid = false;
  }
  if (!years || years <= 0) {
    showError("fvYears", "Enter valid duration");
    valid = false;
  }
  if (!valid) return;

  const maturityValue = principal * Math.pow(1 + rate / 100, years);
  const wealth = maturityValue - principal;

  document.getElementById("fvFinal").textContent =
    "₹" + formatNumber(maturityValue.toFixed(2));
  document.getElementById("fvWealth").textContent =
    "₹" + formatNumber(wealth.toFixed(2));
  document.getElementById("fvResult").classList.remove("hidden");
}
function loadRealReturnCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The interest rate before taking inflation into account.">Nominal Return Rate (%)</label>
                    <input type="text" id="rrNominal" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 10 (Bank/MF Return)" oninput="handleNumberInput(event); clearError('rrNominal')" onblur="formatInputNumber(event)">
                    <p id="rrNominal-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The rate at which the general level of prices for goods and services is rising.">Inflation Rate (%)</label>
                    <input type="text" id="rrInflation" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 6" oninput="handleNumberInput(event); clearError('rrInflation')" onblur="formatInputNumber(event)">
                    <p id="rrInflation-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateRealReturn()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate Real Rate
                </button>
            </div>

            <div id="rrResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-indigo-600 to-purple-700 shadow-lg">
                    <h3 class="text-lg font-semibold mb-4 border-b border-white border-opacity-20 pb-2">Adjusted Return</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3">
                            <span title="The true growth rate of your money, adjusted for price increases.">Real Rate of Return:</span>
                            <span class="text-4xl font-bold" id="rrFinal">-</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-xl">
                    <div class="flex">
                        <div class="ml-3">
                            <p class="text-sm text-blue-700">
                                This reflects the <strong>actual growth</strong> in your purchasing power. If this number is negative, your money is losing value despite the nominal gains.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateRealReturn() {
  const nominalInput = document.getElementById("rrNominal");
  const inflationInput = document.getElementById("rrInflation");

  const nominal = parseFormattedNumber(nominalInput.value);
  const inflation = parseFormattedNumber(inflationInput.value);

  let isValid = true;

  // Validation
  if (nominalInput.value.trim() === "" || isNaN(nominal)) {
    showError("rrNominal", "Please enter a valid nominal return rate");
    isValid = false;
  }

  if (inflationInput.value.trim() === "" || isNaN(inflation)) {
    showError("rrInflation", "Please enter a valid inflation rate");
    isValid = false;
  }

  if (!isValid) return;

  // Logic: ((1 + nominal) / (1 + inflation)) - 1
  const n = nominal / 100;
  const i = inflation / 100;

  // Check for division by zero (inflation = -100%)
  if (i <= -1) {
    showError("rrInflation", "Inflation rate is invalid for this calculation");
    return;
  }

  const realRate = ((1 + n) / (1 + i) - 1) * 100;

  // Update UI
  const resultElement = document.getElementById("rrFinal");
  resultElement.textContent = realRate.toFixed(2) + "%";

  // Visual feedback for negative real returns
  if (realRate < 0) {
    resultElement.classList.add("text-red-200");
  } else {
    resultElement.classList.remove("text-red-200");
  }

  document.getElementById("rrResult").classList.remove("hidden");
}
function loadCostOfDelayCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Monthly SIP Amount (₹)</label>
                    <input type="text" id="codSIP" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 10,000" oninput="handleNumberInput(event); clearError('codSIP')" onblur="formatInputNumber(event)">
                    <p id="codSIP-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Investment Period (Years)</label>
                    <input type="text" id="codYears" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="Total years to stay invested" oninput="handleNumberInput(event); clearError('codYears')" onblur="formatInputNumber(event)">
                    <p id="codYears-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Delay Period (Years)</label>
                    <input type="text" id="codDelay" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 5" oninput="handleNumberInput(event); clearError('codDelay')" onblur="formatInputNumber(event)">
                    <p id="codDelay-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Expected Return (%)</label>
                    <input type="text" id="codRate" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           value="12" oninput="handleNumberInput(event); clearError('codRate')" onblur="formatInputNumber(event)">
                    <p id="codRate-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <button onclick="calculateCostOfDelay()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">Calculate Cost of Delay</button>
            </div>
            <div id="codResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">Delay Impact</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="The potential wealth you lost by delaying your investment.">Total Cost of Delay:</span>
                            <span class="text-4xl font-bold" id="codTotalCost">-</span>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 rounded-xl p-6 text-sm space-y-2">
                    <div class="flex justify-between">
                        <span class="text-gray-600" title="Corpus if you start investing today.">Corpus (Start Now):</span>
                        <span class="font-medium text-gray-900" id="codCorpusNow">-</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600" title="Corpus if you start after the delay period.">Corpus (After Delay):</span>
                        <span class="font-medium text-gray-900" id="codCorpusDelay">-</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateCostOfDelay() {
  const sip = parseFormattedNumber(document.getElementById("codSIP").value);
  const years = parseFormattedNumber(document.getElementById("codYears").value);
  const delay = parseFormattedNumber(document.getElementById("codDelay").value);
  const rate =
    parseFormattedNumber(document.getElementById("codRate").value) / 100 / 12;

  let valid = true;
  if (!sip || sip <= 0) {
    showError("codSIP", "Enter valid SIP amount");
    valid = false;
  }
  if (!years || years <= 0) {
    showError("codYears", "Enter valid period");
    valid = false;
  }
  if (delay === null || delay < 0 || delay >= years) {
    showError("codDelay", "Delay must be less than period");
    valid = false;
  }
  if (!valid) return;

  // FV = P * [((1 + r)^n - 1) / r] * (1 + r)
  const nNow = years * 12;
  const nDelay = (years - delay) * 12;

  const corpusNow = sip * ((Math.pow(1 + rate, nNow) - 1) / rate) * (1 + rate);
  const corpusDelay =
    sip * ((Math.pow(1 + rate, nDelay) - 1) / rate) * (1 + rate);
  const cost = corpusNow - corpusDelay;

  document.getElementById("codTotalCost").textContent =
    "₹" + formatNumber(Math.round(cost));
  document.getElementById("codCorpusNow").textContent =
    "₹" + formatNumber(Math.round(corpusNow));
  document.getElementById("codCorpusDelay").textContent =
    "₹" + formatNumber(Math.round(corpusDelay));
  document.getElementById("codResult").classList.remove("hidden");
}
