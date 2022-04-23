import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';

function App() {
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState()
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState()
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState()
  const [isDeletePlacePopupOpen, setisDeletePlacePopupOpen] = React.useState()
  const [selectedCard, setSelectedCard] = React.useState()

  function handleCardClick(card) {
    setSelectedCard(card)
    setSelectedCard(!selectedCard)
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
        handleClose={closeAllPopups} 
        onDeletePlaceClick={handleDeletePlaceClick} 
        onEditAvatarClick={handleEditAvatarClick} 
        onEditProfileClick={handleEditProfileClick} 
        onAddPlaceClick={handleAddPlaceClick} 
        deletePlacePopupOpen={isDeletePlacePopupOpen} 
        editProfilePopupOpen={isEditProfilePopupOpen} 
        editAvatarPopupOpen={isEditAvatarPopupOpen} 
        addPlacePopupOpen={isAddPlacePopupOpen} 
        imagePopupOpen={selectedCard}
        handleInfo={selectedCard}
        cardClick={handleCardClick} 
        />
      <Footer />
    </div>
  );
}

export default App;
