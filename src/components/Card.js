import React from 'react';

function Card({ card, text, likesCount, link }) {
    return(
      <section className="elements">
        <article className="elements__card">
          <button type="button" aria-label="trash" className="elements__button elements__button_trash" onClick={card.onDeletePlaceClick}></button>
          <img className="elements__image" src={link} alt={text} onClick={() => card.onCardClick(card)} />
          <div className="elements__title">
            <h2 className="elements__text">{text}</h2>
            <div className="elements__container">
              <button type="button" aria-label="like" className="elements__button elements__button_like"></button>
              <span className="elements__counter">{likesCount}</span>
            </div>
          </div>
        </article>
      </section>
    )
  }
export default Card