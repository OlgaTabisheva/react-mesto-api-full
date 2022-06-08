import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  React.useEffect(() => {
    if (!props.isOpen) {
      setLink("");
      setNameLink("");
    }
  }, [props.isOpen])
  const [name, setNameLink] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeNameLink(e) {

    setNameLink(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      link,
    });
  }

  return (
    <PopupWithForm className="Add-card" name='add-card' isOpen={props.isOpen} onClose={props.onClose}
                   onSubmit={handleSubmit}
                   buttonText="Coздать">
      <form name="placeInputForm" className="popup__form" noValidate onSubmit={handleSubmit}>
        <h2 className="popup__title">Новое место</h2>
        <input onChange={handleChangeNameLink} value={name} id="place" name="input-place" type="text"
               className="popup__input popup__input_type_card-name"
               minLength={2} maxLength={30} placeholder="Название" required/>
        <span id="error-place" className="error-message error-message_visible"/>
        <input onChange={handleChangeLink} value={link} id="link" name="input-link" type="url"
               className="popup__input popup__input_card-link"
               placeholder="Ссылка на картинку" required/>
        <span id="error-link" className="error-message error-message_visible"/>
      </form>

    </PopupWithForm>
  );
}

export default AddPlacePopup;