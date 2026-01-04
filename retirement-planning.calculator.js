function loadRetirementCorpusCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Current Age (Years)</label>
                    <input type="text" id="retCurrentAge" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 30"
                           oninput="handleNumberInput(event); clearError('retCurrentAge')"
                           onblur="formatInputNumber(event)">
                    <p id="retCurrentAge-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Retirement Age (Years)</label>
                    <input type="text" id="retRetirementAge" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 60"
                           value="60"
                           oninput="handleNumberInput(event); clearError('retRetirementAge')"
                           onblur="formatInputNumber(event)">
                    <p id="retRetirementAge-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Life Expectancy (Years)</label>
                    <input type="text" id="retLifeExpectancy" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 85"
                           value="85"
                           oninput="handleNumberInput(event); clearError('retLifeExpectancy')"
                           onblur="formatInputNumber(event)">
                    <p id="retLifeExpectancy-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Current Monthly Expenses (₹)</label>
                    <input type="text" id="retMonthlyExpenses" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 50000"
                           oninput="handleNumberInput(event); clearError('retMonthlyExpenses')"
                           onblur="formatInputNumber(event)">
                    <p id="retMonthlyExpenses-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Inflation Rate (%)</label>
                    <input type="text" id="retInflation" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 6"
                           value="6"
                           oninput="handleNumberInput(event); clearError('retInflation')"
                           onblur="formatInputNumber(event)">
                    <p id="retInflation-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Expected Return (% p.a.)</label>
                    <input type="text" id="retReturn" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 8"
                           value="8"
                           oninput="handleNumberInput(event); clearError('retReturn')"
                           onblur="formatInputNumber(event)">
                    <p id="retReturn-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateRetirementCorpus()" 
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate Corpus
                </button>
            </div>

            <div id="retirementCorpusResult" class="hidden animate-fade-in">
                <div class="profit-bg rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">Retirement Corpus Required</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span>Required Corpus:</span>
                            <span class="text-4xl font-bold" id="requiredCorpus">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Monthly Expense at Retirement:</span>
                            <span class="text-xl font-bold" id="futureExpense">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Years in Retirement:</span>
                            <span class="text-xl font-bold" id="retirementYears">-</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-xl p-6">
                    <h4 class="font-semibold text-gray-900 mb-3">Investment Strategy</h4>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Years to Retirement:</span>
                            <span class="font-medium" id="yearsToRetirement">-</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Monthly Investment Needed:</span>
                            <span class="font-medium text-lg" id="monthlyInvestmentNeeded">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateRetirementCorpus() {
  const currentAge = parseFormattedNumber(
    document.getElementById("retCurrentAge").value
  );
  const retirementAge = parseFormattedNumber(
    document.getElementById("retRetirementAge").value
  );
  const lifeExpectancy = parseFormattedNumber(
    document.getElementById("retLifeExpectancy").value
  );
  const monthlyExpenses = parseFormattedNumber(
    document.getElementById("retMonthlyExpenses").value
  );
  const inflation = parseFormattedNumber(
    document.getElementById("retInflation").value
  );
  const returnRate = parseFormattedNumber(
    document.getElementById("retReturn").value
  );

  let valid = true;

  if (!currentAge || currentAge <= 0) {
    showError("retCurrentAge", "Please enter valid current age");
    valid = false;
  }
  if (!retirementAge || retirementAge <= currentAge) {
    showError(
      "retRetirementAge",
      "Retirement age must be greater than current age"
    );
    valid = false;
  }
  if (!lifeExpectancy || lifeExpectancy <= retirementAge) {
    showError(
      "retLifeExpectancy",
      "Life expectancy must be greater than retirement age"
    );
    valid = false;
  }
  if (!monthlyExpenses || monthlyExpenses <= 0) {
    showError("retMonthlyExpenses", "Please enter valid monthly expenses");
    valid = false;
  }
  if (inflation < 0) {
    showError("retInflation", "Inflation rate cannot be negative");
    valid = false;
  }
  if (!returnRate || returnRate <= 0) {
    showError("retReturn", "Please enter valid expected return");
    valid = false;
  }

  if (!valid) return;

  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retirementAge;

  // Future monthly expense at retirement
  const futureMonthlyExpense =
    monthlyExpenses * Math.pow(1 + inflation / 100, yearsToRetirement);

  // Corpus needed using present value of annuity formula
  const realReturn = (1 + returnRate / 100) / (1 + inflation / 100) - 1;
  const monthlyRealReturn = realReturn / 12;

  let corpus;
  if (monthlyRealReturn === 0) {
    corpus = futureMonthlyExpense * yearsInRetirement * 12;
  } else {
    corpus =
      futureMonthlyExpense *
      ((1 - Math.pow(1 + monthlyRealReturn, -yearsInRetirement * 12)) /
        monthlyRealReturn);
  }

  // Monthly investment needed
  const monthlyReturnRate = returnRate / 12 / 100;
  const monthsToRetirement = yearsToRetirement * 12;
  const monthlyInvestment =
    corpus /
    (((Math.pow(1 + monthlyReturnRate, monthsToRetirement) - 1) /
      monthlyReturnRate) *
      (1 + monthlyReturnRate));

  document.getElementById("requiredCorpus").textContent =
    "₹" + formatNumber(corpus.toFixed(2));
  document.getElementById("futureExpense").textContent =
    "₹" + formatNumber(futureMonthlyExpense.toFixed(2));
  document.getElementById("retirementYears").textContent =
    yearsInRetirement + " years";
  document.getElementById("yearsToRetirement").textContent =
    yearsToRetirement + " years";
  document.getElementById("monthlyInvestmentNeeded").textContent =
    "₹" + formatNumber(monthlyInvestment.toFixed(2));

  document.getElementById("retirementCorpusResult").classList.remove("hidden");
}

function loadRetirementSIPPlannerCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Current Age (Years)</label>
                    <input type="text" id="retAge" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 30"
                           oninput="handleNumberInput(event); clearError('retAge')"
                           onblur="formatInputNumber(event)">
                    <p id="retAge-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Retirement Age (Years)</label>
                    <input type="text" id="retRetirementAge" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 60"
                           value="60"
                           oninput="handleNumberInput(event); clearError('retRetirementAge')"
                           onblur="formatInputNumber(event)">
                    <p id="retRetirementAge-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Life Expectancy (Years)</label>
                    <input type="text" id="retLifeExpectancy" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 85"
                           value="85"
                           oninput="handleNumberInput(event); clearError('retLifeExpectancy')"
                           onblur="formatInputNumber(event)">
                    <p id="retLifeExpectancy-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Current Monthly Expenses (₹)</label>
                    <input type="text" id="retExpenses" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 50000"
                           oninput="handleNumberInput(event); clearError('retExpenses')"
                           onblur="formatInputNumber(event)">
                    <p id="retExpenses-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Expected Inflation (%)</label>
                    <input type="text" id="retInflation" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           value="6"
                           oninput="handleNumberInput(event); clearError('retInflation')"
                           onblur="formatInputNumber(event)">
                    <p id="retInflation-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Pre-Retirement Returns (%)</label>
                    <input type="text" id="retReturns" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           value="12"
                           oninput="handleNumberInput(event); clearError('retReturns')"
                           onblur="formatInputNumber(event)">
                    <p id="retReturns-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Post-Retirement Returns (%)</label>
                    <input type="text" id="retPostReturns" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           value="8"
                           oninput="handleNumberInput(event); clearError('retPostReturns')"
                           onblur="formatInputNumber(event)">
                    <p id="retPostReturns-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateRetirementSIP()" 
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate Retirement Plan
                </button>
            </div>

            <div id="retirementResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">Retirement Strategy</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span>Monthly SIP Required:</span>
                            <span class="text-4xl font-bold" id="retMonthlySIP">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Target Corpus:</span>
                            <span class="text-xl font-bold" id="retTargetCorpus">-</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-xl p-6">
                    <h4 class="font-semibold text-gray-900 mb-3">Calculation Summary</h4>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Years to Retirement:</span>
                            <span class="font-medium" id="retYearsLeft">-</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Future Monthly Expense:</span>
                            <span class="font-medium" id="retFutureExpense">-</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Withdrawal Period:</span>
                            <span class="font-medium" id="retWithdrawalPeriod">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateRetirementSIP() {
  // 1. Parsing and Cleaning Data
  const age = parseFormattedNumber(document.getElementById("retAge").value);
  const retirementAge = parseFormattedNumber(
    document.getElementById("retRetirementAge").value
  );
  const lifeExpectancy = parseFormattedNumber(
    document.getElementById("retLifeExpectancy").value
  );
  const monthlyExpenses = parseFormattedNumber(
    document.getElementById("retExpenses").value
  );
  const inflation =
    parseFormattedNumber(document.getElementById("retInflation").value) / 100;
  const preReturns =
    parseFormattedNumber(document.getElementById("retReturns").value) / 100;
  const postReturns =
    parseFormattedNumber(document.getElementById("retPostReturns").value) / 100;

  // 2. Validation
  let valid = true;
  if (!age || age <= 0) {
    showError("retAge", "Please enter valid age");
    valid = false;
  }
  if (!retirementAge || retirementAge <= age) {
    showError("retRetirementAge", "Must be greater than current age");
    valid = false;
  }
  if (!lifeExpectancy || lifeExpectancy <= retirementAge) {
    showError("retLifeExpectancy", "Must be greater than retirement age");
    valid = false;
  }
  if (!monthlyExpenses || monthlyExpenses <= 0) {
    showError("retExpenses", "Please enter valid expenses");
    valid = false;
  }

  if (!valid) return;

  // 3. Mathematical Calculations
  const yearsToRetirement = retirementAge - age;
  const withdrawalYears = lifeExpectancy - retirementAge;

  // Future Monthly Expense at point of Retirement
  const futureMonthlyExpense =
    monthlyExpenses * Math.pow(1 + inflation, yearsToRetirement);

  // Corpus Needed (Present Value of Annuity)
  const realRate = (1 + postReturns) / (1 + inflation) - 1;
  const monthlyRealRate = realRate / 12;
  const totalWithdrawalMonths = withdrawalYears * 12;

  let targetCorpus = 0;
  if (monthlyRealRate === 0) {
    targetCorpus = futureMonthlyExpense * totalWithdrawalMonths;
  } else {
    targetCorpus =
      futureMonthlyExpense *
      ((1 - Math.pow(1 + monthlyRealRate, -totalWithdrawalMonths)) /
        monthlyRealRate);
  }

  // Monthly SIP Required (Future Value of Annuity Due)
  const monthlyPreRate = preReturns / 12;
  const totalInvestmentMonths = yearsToRetirement * 12;

  let requiredSIP = 0;
  if (monthlyPreRate === 0) {
    requiredSIP = targetCorpus / totalInvestmentMonths;
  } else {
    requiredSIP =
      targetCorpus /
      (((Math.pow(1 + monthlyPreRate, totalInvestmentMonths) - 1) /
        monthlyPreRate) *
        (1 + monthlyPreRate));
  }

  // 4. Update UI with formatted values
  document.getElementById("retMonthlySIP").textContent =
    "₹" + formatNumber(Math.round(requiredSIP));
  document.getElementById("retTargetCorpus").textContent =
    "₹" + formatNumber(Math.round(targetCorpus));
  document.getElementById("retYearsLeft").textContent =
    yearsToRetirement + " years";
  document.getElementById("retFutureExpense").textContent =
    "₹" + formatNumber(Math.round(futureMonthlyExpense));
  document.getElementById("retWithdrawalPeriod").textContent =
    withdrawalYears + " years";

  document.getElementById("retirementResult").classList.remove("hidden");
}

// Life Insurance Calculator
function loadLifeInsuranceCoverageCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Current Age (Years)</label>
                    <input type="text" id="lifeAge" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 35"
                           oninput="handleNumberInput(event); clearError('lifeAge')"
                           onblur="formatInputNumber(event)">
                    <p id="lifeAge-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Annual Income (₹)</label>
                    <input type="text" id="lifeIncome" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 1200000"
                           oninput="handleNumberInput(event); clearError('lifeIncome')"
                           onblur="formatInputNumber(event)">
                    <p id="lifeIncome-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Annual Expenses (₹)</label>
                    <input type="text" id="lifeExpenses" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 800000"
                           oninput="handleNumberInput(event); clearError('lifeExpenses')"
                           onblur="formatInputNumber(event)">
                    <p id="lifeExpenses-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Retirement Age (Years)</label>
                    <input type="text" id="lifeRetirementAge" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 60"
                           value="60"
                           oninput="handleNumberInput(event); clearError('lifeRetirementAge')"
                           onblur="formatInputNumber(event)">
                    <p id="lifeRetirementAge-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Current Liabilities (₹)</label>
                    <input type="text" id="lifeLiabilities" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 2000000"
                           value="0"
                           oninput="handleNumberInput(event); clearError('lifeLiabilities')"
                           onblur="formatInputNumber(event)">
                    <p id="lifeLiabilities-error" class="hidden text-red-500 text-sm mt-1"></p>
                    <p class="text-xs text-gray-500 mt-1">Outstanding loans, debts, etc.</p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Current Assets (₹)</label>
                    <input type="text" id="lifeAssets" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 1000000"
                           value="0"
                           oninput="handleNumberInput(event); clearError('lifeAssets')"
                           onblur="formatInputNumber(event)">
                    <p id="lifeAssets-error" class="hidden text-red-500 text-sm mt-1"></p>
                    <p class="text-xs text-gray-500 mt-1">Savings, investments, etc.</p>
                </div>

                <button onclick="calculateLifeInsurance()" 
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate Coverage
                </button>
            </div>

            <div id="lifeInsuranceResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">Recommended Life Insurance</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span>Coverage Required:</span>
                            <span class="text-4xl font-bold" id="lifeCoverage">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Income Replacement:</span>
                            <span class="text-xl font-bold" id="incomeReplacement">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Liabilities Coverage:</span>
                            <span class="text-xl font-bold" id="liabilitiesCoverage">-</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-xl p-6">
                    <h4 class="font-semibold text-gray-900 mb-3">Coverage Breakdown</h4>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Years to Retirement:</span>
                            <span class="font-medium" id="lifeYearsToRetirement">-</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Net Assets:</span>
                            <span class="font-medium" id="lifeNetAssets">-</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total Protection Needed:</span>
                            <span class="font-medium text-lg" id="lifeTotalProtection">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateLifeInsurance() {
  const age = parseFormattedNumber(document.getElementById("lifeAge").value);
  const income = parseFormattedNumber(
    document.getElementById("lifeIncome").value
  );
  const expenses = parseFormattedNumber(
    document.getElementById("lifeExpenses").value
  );
  const retirementAge = parseFormattedNumber(
    document.getElementById("lifeRetirementAge").value
  );
  const liabilities = parseFormattedNumber(
    document.getElementById("lifeLiabilities").value
  );
  const assets = parseFormattedNumber(
    document.getElementById("lifeAssets").value
  );

  let valid = true;

  if (!age || age <= 0) {
    showError("lifeAge", "Please enter valid age");
    valid = false;
  }
  if (!income || income <= 0) {
    showError("lifeIncome", "Please enter valid annual income");
    valid = false;
  }
  if (!expenses || expenses < 0) {
    showError("lifeExpenses", "Please enter valid annual expenses");
    valid = false;
  }
  if (!retirementAge || retirementAge <= age) {
    showError(
      "lifeRetirementAge",
      "Retirement age must be greater than current age"
    );
    valid = false;
  }
  if (liabilities < 0) {
    showError("lifeLiabilities", "Liabilities cannot be negative");
    valid = false;
  }
  if (assets < 0) {
    showError("lifeAssets", "Assets cannot be negative");
    valid = false;
  }

  if (!valid) return;

  const yearsToRetirement = retirementAge - age;

  // Income replacement method: 10-15 times annual expenses
  const incomeReplacementCoverage = expenses * 12;

  // Total coverage = Income replacement + Liabilities - Assets
  const netAssets = assets - liabilities;
  const totalCoverage = Math.max(
    0,
    incomeReplacementCoverage + liabilities - assets
  );

  document.getElementById("lifeCoverage").textContent =
    "₹" + formatNumber(totalCoverage.toFixed(2));
  document.getElementById("incomeReplacement").textContent =
    "₹" + formatNumber(incomeReplacementCoverage.toFixed(2));
  document.getElementById("liabilitiesCoverage").textContent =
    "₹" + formatNumber(liabilities.toFixed(2));
  document.getElementById("lifeYearsToRetirement").textContent =
    yearsToRetirement + " years";
  document.getElementById("lifeNetAssets").textContent =
    "₹" + formatNumber(netAssets.toFixed(2));
  document.getElementById("lifeTotalProtection").textContent =
    "₹" + formatNumber(totalCoverage.toFixed(2));

  document.getElementById("lifeInsuranceResult").classList.remove("hidden");
}

function loadChildEducationPlannerCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Child's Current Age (Years)</label>
                    <input type="text" id="childAge" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 5"
                           oninput="handleNumberInput(event); clearError('childAge')"
                           onblur="formatInputNumber(event)">
                    <p id="childAge-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Age for Higher Education (Years)</label>
                    <input type="text" id="educationAge" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 18"
                           value="18"
                           oninput="handleNumberInput(event); clearError('educationAge')"
                           onblur="formatInputNumber(event)">
                    <p id="educationAge-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Current Education Cost (₹)</label>
                    <input type="text" id="currentEducationCost" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 2000000"
                           oninput="handleNumberInput(event); clearError('currentEducationCost')"
                           onblur="formatInputNumber(event)">
                    <p id="currentEducationCost-error" class="hidden text-red-500 text-sm mt-1"></p>
                    <p class="text-xs text-gray-500 mt-1">Total cost in today's value</p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Education Inflation Rate (%)</label>
                    <input type="text" id="educationInflation" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 8"
                           value="8"
                           oninput="handleNumberInput(event); clearError('educationInflation')"
                           onblur="formatInputNumber(event)">
                    <p id="educationInflation-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Expected Return (% p.a.)</label>
                    <input type="text" id="educationReturn" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 12"
                           value="12"
                           oninput="handleNumberInput(event); clearError('educationReturn')"
                           onblur="formatInputNumber(event)">
                    <p id="educationReturn-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateChildEducation()" 
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate Investment
                </button>
            </div>

            <div id="childEducationResult" class="hidden animate-fade-in">
                <div class="profit-bg rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">Education Planning</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span>Future Education Cost:</span>
                            <span class="text-3xl font-bold" id="futureEducationCost">-</span>
                        </div>
                        <div class="flex justify-between items-center pt-3 border-t border-white border-opacity-30">
                            <span>Monthly SIP Required:</span>
                            <span class="text-4xl font-bold" id="educationSIP">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Or Lump Sum Today:</span>
                            <span class="text-2xl font-bold" id="educationLumpsum">-</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-xl p-6">
                    <h4 class="font-semibold text-gray-900 mb-3">Investment Details</h4>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Years to Goal:</span>
                            <span class="font-medium" id="educationYears">-</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Current Cost:</span>
                            <span class="font-medium" id="currentCostDisplay">-</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total SIP Investment:</span>
                            <span class="font-medium" id="totalSIPInvestment">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateChildEducation() {
  const childAge = parseFormattedNumber(
    document.getElementById("childAge").value
  );
  const educationAge = parseFormattedNumber(
    document.getElementById("educationAge").value
  );
  const currentCost = parseFormattedNumber(
    document.getElementById("currentEducationCost").value
  );
  const inflation = parseFormattedNumber(
    document.getElementById("educationInflation").value
  );
  const returnRate = parseFormattedNumber(
    document.getElementById("educationReturn").value
  );

  let valid = true;

  if (!childAge || childAge < 0) {
    showError("childAge", "Please enter valid child age");
    valid = false;
  }
  if (!educationAge || educationAge <= childAge) {
    showError("educationAge", "Education age must be greater than current age");
    valid = false;
  }
  if (!currentCost || currentCost <= 0) {
    showError("currentEducationCost", "Please enter valid education cost");
    valid = false;
  }
  if (inflation < 0) {
    showError("educationInflation", "Inflation rate cannot be negative");
    valid = false;
  }
  if (!returnRate || returnRate <= 0) {
    showError("educationReturn", "Please enter valid expected return");
    valid = false;
  }

  if (!valid) return;

  const yearsToGoal = educationAge - childAge;

  // Future cost with inflation
  const futureCost = currentCost * Math.pow(1 + inflation / 100, yearsToGoal);

  // Lumpsum needed today
  const lumpsumToday = futureCost / Math.pow(1 + returnRate / 100, yearsToGoal);

  // Monthly SIP calculation
  const monthlyRate = returnRate / 12 / 100;
  const months = yearsToGoal * 12;
  const monthlySIP =
    futureCost /
    (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate));
  const totalSIPInvestment = monthlySIP * months;

  document.getElementById("futureEducationCost").textContent =
    "₹" + formatNumber(futureCost.toFixed(2));
  document.getElementById("educationSIP").textContent =
    "₹" + formatNumber(monthlySIP.toFixed(2));
  document.getElementById("educationLumpsum").textContent =
    "₹" + formatNumber(lumpsumToday.toFixed(2));
  document.getElementById("educationYears").textContent =
    yearsToGoal + " years";
  document.getElementById("currentCostDisplay").textContent =
    "₹" + formatNumber(currentCost.toFixed(2));
  document.getElementById("totalSIPInvestment").textContent =
    "₹" + formatNumber(totalSIPInvestment.toFixed(2));

  document.getElementById("childEducationResult").classList.remove("hidden");
}

function loadMarriageGoalPlannerCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Current Estimated Wedding Cost (₹)</label>
                    <input type="text" id="mrgCurrentCost" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 10,00,000"
                           oninput="handleNumberInput(event); clearError('mrgCurrentCost')"
                           onblur="formatInputNumber(event)">
                    <p id="mrgCurrentCost-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Years Until Wedding</label>
                    <input type="text" id="mrgYears" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 5"
                           oninput="handleNumberInput(event); clearError('mrgYears')"
                           onblur="formatInputNumber(event)">
                    <p id="mrgYears-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Expected Inflation (%)</label>
                    <input type="text" id="mrgInflation" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           value="6"
                           oninput="handleNumberInput(event); clearError('mrgInflation')"
                           onblur="formatInputNumber(event)">
                    <p id="mrgInflation-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Expected Investment Returns (%)</label>
                    <input type="text" id="mrgReturns" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           value="12"
                           oninput="handleNumberInput(event); clearError('mrgReturns')"
                           onblur="formatInputNumber(event)">
                    <p id="mrgReturns-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Existing Savings for this Goal (₹)</label>
                    <input type="text" id="mrgSavings" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           value="0"
                           oninput="handleNumberInput(event); clearError('mrgSavings')"
                           onblur="formatInputNumber(event)">
                    <p id="mrgSavings-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateMarriageGoal()" 
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Calculate Plan
                </button>
            </div>

            <div id="marriageResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">Marriage Savings Plan</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span title="The monthly SIP amount you need to invest to reach your target wedding corpus.">Monthly Investment:</span>
                            <span class="text-4xl font-bold" id="mrgMonthlySIP">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span title="The estimated cost of the wedding at the time of the event, adjusted for inflation.">Future Cost:</span>
                            <span class="text-xl font-bold" id="mrgFutureCost">-</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-xl p-6">
                    <h4 class="font-semibold text-gray-900 mb-3">Goal Breakdown</h4>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600" title="The additional amount required due to the rising costs of goods and services over time.">Cost Increase due to Inflation:</span>
                            <span class="font-medium" id="mrgInflationAmount">-</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600" title="What your current savings will grow to by the wedding date based on your expected returns.">Future Value of Savings:</span>
                            <span class="font-medium" id="mrgSavingsFV">-</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600" title="The actual amount you still need to accumulate through new monthly investments.">Remaining Gap to Fund:</span>
                            <span class="font-medium text-lg" id="mrgTotalGap">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateMarriageGoal() {
  const currentCost = parseFormattedNumber(
    document.getElementById("mrgCurrentCost").value
  );
  const years = parseFormattedNumber(document.getElementById("mrgYears").value);
  const inflation =
    parseFormattedNumber(document.getElementById("mrgInflation").value) / 100;
  const expectedReturns =
    parseFormattedNumber(document.getElementById("mrgReturns").value) / 100;
  const existingSavings =
    parseFormattedNumber(document.getElementById("mrgSavings").value) || 0;

  let valid = true;

  if (!currentCost || currentCost <= 0) {
    showError("mrgCurrentCost", "Please enter current cost");
    valid = false;
  }
  if (!years || years <= 0) {
    showError("mrgYears", "Please enter valid years");
    valid = false;
  }
  if (inflation < 0) {
    showError("mrgInflation", "Inflation cannot be negative");
    valid = false;
  }
  if (expectedReturns <= 0) {
    showError("mrgReturns", "Enter valid expected returns");
    valid = false;
  }

  if (!valid) return;

  // 1. Calculate Future Cost of Marriage
  const futureCost = currentCost * Math.pow(1 + inflation, years);
  const inflationAmount = futureCost - currentCost;

  // 2. Calculate Future Value of existing savings
  const savingsFV = existingSavings * Math.pow(1 + expectedReturns, years);

  // 3. Gap to be filled by SIP
  const totalGap = Math.max(0, futureCost - savingsFV);

  // 4. Monthly SIP Calculation (Annuity Due)
  let monthlySIP = 0;
  if (totalGap > 0) {
    const r = expectedReturns / 12;
    const n = years * 12;
    // SIP Formula: FV / [((1 + r)^n - 1) / r * (1 + r)]
    monthlySIP = totalGap / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  }

  // Update UI
  document.getElementById("mrgMonthlySIP").textContent =
    "₹" + formatNumber(Math.round(monthlySIP));
  document.getElementById("mrgFutureCost").textContent =
    "₹" + formatNumber(Math.round(futureCost));
  document.getElementById("mrgInflationAmount").textContent =
    "₹" + formatNumber(Math.round(inflationAmount));
  document.getElementById("mrgSavingsFV").textContent =
    "₹" + formatNumber(Math.round(savingsFV));
  document.getElementById("mrgTotalGap").textContent =
    "₹" + formatNumber(Math.round(totalGap));

  document.getElementById("marriageResult").classList.remove("hidden");
}

function loadPensionCalculator(container) {
  container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-8">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Current Age (Years)</label>
                    <input type="text" id="penAge" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                           placeholder="e.g., 30" 
                           oninput="handleNumberInput(event); clearError('penAge')">
                    <p id="penAge-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Monthly Contribution (₹)</label>
                    <input type="text" id="penMonthly" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                           placeholder="e.g., 10,000" 
                           oninput="handleNumberInput(event); clearError('penMonthly')"
                           onblur="formatInputNumber(event)">
                    <p id="penMonthly-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="input-group">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Expected Return (%)</label>
                        <input type="text" id="penRate" 
                               class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                               placeholder="e.g., 10" 
                               oninput="handleNumberInput(event); clearError('penRate')">
                        <p id="penRate-error" class="hidden text-red-500 text-sm mt-1"></p>
                    </div>
                    <div class="input-group">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Annuity Purchase (%)</label>
                        <select id="penAnnuityPercent" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500">
                            <option value="0.4">40% (Minimum)</option>
                            <option value="0.6">60%</option>
                            <option value="0.8">80%</option>
                            <option value="1.0">100%</option>
                        </select>
                    </div>
                </div>

                <button onclick="calculatePension()" class="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-4 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all cursor-pointer tracking-wider text-sm">
                    Calculate Retirement Plan
                </button>
            </div>

            <div id="penResult" class="hidden animate-fade-in space-y-6">
                <div class="result-card rounded-2xl p-6 text-white bg-gradient-to-br from-indigo-700 to-purple-900 shadow-xl border border-white border-opacity-10">
                    <h3 class="text-lg font-semibold mb-6 border-b border-white border-opacity-20 pb-2">Retirement Forecast</h3>
                    
                    <div class="space-y-6">
                        <div>
                            <p class="text-indigo-100 text-xs uppercase tracking-wider mb-1">Expected Monthly Pension</p>
                            <p class="text-4xl font-black" id="penMonthlyVal">-</p>
                        </div>

                        <div class="grid grid-cols-2 gap-4 pt-4 border-t border-white border-opacity-10">
                            <div>
                                <p class="text-indigo-100 text-[10px] uppercase tracking-wider mb-1">Total Corpus</p>
                                <p class="text-lg font-bold" id="penTotalCorpus">-</p>
                            </div>
                            <div class="text-right">
                                <p class="text-indigo-100 text-[10px] uppercase tracking-wider mb-1">Lump Sum Payout</p>
                                <p class="text-lg font-bold text-green-300" id="penLumpSum">-</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                    <p class="text-xs text-indigo-700 leading-relaxed">
                        <strong>Note:</strong> Calculation assumes retirement at age 60 and an indicative 6% annuity (pension) return rate on the invested portion.
                    </p>
                </div>
            </div>
        </div>
    `;
}

function calculatePension() {
  const age = parseFormattedNumber(document.getElementById("penAge").value);
  const monthly = parseFormattedNumber(
    document.getElementById("penMonthly").value
  );
  const rate = parseFormattedNumber(document.getElementById("penRate").value);
  const annuityPct = parseFloat(
    document.getElementById("penAnnuityPercent").value
  );

  let isValid = true;
  if (!age || age < 18 || age >= 60) {
    showError("penAge", "Age must be between 18 and 60");
    isValid = false;
  }
  if (!monthly || monthly <= 0) {
    showError("penMonthly", "Enter monthly contribution");
    isValid = false;
  }
  if (!rate || rate <= 0) {
    showError("penRate", "Enter expected return");
    isValid = false;
  }
  if (!isValid) return;

  const retirementAge = 60;
  const months = (retirementAge - age) * 12;
  const r = rate / 12 / 100;

  // Future Value of Monthly Investments
  const totalCorpus = monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);

  const annuityAmount = totalCorpus * annuityPct;
  const lumpSum = totalCorpus - annuityAmount;

  // Assuming 6% Annuity Rate for Pension
  const monthlyPension = (annuityAmount * 0.06) / 12;

  // UI Updates
  document.getElementById("penMonthlyVal").textContent =
    "₹" + formatNumber(monthlyPension.toFixed(0));
  document.getElementById("penTotalCorpus").textContent =
    "₹" + formatNumber(totalCorpus.toFixed(0));
  document.getElementById("penLumpSum").textContent =
    "₹" + formatNumber(lumpSum.toFixed(0));

  document.getElementById("penResult").classList.remove("hidden");
}
