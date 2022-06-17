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

let slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// show specific slide
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

waitUntilElementLoaded('.slideshow-container', 5000).then(function (element) {
    // element found and available
    try {
        showSlides(slideIndex);
    }
    catch (err) {
        // error occurred
        console.log("Failed to show slideshow-container due to: " + err);
    }
}).catch(function () {
    // element not found within 5000 milliseconds
    console.log("Failed to find .slideshow-container for 5 sec");
});



