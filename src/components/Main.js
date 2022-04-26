import React, { useState } from 'react';
import api from './utils/api';
import Card from './Card.js';
import { getAllByDisplayValue } from '@testing-library/react';

function Main(props) {
  const [userName, setUserName] = React.useState()
  const [userDescription, setUserDescription] = React.useState()
  const [userAvatar, setUserAvatar] = React.useState()
  const [cards, setcards] = React.useState([])

  React.useEffect(() => {
    api.getUserInformation()
      .then((userData) => {
        setUserName(userData.name)
        setUserDescription(userData.about)
        setUserAvatar(userData.avatar)
      })
      .catch(console.log)
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then((cardData) => {
        setcards(cardData)
      })
      .catch(console.log)
  }, [])


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <div className="profile__picture" style={{ backgroundImage: `url(${userAvatar})` }} alt="Profile Picture" />
          <button type="button" aria-label="avatar" className="profile__button profile__button_type_avatar" onClick={props.onEditAvatarClick}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button type="button" aria-label="edit" className="profile__button profile__button_type_edit" onClick={props.onEditProfileClick}></button>
          <p className="profile__about">{userDescription}</p>
        </div>
        <button type="button" aria-label="add" className="profile__button profile__button_type_add" onClick={props.onAddPlaceClick}></button>
      </section>
      <section className="elements">
        {cards.map((card) => (<Card card={card} link={card.link} text={card.name} likesCount={card._id.likes} key={card._id} handleClick={props.onCardClick} />))}
      </section>
        {props.children}
    </main>
  )
}
export default Main;