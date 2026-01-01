// SAVINGS & FIXED INCOME CALCULATORS

// FD Calculator
function loadFDCalculator(container) {
    container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Deposit Amount (₹)</label>
                    <input type="text" id="fdAmount" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 100000"
                           oninput="handleNumberInput(event); clearError('fdAmount')"
                           onblur="formatInputNumber(event)">
                    <p id="fdAmount-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Interest Rate (% p.a.)</label>
                    <input type="text" id="fdRate" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 6.5"
                           oninput="handleNumberInput(event); clearError('fdRate')"
                           onblur="formatInputNumber(event)">
                    <p id="fdRate-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Time Period (Years)</label>
                    <input type="text" id="fdYears" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 5"
                           oninput="handleNumberInput(event); clearError('fdYears')"
                           onblur="formatInputNumber(event)">
                    <p id="fdYears-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Compounding Frequency</label>
                    <select id="fdFrequency" 
                            class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        <option value="1">Annual</option>
                        <option value="2">Half-Yearly</option>
                        <option value="4" selected>Quarterly</option>
                        <option value="12">Monthly</option>
                    </select>
                </div>

                <button onclick="calculateFD()" 
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                    Calculate Returns
                </button>
            </div>

            <div id="fdResult" class="hidden animate-fade-in">
                <div class="profit-bg rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">FD Maturity</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span>Principal Amount:</span>
                            <span class="text-xl font-bold" id="fdPrincipal">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Interest Earned:</span>
                            <span class="text-xl font-bold" id="fdInterest">-</span>
                        </div>
                        <div class="flex justify-between items-center pt-3 border-t border-white border-opacity-30">
                            <span>Maturity Amount:</span>
                            <span class="text-4xl font-bold" id="fdMaturity">-</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-xl p-6">
                    <h4 class="font-semibold text-gray-900 mb-3">Investment Details</h4>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Interest Rate:</span>
                            <span class="font-medium" id="fdRateDisplay">-</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Tenure:</span>
                            <span class="font-medium" id="fdTenureDisplay">-</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Compounding:</span>
                            <span class="font-medium" id="fdFreqDisplay">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateFD() {
    const principal = parseFormattedNumber(document.getElementById('fdAmount').value);
    const rate = parseFormattedNumber(document.getElementById('fdRate').value);
    const years = parseFormattedNumber(document.getElementById('fdYears').value);
    const frequency = parseInt(document.getElementById('fdFrequency').value);
    
    let valid = true;
    
    if (!principal || principal <= 0) {
        showError('fdAmount', 'Please enter valid deposit amount');
        valid = false;
    }
    if (!rate || rate <= 0) {
        showError('fdRate', 'Please enter valid interest rate');
        valid = false;
    }
    if (!years || years <= 0) {
        showError('fdYears', 'Please enter valid time period');
        valid = false;
    }
    
    if (!valid) return;
    
    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    const rateDecimal = rate / 100;
    const maturityAmount = principal * Math.pow(1 + rateDecimal / frequency, frequency * years);
    const interest = maturityAmount - principal;
    
    const freqMap = { '1': 'Annual', '2': 'Half-Yearly', '4': 'Quarterly', '12': 'Monthly' };
    
    document.getElementById('fdPrincipal').textContent = '₹' + formatNumber(principal.toFixed(2));
    document.getElementById('fdInterest').textContent = '₹' + formatNumber(interest.toFixed(2));
    document.getElementById('fdMaturity').textContent = '₹' + formatNumber(maturityAmount.toFixed(2));
    document.getElementById('fdRateDisplay').textContent = rate + '% p.a.';
    document.getElementById('fdTenureDisplay').textContent = years + ' years';
    document.getElementById('fdFreqDisplay').textContent = freqMap[frequency];
    
    document.getElementById('fdResult').classList.remove('hidden');
}

// RD Calculator
function loadRDCalculator(container) {
    container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Monthly Deposit (₹)</label>
                    <input type="text" id="rdAmount" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 5000"
                           oninput="handleNumberInput(event); clearError('rdAmount')"
                           onblur="formatInputNumber(event)">
                    <p id="rdAmount-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Interest Rate (% p.a.)</label>
                    <input type="text" id="rdRate" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 6.5"
                           oninput="handleNumberInput(event); clearError('rdRate')"
                           onblur="formatInputNumber(event)">
                    <p id="rdRate-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Time Period (Months)</label>
                    <input type="text" id="rdMonths" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 60"
                           oninput="handleNumberInput(event); clearError('rdMonths')"
                           onblur="formatInputNumber(event)">
                    <p id="rdMonths-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateRD()" 
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                    Calculate Maturity
                </button>
            </div>

            <div id="rdResult" class="hidden animate-fade-in">
                <div class="profit-bg rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">RD Maturity</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span>Total Deposits:</span>
                            <span class="text-xl font-bold" id="rdDeposits">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Interest Earned:</span>
                            <span class="text-xl font-bold" id="rdInterest">-</span>
                        </div>
                        <div class="flex justify-between items-center pt-3 border-t border-white border-opacity-30">
                            <span>Maturity Amount:</span>
                            <span class="text-4xl font-bold" id="rdMaturity">-</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-xl p-6">
                    <h4 class="font-semibold text-gray-900 mb-3">Deposit Breakdown</h4>
                    <div class="space-y-2">
                        <div class="flex items-center">
                            <div class="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                            <span class="text-sm text-gray-600 flex-1">Your Deposits</span>
                            <span class="text-sm font-medium" id="rdDepositPercent">-</span>
                        </div>
                        <div class="flex items-center">
                            <div class="w-4 h-4 bg-green-500 rounded mr-2"></div>
                            <span class="text-sm text-gray-600 flex-1">Interest Earned</span>
                            <span class="text-sm font-medium" id="rdInterestPercent">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateRD() {
    const monthlyDeposit = parseFormattedNumber(document.getElementById('rdAmount').value);
    const rate = parseFormattedNumber(document.getElementById('rdRate').value);
    const months = parseFormattedNumber(document.getElementById('rdMonths').value);
    
    let valid = true;
    
    if (!monthlyDeposit || monthlyDeposit <= 0) {
        showError('rdAmount', 'Please enter valid monthly deposit');
        valid = false;
    }
    if (!rate || rate <= 0) {
        showError('rdRate', 'Please enter valid interest rate');
        valid = false;
    }
    if (!months || months <= 0) {
        showError('rdMonths', 'Please enter valid time period');
        valid = false;
    }
    
    if (!valid) return;
    
    const totalDeposits = monthlyDeposit * months;
    const quarterlyRate = rate / 400; // Quarterly compounding
    
    // RD Maturity = P * n * (n + 1) / 2 * (1 + r/4) / 4
    const maturityAmount = monthlyDeposit * (((Math.pow(1 + quarterlyRate, months / 3) - 1) / quarterlyRate) * (1 + quarterlyRate));
    const interest = maturityAmount - totalDeposits;
    
    const depositPercent = (totalDeposits / maturityAmount * 100).toFixed(1);
    const interestPercent = (interest / maturityAmount * 100).toFixed(1);
    
    document.getElementById('rdDeposits').textContent = '₹' + formatNumber(totalDeposits.toFixed(2));
    document.getElementById('rdInterest').textContent = '₹' + formatNumber(interest.toFixed(2));
    document.getElementById('rdMaturity').textContent = '₹' + formatNumber(maturityAmount.toFixed(2));
    document.getElementById('rdDepositPercent').textContent = depositPercent + '%';
    document.getElementById('rdInterestPercent').textContent = interestPercent + '%';
    
    document.getElementById('rdResult').classList.remove('hidden');
}

// PPF Calculator
function loadPPFCalculator(container) {
    container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Yearly Investment (₹)</label>
                    <input type="text" id="ppfAmount" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 150000"
                           oninput="handleNumberInput(event); clearError('ppfAmount')"
                           onblur="formatInputNumber(event)">
                    <p id="ppfAmount-error" class="hidden text-red-500 text-sm mt-1"></p>
                    <p class="text-xs text-gray-500 mt-1">Maximum: ₹1,50,000 per year</p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Interest Rate (% p.a.)</label>
                    <input type="text" id="ppfRate" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 7.1"
                           value="7.1"
                           oninput="handleNumberInput(event); clearError('ppfRate')"
                           onblur="formatInputNumber(event)">
                    <p id="ppfRate-error" class="hidden text-red-500 text-sm mt-1"></p>
                    <p class="text-xs text-gray-500 mt-1">Current PPF rate (changes quarterly)</p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Time Period (Years)</label>
                    <input type="text" id="ppfYears" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 15"
                           value="15"
                           oninput="handleNumberInput(event); clearError('ppfYears')"
                           onblur="formatInputNumber(event)">
                    <p id="ppfYears-error" class="hidden text-red-500 text-sm mt-1"></p>
                    <p class="text-xs text-gray-500 mt-1">Minimum: 15 years</p>
                </div>

                <button onclick="calculatePPF()" 
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                    Calculate Maturity
                </button>
            </div>

            <div id="ppfResult" class="hidden animate-fade-in">
                <div class="profit-bg rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">PPF Maturity</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span>Total Investment:</span>
                            <span class="text-xl font-bold" id="ppfInvested">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Total Interest:</span>
                            <span class="text-xl font-bold" id="ppfInterest">-</span>
                        </div>
                        <div class="flex justify-between items-center pt-3 border-t border-white border-opacity-30">
                            <span>Maturity Value:</span>
                            <span class="text-4xl font-bold" id="ppfMaturity">-</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-xl p-6">
                    <h4 class="font-semibold text-gray-900 mb-3">Tax Benefits</h4>
                    <div class="space-y-2 text-sm">
                        <div class="flex items-start">
                            <div class="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-2"></div>
                            <span class="text-gray-600">Investment qualifies for tax deduction under Section 80C</span>
                        </div>
                        <div class="flex items-start">
                            <div class="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-2"></div>
                            <span class="text-gray-600">Interest earned is tax-free</span>
                        </div>
                        <div class="flex items-start">
                            <div class="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-2"></div>
                            <span class="text-gray-600">Maturity amount is tax-free (EEE category)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculatePPF() {
    const yearlyAmount = parseFormattedNumber(document.getElementById('ppfAmount').value);
    const rate = parseFormattedNumber(document.getElementById('ppfRate').value);
    const years = parseFormattedNumber(document.getElementById('ppfYears').value);
    
    let valid = true;
    
    if (!yearlyAmount || yearlyAmount <= 0) {
        showError('ppfAmount', 'Please enter valid yearly investment');
        valid = false;
    }
    if (yearlyAmount > 150000) {
        showError('ppfAmount', 'Maximum yearly investment is ₹1,50,000');
        valid = false;
    }
    if (!rate || rate <= 0) {
        showError('ppfRate', 'Please enter valid interest rate');
        valid = false;
    }
    if (!years || years < 15) {
        showError('ppfYears', 'Minimum tenure is 15 years');
        valid = false;
    }
    
    if (!valid) return;
    
    const totalInvested = yearlyAmount * years;
    
    // PPF compounds annually
    let maturityAmount = 0;
    for (let i = 0; i < years; i++) {
        maturityAmount = (maturityAmount + yearlyAmount) * (1 + rate / 100);
    }
    
    const interest = maturityAmount - totalInvested;
    
    document.getElementById('ppfInvested').textContent = '₹' + formatNumber(totalInvested.toFixed(2));
    document.getElementById('ppfInterest').textContent = '₹' + formatNumber(interest.toFixed(2));
    document.getElementById('ppfMaturity').textContent = '₹' + formatNumber(maturityAmount.toFixed(2));
    
    document.getElementById('ppfResult').classList.remove('hidden');
}

// NPS Calculator
function loadNPSCalculator(container) {
    container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Current Age (Years)</label>
                    <input type="text" id="npsAge" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 30"
                           oninput="handleNumberInput(event); clearError('npsAge')"
                           onblur="formatInputNumber(event)">
                    <p id="npsAge-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Retirement Age (Years)</label>
                    <input type="text" id="npsRetirement" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 60"
                           value="60"
                           oninput="handleNumberInput(event); clearError('npsRetirement')"
                           onblur="formatInputNumber(event)">
                    <p id="npsRetirement-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Monthly Contribution (₹)</label>
                    <input type="text" id="npsAmount" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 5000"
                           oninput="handleNumberInput(event); clearError('npsAmount')"
                           onblur="formatInputNumber(event)">
                    <p id="npsAmount-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Expected Return (% p.a.)</label>
                    <input type="text" id="npsReturn" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 10"
                           value="10"
                           oninput="handleNumberInput(event); clearError('npsReturn')"
                           onblur="formatInputNumber(event)">
                    <p id="npsReturn-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Annuity Percentage (%)</label>
                    <input type="text" id="npsAnnuity" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 40"
                           value="40"
                           oninput="handleNumberInput(event); clearError('npsAnnuity')"
                           onblur="formatInputNumber(event)">
                    <p id="npsAnnuity-error" class="hidden text-red-500 text-sm mt-1"></p>
                    <p class="text-xs text-gray-500 mt-1">Minimum 40% must be used for annuity</p>
                </div>

                <button onclick="calculateNPS()" 
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                    Calculate Corpus
                </button>
            </div>

            <div id="npsResult" class="hidden animate-fade-in">
                <div class="profit-bg rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">NPS Retirement Corpus</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span>Total Investment:</span>
                            <span class="text-xl font-bold" id="npsInvested">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Total Wealth Gained:</span>
                            <span class="text-xl font-bold" id="npsWealth">-</span>
                        </div>
                        <div class="flex justify-between items-center pt-3 border-t border-white border-opacity-30">
                            <span>Total Corpus:</span>
                            <span class="text-3xl font-bold" id="npsCorpus">-</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-xl p-6">
                    <h4 class="font-semibold text-gray-900 mb-3">Withdrawal Options</h4>
                    <div class="space-y-3">
                        <div class="bg-white p-3 rounded-lg">
                            <p class="text-xs text-gray-500 mb-1">Lump Sum (60%)</p>
                            <p class="text-lg font-bold text-gray-900" id="npsLumpsum">-</p>
                        </div>
                        <div class="bg-blue-50 p-3 rounded-lg">
                            <p class="text-xs text-gray-500 mb-1">Annuity Purchase (40%)</p>
                            <p class="text-lg font-bold text-gray-900" id="npsAnnuityAmount">-</p>
                        </div>
                        <div class="mt-2 text-xs text-gray-500">
                            <p>* Assuming 6% annuity rate, estimated monthly pension:</p>
                            <p class="text-sm font-semibold text-gray-700 mt-1" id="npsMonthlyPension">-</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateNPS() {
    const age = parseFormattedNumber(document.getElementById('npsAge').value);
    const retirementAge = parseFormattedNumber(document.getElementById('npsRetirement').value);
    const monthlyContribution = parseFormattedNumber(document.getElementById('npsAmount').value);
    const returnRate = parseFormattedNumber(document.getElementById('npsReturn').value);
    const annuityPercent = parseFormattedNumber(document.getElementById('npsAnnuity').value);
    
    let valid = true;
    
    if (!age || age <= 0 || age >= 60) {
        showError('npsAge', 'Please enter valid current age (below 60)');
        valid = false;
    }
    if (!retirementAge || retirementAge <= age || retirementAge > 70) {
        showError('npsRetirement', 'Retirement age must be between current age and 70');
        valid = false;
    }
    if (!monthlyContribution || monthlyContribution <= 0) {
        showError('npsAmount', 'Please enter valid monthly contribution');
        valid = false;
    }
    if (!returnRate || returnRate <= 0) {
        showError('npsReturn', 'Please enter valid expected return');
        valid = false;
    }
    if (!annuityPercent || annuityPercent < 40 || annuityPercent > 100) {
        showError('npsAnnuity', 'Annuity percentage must be between 40% and 100%');
        valid = false;
    }
    
    if (!valid) return;
    
    const years = retirementAge - age;
    const months = years * 12;
    const monthlyRate = returnRate / 12 / 100;
    const totalInvested = monthlyContribution * months;
    
    // Future Value calculation
    const corpus = monthlyContribution * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const wealth = corpus - totalInvested

}

function loadEPFCalculator(container){
    container.innerHTML = '<p class="text-gray-600">Calculator coming soon...</p>';
}
function loadPostOfficeSchemeCalculator(container){
    container.innerHTML = '<p class="text-gray-600">Calculator coming soon...</p>';
}
function loadSavingsAccountInterestCalculator(container){
    container.innerHTML = '<p class="text-gray-600">Calculator coming soon...</p>';
}