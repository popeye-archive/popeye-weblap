/*
* Slideshow
*/

function slideshow(selector) {
	var slideshows= document.querySelectorAll(selector);
	if (! slideshows.length)  return false;

	for (var i= 0; i < slideshows.length; i++) {
		var firstSlide= slideshows[i].querySelector('.slide');
		var showingSlide= slideshows[i].querySelector('.showing');
		if (firstSlide && ! firstSlide.src)  firstSlide.src= firstSlide.getAttribute("src-lazy");
		if (firstSlide && ! showingSlide)  firstSlide.classList.add('showing');
	}

	var currSlideshowIdx= 0;
	var slideInterval= setInterval(nextSlide, 2000 / slideshows.length);

	function nextSlide() {
		var currSlideshow= slideshows[currSlideshowIdx];
		var slides= currSlideshow.querySelectorAll('.slide');
		var current= currSlideshow.querySelector('.showing');
		var currIdx= slides.indexof(current);

    if (0 <= currIdx)  slides[currIdx].classList.remove('showing');
		if (slides.length) {
			currIdx= (currIdx + 1) % slides.length;
			slides[currIdx].classList.add('showing');
		}

    currSlideshowIdx= (currSlideshowIdx + 1) % slideshows.length;

		// pre-load next slide in next slideshow
		currSlideshow= slideshows[currSlideshowIdx];
		slides= currSlideshow.querySelectorAll('.slide');
		current= currSlideshow.querySelector('.showing');
		currIdx= slides.indexof(current);
		if (slides.length) {
			currIdx= (currIdx + 1) % slides.length;
			if (! slides[currIdx].src)  slides[currIdx].src= slides[currIdx].getAttribute("src-lazy");
		}
	}
}

slideshow('.slideshow');



/*
* Email cím dekódolás -- az email címek az email kereső robotok elől rejtve, obfuszkálva vannak
*/
(function patchAddresses() { 
  function revealAddress(e) { 
    var link= this, prot= ["mai","o:"].join("lt"), prev= link.getAttribute("href");
    if (typeof prev === "string" && prev.indexOf(prot) == 0) return; 
    var address= link.textContent
      .replace("(ku-at-kac)", String.fromCharCode(64))
      .replace(/\.nospan\./g, ""); 
    link.setAttribute("href", prot + address); 
    link.removeEventListener("mouseover", revealAddress); 
    link.removeEventListener("focus", revealAddress); 
    link.removeEventListener("click", revealAddress); 
  }

  var addresses= document.getElementsByClassName("address"); 
  for (var i=0; i<addresses.length; i++) { 
    var link= addresses[i]; 
    link.addEventListener("mouseover", revealAddress); 
    link.addEventListener("focus", revealAddress); 
    link.addEventListener("click", revealAddress); 
  } 
})(); 


