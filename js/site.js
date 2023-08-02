function getInput() {
    let loanAmount = parseInt(document.getElementById('loanAmount').value);
    let term = parseInt(document.getElementById('term').value);
    let interestRate = parseFloat(document.getElementById('interestRate').value);

    let array = [loanAmount, term, interestRate];
    buildTable(array);
}

function buildTable(array) {
    const rowTemplate = document.getElementById('tableTemplate');
    const table = document.getElementById('dataTable');
    table.innerHTML = '';

    let Payment = (array[0] * array[2] / 1200) / (1 - (Math.pow(1 + (array[2] / 1200), (-Math.abs(array[1])))));
    let Principal = '';
    let Interest = '';
    let countingInterest = '';
    let Balance = '';
    
    for (let i = 1; i <= array[1]; i++) {
        let Month = i;
        let tableRow = rowTemplate.content.cloneNode(true);
        Interest = (array[0]-Payment)*(array[2]/1200);
        tableRow.querySelector('[data-id="Month"]').innerText = Month;
        tableRow.querySelector('[data-id="Payment"]').innerText = Payment;
        tableRow.querySelector('[data-id="Principal"]').innerText = Principal;
        tableRow.querySelector('[data-id="Interest"]').innerText = Interest;
        tableRow.querySelector('[data-id="countingInterest"]').innerText = countingInterest;
        tableRow.querySelector('[data-id="Balance"]').innerText = Balance;
        table.appendChild(tableRow);

        let totalPrincipal = '';
        let totalInterest += Interest;
        let totalCost = '';
    }
    document.getElementById('monthlyPayment').innerHTML = Payment;
    document.getElementById('totalPrincipal').innerHTML = totalPrincipal;
    document.getElementById('totalInterest').innerHTML = totalInterest;
    document.getElementById('totalCost').innerHTML = totalCost;

}
