import React from 'react';
import Ok from '../images/ok.svg';
import error from '../images/error.svg';

function InfoTooltip(props) {
  return (
    <div className={`popup popup__info ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container-info">
        <button type="button" className="popup__close" onClick={props.onClose}/>
        <img src={props.isOpen == 1 ? Ok : error} alt="Изображение ok" className="image__ok"/>
        <h2
          className="popup__title popup__title-info">{props.isOpen == 1 ? 'Вы успешно зарегистрировались.' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;