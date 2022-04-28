function ouvrirOnglet(evt, nomRubrique) {
  var i, tab, onglets;
  tab = document.getElementsByClassName("rubrique");

  for (i = 0; i < tab.length; i++) {
    tab[i].style.display = "none";
  }
  onglets = document.getElementsByClassName("onglet");
  for (i = 0; i < onglets.length; i++) {
    onglets[i].className = onglets[i].className.replace(" actif", "");
  }
  document.getElementById(nomRubrique).style.display = "block";
  evt.currentTarget.className += " actif";
}
