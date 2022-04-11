import Deck from './deck32.js'
import Cards from './deck32.js'
export default nbrpli

var j1main1 = document.querySelector('.j1-main1')
var j1main2 = document.querySelector('.j1-main2')
var j1main3 = document.querySelector('.j1-main3')

var j2main1 = document.querySelector('.j2-main1')
var j2main2 = document.querySelector('.j2-main2')
var j2main3 = document.querySelector('.j2-main3')

var scoreJ1element = document.querySelector('.affiScoreJ1')
var scoreJ2element = document.querySelector('.affiScoreJ2')
var nbrpliElement = document.querySelector('.affiPlis')

const texte = document.querySelector('.texte')

const j1EmplCarteJoue = document.querySelector('.j1-cartejoue')
const j2EmplCarteJoue = document.querySelector('.j2-cartejoue')

const valeurcartes = {
  "7": 8,
  "8": 7,
  "A": 6,
  "R": 5,
  "D": 4,
  "V": 3,
  "10": 2,
  "9": 1,
}

let deck
let cartesDistribuees = 0, arret
var pioche1J1, pioche2J1, pioche3J1, pioche1J2, pioche2J2, pioche3J2, j1pli, j2pli
var nbrpli, findepli, findePartie, findeManche
var scPetitJ1 = 0, scPetitJ2 = 0, scGrandJ1 = 0, scGrandJ2 = 0, scChoisi
var scPliJ1, scPliJ2, pourriDeCote
var cartesPosees = 0
var tourJ1, tourJ2



// V initialisation
tourJ1 = true
cartesDistribuees = 0

// V Nouvelle partie
var nvlPartie = document.getElementById("nouvellePartie");
nvlPartie.addEventListener("click", () => {
  if (tourJ1 === true && cartesDistribuees === 0) {
    debutPartie()
    texte.innerText = "Une nouvelle partie commence."
    console.log("une nouvelle partie débute")
  } else {
    texte.innerText = "Ce n'est pas le moment."
  }
  //le bouton devra être grisé en attendant la fin de partie
  //pour ne pas relancer  
})

function debutPartie() {
  nbrpli = 0
  scPliJ1 = 0
  scPliJ2 = 0
  scPetitJ1 = 0
  scPetitJ2 = 0
  scGrandJ1 = 0
  scGrandJ2 = 0
  cartesPosees = 0
  arret = false
  findeManche = false
  findePartie = false
  debutManche()
  distriAuto()
  aquileTour()
}

function debutManche() {
  deck = new Deck()
  findepli = false
  nbrpli = 0
  scPliJ1 = 0
  scPliJ2 = 0
  cartesDistribuees = 0
  cartesPosees = 0
  console.log(deck)
}

// V actions en fin de manche
function finirlaManche() {
  cartesDistribuees = 0
  console.log("La manche est finie.")
  if (scPliJ1 > scPliJ2) {
    scPetitJ1++
    texte.innerText = "Vous remportez la manche."
    console.log("Vous remportez la manche.")
    findeManche = true
  } else if (scPliJ1 < scPliJ2) {
    scPetitJ2++
    texte.innerText = "Vous perdez la manche."
    console.log("Vous perdez la manche.")
    findeManche = true
  } else {
    texte.innerText = "Fausse égalité (pas de pourris)"
    console.log("Les pourris ne sont pas implanté.")
    findeManche = true
  }
  j1main1.innerHTML = ''
  j1main2.innerHTML = ''
  j1main3.innerHTML = ''
  j2main1.innerHTML = ''
  j2main2.innerHTML = ''
  j2main3.innerHTML = ''
  j1EmplCarteJoue.innerHTML = ''
  j2EmplCarteJoue.innerHTML = ''

  console.log("Score J1 : ", scPetitJ1, " petits, ", scGrandJ1, " grands")
  console.log("Score J2 : ", scPetitJ2, " petits, ", scGrandJ2, " grands")
  majScore()
  debutManche()
  aquileTour()
}

function majScore() {
  if (scPetitJ1 == 3) {
    scGrandJ1++
    scPetitJ1 = 0
    scPetitJ2 = 0
  } else if (scPetitJ2 == 3) {
    scGrandJ2++
    scPetitJ2 = 0
    scPetitJ1 = 0
  }
  scoreJ1element.innerText = "Score : " + scPetitJ1 + " petits, " + scGrandJ1 + " grands"
  scoreJ2element.innerText = "Score : " + scPetitJ2 + " petits, " + scGrandJ2 + " grands"
}

// V actions en fin de pli
var nettoyagePli = document.getElementById("findePli");
nettoyagePli.addEventListener("click", () => {
  if (findepli) {
    cleanPli()
     if (nbrpli < 3) {
      aquileTour()
      queJouerOrdi()
    }
    
  } else {
    texte.innerText = "Comparez le pli avant."
    console.log("Comparez le pli avant.")
  }

  if (scPliJ1 == 2 || scPliJ2 == 2) { //conditions pour fin de manche
    finirlaManche()
    if (scPetitJ1 == 2 || scPetitJ2 == 2) { //conditions de victoire réduites pour test. Comparer scGrand avec scChoisi si input joueur.
      findePartie = true
    }
    if (findePartie == false) {
      distriAuto()
    }
    if (findePartie == true) {
      if (scPetitJ1 == 2) {
        texte.innerText = "Vouz avez gagné la partie !"
        arret = true
      } else if (scPetitJ2 == 2) {
        texte.innerText = "Vous avez perdu la partie !"
      }
    }
  }
})

// V nettoyage des cartes
function cleanPli() {
  findepli = false
  j1EmplCarteJoue.innerHTML = ''
  texte.innerText = ''
  j2EmplCarteJoue.innerHTML = ''
  console.log("clean carte2")
  nbrpli++;
  console.log("Nombre de pli :", nbrpli)
  updatePli()
  console.log("Plis J1 :", scPliJ1, ", plis J2 :", scPliJ2)
}

// V score des plis
function updatePli() {
  nbrpliElement.innerText = nbrpli
}

// V distribution des cartes.
function distriAuto() {
  if (cartesDistribuees == 0) {
    pioche1J1 = deck.pop(1)
    j1main1.appendChild(pioche1J1.getHTML())
    pioche2J1 = deck.pop(2)
    j1main2.appendChild(pioche2J1.getHTML())
    pioche3J1 = deck.pop(3)
    j1main3.appendChild(pioche3J1.getHTML())

    pioche1J2 = deck.pop(1)
    j2main1.appendChild(pioche1J2.getDOS())
    pioche2J2 = deck.pop(2)
    j2main2.appendChild(pioche2J2.getDOS())
    pioche3J2 = deck.pop(3)
    j2main3.appendChild(pioche3J2.getDOS())

    cartesDistribuees = 1
  } else {
    console.log("Cartes déjà distribuées.")
  }
}


// V click joueur 1
var jouerM1J1 = document.querySelector(".j1-main1");
jouerM1J1.addEventListener("click", () => {
  if (pioche1J1 !== null && tourJ1 == true) {
    j1EmplCarteJoue.appendChild(pioche1J1.getHTML())
    j1pli = pioche1J1
    j1main1.innerHTML = '';
    pioche1J1 = null
    cartesPosees++
    tourJ1 = false
    tourJ2 = true
    aquileTour()
    queJouerOrdi()
  } else {
    console.log("Y'a rien, gros cerf !")
  }
  if (cartesPosees == 2) {
    comparaison()
  }
});

var jouerM2J1 = document.querySelector(".j1-main2");
jouerM2J1.addEventListener("click", () => {
  if (pioche2J1 !== null && tourJ1 == true) {
    j1EmplCarteJoue.appendChild(pioche2J1.getHTML())
    j1pli = pioche2J1
    j1main2.innerHTML = ''
    pioche2J1 = null
    cartesPosees++
    tourJ1 = false
    tourJ2 = true
    aquileTour()
    queJouerOrdi()
  } else {
    console.log("Y'a rien, gros cerf !")
  }
  if (cartesPosees == 2) {
    comparaison()
  }
});

var jouerM3J1 = document.querySelector(".j1-main3");
jouerM3J1.addEventListener("click", () => {
  if (pioche3J1 !== null && tourJ1 == true) {
    j1EmplCarteJoue.appendChild(pioche3J1.getHTML())
    j1pli = pioche3J1
    j1main3.innerHTML = ''
    pioche3J1 = null
    cartesPosees++
    tourJ1 = false
    tourJ2 = true
    aquileTour()
    queJouerOrdi()
  } else {
    console.log("Y'a rien, gros cerf !")
  }
  if (cartesPosees == 2) {
    comparaison()
  }
});

// V comparaison des cartes du pli. SOUCI quand 1 pli chacun et se termine en pourri : cas pas référencé
function comparaison() {
  if (cartesPosees !== 2) {
    texte.innerText = "L'autre n'a pas encore joué."
  }
  else if (quiGagnePli(j1pli, j2pli)) {
    texte.innerText = "Vous gagnez le pli."
    scPliJ1++
    cartesPosees = 0
    tourJ1 = true
    tourJ2 = false
    if (pourriDeCote == 1) {
      scPliJ1++
      pourriDeCote = 0
    }
  }
  else if (quiGagnePli(j2pli, j1pli)) {
    texte.innerText = "Vous perdez le pli."
    scPliJ2++
    cartesPosees = 0
    tourJ2 = true
    tourJ1 = false
    if (pourriDeCote == 1) {
      scPliJ2++
      pourriDeCote = 0
    }
  }
  else {
    texte.innerText = "Le pli est pourri."
    cartesPosees = 0
    pourriDeCote = 1
    if (tourJ1 == false) {
      tourJ1 = true
      tourJ2 = false
    } else if (tourJ2 == false) {
      tourJ1 = false
      tourJ2 = true
    }
  } {
    findepli = true
  }
}

function quiGagnePli(carte1, carte2) {
  return carte1.puissance > carte2.puissance
}

// V indicateur du tour
function aquileTour() {
  const indicTour = document.getElementById("indic");
  if (tourJ1 == true) {
    indicTour.className = "monTour"
  } else if (tourJ1 == false) {
    indicTour.className = "pasMonTour"
  }
}

// V le choix de la carte à jouer de l'ordi.
function queJouerOrdi() {
  var mainOrdi = [pioche1J2, pioche2J2, pioche3J2]
  var mainArray = new Array()
  for (let i = 0; i < mainOrdi.length; i++) {
    if (mainOrdi[i] !== null) {
      mainArray.push(mainOrdi[i])
    }
  }
  var nbrCarte = mainArray.length

  mainArray.sort(function (a, b) {
    if (a.puissance < b.puissance) {
      return -1
    } else if (a.puissance > b.puissance) {
      return 1
    } else {
      return 0
    }
  })

  console.log(tourJ2)
  console.log(cartesPosees)
  console.log("puissance carte jouée : " + j1pli.puissance) //j1pli est vidé dans "fin de pli"

  // V comportements de l'ordi, ce qu'il doit jouer
  if (tourJ2 === true && cartesPosees === 0) { // <- quand ordi joue en premier
    console.log("ordi joue en premier, plus grande")
    ordiJoue(mainArray[mainArray.length - 1]) //ici, joue la carte la plus forte

  } else if (tourJ2 === true && cartesPosees === 1 && j1pli.puissance > mainArray[mainArray.length - 1].puissance) { // <- quand ordi joue en second
    console.log("ordi perd, joue la plus petite")
    ordiJoue(mainArray[0]) // ici, ordi ne peut gagner, jouer la carte la plus petite

  } else if (tourJ2 === true && cartesPosees === 1 && j1pli.puissance < mainArray[mainArray.length - 1].puissance) { // <- quand ordi joue en second
    console.log("ordi gagne, joue la plus grande")
    ordiJoue(mainArray[mainArray.length - 1]) //ici, ordi peut gagner, jouer la carte la plus forte

  } else if (tourJ2 === true && cartesPosees === 1 && j1pli.puissance === mainArray[mainArray.length - 1].puissance) { //problèem ici, a redéfinir
    console.log("egalité entre j1 posée et ordi plus forte, ordi joue la plus forte")
    ordiJoue(mainArray[mainArray.length - 1]) //ici, jouer la carte la plus forte
  } 
}

// V représentation des cartes en main et jouées. 
function ordiJoue(carteajouer) {
  j2EmplCarteJoue.appendChild(carteajouer.getHTML())
  j2pli = carteajouer
  if (carteajouer.position === 1) {
    console.log("je passe par if")
    j2main1.innerHTML = ''
    pioche1J2 = null
  } else if (carteajouer.position === 2) {
    console.log("je passe par else if")
    j2main2.innerHTML = ''
    pioche2J2 = null
  } else {
    console.log("je passe par else")
    j2main3.innerHTML = ''
    pioche3J2 = null
  }

  carteajouer = null
  cartesPosees++
  tourJ2 = false
  tourJ1 = true
  aquileTour()

  if (cartesPosees === 2) {
    comparaison()
  }
};

/*
Pour le futur :

function demandeNom() { //a mettre dans initialisation, pour ne pas le rerentrer à chaque nouvelle partie.
  let nomJoueur1 = prompt("Entrez votre nom", "écrivez votre nom ici");
  if (nomJoueur1 != null) {
    document.querySelector(".affiNom").innerText =
    nomJoueur1
  }
}

<div class="affiNom score"></div>

function demandeScore() {
  let scChoisi = prompt("Choisissez un nombre de long à atteindre", "ici");
  if (scChoisi != null) {
    scChoisi = 1 //valeur par défaut
  }
}
*/