import avatar from '../images/photos/Avatar.png'
import React, { useState } from 'react';
import api from './utils/api';
import Cards from './utils/Cards';
import PopupWithForm from './utils/PopupWithForm';
import { getAllByDisplayValue } from '@testing-library/react';

function Main(props) {
  const [userName, setUserName] = React.useState([])
  const [userDescription, setUserDescription] = React.useState([])
  const [userAvatar, setUserAvatar] = React.useState([])
  const [cards, setcards] = React.useState([])

  React.useEffect(() => {
    let mounted = true;
    api.getUserInformation()
      .then((userData) => {
        if(mounted) {
          setUserName(userData.name)
          setUserDescription(userData.about)
          setUserAvatar(userData.avatar)
        }
      })
      .catch(console.log)
    return () => mounted = false;
  }, [])

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

      {props.editProfilePopupOpen && <PopupWithForm name='edit' title='Edit profile' onClose={props.handleClose}>
        <input id="name-input" type="text" name="name" placeholder="Name" className="form__input_type_name form__input" required minLength="2" maxLength="40" />
        <span id="name-input-error" className="form__error"></span>
        <input id="description-input" type="text" name="about" placeholder="About me" className="form__input_type_about form__input" required minLength="2" maxLength="200" />
        <span id="description-input-error" className="form__error"></span>
        <button type="submit" aria-label="save" className="form__button">Save</button>
      </PopupWithForm>}

      {props.editAvatarPopupOpen && <PopupWithForm name='avatar' title='Change profile picture' onClose={props.handleClose}>
        <input id="avatar-input" type="url" name="avatar" placeholder="Avatar link" className="form__input_type_avatar form__input" required />
        <span id="avatar-input-error" className="form__error"></span>
        <button type="submit" aria-label="save" className="form__button">Save</button>
      </PopupWithForm>}

      {props.addPlacePopupOpen && <PopupWithForm name='add' title='New place' onClose={props.handleClose}>
        <input id="title-input" type="text" name="name" placeholder="Title" className="form__input_type_title form__input" required minLength="1" maxLength="30" />
        <span id="title-input-error" className="form__error"></span>
        <input id="image-input" type="url" name="link" placeholder="Image link" className="form__input_type_image form__input" required />
        <span id="image-input-error" className="form__error"></span>
        <button type="submit" aria-label="create" className="form__button">Create</button>
      </PopupWithForm>}

      {props.deletePlacePopupOpen && <PopupWithForm name='delete-card' title='Are you sure?' onClose={props.handleClose}>
        <button type="submit" aria-label="create" className="form__button">Yes</button>
      </PopupWithForm>}

      <Cards handleCards={cards} onCardClick={props.onCardClick} onDeletePlaceClick={props.onDeletePlaceClick}/>

      {props.children}

    </main>
  )
}
export default Main;