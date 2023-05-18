export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Кукусики: ${response.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getUserInfo() {
    return this._request(`${this._url}/users/me`, { headers: this._headers });
  }

  getCards() {
    return this._request(`${this._url}/cards`, { headers: this._headers });
  }

  editingProfile(userData) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    });
  }

  addNewCard(newCardData) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newCardData.place,
        link: newCardData.linkImg,
      }),
    });
  }

  deleteCardApi(cardId) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
    });
  }

  changeAvatar(avatar) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar),
    });
  }
}

// export const api = new Api({
//   url: 'api-domainname.vitmach.nomoredomains.monster',
//   headers: {
//     authorization: '7c807b84-450d-4868-9be8-1ddb6e4753bd',
//     'Content-Type': 'application/json',
//   },
// });
