
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

waitUntilElementLoaded('#balance', 5000).then(function (element) {
	// element found and available
	try {
		// decrypt the json and parse it
		var decrypted = CryptoJS.AES.decrypt(account, encSecret);
		let accountJson = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

		// get the template text and the div to populate at the end of all replacements
		let populatedTemplate = document.getElementById('balance').innerHTML;
		var oshContainer = document.querySelector('.osh-summary');

		populatedTemplate = populatedTemplate.replaceAll('{{updateDate}}',accountJson.updateDate);
		populatedTemplate = populatedTemplate.replaceAll('{{balance.current}}',accountJson.balance.current);
		populatedTemplate = populatedTemplate.replaceAll('{{balance.cash}}',accountJson.balance.cash);

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
