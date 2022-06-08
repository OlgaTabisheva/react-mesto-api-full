import React from "react";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function signIn(e) {
    e.preventDefault();
    props.handleLogin(email, password)
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="register">
      <form onSubmit={signIn} id="form__input" name="loginForm" className="popup__form" >
        <h2 className="popup__title title">Вход</h2>
        <input onChange={handleChangeEmail} placeholder="Email" id="email"
               name="input-email" type="text"
               className="popup__input popup__input_type_name input" minLength={2} maxLength={40} required/>
        <span id="error-email" className="error-message error-message_visible"/>
        <input onChange={handleChangePassword} placeholder="Пароль" id="password" type='password'
               name="input-password"
               className="popup__input popup__input_type_job input" minLength={2} maxLength={200} required/>
        <span id="error-password" className="error-message error-message_visible"/>
        <button className="popup__button-save button" type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;