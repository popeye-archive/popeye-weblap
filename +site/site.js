/*
* Slideshow
*/

function slideshow(selector, globalDelay) {
	var slideshows = document.querySelectorAll(selector);
	if (! slideshows.length)  return false;
	
	for (let i= 0; i < slideshows.length; i++) {
		let firstSlide = slideshows[i].querySelector('.slide');
		let showingSlide = slideshows[i].querySelector('.showing');
		if (! showingSlide && firstSlide)  { showingSlide = firstSlide ; showingSlide.classList.add('showing'); }
		if (showingSlide)  lazyLoad(showingSlide);
	}
	
	var currSlideshowIdx = slideshows.length;
	var currentSlide, nextSlide;
	var lastDelay, slideInterval;
	findNextSlide();

	function showNextSlide() {
		if (currentSlide)  currentSlide.classList.remove('showing');
		if (nextSlide)     nextSlide.classList.add('showing');
		findNextSlide();
	}
	
	function findNextSlide() {
		// pre-load next slide in next slideshow
		let lastSlideshowIdx = currSlideshowIdx;
		while (true) {
			currSlideshowIdx = (currSlideshowIdx + 1) % slideshows.length;
			if (currSlideshowIdx == lastSlideshowIdx)  return;  // ha minden slideshowt megprobalt
			let currSlideshow = slideshows[currSlideshowIdx];
			let slides = currSlideshow.querySelectorAll('.slide');
			if (slides.length < 2)  continue;  // ha csak 1 kep van a slideshowban, probalja a kovetkezot

			currentSlide = currSlideshow.querySelector('.showing');
			let currIdx = ! currentSlide  ?  -1  :  Array.prototype.indexOf.call(slides, currentSlide);
			let nextIdx = (currIdx + 1) % slides.length;
			nextSlide = slides[nextIdx];
			lazyLoad(nextSlide);
			
			let delay = parseInt(currSlideshow.getAttribute('data-delay'));
			if (isNaN(delay) || delay < 0 || delay > 100)  delay = globalDelay;
			if (delay != lastDelay) {
				lastDelay = delay;
				if (slideInterval)  clearInterval(slideInterval);
				slideInterval = setInterval(showNextSlide, delay * 1000);
			}

			break;
		};
	}
	
	function lazyLoad(slide) {
		var src= slide.getAttribute('src-lazy');
		if (! src)  return;
		if (slide.tagName == 'IMG')  slide.src = src;
		else  slide.style.backgroundImage= 'url(' + src + ')';
		slide.setAttribute('src-lazy', '');
	}
}

slideshow('.slideshow', 5);



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



