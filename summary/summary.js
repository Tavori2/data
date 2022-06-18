waitUntilElementLoaded('#balance', 5000).then(function (element) {
	// element found and available
	try {
		// decrypt the json and parse it
		var decrypted = CryptoJS.AES.decrypt(account, encSecret);
		let accountJson = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

		// get the template text and the div to populate at the end of all replacements
		let populatedTemplate = document.getElementById('balance').innerHTML;
		var oshContainer = document.querySelector('.osh-summary');

		var currentTotalBalance = parseInt(accountJson.balance.current) + parseInt(accountJson.balance.cash);
		populatedTemplate = populatedTemplate.replaceAll('{{balance.opening}}',accountJson.balance.openning);
		populatedTemplate = populatedTemplate.replaceAll('{{balance.current}}',currentTotalBalance);

		populatedTemplate = populatedTemplate.replaceAll('{{account.bank}}',accountJson.account.bank);
		populatedTemplate = populatedTemplate.replaceAll('{{account.bankName}}',accountJson.account.bankName);
		populatedTemplate = populatedTemplate.replaceAll('{{account.branch}}',accountJson.account.branch);
		populatedTemplate = populatedTemplate.replaceAll('{{account.accountNum}}',accountJson.account.accountNum);
		populatedTemplate = populatedTemplate.replaceAll('{{account.branchAddress}}',accountJson.account.branchAddress);
		

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
