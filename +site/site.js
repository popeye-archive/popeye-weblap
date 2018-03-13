
var popeye = window.popeye = {};
const valamiTura= { nev: "Meglepetés kaland", ar: "Szabadon választott", arOpciok: "A túrát sikeresen teljesítőknek lesz alkalma honorálni a kalandot." };

function turaData(kategoriak) {
	popeye.kategoriak= kategoriak;
	let path= window.location.pathname.match('/([^\./]*)/([^\./]*)[\./]?(.*)');

	let kategoriaId= path && path[1], turaId= path && path[2];
	popeye.kategoria= kategoriaId && kategoriak.find && kategoriak.find(kat => kat.kategoriaId == kategoriaId);
	popeye.tura= popeye.kategoria && popeye.kategoria.find && popeye.kategoria.find(tura => tura.turaId == turaId);

	if (! popeye.tura)  popeye.tura= valamiTura;  // Adat hiba, mégis jelenjen meg valami.
	return popeye.tura;
}


/// Mavo-adat turaIndex átmeneti tárolása (hack, amíg megtalálom, hogyan lehet mavo-val elérni)
function turaIdx(turaIndex) {
  if (turaIndex)  turaIdx.mentett= turaIndex;
  return turaIdx.mentett;
}

/// Mavo-adat kepIndex átmeneti tárolása (hack, amíg megtalálom, hogyan lehet mavo-val elérni)
function kepIdx(kepIndex) {
  if (kepIndex)  kepIdx.mentett= kepIndex;
  return kepIdx.mentett;
}

/// Mavo-adat kategoriaId átmeneti tárolása. Mavo belső ciklus nem látja a külső ciklus propertyjeit.
function katId(kategoriaId) {
  if (kategoriaId)  katId.mentett= kategoriaId;
  return katId.mentett;
}

/// Mavo-adat kategoriaId átmeneti tárolása. Mavo belső ciklus nem látja a külső ciklus propertyjeit.
function tId(turaId) {
  if (turaId)  tId.mentett= turaId;
  return tId.mentett;
}


/// Túra miniatűr képe a turaIndex-ből:  turak.json/kategoriak[*]{kategoriaId}.turak[*]{turaId} => turaIndex[kategoriaId][turaId].kepMiniSzam => kepIndex[kepMiniSzam]
function tura(turaId) {
  let tIdx= (turaIndex || turaIdx.mentett);
  let kId= (kategoriaId || katId.mentett);
  turaId= (turaId || tId.mentett);
  let tura= tIdx && kId && turaId && tIdx[kId][turaId];
  return tura || {};
}

/// Túra száma a turaIndex-ből:  turak.json/kategoriak[*]{kategoriaId}.turak[*]{turaId} => turaIndex[kategoriaId][turaId]._turaSzam
function turaSzam(turaId) {
  return tura(turaId)._turaSzam;
}

function kepNev(kepSzam) {
  let kIdx= (kepIndex || kepIdx.mentett);
  //return kIdx ? kIdx[kepSzam] : "_nincs_kepIndex_.jpg";
  return kIdx ? kIdx[kepSzam] : "0.jpg";
}

function turaKepMiniNev(turaId) {
  let kepSzam= tura(turaId).kepMiniSzam;
  return kepSzam ? kepSzam +'--'+ kepNev(kepSzam) : "0.jpg"
}




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


