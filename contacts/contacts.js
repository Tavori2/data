function longPressed(evt, tenantId) {
	let currentCard = document.querySelector('.menu-' + tenantId);
	let fullScreen = document.querySelector('.fullScreen');

	fullScreen.style.display = "block";
	currentCard.style.display = "block";
	currentCard.style.left = evt.pageX;
	currentCard.style.top = evt.pageY;
	currentDisplayedLayer = currentCard;

	evt.stopPropagation();
	evt.preventDefault();
}

function hideFloatingLayers()
{
	let fullScreen = document.querySelector('.fullScreen');
	fullScreen.style.display = "none";
	currentDisplayedLayer.style.display = "none";
	currentDisplayedLayer = fullScreen;
}

function addTenant()
{
	hideFloatingLayers();
	console.log("adding new tenant");
}

function removeTenant(tenantId)
{
	hideFloatingLayers();
	console.log("removeTenant: " + tenantId);
	let currentCard = document.querySelector('.id-' + tenantId);
	currentCard.remove();
}

waitUntilElementLoaded('#card-template', 5000).then(function (element) {
	// element found and available
	let template = document.getElementById('card-template').innerHTML;
	let container = document.querySelector('.filtr-container');
	let maleImage = "https://lh3.googleusercontent.com/pw/AM-JKLWt6x18kAO2a-e0DOllDnp2h_Fw2fq6Y9_qBUZG4pe4OxZvJVaQMFD3FZboVFTjFXFODHD7ErYYHNEE6_xUdgR9gm6Za2pu6FAYLih-Zz0iOfjlZ7nCN5eTPyS6-c_L_9S_LK263k0eLYmxJ09ys2op=w499-h498-no?authuser=0";
	let femaleImage = "https://lh3.googleusercontent.com/pw/AM-JKLVT9WllzWSe-hGyrtAsvd4XqFKEvY3XW8jBGd8ZNDtHHEzCTQhoAXm0yd3XuWgaFl4ffLoRnCmRrwc8ecM_vG1DisrjbuQv62VwKIjqXqErxpHamJHfF9Yw_rFZfnwHZtBiZqk769XqwlL39psi4BEl=w499-h498-no?authuser=0";

	try {
		// decrypt the json and parse it
		var decrypted = CryptoJS.AES.decrypt(contacts, encSecret);
		let decryptedUTF8 = decrypted.toString(CryptoJS.enc.Utf8);
		let data = JSON.parse(decryptedUTF8);
		data.forEach(col => {
			let jParsed = template;
			for (prop in col) {
				if (prop == "image" && col[prop] == "m") {
					jParsed = jParsed.replaceAll('{{' + prop + '}}', maleImage);
				}
				else if (prop == "image" && col[prop] == "f") {
					jParsed = jParsed.replaceAll('{{' + prop + '}}', femaleImage);
				}
				else {
					jParsed = jParsed.replaceAll('{{' + prop + '}}', col[prop]);
				}
			}

			// add specific id for each tenant card div
			jParsed = jParsed.replaceAll('{{id}}', col["phone"]);
			let newCard =  document.createElement('div');
			newCard.innerHTML = jParsed;
			container.appendChild(newCard);

			// // add long press event listener for admins
			// var currentCard = document.querySelector('.id-' + col["phone"]);
			// currentCard.addEventListener('click', function (event) {
			// 	longPressed(event, col["phone"]);
			// }, true);
		});

		// // add click event listener to hide all floating layers
		// let fullScreen = document.querySelector('.fullScreen');
		// fullScreen.addEventListener('click', function (event) {
		// 	hideFloatingLayers();
		// }, true);
	}
	catch (err) {
		// error occurred
		console.log("Failed to create tenants cards due to: " + err);
	}
}).catch(function () {
	// element not found within 5000 milliseconds
	console.log("Failed to find #card-template for 5 sec");
});
