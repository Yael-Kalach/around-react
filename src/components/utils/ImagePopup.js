function ImagePopup(props, card){
  let isOpen = (true)
  
  const className = `popup image-popup ${isOpen ? 'popup_visible' : ''}`
  
  return (
    <div className={className}>
      <div className="popup__overlay image-popup__overlay" onClick={props.onClose}></div>
      <div className="image-popup__container">
        <button type="button" aria-label="close" className="popup__close-button image-popup__close-button" onClick={props.onClose}></button>
        <img className="image-popup__image" src={card.imageLink} alt={card.imageName} />
        <p className="image-popup__caption"></p>
      </div>
    </div>
  )
}

export default ImagePopup