// LOAN & CREDIT CALCULATORS

// EMI Calculator
function loadEMICalculator(container) {
    container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Loan Amount (₹)</label>
                    <input type="text" id="loanAmount" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 1000000"
                           oninput="handleNumberInput(event); clearError('loanAmount')"
                           onblur="formatInputNumber(event)">
                    <p id="loanAmount-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Interest Rate (% p.a.)</label>
                    <input type="text" id="interestRate" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 8.5"
                           oninput="handleNumberInput(event); clearError('interestRate')"
                           onblur="formatInputNumber(event)">
                    <p id="interestRate-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Loan Tenure (Years)</label>
                    <input type="text" id="loanTenure" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 20"
                           oninput="handleNumberInput(event); clearError('loanTenure')"
                           onblur="formatInputNumber(event)">
                    <p id="loanTenure-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateEMI()" 
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                    Calculate EMI
                </button>
            </div>

            <div id="emiResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">EMI Breakdown</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span>Monthly EMI:</span>
                            <span class="text-4xl font-bold" id="monthlyEMI">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Principal Amount:</span>
                            <span class="text-xl font-bold" id="emiPrincipal">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Total Interest:</span>
                            <span class="text-xl font-bold" id="emiInterest">-</span>
                        </div>
                        <div class="flex justify-between items-center pt-3 border-t border-white border-opacity-30">
                            <span>Total Amount:</span>
                            <span class="text-2xl font-bold" id="emiTotal">-</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-xl p-6">
                    <h4 class="font-semibold text-gray-900 mb-3">Payment Breakdown</h4>
                    <div class="space-y-2">
                        <div class="flex items-center">
                            <div class="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                            <span class="text-sm text-gray-600 flex-1">Principal</span>
                            <span class="text-sm font-medium" id="principalPercent">-</span>
                        </div>
                        <div class="flex items-center">
                            <div class="w-4 h-4 bg-red-500 rounded mr-2"></div>
                            <span class="text-sm text-gray-600 flex-1">Interest</span>
                            <span class="text-sm font-medium" id="interestPercent">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateEMI() {
    const principal = parseFormattedNumber(document.getElementById('loanAmount').value);
    const annualRate = parseFormattedNumber(document.getElementById('interestRate').value);
    const years = parseFormattedNumber(document.getElementById('loanTenure').value);
    
    let valid = true;
    
    if (!principal || principal <= 0) {
        showError('loanAmount', 'Please enter valid loan amount');
        valid = false;
    }
    if (!annualRate || annualRate <= 0) {
        showError('interestRate', 'Please enter valid interest rate');
        valid = false;
    }
    if (!years || years <= 0) {
        showError('loanTenure', 'Please enter valid tenure');
        valid = false;
    }
    
    if (!valid) return;
    
    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;
    
    // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;
    
    const principalPercent = (principal / totalAmount * 100).toFixed(1);
    const interestPercentVal = (totalInterest / totalAmount * 100).toFixed(1);
    
    document.getElementById('monthlyEMI').textContent = '₹' + formatNumber(emi.toFixed(2));
    document.getElementById('emiPrincipal').textContent = '₹' + formatNumber(principal.toFixed(2));
    document.getElementById('emiInterest').textContent = '₹' + formatNumber(totalInterest.toFixed(2));
    document.getElementById('emiTotal').textContent = '₹' + formatNumber(totalAmount.toFixed(2));
    document.getElementById('principalPercent').textContent = principalPercent + '%';
    document.getElementById('interestPercent').textContent = interestPercentVal + '%';
    
    document.getElementById('emiResult').classList.remove('hidden');
}

// Loan Eligibility Calculator
function loadLoanEligibilityCalculator(container) {
    container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Monthly Income (₹)</label>
                    <input type="text" id="monthlyIncome" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 75000"
                           oninput="handleNumberInput(event); clearError('monthlyIncome')"
                           onblur="formatInputNumber(event)">
                    <p id="monthlyIncome-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Monthly Obligations (₹)</label>
                    <input type="text" id="monthlyObligations" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 15000"
                           value="0"
                           oninput="handleNumberInput(event); clearError('monthlyObligations')"
                           onblur="formatInputNumber(event)">
                    <p id="monthlyObligations-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Interest Rate (% p.a.)</label>
                    <input type="text" id="eligInterestRate" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 8.5"
                           value="8.5"
                           oninput="handleNumberInput(event); clearError('eligInterestRate')"
                           onblur="formatInputNumber(event)">
                    <p id="eligInterestRate-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Loan Tenure (Years)</label>
                    <input type="text" id="eligTenure" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 20"
                           value="20"
                           oninput="handleNumberInput(event); clearError('eligTenure')"
                           onblur="formatInputNumber(event)">
                    <p id="eligTenure-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">FOIR (% of income for EMI)</label>
                    <input type="text" id="foir" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 50"
                           value="50"
                           oninput="handleNumberInput(event); clearError('foir')"
                           onblur="formatInputNumber(event)">
                    <p id="foir-error" class="hidden text-red-500 text-sm mt-1"></p>
                    <p class="text-xs text-gray-500 mt-1">Fixed Obligation to Income Ratio (typically 40-60%)</p>
                </div>

                <button onclick="calculateLoanEligibility()" 
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                    Check Eligibility
                </button>
            </div>

            <div id="eligResult" class="hidden animate-fade-in">
                <div class="profit-bg rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">Loan Eligibility</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span>Eligible Loan Amount:</span>
                            <span class="text-4xl font-bold" id="eligibleAmount">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Monthly EMI:</span>
                            <span class="text-xl font-bold" id="eligibleEMI">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Available for EMI:</span>
                            <span class="text-xl font-bold" id="availableEMI">-</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-xl p-6">
                    <h4 class="font-semibold text-gray-900 mb-3">Income Analysis</h4>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Monthly Income:</span>
                            <span class="font-medium" id="incomeDisplay">-</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Existing Obligations:</span>
                            <span class="font-medium" id="obligationsDisplay">-</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Net Available:</span>
                            <span class="font-medium" id="netAvailable">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateLoanEligibility() {
    const income = parseFormattedNumber(document.getElementById('monthlyIncome').value);
    const obligations = parseFormattedNumber(document.getElementById('monthlyObligations').value);
    const rate = parseFormattedNumber(document.getElementById('eligInterestRate').value);
    const years = parseFormattedNumber(document.getElementById('eligTenure').value);
    const foirPercent = parseFormattedNumber(document.getElementById('foir').value);
    
    let valid = true;
    
    if (!income || income <= 0) {
        showError('monthlyIncome', 'Please enter valid monthly income');
        valid = false;
    }
    if (obligations < 0) {
        showError('monthlyObligations', 'Obligations cannot be negative');
        valid = false;
    }
    if (!rate || rate <= 0) {
        showError('eligInterestRate', 'Please enter valid interest rate');
        valid = false;
    }
    if (!years || years <= 0) {
        showError('eligTenure', 'Please enter valid tenure');
        valid = false;
    }
    if (!foirPercent || foirPercent <= 0 || foirPercent > 100) {
        showError('foir', 'FOIR must be between 0 and 100');
        valid = false;
    }
    
    if (!valid) return;
    
    const availableForEMI = (income * foirPercent / 100) - obligations;
    
    if (availableForEMI <= 0) {
        showError('monthlyObligations', 'Obligations exceed allowable EMI limit');
        return;
    }
    
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    
    // Calculate loan amount from EMI: P = EMI * ((1+r)^n - 1) / (r * (1+r)^n)
    const eligibleLoan = availableForEMI * (Math.pow(1 + monthlyRate, months) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, months));
    
    document.getElementById('eligibleAmount').textContent = '₹' + formatNumber(eligibleLoan.toFixed(2));
    document.getElementById('eligibleEMI').textContent = '₹' + formatNumber(availableForEMI.toFixed(2));
    document.getElementById('availableEMI').textContent = '₹' + formatNumber(availableForEMI.toFixed(2));
    document.getElementById('incomeDisplay').textContent = '₹' + formatNumber(income.toFixed(2));
    document.getElementById('obligationsDisplay').textContent = '₹' + formatNumber(obligations.toFixed(2));
    document.getElementById('netAvailable').textContent = '₹' + formatNumber((income - obligations).toFixed(2));
    
    document.getElementById('eligResult').classList.remove('hidden');
}

// Loan Prepayment Calculator
function loadPrepaymentCalculator(container) {
    container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Loan Amount (₹)</label>
                    <input type="text" id="prepayLoan" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 2000000"
                           oninput="handleNumberInput(event); clearError('prepayLoan')"
                           onblur="formatInputNumber(event)">
                    <p id="prepayLoan-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Interest Rate (% p.a.)</label>
                    <input type="text" id="prepayRate" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 8.5"
                           oninput="handleNumberInput(event); clearError('prepayRate')"
                           onblur="formatInputNumber(event)">
                    <p id="prepayRate-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Loan Tenure (Years)</label>
                    <input type="text" id="prepayTenure" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 20"
                           oninput="handleNumberInput(event); clearError('prepayTenure')"
                           onblur="formatInputNumber(event)">
                    <p id="prepayTenure-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Prepayment Amount (₹)</label>
                    <input type="text" id="prepayAmount" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 200000"
                           oninput="handleNumberInput(event); clearError('prepayAmount')"
                           onblur="formatInputNumber(event)">
                    <p id="prepayAmount-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">After Months</label>
                    <input type="text" id="prepayAfter" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 12"
                           value="12"
                           oninput="handleNumberInput(event); clearError('prepayAfter')"
                           onblur="formatInputNumber(event)">
                    <p id="prepayAfter-error" class="hidden text-red-500 text-sm mt-1"></p>
                    <p class="text-xs text-gray-500 mt-1">When you plan to make prepayment</p>
                </div>

                <button onclick="calculatePrepayment()" 
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                    Calculate Savings
                </button>
            </div>

            <div id="prepayResult" class="hidden animate-fade-in">
                <div class="profit-bg rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">Prepayment Benefits</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center pt-3 border-b border-white border-opacity-30 pb-3">
                            <span>Interest Saved:</span>
                            <span class="text-4xl font-bold" id="interestSaved">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>New Tenure:</span>
                            <span class="text-xl font-bold" id="newTenure">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Time Saved:</span>
                            <span class="text-xl font-bold" id="timeSaved">-</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-xl p-6">
                    <h4 class="font-semibold text-gray-900 mb-3">Comparison</h4>
                    <div class="space-y-3">
                        <div class="bg-white p-3 rounded-lg">
                            <p class="text-xs text-gray-500 mb-1">Without Prepayment</p>
                            <div class="space-y-1 text-sm">
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Total Interest:</span>
                                    <span class="font-medium" id="originalInterest">-</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Total Payment:</span>
                                    <span class="font-medium" id="originalTotal">-</span>
                                </div>
                            </div>
                        </div>
                        <div class="bg-green-50 p-3 rounded-lg">
                            <p class="text-xs text-green-600 mb-1">With Prepayment</p>
                            <div class="space-y-1 text-sm">
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Total Interest:</span>
                                    <span class="font-medium text-green-700" id="newInterest">-</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Total Payment:</span>
                                    <span class="font-medium text-green-700" id="newTotal">-</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculatePrepayment() {
    const principal = parseFormattedNumber(document.getElementById('prepayLoan').value);
    const rate = parseFormattedNumber(document.getElementById('prepayRate').value);
    const years = parseFormattedNumber(document.getElementById('prepayTenure').value);
    const prepayAmt = parseFormattedNumber(document.getElementById('prepayAmount').value);
    const prepayAfter = parseFormattedNumber(document.getElementById('prepayAfter').value);
    
    let valid = true;
    
    if (!principal || principal <= 0) {
        showError('prepayLoan', 'Please enter valid loan amount');
        valid = false;
    }
    if (!rate || rate <= 0) {
        showError('prepayRate', 'Please enter valid interest rate');
        valid = false;
    }
    if (!years || years <= 0) {
        showError('prepayTenure', 'Please enter valid tenure');
        valid = false;
    }
    if (!prepayAmt || prepayAmt <= 0) {
        showError('prepayAmount', 'Please enter valid prepayment amount');
        valid = false;
    }
    if (!prepayAfter || prepayAfter < 0) {
        showError('prepayAfter', 'Please enter valid months');
        valid = false;
    }
    
    if (!valid) return;
    
    const monthlyRate = rate / 12 / 100;
    const totalMonths = years * 12;
    
    // Original EMI
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const originalTotal = emi * totalMonths;
    const originalInterest = originalTotal - principal;
    
    // Outstanding after prepayment period
    let outstanding = principal;
    for (let i = 0; i < prepayAfter; i++) {
        const interest = outstanding * monthlyRate;
        const principalPaid = emi - interest;
        outstanding -= principalPaid;
    }
    
    // New outstanding after prepayment
    const newPrincipal = outstanding - prepayAmt;
    const remainingMonths = totalMonths - prepayAfter;
    
    // Calculate new tenure with same EMI
    const newMonths = Math.log(emi / (emi - newPrincipal * monthlyRate)) / Math.log(1 + monthlyRate);
    const newTenure = Math.ceil(newMonths);
    
    // Calculate new total payment
    const paidTillPrepay = emi * prepayAfter;
    const newTotal = paidTillPrepay + prepayAmt + (emi * newTenure);
    const newInterest = newTotal - principal - prepayAmt;
    
    const saved = originalInterest - newInterest;
    const timeSavedMonths = remainingMonths - newTenure;
    
    document.getElementById('interestSaved').textContent = '₹' + formatNumber(saved.toFixed(2));
    document.getElementById('newTenure').textContent = Math.floor((prepayAfter + newTenure) / 12) + 'y ' + ((prepayAfter + newTenure) % 12) + 'm';
    document.getElementById('timeSaved').textContent = Math.floor(timeSavedMonths / 12) + 'y ' + (timeSavedMonths % 12) + 'm';
    document.getElementById('originalInterest').textContent = '₹' + formatNumber(originalInterest.toFixed(2));
    document.getElementById('originalTotal').textContent = '₹' + formatNumber(originalTotal.toFixed(2));
    document.getElementById('newInterest').textContent = '₹' + formatNumber(newInterest.toFixed(2));
    document.getElementById('newTotal').textContent = '₹' + formatNumber(newTotal.toFixed(2));
    
    document.getElementById('prepayResult').classList.remove('hidden');
}

function loadBalanceTransferCalculator(){
    container.innerHTML = '<p class="text-gray-600">Calculator coming soon...</p>';
}
function loadCreditCardInterestCalculator(){
    container.innerHTML = '<p class="text-gray-600">Calculator coming soon...</p>';
}
function loadAmortizationScheduleCalculator(){
    container.innerHTML = '<p class="text-gray-600">Calculator coming soon...</p>';
}