// get input
function getInput() {
    // get each of the values from the inputs
    let loanAmount = parseFloat(document.getElementById('loanAmount').value);
    let term = parseInt(document.getElementById('term').value);
    let interestRate = parseFloat(document.getElementById('interestRate').value);


    // make sure those values make sense
    if (isNaN(loanAmount) || isNaN(term) || isNaN(interestRate)
        || loanAmount <= 0 || term <= 0 || interestRate <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Please enter valid loan details'
        });
    } else {
        let loanTotals = calculateTotals(loanAmount, term, interestRate);
        displayTotals(loanTotals.monthlyPayment, loanAmount, loanTotals.totalCost, loanTotals.totalInterest);
        let data = calculatePayments(term, loanTotals.monthlyPayment, loanAmount, interestRate);
        displayPayments(data);
    }
}

// calculate totals
function calculateTotals(loan, term, rate) {
    // monthly payment
    let Payment = (loan * (rate / 1200)) / (1 - Math.pow((1 + rate / 1200), -term));

    // total cost
    let totalCost = Payment * term;

    // total interest
    let totalInterest = totalCost - loan;

    let loanTotals = {
        monthlyPayment: Payment,
        totalCost: totalCost,
        totalInterest: totalInterest
    };
    return loanTotals;
}


function displayTotals(monthlyPayment, principal, totalCost, totalInterest) {
    let formatOptions = {
        style: 'currency', currency: 'USD'
    }
    document.getElementById('monthlyPayment').textContent = monthlyPayment.toLocaleString('en-US', formatOptions);
    document.getElementById('totalPrincipal').textContent = principal.toLocaleString('en-US', formatOptions);
    document.getElementById('totalInterest').textContent = totalInterest.toLocaleString('en-US', formatOptions);
    document.getElementById('totalCost').textContent = totalCost.toLocaleString('en-US', formatOptions);

}

function calculatePayments(term, monthlyPayment, principal, rate) {
    let remainingBalance = principal;
    let totalInterest = 0;
    let paymentsArray = [];

    for (let Month = 1; Month <= term; Month++) {

        let interestPayment = remainingBalance * (rate / 1200);
        let principalPayment = monthlyPayment - interestPayment;
        totalInterest += interestPayment;
        remainingBalance -= principalPayment;
        let loanPayment = {
            month: Month,
            payment: monthlyPayment,
            principal: principalPayment,
            interest: interestPayment,
            totalInterest,
            balance: remainingBalance
        };
        paymentsArray.push(loanPayment);
    }
    return paymentsArray;
}
// display each month
function displayPayments(data) {
    const rowTemplate = document.getElementById('tableTemplate');
    const table = document.getElementById('dataTable');
    table.innerHTML = '';
    let formatOptions = {
        style: 'currency', currency: 'USD'
    }
    for (let i = 0; i < data.length; i++) {
        let currentRow = data[i];
        let tableRow = rowTemplate.content.cloneNode(true);
        let tableCells = tableRow.querySelectorAll('td');
        tableCells[0].textContent = currentRow.month;
        tableCells[1].textContent = currentRow.payment.toLocaleString('en-US', formatOptions);
        tableCells[2].textContent = currentRow.principal.toLocaleString('en-US', formatOptions);
        tableCells[3].textContent = currentRow.interest.toLocaleString('en-US', formatOptions);
        tableCells[4].textContent = currentRow.totalInterest.toLocaleString('en-US', formatOptions);
        tableCells[5].textContent = Math.abs(currentRow.balance).toLocaleString('en-US', formatOptions);

        if (i == data.length - 1) {
            tableRow.querySelector('tr').classList.add('table-success');
        }

        table.appendChild(tableRow);
    }

}


// function getInput() {
//     let loanAmount = parseInt(document.getElementById('loanAmount').value);
//     let term = parseInt(document.getElementById('term').value);
//     let interestRate = parseFloat(document.getElementById('interestRate').value);

//     buildTable(loanAmount, term, interestRate);
// }

// function buildTable(loan, term, rate) {
//     const rowTemplate = document.getElementById('tableTemplate');
//     const table = document.getElementById('dataTable');
//     table.innerHTML = '';

//     let Payment = (loan * rate / 1200) / (1 - (Math.pow(1 + (rate / 1200), (-Math.abs(term)))));
//     let Principal = '';
//     let Interest = '';
//     let countingInterest = '';
//     let Balance = '';
//     let totalInterest = 0;

//     for (let i = 1; i <= term; i++) {
//         let Month = i;
//         let tableRow = rowTemplate.content.cloneNode(true);
//         Interest = (loan-Payment)*(rate/1200);
//         tableRow.querySelector('[data-id="Month"]').innerText = Month;
//         tableRow.querySelector('[data-id="Payment"]').innerText = Payment;
//         tableRow.querySelector('[data-id="Principal"]').innerText = Principal;
//         tableRow.querySelector('[data-id="Interest"]').innerText = Interest;
//         tableRow.querySelector('[data-id="countingInterest"]').innerText = countingInterest;
//         tableRow.querySelector('[data-id="Balance"]').innerText = Balance;
//         table.appendChild(tableRow);

//         let totalPrincipal = '';
//         totalInterest += Interest;
//         let totalCost = '';
//     }
//     document.getElementById('monthlyPayment').innerHTML = Payment;
//     document.getElementById('totalPrincipal').innerHTML = totalPrincipal;
//     document.getElementById('totalInterest').innerHTML = totalInterest;
//     document.getElementById('totalCost').innerHTML = totalCost;

// }
