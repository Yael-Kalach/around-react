import avatar from '../images/photos/Avatar.png'
import React, { useState } from 'react';
import api from './utils/api';
import Cards from './utils/Cards';
import { getAllByDisplayValue } from '@testing-library/react';

function PopupWithForm(props) {

    let isOpen = (true)

    const popupName = `popup ${props.name}-popup ${isOpen ? 'popup_visible' : ''}`
    const overlayName = `popup__overlay ${props.name}-popup__overlay`
    const containerName = `popup__container ${props.name}-popup__container`
    const closeButtonName = `popup__close-button ${props.name}-popup__close-button`
    const formName = `form ${props.name}-form`
    const popupTitle = `${props.title}`

    return (
      <div className= {popupName}>
        <div className={overlayName}></div>
        <div className={containerName}>
          <button type="button" aria-label="close" className={closeButtonName} onClick={isOpen = props.onClose}></button>
          <form name="form" className={formName}>
            <h2 className="form__title">{popupTitle}</h2>
            <fieldset className="form__fieldset">
              {props.children}
            </fieldset>
          </form>
        </div>
      </div>
    ) 
}

function imagePopup(props){
  let isOpen = (true)
  const className = `popup image-popup ${isOpen ? 'popup_visible' : ''}`

  return (
    <div className={className}>
      <div className="popup__overlay image-popup__overlay"></div>
      <div className="image-popup__container">
        <button type="button" aria-label="close" className="popup__close-button image-popup__close-button" onClick={isOpen = props.onClose}></button>
        <img className="image-popup__image" />
        <p className="image-popup__caption"></p>
      </div>
    </div>
  )
}

function Main(props) {
  const [userName, setUserName] = React.useState([])
  const [userDescription, setUserDescription] = React.useState([])
  const [userAvatar, setUserAvatar] = React.useState([])

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

      <Cards onDeletePlaceClick={props.onDeletePlaceClick}/>

    </main>
  )
}
export default Main;