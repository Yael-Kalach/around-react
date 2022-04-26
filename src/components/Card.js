import React from 'react';

function Card({ card, likesCount, onCardClick }) {
  
  const handleClick = () => {
    onCardClick(card);
  }  
    return(
      <article className="elements__card">
        <button type="button" aria-label="trash" className="elements__button elements__button_trash" onClick={card.onDeletePlaceClick}></button>
        <img className="elements__image" src={card.link} alt={card.name} onClick={handleClick} />
        <div className="elements__title">
          <h2 className="elements__text">{card.name}</h2>
          <div className="elements__container">
            <button type="button" aria-label="like" className="elements__button elements__button_like"></button>
            <span className="elements__counter">{likesCount}</span>
          </div>
        </div>
      </article>
    )
  }
export default Card