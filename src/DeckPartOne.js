import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card.js"


function Deck() {


  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [isEnd, setIsEnd] = useState(false);

  const deckId = useRef();
  //was this a good use of useRef?

  // this is called *after* component first added to DOM
  useEffect(() => {
    async function pickDeck () {
    const deck = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    setDeck(deck.data);
    deckId.current = deck.data.deck_id;
    }
    pickDeck()
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (cards.length !== 52) {
    async function pickCard () {
        const res = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`);
        let card = res.data.cards[0]
        console.log(card)
        setCards(cards =>
            [
                card, ...cards, 
            ]
            );
        }
    pickCard();
  } else {
      setIsEnd(true);
  }
}

  useEffect(() => {
    console.log("cards", cards)
  }, [cards]);
  console.log(deck)
  console.log(cards.length)
  return (
   
    <div>
    <button onClick={handleClick}> GIMME A CARD!
    </button>
    <p>{isEnd ? "You've ran out of cards in the deck." : 'Click the above button to draw a card.'}</p> 
       {cards.map(({code, suite, image, value}) => (
                <Card code = {code} suite= {suite} image={image} value={value} />)
                )}
    {/* < Card /> */}
  
    </div>
);



}






export default Deck;
