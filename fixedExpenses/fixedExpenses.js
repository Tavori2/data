waitUntilElementLoaded('#fixedExpenses-template', 5000).then(function (element) {
	let container = document.querySelector('.fixedExpenses-container');

	try {
		let data = JSON.parse(fixedExpenses);
		// loop each year entry in the fixedExpenses json
		data.forEach(entry => {
			// add the year as option to the year selector
			let yearSelector = document.getElementById('expYearSelector');
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
			newTable.className = "fixedExpensesYear";
			newTable.style.display = "none";
			if(entry.year == "2022") newTable.style.display = "block";
			newTable.innerHTML = yearTemplate;
			container.appendChild(newTable);
			
			// get the table inner body (after header) that we will populate with rows
			let divTableBody = document.querySelector('.fixedExpensesTB' + entry.year);
			let numOfFixedExpenses = parseInt(entry.numOfFixedExpenses);

			for (let apartmentCounter = 1; apartmentCounter <= numOfFixedExpenses; apartmentCounter++) { 
				// get the template for an appartment (12 month)
				let rowTemplate = document.getElementById('fixedExpensesRow-template').innerHTML;
				// replace the first cell with appartment number
				rowTemplate = rowTemplate.replaceAll('{{exp_x}}', entry['expense_' + apartmentCounter]);
				for (let monthCounter = 1; monthCounter <= 12; monthCounter++) {
					let currentEntryName = 'month_' + monthCounter + '_exp_' + apartmentCounter;
					let currentValue = entry[currentEntryName];
					rowTemplate = rowTemplate.replaceAll('{{month_' + monthCounter + '_exp_x}}', currentValue);
					if(currentValue != "")
					{
						rowTemplate = rowTemplate.replaceAll('{{contentClass' + monthCounter + '}}', "fixedExp");
					}
					else
					{
						rowTemplate = rowTemplate.replaceAll('{{contentClass' + monthCounter + '}}', "");
					}
				}

				// add total per appartment entry totalApt_37
				var payedSoFar = entry['totalExp_' + apartmentCounter];
				rowTemplate = rowTemplate.replaceAll('{{month_13_exp_x}}', payedSoFar); // total payed so far
				if(payedSoFar != "")
				{
					rowTemplate = rowTemplate.replaceAll('{{contentClass13}}', "fixedExpTotal");
				}
				else
				{
					rowTemplate = rowTemplate.replaceAll('{{contentClass13}}', "");
				}

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

function changeExpYear()
{
	// get the selected year
	var selectedYear = document.getElementById("expYearSelector");
	
	// get all fixedExpenses for all years and hide them
	const fixedExpensesYears = Array.from(document.getElementsByClassName('fixedExpensesYear'));
	fixedExpensesYears.forEach(currentFixedExpensesYear => {
    	currentFixedExpensesYear.style.display = 'none';
  	});

	// show the selected year
	var fixedExpensesYear = document.getElementById("fixedExpenses" + selectedYear.value);
	fixedExpensesYear.style.display = "block";
}