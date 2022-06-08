import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {currentUserContext} from "../context/CurrentUserContext";

function EditAvatarPopup(props) {
  const [avatar, setAvatar] = React.useState('');
  const currentUser = React.useContext(currentUserContext)

  React.useEffect(() => {
    setAvatar('')
  }, [currentUser]);

  function handleChangeAvatar(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser(
      avatar
    );
  }

  return (
    <PopupWithForm className="Avatar" name='avatar' isOpen={props.isOpen} onClose={props.onClose}
                   onSubmit={handleSubmit}
                   buttonText="Coxранить">
      <form name="profileInputForm" className="popup__form" onSubmit={handleSubmit}>
        <h2 className="popup__title">Обновить аватар</h2>
        <input onChange={handleChangeAvatar} value={avatar} id="avatar" name="input-link" type="url"
               className="popup__input popup__input_card-link"
               placeholder="Ссылка на картинку" required/>
        <span id="error-avatar" className="error-message error-message_visible"/>
      </form>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;