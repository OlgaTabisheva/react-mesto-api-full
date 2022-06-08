import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {currentUserContext} from "../context/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(currentUserContext)

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);

  },  [currentUser, props.isOpen]);

  function handleChangeName(e) {

    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm className="Edit" name='edit' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
                   buttonText="Coxранить">
      <form id="form__input" name="profileInputForm" className="popup__form" onSubmit={handleSubmit}>
        <h2 className="popup__title">Редактировать профиль</h2>
        <input onChange={handleChangeName} value={ name || ''} placeholder="Введите имя пользователя" id="name"
               name="input-name" type="text"
               className="popup__input popup__input_type_name" minLength={2} maxLength={40} required/>
        <span id="error-name" className="error-message error-message_visible"/>
        <input onChange={handleChangeDescription} value={description || ''} placeholder="Введите профессию" id="job"
               name="input-job" type="text"
               className="popup__input popup__input_type_job" minLength={2} maxLength={200} required/>
        <span id="error-job" className="error-message error-message_visible"/>
      </form>
    </PopupWithForm>
  );
}

export default EditProfilePopup;