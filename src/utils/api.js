class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    /** возвращает ответ / ошибку после выполнения промиса */
    _handlePromiseReturn(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
    }

    // РАБОТА С ДАННЫМИ ПОЛЬЗОВАТЕЛЯ
    //Получает информацию о пользователе с сервера
    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers,
        }).then(this._handlePromiseReturn)
    }
    //Отправляет инфо о пользователе на сервер
    setUserData(userName, userAbout) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: '438e2072-cb3f-42a1-8236-431af52821e6',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: userName,
                about: userAbout
            }),
        }).then(this._handlePromiseReturn)
    }
    //Обновляет аватар пользователя на сервере
    setUserAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ avatar }),
        }).then(this._handlePromiseReturn)
    }

    // РАБОТА С КАРТОЧКАМИ
    //Получает карточки с сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers,
        }).then(this._handlePromiseReturn)
    }
    //Отправляет данные о новой карточке на сервер
    addNewCard(cardName, cardLink) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardName,
                link: cardLink
            }),
        }).then(this._handlePromiseReturn)
    }
    // Ставит/удаляет лайк    
    changeLikeCardStatus(cardID, cardLiked) {
        return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
            method: cardLiked ? 'DELETE' : 'PUT',
            headers: this._headers
        })
            .then(this._handlePromiseReturn);
    }

    //Удаляет карточку с сервера
    removeCard(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._handlePromiseReturn)
    }

    getAllData() {
        return Promise.all([this.getUserData(), this.getInitialCards()]);
    }
}

//Экземпляр API
export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
        authorization: '438e2072-cb3f-42a1-8236-431af52821e6',
        'Content-Type': 'application/json',
    },
})

// Адрес сервера авторизации

export const BASE_URL = "https://auth.nomoreparties.co";
