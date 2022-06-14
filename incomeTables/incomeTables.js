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
	// element found and available
	let template = document.getElementById('incomeTables-template').innerHTML;
	let container = document.querySelector('#incomeTables-container');

	try {
		let data = JSON.parse(incomeTables);
		// loop each year entry in the income tables json
		data.forEach(entry => {
			let jParsed = template;
			income-year

			for (attr in entry) {
				jParsed = jParsed.replaceAll('{{' + attr + '}}', entry[attr]);
			}

			let newRow = document.createElement('div');
			newRow.innerHTML = jParsed;
			container.appendChild(newRow);
		});
	}
	catch (err) {
		// error occurred
		console.log("Failed to create incomeTables row due to: " + err);
	}
}).catch(function () {
	// element not found within 5000 milliseconds
	console.log("Failed to find #incomeTables-template for 5 sec");
});
