import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, likesCount, onCardClick, currentUser, api, setCards }) {
  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(user => user._id === currentUser._id);

  const cardLikeButtonClassName = (
    `elements__button elements__button_like ${isLiked ? 'elements__button_like_active' : ''}`
  ); 
  const cardDeleteButtonClassName = (
    `elements__button elements__button_trash ${isOwn ? 'elements__button_trash_visible' : 'elements__button_trash_hidden'}`
  ); 

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
    });
 } 
  
  const handleClick = () => {
    onCardClick(card);
  }  
    return(
      <CurrentUserContext.Provider value={currentUser}>
        <article className="elements__card">
          <button type="button" aria-label="trash" className={cardDeleteButtonClassName} onClick={card.onDeletePlaceClick}></button>
          <img className="elements__image" src={card.link} alt={card.name} onClick={handleClick} />
          <div className="elements__title">
            <h2 className="elements__text">{card.name}</h2>
            <div className="elements__container">
              <button type="button" aria-label="like" className={cardLikeButtonClassName} onClick={handleCardLike}></button>
              <span className="elements__counter">{likesCount}</span>
            </div>
          </div>
        </article>
      </CurrentUserContext.Provider>
    )
  }
export default Card