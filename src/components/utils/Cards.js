import React from 'react';

function Cards(props) {
    return(
      <section className="elements">
      {props.handleCards.map((card, i) => (
        <article key = {i} className="elements__card">
          <button type="button" aria-label="trash" className="elements__button elements__button_trash" onClick={props.onDeletePlaceClick}></button>
          <img className="elements__image" src={card.link} alt={card.name} onClick={() => props.onCardClick(card)} />
          <div className="elements__title">
            <h2 className="elements__text">{card.name}</h2>
            <div className="elements__container">
              <button type="button" aria-label="like" className="elements__button elements__button_like"></button>
              <span className="elements__counter">{card._id.likes}</span>
            </div>
          </div>
        </article>
      ))}
      </section>
    )
  }
export default Cards