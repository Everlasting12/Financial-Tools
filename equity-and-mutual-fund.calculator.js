// EQUITY & MUTUAL FUND CALCULATORS

// Stock Average Calculator
function loadStockAverageCalculator(container) {
    container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">First Purchase</h3>
                
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Number of Shares</label>
                    <input type="text" id="shares1" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 100"
                           oninput="handleNumberInput(event); clearError('shares1')"
                           onblur="formatInputNumber(event)">
                    <p id="shares1-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Price per Share (₹)</label>
                    <input type="text" id="price1" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 150.50"
                           oninput="handleNumberInput(event); clearError('price1')"
                           onblur="formatInputNumber(event)">
                    <p id="price1-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <h3 class="text-lg font-semibold text-gray-900 mb-4 pt-4">Second Purchase</h3>
                
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Number of Shares</label>
                    <input type="text" id="shares2" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 50"
                           oninput="handleNumberInput(event); clearError('shares2')"
                           onblur="formatInputNumber(event)">
                    <p id="shares2-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Price per Share (₹)</label>
                    <input type="text" id="price2" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 180.75"
                           oninput="handleNumberInput(event); clearError('price2')"
                           onblur="formatInputNumber(event)">
                    <p id="price2-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateStockAverage()" 
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                    Calculate Average
                </button>
            </div>

            <div id="stockAverageResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">Results</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span>Total Shares:</span>
                            <span class="text-2xl font-bold" id="totalShares">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Total Investment:</span>
                            <span class="text-2xl font-bold" id="totalInvestment">-</span>
                        </div>
                        <div class="flex justify-between items-center pt-3 border-t border-white border-opacity-30">
                            <span>Average Price:</span>
                            <span class="text-3xl font-bold" id="averagePrice">-</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-xl p-6">
                    <h4 class="font-semibold text-gray-900 mb-3">Breakdown</h4>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">First Purchase:</span>
                            <span class="font-medium" id="invest1">-</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Second Purchase:</span>
                            <span class="font-medium" id="invest2">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateStockAverage() {
    const shares1 = parseFormattedNumber(document.getElementById('shares1').value);
    const price1 = parseFormattedNumber(document.getElementById('price1').value);
    const shares2 = parseFormattedNumber(document.getElementById('shares2').value);
    const price2 = parseFormattedNumber(document.getElementById('price2').value);
    
    let valid = true;
    
    if (!shares1 || shares1 <= 0) {
        showError('shares1', 'Please enter valid number of shares');
        valid = false;
    }
    if (!price1 || price1 <= 0) {
        showError('price1', 'Please enter valid price');
        valid = false;
    }
    if (!shares2 || shares2 <= 0) {
        showError('shares2', 'Please enter valid number of shares');
        valid = false;
    }
    if (!price2 || price2 <= 0) {
        showError('price2', 'Please enter valid price');
        valid = false;
    }
    
    if (!valid) return;
    
    const totalShares = shares1 + shares2;
    const invest1 = shares1 * price1;
    const invest2 = shares2 * price2;
    const totalInvestment = invest1 + invest2;
    const averagePrice = totalInvestment / totalShares;
    
    document.getElementById('totalShares').textContent = formatNumber(totalShares);
    document.getElementById('totalInvestment').textContent = '₹' + formatNumber(totalInvestment.toFixed(2));
    document.getElementById('averagePrice').textContent = '₹' + formatNumber(averagePrice.toFixed(2));
    document.getElementById('invest1').textContent = '₹' + formatNumber(invest1.toFixed(2));
    document.getElementById('invest2').textContent = '₹' + formatNumber(invest2.toFixed(2));
    
    document.getElementById('stockAverageResult').classList.remove('hidden');
}

// Profit/Loss Calculator
function loadProfitLossCalculator(container) {
    container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Number of Shares/Units</label>
                    <input type="text" id="plShares" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 100"
                           oninput="handleNumberInput(event); clearError('plShares')"
                           onblur="formatInputNumber(event)">
                    <p id="plShares-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Buy Price (₹)</label>
                    <input type="text" id="buyPrice" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 150.50"
                           oninput="handleNumberInput(event); clearError('buyPrice')"
                           onblur="formatInputNumber(event)">
                    <p id="buyPrice-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Sell Price (₹)</label>
                    <input type="text" id="sellPrice" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 180.75"
                           oninput="handleNumberInput(event); clearError('sellPrice')"
                           onblur="formatInputNumber(event)">
                    <p id="sellPrice-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Brokerage & Charges (%)</label>
                    <input type="text" id="charges" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 0.5"
                           value="0.5"
                           oninput="handleNumberInput(event); clearError('charges')"
                           onblur="formatInputNumber(event)">
                    <p id="charges-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateProfitLoss()" 
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                    Calculate P&L
                </button>
            </div>

            <div id="plResult" class="hidden animate-fade-in">
                <div id="plCard" class="result-card rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">Profit & Loss</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span>Total Investment:</span>
                            <span class="text-xl font-bold" id="plInvestment">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Total Returns:</span>
                            <span class="text-xl font-bold" id="plReturns">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Total Charges:</span>
                            <span class="text-xl font-bold" id="plCharges">-</span>
                        </div>
                        <div class="flex justify-between items-center pt-3 border-t border-white border-opacity-30">
                            <span>Net P&L:</span>
                            <span class="text-3xl font-bold" id="netPL">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Return (%):</span>
                            <span class="text-2xl font-bold" id="returnPercent">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateProfitLoss() {
    const shares = parseFormattedNumber(document.getElementById('plShares').value);
    const buyPrice = parseFormattedNumber(document.getElementById('buyPrice').value);
    const sellPrice = parseFormattedNumber(document.getElementById('sellPrice').value);
    const chargesPercent = parseFormattedNumber(document.getElementById('charges').value);
    
    let valid = true;
    
    if (!shares || shares <= 0) {
        showError('plShares', 'Please enter valid number of shares');
        valid = false;
    }
    if (!buyPrice || buyPrice <= 0) {
        showError('buyPrice', 'Please enter valid buy price');
        valid = false;
    }
    if (!sellPrice || sellPrice <= 0) {
        showError('sellPrice', 'Please enter valid sell price');
        valid = false;
    }
    if (chargesPercent < 0) {
        showError('charges', 'Charges cannot be negative');
        valid = false;
    }
    
    if (!valid) return;
    
    const investment = shares * buyPrice;
    const returns = shares * sellPrice;
    const charges = (investment + returns) * (chargesPercent / 100);
    const netPL = returns - investment - charges;
    const returnPercent = (netPL / investment) * 100;
    
    document.getElementById('plInvestment').textContent = '₹' + formatNumber(investment.toFixed(2));
    document.getElementById('plReturns').textContent = '₹' + formatNumber(returns.toFixed(2));
    document.getElementById('plCharges').textContent = '₹' + formatNumber(charges.toFixed(2));
    document.getElementById('netPL').textContent = '₹' + formatNumber(Math.abs(netPL).toFixed(2));
    document.getElementById('returnPercent').textContent = returnPercent.toFixed(2) + '%';
    
    const plCard = document.getElementById('plCard');
    if (netPL >= 0) {
        plCard.className = 'profit-bg rounded-xl p-6 text-white mb-4';
    } else {
        plCard.className = 'loss-bg rounded-xl p-6 text-white mb-4';
    }
    
    document.getElementById('plResult').classList.remove('hidden');
}

// CAGR Calculator
function loadCAGRCalculator(container) {
    container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Initial Investment (₹)</label>
                    <input type="text" id="cagrInitial" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 100000"
                           oninput="handleNumberInput(event); clearError('cagrInitial')"
                           onblur="formatInputNumber(event)">
                    <p id="cagrInitial-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Final Value (₹)</label>
                    <input type="text" id="cagrFinal" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 250000"
                           oninput="handleNumberInput(event); clearError('cagrFinal')"
                           onblur="formatInputNumber(event)">
                    <p id="cagrFinal-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Investment Period (Years)</label>
                    <input type="text" id="cagrYears" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 5"
                           oninput="handleNumberInput(event); clearError('cagrYears')"
                           onblur="formatInputNumber(event)">
                    <p id="cagrYears-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateCAGR()" 
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                    Calculate CAGR
                </button>
            </div>

            <div id="cagrResult" class="hidden animate-fade-in">
                <div class="result-card rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">CAGR Results</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span>Compound Annual Growth Rate:</span>
                            <span class="text-4xl font-bold" id="cagrRate">-</span>
                        </div>
                        <div class="flex justify-between items-center pt-3 border-t border-white border-opacity-30">
                            <span>Total Gain:</span>
                            <span class="text-2xl font-bold" id="cagrGain">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Absolute Return:</span>
                            <span class="text-xl font-bold" id="cagrAbsolute">-</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-xl p-6">
                    <h4 class="font-semibold text-gray-900 mb-3">Investment Summary</h4>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Initial Amount:</span>
                            <span class="font-medium" id="cagrInitialDisplay">-</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Final Amount:</span>
                            <span class="font-medium" id="cagrFinalDisplay">-</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Duration:</span>
                            <span class="font-medium" id="cagrYearsDisplay">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateCAGR() {
    const initial = parseFormattedNumber(document.getElementById('cagrInitial').value);
    const final = parseFormattedNumber(document.getElementById('cagrFinal').value);
    const years = parseFormattedNumber(document.getElementById('cagrYears').value);
    
    let valid = true;
    
    if (!initial || initial <= 0) {
        showError('cagrInitial', 'Please enter valid initial investment');
        valid = false;
    }
    if (!final || final <= 0) {
        showError('cagrFinal', 'Please enter valid final value');
        valid = false;
    }
    if (!years || years <= 0) {
        showError('cagrYears', 'Please enter valid number of years');
        valid = false;
    }
    if (final <= initial) {
        showError('cagrFinal', 'Final value must be greater than initial investment');
        valid = false;
    }
    
    if (!valid) return;
    
    const cagr = (Math.pow(final / initial, 1 / years) - 1) * 100;
    const gain = final - initial;
    const absoluteReturn = ((final - initial) / initial) * 100;
    
    document.getElementById('cagrRate').textContent = cagr.toFixed(2) + '%';
    document.getElementById('cagrGain').textContent = '₹' + formatNumber(gain.toFixed(2));
    document.getElementById('cagrAbsolute').textContent = absoluteReturn.toFixed(2) + '%';
    document.getElementById('cagrInitialDisplay').textContent = '₹' + formatNumber(initial.toFixed(2));
    document.getElementById('cagrFinalDisplay').textContent = '₹' + formatNumber(final.toFixed(2));
    document.getElementById('cagrYearsDisplay').textContent = years + ' years';
    
    document.getElementById('cagrResult').classList.remove('hidden');
}

// SIP Calculator
function loadSIPCalculator(container) {
    container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Monthly Investment (₹)</label>
                    <input type="text" id="sipAmount" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 5000"
                           oninput="handleNumberInput(event); clearError('sipAmount')"
                           onblur="formatInputNumber(event)">
                    <p id="sipAmount-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Expected Return Rate (% p.a.)</label>
                    <input type="text" id="sipRate" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 12"
                           value="12"
                           oninput="handleNumberInput(event); clearError('sipRate')"
                           onblur="formatInputNumber(event)">
                    <p id="sipRate-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <div class="input-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Time Period (Years)</label>
                    <input type="text" id="sipYears" 
                           class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                           placeholder="e.g., 10"
                           oninput="handleNumberInput(event); clearError('sipYears')"
                           onblur="formatInputNumber(event)">
                    <p id="sipYears-error" class="hidden text-red-500 text-sm mt-1"></p>
                </div>

                <button onclick="calculateSIP()" 
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                    Calculate Returns
                </button>
            </div>

            <div id="sipResult" class="hidden animate-fade-in">
                <div class="profit-bg rounded-xl p-6 text-white mb-4">
                    <h3 class="text-lg font-semibold mb-4">SIP Returns</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span>Total Investment:</span>
                            <span class="text-xl font-bold" id="sipInvested">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Estimated Returns:</span>
                            <span class="text-xl font-bold" id="sipReturns">-</span>
                        </div>
                        <div class="flex justify-between items-center pt-3 border-t border-white border-opacity-30">
                            <span>Maturity Value:</span>
                            <span class="text-4xl font-bold" id="sipMaturity">-</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-xl p-6">
                    <h4 class="font-semibold text-gray-900 mb-3">Investment Breakdown</h4>
                    <div class="space-y-2">
                        <div class="flex items-center">
                            <div class="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                            <span class="text-sm text-gray-600 flex-1">Your Investment</span>
                            <span class="text-sm font-medium" id="sipInvestedPercent">-</span>
                        </div>
                        <div class="flex items-center">
                            <div class="w-4 h-4 bg-green-500 rounded mr-2"></div>
                            <span class="text-sm text-gray-600 flex-1">Wealth Gained</span>
                            <span class="text-sm font-medium" id="sipGainPercent">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateSIP() {
    const monthlyAmount = parseFormattedNumber(document.getElementById('sipAmount').value);
    const annualRate = parseFormattedNumber(document.getElementById('sipRate').value);
    const years = parseFormattedNumber(document.getElementById('sipYears').value);
    
    let valid = true;
    
    if (!monthlyAmount || monthlyAmount <= 0) {
        showError('sipAmount', 'Please enter valid monthly amount');
        valid = false;
    }
    if (!annualRate || annualRate <= 0) {
        showError('sipRate', 'Please enter valid return rate');
        valid = false;
    }
    if (!years || years <= 0) {
        showError('sipYears', 'Please enter valid time period');
        valid = false;
    }
    
    if (!valid) return;
    
    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;
    const totalInvested = monthlyAmount * months;
    
    // Future Value of SIP formula
    const maturityValue = monthlyAmount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const estimatedReturns = maturityValue - totalInvested;
    
    const investedPercent = (totalInvested / maturityValue * 100).toFixed(1);
    const gainPercent = (estimatedReturns / maturityValue * 100).toFixed(1);
    
    document.getElementById('sipInvested').textContent = '₹' + formatNumber(totalInvested.toFixed(2));
    document.getElementById('sipReturns').textContent = '₹' + formatNumber(estimatedReturns.toFixed(2));
    document.getElementById('sipMaturity').textContent = '₹' + formatNumber(maturityValue.toFixed(2));
    document.getElementById('sipInvestedPercent').textContent = investedPercent + '%';
    document.getElementById('sipGainPercent').textContent = gainPercent + '%';
    
    document.getElementById('sipResult').classList.remove('hidden');
}