function ImagePopup(props) {
    return (
    <div className={`popup image-popup ${props.isOpen ? 'popup_visible' : ''}`}>
    <div className="popup__overlay image-popup__overlay" onClick={props.onClose}></div>
      <div className="image-popup__container">
        <button type="button" aria-label="close" className="popup__close-button image-popup__close-button" onClick={props.onClose}></button>
        <img className="image-popup__image" src={props.imageLink} alt={props.imageName} />
        <p className="image-popup__caption">{props.imageName}</p>
      </div>
    </div>
  )
}

export default ImagePopup