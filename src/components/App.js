import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';
import ImagePopup from './utils/ImagePopup';

function App() {
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState()
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState()
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState()
  const [isDeletePlacePopupOpen, setisDeletePlacePopupOpen] = React.useState()
  const [selectedCard, setSelectedCard] = React.useState(false, {});

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
    setSelectedCard(false);
  }

  return (
    <div className="page">
      <Header />
      <Main 
        handleClose={closeAllPopups} 
        onDeletePlaceClick={handleDeletePlaceClick} 
        onEditAvatarClick={handleEditAvatarClick} 
        onEditProfileClick={handleEditProfileClick} 
        onAddPlaceClick={handleAddPlaceClick} 
        deletePlacePopupOpen={isDeletePlacePopupOpen} 
        editProfilePopupOpen={isEditProfilePopupOpen} 
        editAvatarPopupOpen={isEditAvatarPopupOpen} 
        addPlacePopupOpen={isAddPlacePopupOpen} 
        onCardClick={handleCardClick}>
        <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} imageLink={selectedCard.link} imageName={selectedCard.name}/>
      </Main>
      <Footer />
    </div>
  );
}

export default App;
