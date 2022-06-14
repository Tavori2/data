function waitUntilElementLoaded(selector) {
	var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	var start = performance.now();
	var now = 0;

	return new Promise(function (resolve, reject) {
		var interval = setInterval(function () {
			var element = document.querySelector(selector);

			if (element instanceof Element) {
				clearInterval(interval);

				resolve();
			}

			now = performance.now();

			if (now - start >= timeout) {
				reject("Could not find the element " + selector + " within " + timeout + " ms");
			}
		}, 100);
	});
}

waitUntilElementLoaded('#incomeTables-template', 5000).then(function (element) {
	let container = document.querySelector('.incomeTables-container');

	try {
		let data = JSON.parse(incomeTables);
		// loop each year entry in the income tables json
		data.forEach(entry => {
			// get the year table template
			let yearTemplate = document.getElementById('incomeTables-template').innerHTML;
			// create new year table
			yearTemplate = yearTemplate.replaceAll('{{income-year}}', entry.year);	
			let newTable = document.createElement('div');
			newTable.innerHTML = yearTemplate;
			container.appendChild(newTable);
			
			// get the table inner body (after header) that we will populate with rows
			let divTableBody = document.querySelector('.divTableBody' + entry.year);

			for (let apartmentCounter = 1; apartmentCounter <= 40; apartmentCounter++) { 
				// get the template for an appartment (12 month)
				let rowTemplate = document.getElementById('incomeTablesRow-template').innerHTML;
				// replace the first cell with appartment number
				rowTemplate = rowTemplate.replaceAll('{{apt_x}}', apartmentCounter);
				for (let monthCounter = 1; monthCounter <= 12; monthCounter++) {
					let currentValue = entry['month_' + monthCounter + '_apt_' + apartmentCounter];
					rowTemplate = rowTemplate.replaceAll('{{month_' + monthCounter + '_apt_x}}', currentValue);
					rowTemplate = rowTemplate.replaceAll('{{contentClass}}', (currentValue === "" ? "" : "payAmount") );
				}
				let newRow = document.createElement('div');
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
