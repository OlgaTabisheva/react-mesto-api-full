import React from 'react';
import {Link} from "react-router-dom"

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function signUp(e) {
    e.preventDefault();
    props.handleRegister(email, password)
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="register">
      <form onSubmit={signUp} id="form__input" name="profileInputForm" className="popup__form" >
        <h2 className="popup__title title">Регистрация</h2>
        <input onChange={handleChangeEmail} placeholder="Email" id="name"
               name="input-name" type="text"
               className="popup__input popup__input_type_name input" minLength={2} maxLength={40} required/>
        <span id="error-name" className="error-message error-message_visible"/>
        <input onChange={handleChangePassword} placeholder="Пароль" id="password"
               name="input-password" type='password'
               className="popup__input popup__input_type_job input" minLength={2} maxLength={200} required/>
        <span id="error-password" className="error-message error-message_visible"/>
        <button className="popup__button-save button" type="submit">Зарегистрироваться</button>
        <Link className='register__login' to="/sign-in">Уже зарегистрированы? Войти</Link>
      </form>
    </div>
  );
}

export default Register;


