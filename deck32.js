const SUITS = ["♣", "♦", "♥", "♠"]
const VALUES = ["7", "8", "A", "R", "D", "V", "10", "9"]

import nbrpli from './script.js'

export default class Deck {
  
    constructor() {
        this.generateCardsSet()
        this.shuffle()
    }

    get numberOfCards() {
        return this.cards.length
    }
   
    pop(position) {
      var carte = this.cards.shift()
      carte.position = position
      return carte 
    }

    push(card) {
        this.cards.push(card)
    }

    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }
    generateCardsSet() {
        this.cards = SUITS.flatMap(suit => {
                     return VALUES.map(value => {
                         return new Card(suit, value)
            })
        })
    }
}

class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
        switch (value) {
            case "7" :
                this.puissance = 8
                break
            case "8" :
                this.puissance = 7
                break
            case "A" :
                this.puissance = 6
                break
            case "R" :
                this.puissance = 5
                break
            case "D" :
                this.puissance = 4
                break
            case "V" :
                this.puissance = 3
                break
            case "10" :
                this.puissance = 2
                break
            case "9" :
                this.puissance = 1
                break
            default :
                console.log("on ne devrait pas voir ça")
        }
    }
    

    get color() {
    return this.suit === '♣' || this.suit === '♠' ? 'black' : 'red'
    }

    getHTML() {
        const cardDiv = document.createElement('div')
        cardDiv.innerText = this.suit
        cardDiv.classList.add("card", this.color)
        cardDiv.dataset.value = `${this.value} ${this.suit}`
        return cardDiv
    }

    getDOS() {
        const cardDiv = document.createElement('div')
        cardDiv.innerText = "Trut"
        cardDiv.classList.add("dos", this.color)
        return cardDiv
    }

}




