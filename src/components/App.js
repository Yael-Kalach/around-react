import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';

function App() {
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false)
  const [isDeletePlacePopupOpen, setisDeletePlacePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setisEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function handleDeletePlaceClick() {
    setisDeletePlacePopupOpen(!isDeletePlacePopupOpen)
  }

  function closeAllPopups(){
    setisEditProfilePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisDeletePlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="page">
      <Header />
      <Main 
        onDeletePlaceClick={handleDeletePlaceClick} 
        onEditAvatarClick={handleEditAvatarClick} 
        onEditProfileClick={handleEditProfileClick} 
        onAddPlaceClick={handleAddPlaceClick} 
        onCardClick={handleCardClick}>

        <PopupWithForm name='edit' title='Edit profile' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} buttonText='Save'>
          <input id="name-input" type="text" name="name" placeholder="Name" className="form__input_type_name form__input" required minLength="2" maxLength="40" />
          <span id="name-input-error" className="form__error"></span>
          <input id="description-input" type="text" name="about" placeholder="About me" className="form__input_type_about form__input" required minLength="2" maxLength="200" />
          <span id="description-input-error" className="form__error"></span>
        </PopupWithForm>

        <PopupWithForm name='avatar' title='Change profile picture' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText='Save'>
          <input id="avatar-input" type="url" name="avatar" placeholder="Avatar link" className="form__input_type_avatar form__input" required />
          <span id="avatar-input-error" className="form__error"></span>
        </PopupWithForm>

        <PopupWithForm name='add' title='New place' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText='Create'>
          <input id="title-input" type="text" name="name" placeholder="Title" className="form__input_type_title form__input" required minLength="1" maxLength="30" />
          <span id="title-input-error" className="form__error"></span>
          <input id="image-input" type="url" name="link" placeholder="Image link" className="form__input_type_image form__input" required />
          <span id="image-input-error" className="form__error"></span>
        </PopupWithForm>

        <PopupWithForm name='delete-card' title='Are you sure?' isOpen={isDeletePlacePopupOpen} onClose={closeAllPopups} buttonText='Yes' />

        <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} card={selectedCard}/>

      </Main>
      <Footer />
    </div>
  );
}

export default App;
