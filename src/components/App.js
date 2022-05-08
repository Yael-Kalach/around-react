import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function App() {
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false)
  const [isDeletePlacePopupOpen, setisDeletePlacePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([])
  const [currentUser, setCurrentUser] = React.useState('');

  React.useEffect(() => {
    api.getUserInformation()
      .then((userData) => {
        setCurrentUser(userData)
      })
      .catch(console.log)
  }, [])

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((currentCard) => 
          currentCard._id === card._id ? newCard : currentCard));
      })
      .catch(console.log)
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(cardEl => cardEl._id !== card._id)
        setCards(newCards);
      })
      .catch(console.log)
  }

  function handleAddPlaceSubmit(data){
    api.createCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
    })
    .then(closeAllPopups)
    .catch((error) => console.log(error));
  }

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

  function handleUpdateUser(data) {
    api.editUserInformation(data)
      .then((userData) => {
        setCurrentUser(userData)
      })
      .then(closeAllPopups)
      .catch(console.log)
  }

  function handleUpdateAvatar(data) {
    api.editUserAvatar(data)
      .then((userData) => {
        setCurrentUser(userData)
      })
      .then(closeAllPopups)
      .catch(console.log)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main 
          onDeletePlaceClick={handleDeletePlaceClick} 
          onEditAvatarClick={handleEditAvatarClick} 
          onEditProfileClick={handleEditProfileClick} 
          onAddPlaceClick={handleAddPlaceClick} 
          avatar={currentUser.avatar}
          name={currentUser.name}
          about={currentUser.about}
          cards={cards.map((card) => (<Card 
            key={card._id}
            card={card}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />))} 
        >

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSubmitCard={handleAddPlaceSubmit} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <PopupWithForm name='delete-card' title='Are you sure?' isOpen={isDeletePlacePopupOpen} onClose={closeAllPopups} buttonText='Yes' />

          <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} card={selectedCard} />

        </Main>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
