import React from "react"
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup (props){
  const [avatar, setAvatar] = React.useState('')

  function handleChangeAvatar(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
        avatar: avatar,
      });
  } 

  return(
    <PopupWithForm name='avatar' title='Change profile picture' isOpen={props.isOpen} onSubmit={handleSubmit} onClose={props.onClose} buttonText='Save'>
      <input id="avatar-input" type="url" name="avatar" placeholder="Avatar link" value={avatar} onChange={handleChangeAvatar} className="form__input_type_avatar form__input" required />
      <span id="avatar-input-error" className="form__error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup