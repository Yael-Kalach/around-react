import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from './utils/api';
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
    api
      .getInitialCards()
      .then((res) => {
        const cardElement = res.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          ></Card>
        ));
        setCards([...cards, cardElement]);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((currentCard) => 
          currentCard._id === card._id ? newCard : currentCard));
          console.log('click')
      })
      .catch(console.log)
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((card) => card._id !== card._id)
        setCards(newCards);
      })
      .catch(console.log)
  }

  React.useEffect(() => {
    api.getUserInformation()
      .then((userData) => {
        setCurrentUser(userData)
      })
      .catch(console.log)
  }, [])

  function handleAddPlaceSubmit(){
    api.createCard()
    .then((res) => {
      const newCard = res.map((card) => (
        <Card
          key={card._id}
          card={card}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        ></Card>
      ));
      setCards([newCard, ...cards]);
    })
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

  function handleUpdateUser() {
    api.editUserInformation()
      .then((userData) => {
        setCurrentUser(userData)
      })
      .catch(console.log)
  }

  function handleUpdateAvatar() {
    api.editUserAvatar()
      .then((userData) => {
        setCurrentUser(userData)
      })
      .catch(console.log)
  }


  function closeAllPopups(){
    setisEditProfilePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisDeletePlacePopupOpen(false);
    setSelectedCard(null);
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
          cards={cards}>

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
