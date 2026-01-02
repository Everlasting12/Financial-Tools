function loadCapitalGainsTaxCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Sale Price (₹)</label>
                    <input type="text" id="cgSale" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 5,00,000" oninput="handleNumberInput(event); clearError('cgSale')" onblur="formatInputNumber(event)">
                    <p id="cgSale-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Purchase Price (₹)</label>
                    <input type="text" id="cgPurchase" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                           placeholder="e.g., 3,00,000" oninput="handleNumberInput(event); clearError('cgPurchase')" onblur="formatInputNumber(event)">
                    <p id="cgPurchase-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Holding Period</label>
                    <select id="cgType" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg bg-white">
                        <option value="LTCG">Long Term (Holding > 1 Year)</option>
                        <option value="STCG">Short Term (Holding < 1 Year)</option>
                    </select>
                </div>
                <button onclick="calculateCapitalGains()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">Calculate Tax</button>
            </div>
            <div id="cgResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-indigo-600 to-blue-700">
                    <h3 class="text-lg font-semibold mb-4">Tax Summary</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="The total tax payable after applying exemptions.">Estimated Tax:</span>
                            <span class="text-4xl font-bold" id="cgTax">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span title="Total profit made on the sale.">Net Capital Gain:</span>
                            <span class="text-xl font-bold" id="cgProfit">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateCapitalGains() {
  const sale = parseFormattedNumber(document.getElementById("cgSale").value);
  const purchase = parseFormattedNumber(
    document.getElementById("cgPurchase").value
  );
  const type = document.getElementById("cgType").value;

  if (!sale || !purchase) return;

  const profit = sale - purchase;
  let tax = 0;

  if (profit > 0) {
    if (type === "LTCG") {
      // LTCG: 12.5% tax on gains exceeding 1.25 Lakh
      tax = Math.max(0, (profit - 125000) * 0.125);
    } else {
      // STCG: 20% flat tax
      tax = profit * 0.2;
    }
  }

  document.getElementById("cgProfit").textContent =
    "₹" + formatNumber(profit.toFixed(0));
  document.getElementById("cgTax").textContent =
    "₹" + formatNumber(tax.toFixed(0));
  document.getElementById("cgResult").classList.remove("hidden");
}
function loadHRACalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Annual Basic Salary (₹)</label>
                    <input type="text" id="hraBasic" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Enter annual basic" oninput="handleNumberInput(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Annual HRA Received (₹)</label>
                    <input type="text" id="hraReceived" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="HRA as per salary slip" oninput="handleNumberInput(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Total Annual Rent Paid (₹)</label>
                    <input type="text" id="hraRent" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Actual rent paid per year" oninput="handleNumberInput(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">City Type</label>
                    <select id="hraCity" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg bg-white">
                        <option value="0.5">Metro (Delhi, Mumbai, Kolkata, Chennai)</option>
                        <option value="0.4">Non-Metro</option>
                    </select>
                </div>
                <button onclick="calculateHRA()" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold">Calculate Exemption</button>
            </div>
            <div id="hraResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-purple-600">
                    <h3 class="text-lg font-semibold mb-4">Exemption Result</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="The portion of your HRA that is not taxable.">Exempt HRA:</span>
                            <span class="text-4xl font-bold" id="hraExempt">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span title="The portion of your HRA that will be added to your taxable income.">Taxable HRA:</span>
                            <span class="text-xl font-bold" id="hraTaxable">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateHRA() {
  const basic =
    parseFormattedNumber(document.getElementById("hraBasic").value) || 0;
  const received =
    parseFormattedNumber(document.getElementById("hraReceived").value) || 0;
  const rent =
    parseFormattedNumber(document.getElementById("hraRent").value) || 0;
  const cityFactor = parseFloat(document.getElementById("hraCity").value);

  const rule1 = received;
  const rule2 = basic * cityFactor;
  const rule3 = Math.max(0, rent - basic * 0.1);

  const exempt = Math.min(rule1, rule2, rule3);
  const taxable = received - exempt;

  document.getElementById("hraExempt").textContent =
    "₹" + formatNumber(exempt.toFixed(0));
  document.getElementById("hraTaxable").textContent =
    "₹" + formatNumber(taxable.toFixed(0));
  document.getElementById("hraResult").classList.remove("hidden");
}
function loadGratuityTaxCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Last Drawn Monthly Basic + DA (₹)</label>
                    <input type="text" id="gtSalary" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Monthly basic salary" oninput="handleNumberInput(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Years of Service</label>
                    <input type="text" id="gtYears" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g., 15">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Gratuity Received (₹)</label>
                    <input type="text" id="gtReceived" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Amount received" oninput="handleNumberInput(event)">
                </div>
                <button onclick="calculateGratuity()" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold">Calculate Tax</button>
            </div>
            <div id="gtResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-green-600">
                    <h3 class="text-lg font-semibold mb-4">Gratuity Summary</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="Tax-free limit as per government rules.">Exempt Portion:</span>
                            <span class="text-4xl font-bold" id="gtExempt">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span title="Amount that will be taxed under Income from Salary.">Taxable Portion:</span>
                            <span class="text-xl font-bold" id="gtTaxable">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateGratuity() {
  const salary =
    parseFormattedNumber(document.getElementById("gtSalary").value) || 0;
  const years =
    parseFormattedNumber(document.getElementById("gtYears").value) || 0;
  const received =
    parseFormattedNumber(document.getElementById("gtReceived").value) || 0;

  // Standard formula: (15/26) * Last Drawn Salary * Years of service
  const calculatedExempt = (15 / 26) * salary * years;
  const maxLimit = 2000000; // 20 Lakh limit

  const exempt = Math.min(received, calculatedExempt, maxLimit);
  const taxable = Math.max(0, received - exempt);

  document.getElementById("gtExempt").textContent =
    "₹" + formatNumber(exempt.toFixed(0));
  document.getElementById("gtTaxable").textContent =
    "₹" + formatNumber(taxable.toFixed(0));
  document.getElementById("gtResult").classList.remove("hidden");
}
function loadTDSCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Total Bill/Payment Amount (₹)</label>
                    <input type="text" id="tdsAmount" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Total amount before tax" oninput="handleNumberInput(event)">
                </div>
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">TDS Rate (%)</label>
                    <select id="tdsRate" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg bg-white">
                        <option value="10">Professional/Interest (10%)</option>
                        <option value="5">Rent/Brokerage (5%)</option>
                        <option value="2">Contractors (2%)</option>
                        <option value="1">Buying Property (1%)</option>
                    </select>
                </div>
                <button onclick="calculateTDS()" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold">Estimate TDS</button>
            </div>
            <div id="tdsResult" class="hidden animate-fade-in">
                <div class="bg-gray-50 rounded-xl p-6 space-y-4">
                    <div class="flex justify-between">
                        <span class="text-gray-600" title="The amount the deductor will deduct and pay to the government.">TDS Amount:</span>
                        <span class="font-bold text-red-600 text-xl" id="tdsFinal">-</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600" title="The final amount you will receive after TDS.">Net Payout:</span>
                        <span class="font-bold text-green-600 text-xl" id="tdsPayout">-</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateTDS() {
  const amount =
    parseFormattedNumber(document.getElementById("tdsAmount").value) || 0;
  const rate = parseFloat(document.getElementById("tdsRate").value) / 100;

  const tds = amount * rate;
  const payout = amount - tds;

  document.getElementById("tdsFinal").textContent =
    "₹" + formatNumber(tds.toFixed(0));
  document.getElementById("tdsPayout").textContent =
    "₹" + formatNumber(payout.toFixed(0));
  document.getElementById("tdsResult").classList.remove("hidden");
}
function loadAdvanceTaxCalculator(container) {
  container.innerHTML = `
        <div class="space-y-6">
            <div class="input-group max-w-md">
                <label class="block text-sm font-medium text-gray-700 mb-2">Estimated Total Annual Tax (₹)</label>
                <input type="text" id="atTotalTax" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Annual tax after all deductions" oninput="handleNumberInput(event)">
            </div>
            <button onclick="calculateAdvanceTax()" class="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold">Generate Installments</button>

            <div id="atResult" class="hidden animate-fade-in">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="bg-gray-50 p-4 rounded-lg border">
                        <p class="text-xs text-gray-500 mb-1">By 15th June (15%)</p>
                        <p class="font-bold text-indigo-700" id="atQ1">-</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg border">
                        <p class="text-xs text-gray-500 mb-1">By 15th Sept (45%)</p>
                        <p class="font-bold text-indigo-700" id="atQ2">-</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg border">
                        <p class="text-xs text-gray-500 mb-1">By 15th Dec (75%)</p>
                        <p class="font-bold text-indigo-700" id="atQ3">-</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg border">
                        <p class="text-xs text-gray-500 mb-1">By 15th Mar (100%)</p>
                        <p class="font-bold text-indigo-700" id="atQ4">-</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateAdvanceTax() {
  const totalTax =
    parseFormattedNumber(document.getElementById("atTotalTax").value) || 0;

  document.getElementById("atQ1").textContent =
    "₹" + formatNumber((totalTax * 0.15).toFixed(0));
  document.getElementById("atQ2").textContent =
    "₹" + formatNumber((totalTax * 0.45).toFixed(0));
  document.getElementById("atQ3").textContent =
    "₹" + formatNumber((totalTax * 0.75).toFixed(0));
  document.getElementById("atQ4").textContent =
    "₹" + formatNumber(totalTax.toFixed(0));

  document.getElementById("atResult").classList.remove("hidden");
}
