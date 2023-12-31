import { BASE_URL } from "./api";

// Объект с ошибками сервера
const SERVER_ERRORS = {
    400: "Одно из полей не заполнено или не прошло валидацию.",
    401: "Пользователь с введенным email не найден."
}

// проверка ответа от сервера
const handleRegResponse = (res) => {
    if (res.status !== 400) {
        return res.json();
    } else {
        throw new Error(SERVER_ERRORS[res.status]);
    }
}

const handleAuthResponse = (res) => {
    if (res.status === 400 || res.status === 401) {
        throw new Error(SERVER_ERRORS[res.status]);
    } else {
        return res.json();
    }
}

// Отправка рег. данных
export const register = (registerData) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(registerData)
    })
        .then((res) => handleRegResponse(res))
}

// функция, которая будет проверять логин и пароль пользователя
// на соответствие какому-либо профилю, хранящемуся в базе данных
export const authorize = (loginData) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
        .then((res) => handleAuthResponse(res))
}

// Запрос для проверки валидности токена и получения email для вставки в шапку сайта
export const tokenCheck = (token) => {
        return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((res) => handleRegResponse(res))
}