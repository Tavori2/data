waitUntilElementLoaded('#oshDetails-row-template', 5000).then(function (element) {
	// element found and available
	let template = document.getElementById('oshDetails-row-template').innerHTML;
	let container = document.querySelector('.containerTable');

	try {
		// decrypt the json and parse it
		var decrypted = CryptoJS.AES.decrypt(oshDetails, encSecret);
		let decryptedUTF8 = decrypted.toString(CryptoJS.enc.Utf8);
		
		console.log("element found and available");
		let data = JSON.parse(decryptedUTF8);
		data.forEach(entry => {
			let jParsed = template;
			for (attr in entry) {
				jParsed = jParsed.replaceAll('{{' + attr + '}}', entry[attr]);
			}

			let newRow =  document.createElement('tr');
			newRow.innerHTML = jParsed;
			container.appendChild(newRow);
		});
	}
	catch (err) {
		// error occurred
		console.log("Failed to create oshDetails row due to: " + err);
	}
}).catch(function () {
	// element not found within 5000 milliseconds
	console.log("Failed to find #row-template for 5 sec");
});
