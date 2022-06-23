waitUntilElementLoaded('#fixedExpenses-template', 5000).then(function (element) {
	let container = document.querySelector('.fixedExpenses-container');

	try {
		let data = JSON.parse(fixedExpenses);
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
			let yearTemplate = document.getElementById('fixedExpenses-template').innerHTML;
			// create new year table
			yearTemplate = yearTemplate.replaceAll('{{fixedExpenses-year}}', entry.year);	
			let newTable = document.createElement('div');
			newTable.id = "fixedExpenses" + entry.year;
			newTable.className = "incomeTableYear";
			newTable.style.display = "none";
			if(entry.year == "2022") newTable.style.display = "block";
			newTable.innerHTML = yearTemplate;
			container.appendChild(newTable);
			
			// get the table inner body (after header) that we will populate with rows
			let divTableBody = document.querySelector('.divTableBody' + entry.year);
			let numOfFixedExpenses = parseInt(entry.numOfFixedExpenses);

			for (let apartmentCounter = 1; apartmentCounter <= numOfFixedExpenses; apartmentCounter++) { 
				// get the template for an appartment (12 month)
				let rowTemplate = document.getElementById('fixedExpensesRow-template').innerHTML;
				// replace the first cell with appartment number
				rowTemplate = rowTemplate.replaceAll('{{exp_x}}', apartmentCounter);
				for (let monthCounter = 1; monthCounter <= 12; monthCounter++) {
					let currentEntryName = 'month_' + monthCounter + '_exp_' + apartmentCounter;
					let currentValue = entry[currentEntryName];
					rowTemplate = rowTemplate.replaceAll('{{month_' + monthCounter + '_exp_x}}', currentValue);
				}

				// // add total per appartment entry totalApt_37
				// var payedSoFar = entry['totalExp_' + apartmentCounter].ammount;
				// rowTemplate = rowTemplate.replaceAll('{{month_13_exp_x}}', payedSoFar); // total payed so far

				let newRow = document.createElement('tr');
				newRow.innerHTML = rowTemplate;
				divTableBody.appendChild(newRow);	
			}
		});
	}
	catch (err) {
		// error occurred
		console.log("Failed to create fixedExpenses due to: " + err);
	}
}).catch(function () {
	// element not found within 5000 milliseconds
	console.log("Failed to find #fixedExpenses-template for 5 sec");
});

function changeYear()
{
	// get the selected year
	var selectedYear = document.getElementById("yearSelector");
	
	// get all income tables for all years and hide them
	const incomeTableYears = Array.from(document.getElementsByClassName('fixedExpensesYear'));
	incomeTableYears.forEach(currentIncomeTableYear => {
    	currentIncomeTableYear.style.display = 'none';
  	});

	// show the selected year
	var incomeTableYear = document.getElementById("fixedExpenses" + selectedYear.value);
	incomeTableYear.style.display = "block";
}