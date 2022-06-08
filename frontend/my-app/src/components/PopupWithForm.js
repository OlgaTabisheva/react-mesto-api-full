import React from 'react';

function PopupWithForm(props) {

  return (

    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={props.onClose}></button>
        {props.children}
        <button className="popup__button-save" type="submit" onClick={props.onSubmit}>{props.buttonText}</button>
      </div>
    </div>
  );
}

export default PopupWithForm;