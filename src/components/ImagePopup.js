function ImagePopup(props) {
  const {card, isOpen, onClose} = props
    return (
    <div className={`popup image-popup ${isOpen && 'popup_visible'}`}>
    <div className="popup__overlay image-popup__overlay" onClick={props.onClose}></div>
      <div className="image-popup__container">
        <button type="button" aria-label="close" className="popup__close-button image-popup__close-button" onClick={onClose}></button>
        <img className="image-popup__image" src={card && card.link} alt={card && card.name} />
        <p className="image-popup__caption">{card && card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup