import React, { useState } from 'react';
import api from './utils/api';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { getAllByDisplayValue } from '@testing-library/react';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [cards, setcards] = React.useState([])
  const { onCardClick } = props;

  React.useEffect(() => {
    api.getInitialCards()
      .then((cardData) => {
        setcards(cardData)
      })
      .catch(console.log)
  }, [])


  return (
    <CurrentUserContext.Provider>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar">
            <div className="profile__picture" style={{ backgroundImage: `url(${currentUser.avatar})` }} alt="Profile Picture" />
            <button type="button" aria-label="avatar" className="profile__button profile__button_type_avatar" onClick={props.onEditAvatarClick}></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" aria-label="edit" className="profile__button profile__button_type_edit" onClick={props.onEditProfileClick}></button>
            <p className="profile__about">{currentUser.user}</p>
          </div>
          <button type="button" aria-label="add" className="profile__button profile__button_type_add" onClick={props.onAddPlaceClick}></button>
        </section>
        <section className="elements">
          {cards.map((card) => (<Card
              key={card._id}
              card={card}
              likesCount={card._id.likes}
              onCardClick={onCardClick}
            />
          ))}
        </section>
          {props.children}
      </main>
    </CurrentUserContext.Provider>
  )
}
export default Main;