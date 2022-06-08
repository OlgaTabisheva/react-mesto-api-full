import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image-container ${props.card._id ? 'popup_opened' : ''}`}>
      <div className="popup__container-image">
        <button type="button" className="popup__close" onClick={props.onClose}/>
        <img className="popup__image-link" alt="Изображение места" src={props.card.link}/>
        <h2 className="popup__place-name"/>
      </div>
    </div>
  );
}

export default ImagePopup;