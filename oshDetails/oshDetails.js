
function showHideCategoryFilter() {
	document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
	var input, filter, ul, li, a, i;
	input = document.getElementById("myInput");
	filter = input.value.toUpperCase();
	div = document.getElementById("myDropdown");
	a = div.getElementsByTagName("a");
	for (i = 0; i < a.length; i++) {
		txtValue = a[i].textContent || a[i].innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			a[i].style.display = "";
		} else {
			a[i].style.display = "none";
		}
	}
}


function filterByCategory(filter) {
	// Declare variables
	var input, filter, table, tr, td, i, txtValue;

	table = document.getElementById("oshDetails-table");
	tr = table.getElementsByTagName("tr");

	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[0];
		if (td) {
			txtValue = td.textContent || td.innerText;
			if (txtValue.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
			}
		}
	}

	// close the filter dropdown
	showHideCategoryFilter();
}

function clearCategoryFilter() {
	// Declare variables
	var input, filter, table, tr, td, i, txtValue;

	table = document.getElementById("oshDetails-table");
	tr = table.getElementsByTagName("tr");

	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
		tr[i].style.display = "";
	}

	// close the filter dropdown
	showHideCategoryFilter();
}

function clearSearchFilter() {
	// Declare variables
	var table, tr, i;

	table = document.getElementById("oshDetails-table");
	tr = table.getElementsByTagName("tr");

	// clear the search input
	document.getElementById("searchInput").value = "";

	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
		tr[i].style.display = "";
	}
}

// this function filters the table by the search input
function filterBySearch() {
	// Declare variables
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("searchInput");
	filter = input.value.toUpperCase();

	table = document.getElementById("oshDetails-table");
	tr = table.getElementsByTagName("tr");

	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
		// get the action text
		td = tr[i].getElementsByTagName("td")[5];
		if (td) {
			txtValue = td.textContent || td.innerText;
		}

		// get the remarks text
		remarksTD = tr[i].getElementsByTagName("td")[6];
		if(remarksTD) {
			remarks = remarksTD.textContent || remarksTD.innerText;
		}
		
		// if one of the texts contains the search input, show the row
		if (txtValue.toUpperCase().indexOf(filter) > -1 || remarks.toUpperCase().indexOf(filter) > -1) {
			tr[i].style.display = "";
		} else {
			tr[i].style.display = "none";
		}

		// if the search input is empty, show all rows
		if (filter == "") {
			tr[i].style.display = "";
		}
}

function showHideSearchFilter() {
	document.getElementById("searchFilter").classList.toggle("show");
}

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

			let newRow = document.createElement('tr');
			newRow.innerHTML = jParsed;
			container.appendChild(newRow);
		});
	}
	catch (err) {
		// error occurred
		console.log("Failed to create oshDetails row due to: " + err);
	}

	// scroll page to the end to show the latest transaction
	window.scrollTo(0, document.body.scrollHeight);
}).catch(function () {
	// element not found within 5000 milliseconds
	console.log("Failed to find #row-template for 5 sec");
});

