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

waitUntilElementLoaded('.slideshow-container', 5000).then(function (element) {
	// element found and available
	try {

        let slideIndex = 1;
        showSlides(slideIndex);
        
        // Next/previous controls
        function plusSlides(n) {
          showSlides(slideIndex += n);
        }
        
        // Thumbnail image controls
        function currentSlide(n) {
          showSlides(slideIndex = n);
        }
        
        function showSlides(n) {
          let i;
          console.log("1");
          let slides = document.getElementsByClassName("mySlides");
          console.log("2");
          let dots = document.getElementsByClassName("dot");
          console.log("3");
          if (n > slides.length) {slideIndex = 1}
          console.log("4");
          if (n < 1) {slideIndex = slides.length}
          console.log("5");
          for (i = 0; i < slides.length; i++) {
            console.log("5." + i);
            slides[i].style.display = "none";
          }
          console.log("7");
          for (i = 0; i < dots.length; i++) {
            console.log("7." + i);
            dots[i].className = dots[i].className.replace(" active", "");
          }
          console.log("8");
          slides[slideIndex-1].style.display = "block";
          console.log("9");
          dots[slideIndex-1].className += " active";
          console.log("10");
        }
	}
	catch (err) {
		// error occurred
		console.log("Failed to show slideshow-container due to: " + err);
	}
}).catch(function () {
	// element not found within 5000 milliseconds
	console.log("Failed to find .slideshow-container for 5 sec");
});



