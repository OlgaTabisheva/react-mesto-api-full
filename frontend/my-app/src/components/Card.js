import React from 'react';
import {currentUserContext} from "../context/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(currentUserContext)

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
  );

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__group-heart ${isLiked ? 'element__group-heart_active' : 'element__group-heart_hidden'}`);

  return (
    <article className="element">
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <button className="element__view-button" onClick={handleClick}>
        <img src={props.card.link} className="element__image" alt="Карточка с изображением места"/>
      </button>
      <div className="element__group">
        <h2 className="element__group-title">{props.card.name}</h2>
        <div className="buttons">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span type="button" className='element__like-count'>{props.card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;