import React from 'react';
import Card from "./Card";
import {currentUserContext} from "../context/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(currentUserContext)
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__card">
          <div className="avatar">
            <button onClick={props.onEditAvatar} type="button" className="profile__avatar-button"><img
              src={currentUser.avatar}
              alt="Изображение логотипа в шапке"
              className="profile__avatar"/>
            </button>
          </div>
          <div className="profile__edit-info">
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__job">{currentUser.about}</p>
            </div>
            <button onClick={props.onEditProfile} type="button" className="profile__edit-button"/>
          </div>
        </div>
        <button onClick={props.onAddPlace} aria-label="Кнопка добавления" type="button"
                className="profile__add-button"/>
      </section>
      {<section className="elements">
        {props.cards.map((element) => (
          <Card card={element} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike}
                onCardClick={props.onCardClick} key={element._id}></Card>
        ))}
      </section>}
    </main>
  );
}

export default Main;




