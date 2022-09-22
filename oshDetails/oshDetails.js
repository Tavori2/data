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

	// scroll page to the end to show the latest transaction
	window.scrollTo(0, document.body.scrollHeight);
}).catch(function () {
	// element not found within 5000 milliseconds
	console.log("Failed to find #row-template for 5 sec");
});


function myFunction() {
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
	

function filterByCategory() {
	// Declare variables
	var input, filter, table, tr, td, i, txtValue;

	categoryDropdown = document.getElementById("categoryDropdown");
	filter = categoryDropdown.value.toUpperCase();

	table = document.getElementById("oshDetails-table");
	tr = table.getElementsByTagName("tr");
  
	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
	  td = tr[i].getElementsByTagName("td")[0];
	  if (td) {
		txtValue = td.textContent || td.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
		  tr[i].style.display = "";
		} else {
		  tr[i].style.display = "none";
		}
	  }
	}
  }