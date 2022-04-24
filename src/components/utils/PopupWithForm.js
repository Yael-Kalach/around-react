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
        <div className={overlayName} onClick={props.onClose}></div>
        <div className={containerName}>
          <button type="button" aria-label="close" className={closeButtonName} onClick={props.onClose}></button>
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

export default PopupWithForm