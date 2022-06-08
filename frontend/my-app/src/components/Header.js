import Vector_logo from '../images/Vector_logo.svg';
import React from 'react';
import {Link,Switch,Route} from "react-router-dom";

function Header(props) {

  function logOut() {
    if (!props.link)
      if (props.onClick)
        props.onClick()
  }
  return (
    <header className="header">
      <img src={Vector_logo} alt="Изображение логотипа в шапке" className="header__logo"/>
      <nav className='header__nav'>
        <Switch>
          <Route path='/sign-up'>
            <Link className='header__link' to='/sign-in'>Войти</Link>
          </Route>
          <Route path='/sign-in'>
            <Link className='header__link' to='/sign-up'>Регистрация</Link>
          </Route>
          <Route path='*'>
            <h2 className='header__text'>{props.data && props.data.email}</h2>
            <Link className='header__link' to='' onClick={() => logOut()} >Выйти</Link>
          </Route>
        </Switch>
      </nav>
    </header>
  );
}

export default Header;