import React, {useEffect, useState} from 'react';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom'
import '../index.css';
import Header from './Header';
import Footer from "./Footer";
import Main from "./Main";
import {currentUserContext} from "../context/CurrentUserContext";
import {api} from "../utils/Api";
import EditProfilePopup from "../components/EditProfilePopup"
import EditAvatarPopup from "../components/EditAvatarPopup"
import AddPlacePopup from "./AddPlacePopup";
import Register from './Register';
import Login from './Login';
import ProtectedRoute from "./ProtectedRoute";
import {authApi} from "../utils/AuthApi";
import InfoTooltip from "./InfoTooltip";
import ImagePopup from "./ImagePopup";


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditEditPopupOpen, setIsEditEditPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(0);
  const [CardSelected, setsCardSelected] = React.useState({});
  const [currentUser, setСurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([])
  const [loggedIn, setIsloggedIn] = React.useState(false)
  const [userData, setUserData] = useState(null);

  React.useEffect(() => {
    if (!loggedIn)
      return;
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([profile, newcards]) => {
        setСurrentUser(profile);
        setCards(newcards);
      }).catch(err => console.log(err))
  }, [loggedIn])

  const history = useHistory();

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
  }, [isInfoTooltipOpen])

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
      return;
    }

    history.push('/sign-in');
  }, [loggedIn]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch(console.log)
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((prevState) => {
        return prevState.filter(deleteCard => deleteCard._id !== card._id)
      })
    }).catch(console.log)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditEditPopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setsCardSelected(card)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditEditPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsInfoTooltipOpen(0)
    setsCardSelected({})
  }

  function handleUpdateUser(newInfo) {
    api.editProfile(newInfo.name, newInfo.about).then((newUserInfo) => {
      setСurrentUser(newUserInfo)
      closeAllPopups()
    }).catch(console.log)
  }

  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar).then((newUserInfo) => {
      setСurrentUser(newUserInfo)
      closeAllPopups()
    }).catch(console.log)
  }

  function handleAddPlaceSubmit(newInfo) {
    api.addCard(newInfo.name, newInfo.link).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    }).catch(console.log)
  }

  const handleRegister=(username,password)=>{
    return authApi
      .signup(username, password)
      .then((res) => {
        if (res.data) {
          setIsInfoTooltipOpen(1)
          history.push('/sign-in')
        }
        else
          setIsInfoTooltipOpen(2)
        }).catch(setIsInfoTooltipOpen(2))
  }

  const handleLogin = (username, password) => {
    return authApi
      .signin(username, password)
      .then((data) => {
        if (!data.token) {
          return;
        }
        setUserData({
          _id: "",
          email: username
        });
        localStorage.setItem('JWT', data.token);

        setIsloggedIn(true)
        setIsInfoTooltipOpen(0)
      }).catch((err)=>{
        if (err)
          setIsInfoTooltipOpen(2)
      });
  }
  const tokenCheck = () => {
    let jwt = localStorage.getItem('JWT');
    if (jwt) {
      authApi.isTokenValid(jwt).then((res) => {
        if (res) {
          setUserData({
            _id: res._id,
            email: res.email
          });
          setIsloggedIn(true);
        }
      }).catch(err => console.log(err));
    }
  }

  function signOut() {
    localStorage.removeItem('JWT');
    setIsloggedIn(false)
    history.push('/sign-up');
  }

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header data={userData} onClick={signOut}/>
        <Switch>
          <ProtectedRoute exact path="/" isLoggedIn={loggedIn} component={Main}
                          onEditAvatar={handleEditAvatarClick}
                          onEditProfile={handleEditProfileClick}
                          onAddPlace={handleAddPlaceClick}
                          onCardClick={handleCardClick}
                          cards={cards}
                          onCardLike={handleCardLike}
                          onCardDelete={handleCardDelete}
                          userData={userData}
          />
          <Route path="/sign-in" >
            <div className="loginContainer">
              <Login handleLogin={handleLogin} tokenCheck={tokenCheck} />
            </div>
          </Route>
          <Route path="/sign-up">
            <div className="RegisterContainer">
              <Register handleRegister={handleRegister}  />
            </div>
          </Route>
          <Route path="*">
            {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
          </Route>
        </Switch>
        <Footer/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateAvatar}/>
        <EditProfilePopup isOpen={isEditEditPopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdateUser={handleAddPlaceSubmit}/>
        <ImagePopup card={CardSelected} onClose={closeAllPopups}/>
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups}/>
      </div>
    </currentUserContext.Provider>
  );
}

export default App;


