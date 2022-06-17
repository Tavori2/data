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