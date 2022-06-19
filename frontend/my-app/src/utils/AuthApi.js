class AuthApi {
  constructor({baseUrl, }) {
    this._baseUrl = baseUrl
  }

  signup(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => res.json())
  }

  signin(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => this._getResponseData(res))
  }

  isTokenValid(JWT) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${JWT}`
      },
    })
      .then(res => this._getResponseData(res))
      .catch(err=> console.log(err))
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}

export const authApi = new AuthApi({
  baseUrl: 'https://iamthebest.back.nomoreparties.sbs',
});

