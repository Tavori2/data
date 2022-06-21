waitUntilElementLoaded('#osh-balance-summary', 5000).then(function (element) {
	// element found and available
	try {
		// decrypt the json and parse it
		var decrypted = CryptoJS.AES.decrypt(oshBalance, encSecret);
		let account = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

		// get the template text and the div to populate at the end of all replacements
		let populatedTemplate = document.getElementById('osh-balance-summary').innerHTML;
		var oshContainer = document.querySelector('.osh-balance');

		populatedTemplate = populatedTemplate.replaceAll('{{updateDate}}',account.updateDate);
		populatedTemplate = populatedTemplate.replaceAll('{{balance.current}}',account.balance.current);
		populatedTemplate = populatedTemplate.replaceAll('{{balance.cash}}',account.balance.cash);
		populatedTemplate = populatedTemplate.replaceAll('{{income.tax}}',account.income.tax);
		populatedTemplate = populatedTemplate.replaceAll('{{income.other}}',account.income.other);
		populatedTemplate = populatedTemplate.replaceAll('{{income.total}}',account.income.total);

		// remove the first char (minus -) so the template minus will take effect for the ltr display
		populatedTemplate = populatedTemplate.replaceAll('{{expenses.fixed}}',account.expenses.fixed.substring(1));
		populatedTemplate = populatedTemplate.replaceAll('{{expenses.unexpected}}',account.expenses.unexpected.substring(1));
		populatedTemplate = populatedTemplate.replaceAll('{{expenses.total}}',account.expenses.total.substring(1));

		populatedTemplate = populatedTemplate.replaceAll('{{paiedAppartment}}',account.paiedAppartment);
		populatedTemplate = populatedTemplate.replaceAll('{{unpaiedAppartmentsNumbers}}',account.unpaiedAppartmentsNumbers);

		// calculate preogress bar pixels (out of 150px max) for paied appartments
		let paiedAppartment = account.paiedAppartment;
		let paiedPaercent = paiedAppartment / 40;
		let unpaiedAppartmentsNumbers = 150 * paiedPaercent;
		populatedTemplate = populatedTemplate.replaceAll('{{paiedAppartmentPercent}}',unpaiedAppartmentsNumbers);

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
