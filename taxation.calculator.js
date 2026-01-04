function loadCapitalGainsTaxCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The price at which you sold the asset.">Sale Price (₹)</label>
                    <input type="text" id="cgSale" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 5,00,000" oninput="handleNumberInput(event); clearError('cgSale')" onblur="formatInputNumber(event)">
                    <p id="cgSale-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The price at which you originally bought the asset.">Purchase Price (₹)</label>
                    <input type="text" id="cgPurchase" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 3,00,000" oninput="handleNumberInput(event); clearError('cgPurchase')" onblur="formatInputNumber(event)">
                    <p id="cgPurchase-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Duration for which the asset was held.">Holding Period</label>
                    <select id="cgType" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500">
                        <option value="LTCG">Long Term (Holding > 1 Year)</option>
                        <option value="STCG">Short Term (Holding < 1 Year)</option>
                    </select>
                </div>

                <button onclick="calculateCapitalGains()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate Tax
                </button>
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
                <div class="bg-gray-50 rounded-xl p-4 text-xs text-gray-500 italic">
                    * Calculation assumes Equity rates: LTCG @ 12.5% (above ₹1.25L exemption) and STCG @ 20%.
                </div>
            </div>
        </div>
    `;
}

function calculateCapitalGains() {
  const saleInput = document.getElementById("cgSale");
  const purchaseInput = document.getElementById("cgPurchase");

  const sale = parseFormattedNumber(saleInput.value);
  const purchase = parseFormattedNumber(purchaseInput.value);
  const type = document.getElementById("cgType").value;

  let isValid = true;

  // Validation Logic
  if (isNaN(sale) || sale <= 0) {
    showError("cgSale", "Please enter a valid sale price");
    isValid = false;
  }
  if (isNaN(purchase) || purchase <= 0) {
    showError("cgPurchase", "Please enter a valid purchase price");
    isValid = false;
  }
  if (isValid && sale < purchase) {
    showError(
      "cgSale",
      "Sale price should be greater than purchase price for tax calculation"
    );
    isValid = false;
  }

  if (!isValid) return;

  const profit = sale - purchase;
  let tax = 0;

  if (profit > 0) {
    if (type === "LTCG") {
      // LTCG: 12.5% tax on gains exceeding 1.25 Lakh (As per latest Indian Budget 2024)
      const exemptionLimit = 125000;
      tax = Math.max(0, (profit - exemptionLimit) * 0.125);
    } else {
      // STCG: 20% flat tax
      tax = profit * 0.2;
    }
  }

  // Update UI
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
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Your annual basic salary component as per your CTC breakdown.">Annual Basic Salary (₹)</label>
                    <input type="text" id="hraBasic" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 6,00,000" 
                           oninput="handleNumberInput(event); clearError('hraBasic')"
                           onblur="formatInputNumber(event)">
                    <p id="hraBasic-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The total HRA component provided by your employer annually.">Annual HRA Received (₹)</label>
                    <input type="text" id="hraReceived" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 2,40,000" 
                           oninput="handleNumberInput(event); clearError('hraReceived')"
                           onblur="formatInputNumber(event)">
                    <p id="hraReceived-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The total actual rent you pay to your landlord in a financial year.">Total Annual Rent Paid (₹)</label>
                    <input type="text" id="hraRent" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 1,80,000" 
                           oninput="handleNumberInput(event); clearError('hraRent')"
                           onblur="formatInputNumber(event)">
                    <p id="hraRent-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Select 'Metro' if you reside in Delhi, Mumbai, Kolkata, or Chennai.">City Type</label>
                    <select id="hraCity" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500">
                        <option value="0.5">Metro (Delhi, Mumbai, Kolkata, Chennai)</option>
                        <option value="0.4">Non-Metro</option>
                    </select>
                </div>

                <button onclick="calculateHRA()" class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate Exemption
                </button>
            </div>

            <div id="hraResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-purple-600 to-indigo-700">
                    <h3 class="text-lg font-semibold mb-4">Exemption Summary</h3>
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
                <div class="bg-gray-50 rounded-xl p-4 text-xs text-gray-500">
                    <p class="font-semibold mb-1">Exemption is the minimum of:</p>
                    <ul class="list-disc ml-4 space-y-1">
                        <li>Actual HRA received</li>
                        <li>50% of basic (Metro) or 40% of basic (Non-metro)</li>
                        <li>Actual rent paid minus 10% of basic salary</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function calculateHRA() {
  const basic = parseFormattedNumber(document.getElementById("hraBasic").value);
  const received = parseFormattedNumber(
    document.getElementById("hraReceived").value
  );
  const rent = parseFormattedNumber(document.getElementById("hraRent").value);
  const cityFactor = parseFloat(document.getElementById("hraCity").value);

  let isValid = true;

  // Inline Error Handling
  if (!basic || basic <= 0) {
    showError("hraBasic", "Please enter valid annual basic salary");
    isValid = false;
  }
  if (!received || received <= 0) {
    showError("hraReceived", "Please enter valid annual HRA received");
    isValid = false;
  }
  if (!rent || rent <= 0) {
    showError("hraRent", "Please enter valid annual rent paid");
    isValid = false;
  }

  if (!isValid) return;

  // HRA Exemption Rules
  const rule1 = received;
  const rule2 = basic * cityFactor;
  const rule3 = Math.max(0, rent - basic * 0.1);

  const exempt = Math.min(rule1, rule2, rule3);
  const taxable = Math.max(0, received - exempt);

  // Display Results
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
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Your last drawn monthly basic salary plus Dearness Allowance (DA).">Last Drawn Monthly Basic + DA (₹)</label>
                    <input type="text" id="gtSalary" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 50,000" 
                           oninput="handleNumberInput(event); clearError('gtSalary')"
                           onblur="formatInputNumber(event)">
                    <p id="gtSalary-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="Total number of completed years of service. Typically, more than 6 months is counted as a full year.">Years of Service</label>
                    <input type="text" id="gtYears" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 15" 
                           oninput="handleNumberInput(event); clearError('gtYears')">
                    <p id="gtYears-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2" title="The total gratuity amount paid or promised by your employer.">Gratuity Received (₹)</label>
                    <input type="text" id="gtReceived" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 5,00,000" 
                           oninput="handleNumberInput(event); clearError('gtReceived')"
                           onblur="formatInputNumber(event)">
                    <p id="gtReceived-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateGratuity()" class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate Tax
                </button>
            </div>

            <div id="gtResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4 bg-gradient-to-br from-green-600 to-teal-700">
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
                <div class="bg-gray-50 rounded-xl p-4 text-xs text-gray-500">
                    <p class="font-semibold mb-1">Note:</p>
                    <p>Under the Payment of Gratuity Act, the formula used is: (15/26) × Last Drawn Salary × Years of Service, with a maximum tax-exempt limit of ₹20 Lakh.</p>
                </div>
            </div>
        </div>
    `;
}

function calculateGratuity() {
  const salary = parseFormattedNumber(
    document.getElementById("gtSalary").value
  );
  const years = parseFormattedNumber(document.getElementById("gtYears").value);
  const received = parseFormattedNumber(
    document.getElementById("gtReceived").value
  );

  let isValid = true;

  // Inline Error Handling
  if (!salary || salary <= 0) {
    showError("gtSalary", "Please enter your last drawn monthly salary");
    isValid = false;
  }
  if (!years || years <= 0) {
    showError("gtYears", "Please enter valid years of service");
    isValid = false;
  }
  if (!received || received <= 0) {
    showError("gtReceived", "Please enter the gratuity amount received");
    isValid = false;
  }

  if (!isValid) return;

  // Standard formula: (15/26) * Last Drawn Salary * Years of service
  const calculatedExempt = (15 / 26) * salary * years;
  const maxLimit = 2000000; // ₹20 Lakh statutory limit

  const exempt = Math.min(received, calculatedExempt, maxLimit);
  const taxable = Math.max(0, received - exempt);

  // Update UI
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
                    <input type="text" id="tdsAmount" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="Total amount before tax" 
                           oninput="handleNumberInput(event); clearError('tdsAmount')"
                           onblur="formatInputNumber(event)">
                    <p id="tdsAmount-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">TDS Rate (%)</label>
                    <select id="tdsRate" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500">
                        <option value="10">Professional/Interest (10%)</option>
                        <option value="5">Rent/Brokerage (5%)</option>
                        <option value="2">Contractors (2%)</option>
                        <option value="1">Buying Property (1%)</option>
                    </select>
                </div>

                <button onclick="calculateTDS()" class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Estimate TDS
                </button>
            </div>

            <div id="tdsResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4 border-b border-white border-opacity-10 pb-2">Calculation Summary</h3>
                    <div class="space-y-6">
                        <div class="flex justify-between items-end">
                            <div>
                                <p class="text-slate-200 text-xs uppercase tracking-wider mb-1" title="The amount the deductor will deduct and pay to the government.">TDS Amount</p>
                                <p class="text-3xl font-bold text-red-400" id="tdsFinal">-</p>
                            </div>
                            <div class="text-right">
                                <p class="text-slate-200 text-xs uppercase tracking-wider mb-1" title="The final amount you will receive after TDS.">Net Payout</p>
                                <p class="text-3xl font-bold text-green-400" id="tdsPayout">-</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-xl p-6">
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Gross Amount:</span>
                            <span class="font-medium" id="tdsGrossLabel">₹0</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Applied Rate:</span>
                            <span class="font-medium" id="tdsRateLabel">0%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateTDS() {
  const amountStr = document.getElementById("tdsAmount").value;
  const amount = parseFormattedNumber(amountStr);
  const rateVal = parseFloat(document.getElementById("tdsRate").value);
  const rate = rateVal / 100;

  let isValid = true;

  // Inline Error Handling
  if (!amount || amount <= 0) {
    showError("tdsAmount", "Please enter a valid payment amount");
    isValid = false;
  }

  if (!isValid) return;

  const tds = amount * rate;
  const payout = amount - tds;

  // Update Result Card
  document.getElementById("tdsFinal").textContent =
    "₹" + formatNumber(tds.toFixed(0));
  document.getElementById("tdsPayout").textContent =
    "₹" + formatNumber(payout.toFixed(0));

  // Update Secondary Labels
  document.getElementById("tdsGrossLabel").textContent =
    "₹" + formatNumber(amount.toFixed(0));
  document.getElementById("tdsRateLabel").textContent = rateVal + "%";

  document.getElementById("tdsResult").classList.remove("hidden");
}
function loadAdvanceTaxCalculator(container) {
  container.innerHTML = `
        <div class="space-y-6">
            <div class="input-group max-w-md">
                <label class="block text-sm font-medium text-gray-700 mb-2" title="The total tax liability you estimate for the entire financial year after all deductions and TDS.">
                    Estimated Total Annual Tax (₹)
                </label>
                <input type="text" id="atTotalTax" 
                       class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                       placeholder="e.g., 1,00,000" 
                       oninput="handleNumberInput(event); clearError('atTotalTax')"
                       onblur="formatInputNumber(event)">
                <p id="atTotalTax-error" class="hidden text-red-500 text-sm mt-1"></p>
                <p class="text-xs text-gray-500 mt-2">Note: Advance tax is applicable if your tax liability exceeds ₹10,000 in a year.</p>
            </div>

            <button onclick="calculateAdvanceTax()" 
                    class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                Generate Installments
            </button>

            <div id="atResult" class="hidden animate-fade-in">
                <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Payment Schedule</h3>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-purple-300 transition-colors">
                        <p class="text-xs font-medium text-gray-500 mb-1 uppercase">By 15th June</p>
                        <p class="text-lg font-bold text-indigo-700" id="atQ1">-</p>
                        <p class="text-[10px] text-gray-400 mt-1">Cumulative: 15%</p>
                    </div>
                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-purple-300 transition-colors">
                        <p class="text-xs font-medium text-gray-500 mb-1 uppercase">By 15th Sept</p>
                        <p class="text-lg font-bold text-indigo-700" id="atQ2">-</p>
                        <p class="text-[10px] text-gray-400 mt-1">Cumulative: 45%</p>
                    </div>
                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-purple-300 transition-colors">
                        <p class="text-xs font-medium text-gray-500 mb-1 uppercase">By 15th Dec</p>
                        <p class="text-lg font-bold text-indigo-700" id="atQ3">-</p>
                        <p class="text-[10px] text-gray-400 mt-1">Cumulative: 75%</p>
                    </div>
                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-purple-300 transition-colors">
                        <p class="text-xs font-medium text-gray-500 mb-1 uppercase">By 15th Mar</p>
                        <p class="text-lg font-bold text-indigo-700" id="atQ4">-</p>
                        <p class="text-[10px] text-gray-400 mt-1">Cumulative: 100%</p>
                    </div>
                </div>
                
                <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p class="text-xs text-blue-700 leading-relaxed">
                        <strong>Calculated based on:</strong> These are cumulative amounts. For example, if you paid ₹15,000 in June, you only need to pay the difference to reach the September target of ₹45,000.
                    </p>
                </div>
            </div>
        </div>
    `;
}

function calculateAdvanceTax() {
  const taxInput = document.getElementById("atTotalTax");
  const totalTax = parseFormattedNumber(taxInput.value);

  let isValid = true;

  // Inline Validation
  if (!totalTax || totalTax <= 0) {
    showError("atTotalTax", "Please enter your estimated annual tax");
    isValid = false;
  } else if (totalTax < 10000) {
    // Technically advance tax isn't required under 10k, but we can still calculate it
    // Or show an info message. For now, we allow it but check for validity.
  }

  if (!isValid) return;

  // Update the UI with cumulative installments
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
