
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

waitUntilElementLoaded('#osh-balance', 5000).then(function (element) {
	// element found and available
	try {
		// decrypt the json
		var decrypted = CryptoJS.AES.decrypt(account, encSecret);
		console.log("decrypted: " + decrypted.toString(CryptoJS.enc.Utf8));
		let accountJson = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

		let populatedTemplate = document.getElementById('osh-balance').innerHTML;
		var oshContainer = document.querySelector('.osh-summary');

		populatedTemplate = populatedTemplate.replaceAll('{{updateDate}}',accountJson.updateDate);
		populatedTemplate = populatedTemplate.replaceAll('{{balance.current}}',accountJson.balance.current);
		populatedTemplate = populatedTemplate.replaceAll('{{balance.cash}}',accountJson.balance.cash);
		populatedTemplate = populatedTemplate.replaceAll('{{income.tax}}',accountJson.income.tax);
		populatedTemplate = populatedTemplate.replaceAll('{{income.other}}',accountJson.income.other);
		populatedTemplate = populatedTemplate.replaceAll('{{income.total}}',accountJson.income.total);
		populatedTemplate = populatedTemplate.replaceAll('{{expenses.fixed}}',accountJson.expenses.fixed);
		populatedTemplate = populatedTemplate.replaceAll('{{expenses.unexpected}}',accountJson.expenses.unexpected);
		populatedTemplate = populatedTemplate.replaceAll('{{expenses.total}}',accountJson.expenses.total);
		populatedTemplate = populatedTemplate.replaceAll('{{paiedAppartment}}',accountJson.paiedAppartment);
		populatedTemplate = populatedTemplate.replaceAll('{{unpaiedAppartmentsNumbers}}',accountJson.unpaiedAppartmentsNumbers);

		oshContainer.innerHTML = populatedTemplate;
	}
	catch (err) {
		// error occurred
		console.log("Failed to show osh-balance due to: " + err);
	}
}).catch(function () {
	// element not found within 5000 milliseconds
	console.log("Failed to find #osh-balance for 5 sec");
});
