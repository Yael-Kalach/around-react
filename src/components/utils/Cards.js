import api from './api.js';
import React from 'react';

function Cards(props) {
    const [cards, setcards] = React.useState([])
  
    React.useEffect(() => {
      let mounted = true;
      api.getInitialCards()
        .then((cardData) => {
          if(mounted) {
            setcards(cardData)
          }
        })
        .catch(console.log)
      return () => mounted = false;
    }, [])
  
    return(
      <section className="elements">
      {cards.map((card, i) => (
        <article key = {i} className="elements__card">
          <button type="button" aria-label="trash" className="elements__button elements__button_trash" onClick={props.onDeletePlaceClick}></button>
          <img className="elements__image" style={{ backgroundImage: `url(${card.link})` }} />
          <div className="elements__title">
            <h2 className="elements__text">{card.name}</h2>
            <div className="elements__container">
              <button type="button" aria-label="like" className="elements__button elements__button_like"></button>
              <span className="elements__counter">{}</span>
            </div>
          </div>
        </article>
      ))}
      </section>
    )
  }
export default Cards