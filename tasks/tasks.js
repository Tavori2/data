waitUntilElementLoaded('#task-row-template', 5000).then(function (element) {
	// element found and available
	let template = document.getElementById('task-row-template').innerHTML;
	let container = document.querySelector('.containerTable');

	try {
		console.log("element found and available");
		let data = JSON.parse(taskData);
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
		console.log("Failed to create task row due to: " + err);
	}
}).catch(function () {
	// element not found within 5000 milliseconds
	console.log("Failed to find #row-template for 5 sec");
});
