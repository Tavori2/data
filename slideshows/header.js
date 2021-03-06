let slideIndex = 0;

// show specific slide
function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 5000); // Change image every 2 seconds
  }

waitUntilElementLoaded('.slideshow-container', 5000).then(function (element) {
    // element found and available
    try {
        showSlides();
    }
    catch (err) {
        // error occurred
        console.log("Failed to show slideshow-container due to: " + err);
    }
}).catch(function () {
    // element not found within 5000 milliseconds
    console.log("Failed to find .slideshow-container for 5 sec");
});



