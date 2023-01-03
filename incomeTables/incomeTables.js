waitUntilElementLoaded('#incomeTables-template', 5000).then(function (element) {
	let container = document.querySelector('.incomeTables-container');

	try {
		let data = JSON.parse(incomeTables);
		// loop each year entry in the income tables json
		data.forEach(entry => {
			// add the year as option to the year selector
			let yearSelector = document.getElementById('yearSelector');
			let newOption = document.createElement('option');
			newOption.value = entry.year;
			newOption.textContent = entry.year;
			if(entry.year == "2022") newOption.selected = true;
			yearSelector.appendChild(newOption);

			// get the year table template
			let yearTemplate = document.getElementById('incomeTables-template').innerHTML;
			// create new year table
			yearTemplate = yearTemplate.replaceAll('{{income-year}}', entry.year);	
			let newTable = document.createElement('div');
			newTable.id = "incomeTable" + entry.year;
			newTable.className = "incomeTableYear";
			newTable.style.display = "none";
			if(entry.year == "2022") newTable.style.display = "block";
			newTable.innerHTML = yearTemplate;
			container.appendChild(newTable);
			
			// get the table inner body (after header) that we will populate with rows
			let divTableBody = document.querySelector('.incomeTablesTB' + entry.year);

			for (let apartmentCounter = 1; apartmentCounter <= 40; apartmentCounter++) { 
				// get the template for an appartment (12 month)
				let rowTemplate = document.getElementById('incomeTablesRow-template').innerHTML;
				// replace the first cell with appartment number
				rowTemplate = rowTemplate.replaceAll('{{apt_x}}', apartmentCounter);
				for (let monthCounter = 1; monthCounter <= 12; monthCounter++) {
					let currentEntryName = 'month_' + monthCounter + '_apt_' + apartmentCounter;
					let currentValue = entry[currentEntryName].ammount;
					let currentMethod = entry[currentEntryName].method;
					rowTemplate = rowTemplate.replaceAll('{{month_' + monthCounter + '_apt_x}}', currentValue);

					// set the cell background color based on the transfer method
					var payAmountClass = "";
					var payTitle = "";
					if(currentMethod == "Check") {
						payAmountClass = "checkMetod";
						payTitle = "צ'ק";
					}
					else if(currentMethod == "Transfer") {
						payAmountClass = "transferMetod";
						payTitle = "העברה בנקאית";
					}
					else if(currentMethod == "Cash") {
						payAmountClass = "cashMetod";
						payTitle = "מזומן";
					}
					rowTemplate = rowTemplate.replaceAll('{{contentClass' + monthCounter + '}}', payAmountClass);
					rowTemplate = rowTemplate.replaceAll('{{title' + monthCounter + '}}', payTitle);
				}

				// add total per appartment entry totalApt_37
				var payedSoFar = entry['totalApt_' + apartmentCounter].ammount;
				var remainToPay = entry['totalApt_' + apartmentCounter].remainToPay;
				var aptName = entry['totalApt_' + apartmentCounter].aptName;
				var diff = parseInt(remainToPay);
				var diffClass = "extraPayments"; 
				if(diff < 0)
				{
					diffClass = "missingPayments";
					rowTemplate = rowTemplate.replaceAll('{{title13}}', "צריכים לשלם עוד: " + diff); // how much is missing
				}
				else if(diff > 0)
				{
					rowTemplate = rowTemplate.replaceAll('{{title13}}', "קיימת יתרה של: " + diff); // how much is extra
				}
				else
				{
					rowTemplate = rowTemplate.replaceAll('{{title13}}', "הכל שולם עד לחודש זה"); // payed exactly
				}

				rowTemplate = rowTemplate.replaceAll('{{aptName}}', aptName); // apartment name
				

				rowTemplate = rowTemplate.replaceAll('{{contentClass13}}', diffClass); // red or green or white
				rowTemplate = rowTemplate.replaceAll('{{month_13_apt_x}}', payedSoFar); // total payed so far

				let newRow = document.createElement('tr');
				newRow.innerHTML = rowTemplate;
				divTableBody.appendChild(newRow);	
			}
		});
	}
	catch (err) {
		// error occurred
		console.log("Failed to create incomeTables due to: " + err);
	}
}).catch(function () {
	// element not found within 5000 milliseconds
	console.log("Failed to find #incomeTables-template for 5 sec");
});

function changeYear()
{
	// get the selected year
	var selectedYear = document.getElementById("yearSelector");
	
	// get all income tables for all years and hide them
	const incomeTableYears = Array.from(document.getElementsByClassName('incomeTableYear'));
	incomeTableYears.forEach(currentIncomeTableYear => {
    	currentIncomeTableYear.style.display = 'none';
  	});

	// show the selected year
	var incomeTableYear = document.getElementById("incomeTable" + selectedYear.value);
	incomeTableYear.style.display = "block";
}