
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


waitUntilElementLoaded('.osh-balance', 5000).then(function (element) {
	// element found and available
	try {
		// decrypt the json
		var secret = "xIij?]uY/2J=-#cHTSWVusnfDrea7!OJ_qTrror-,t:FnMK I3m79;4A8F F=$BM";
		var decrypted = CryptoJS.AES.decrypt(account, secret);

		var oshContainer = document.querySelector('.osh-balance').innerText = decrypted.toString(CryptoJS.enc.Utf8);
	}
	catch (err) {
		// error occurred
		console.log("Failed to show osh-balance due to: " + err);
	}
}).catch(function () {
	// element not found within 5000 milliseconds
	console.log("Failed to find #osh-balance for 5 sec");
});
