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

