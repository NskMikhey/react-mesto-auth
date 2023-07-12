import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import * as Auth from "../utils/auth.js";

function App() {

  // Состояние пользователя — вошёл он в систему или нет
  const [loggedIn, setLoggedIn] = useState(false);

  /** История переходов страниц */
  const navigate = useNavigate();

  /** Состояние Email пользователя, для шапки */
  const [email, setEmail] = useState("");

  /** Стейт состояния получения данных пользователя и карточек */
  const [isLoadingAllData, setIsLoadingAllData] = useState(false);

  /** Состояние всплывашки Tooltip карточки */
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);

  /** Тип всплывашки Tooltip карточки */
  const [infoTooltipType, setInfoTooltipType] = useState("error");





  // Состояние контекста пользователя 
  const [currentUser, setCurrentUser] = useState({});

  // Состояние массива карточек 
  const [cards, setCards] = useState([]);

  // Состояние Popup редактирования профиля 
  const [editProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);

  // Состояние Popup добавления карточки 
  const [newPlacePopupOpen, setNewPlacePopupOpen] = React.useState(false);

  // Состояние Popup редактирования аватара 
  const [updateAvatarPopupOpen, setUpdateAvatarPopupOpen] =
    React.useState(false);

  // Состояние выбранной для просмотра карточки 
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });

  // Состояние Popup удаления карточки
  const [deletePlacePopupOpen, setDeletePlacePopupOpen] =
    React.useState(false);

  // Состояние выбранной для удаления карточки 
  const [deleteCard, setDeleteCard] = React.useState({ _id: "" });

  // Состояние сохранения данных 
  const [isLoading, setIsLoading] = React.useState(false);

  // Открывает Popup редактирования профиля 
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  // Открывает Popup добавления карточки 
  function handleNewPlaceClick() {
    setNewPlacePopupOpen(true);
  }
  // Открывает Popup редактирования аватара 
  function handleUpdateAvatarClick() {
    setUpdateAvatarPopupOpen(true);
  }

  //Устанавливает выбранную карточку по нажатию
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Открывает Popup удаления карточки
  function handleDeletePlaceClick(card) {
    setDeletePlacePopupOpen(true);
    setDeleteCard(card);
  }




  /** Открывает всплывашку Tooltip */
  function handleInfoTooltipPopupOpen() {
    setInfoTooltipOpen(true);
  }





  // Закрывает все Popup 
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setNewPlacePopupOpen(false);
    setUpdateAvatarPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setDeletePlacePopupOpen(false);
    setDeleteCard({ _id: "" });
    setInfoTooltipOpen(false);
  }

  // Ставит/удаляет лайк
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  // Удаляет карточку
  function handleCardDelete(evt) {
    evt.preventDefault();
    setIsLoading(true);
    api.removeCard(deleteCard._id)
      .then(() => {
        setCards(cards.filter((currentCard) => currentCard._id !== deleteCard._id && currentCard));
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Отправка данных пользователя, обновление стейта currentUser
  function handleUpdateUser(inputValues) {
    setIsLoading(true);
    api.setUserData(inputValues.name, inputValues.about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Обновление аватара, обновление стейта currentUser    
  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.setUserAvatar(avatar.avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  }


  // Добавление карточки, обновление стейта cards     
  function handleAddPlaceSubmit(inputValues) {
    setIsLoading(true);
    api.addNewCard(inputValues.name, inputValues.link)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  // // //Получение данных пользователя, массива карточек
  // useEffect(() => {
  //   if (loggedIn) {
  //     Promise.all([api.getUserData(), api.getInitialCards()])
  //       .then(([dataUser, dataCard]) => {
  //         setCurrentUser(dataUser);
  //         setCards(dataCard);
  //       })
  //       .catch((err) => console.error(`Ошибка при загрузке данных с сервера ${err}`))
  //   }
  // }, [loggedIn]);


  // Регистрация
  function registration(registerData) {
    Auth.register(registerData)
      .then(() => {
        handleInfoTooltipPopupOpen();
        setInfoTooltipType("reg_success");
        setInfoTooltipOpen(true);
        navigate('/sign-in');
      })
      .catch((err) => {
        handleInfoTooltipPopupOpen();
        setInfoTooltipType("error");
        setInfoTooltipOpen(true);
        console.log(err)
      });
  }

  //Вход, запись полученного токена
  function authorization(loginData) {
    Auth.authorize(loginData)
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        setEmail(loginData.email);
        navigate('/');
      })
      .catch((err) => {
        handleInfoTooltipPopupOpen();
        setInfoTooltipType("error");
        setInfoTooltipOpen(true);
        console.log(err);
      })
  }

  /** Получает email по токену, проверка валидности токена */
  const tokenCheck = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      Auth.tokenCheck(token)
        .then((res) => {
          if (res.data) {
            setEmail(res.data.email);
            setLoggedIn(true);
          }
        })
        .catch(err => console.log(err));
    }
  }

  /** Выход из приложения. Удаление токена */
  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-up');
    setLoggedIn(false);
  }

  /** Перенаправление на главную для зарег. пользователя и на login для незарег. пользователя */
  useEffect(() => {
    loggedIn ? navigate("/") : navigate("/sign-in")
    // eslint-disable-next-line
  }, [loggedIn]);

  /** Проверка токена, получение email */
  useEffect(() => {
    tokenCheck();
  }, []);

  /** Получаем данные залогиненного пользователя, пишем в состояние currentUser */
  /** Получаем массив карточек, пишем в состояние cards */
  useEffect(() => {
    if (loggedIn) {
      setIsLoadingAllData(true);
      api.getAllData()
        .then((data) => {
          const [userData, cardsData] = data;
          setCards(cardsData);
          setCurrentUser(userData);
        })
        .catch(error => console.log(error))
        .finally(() => {
          setIsLoadingAllData(false);
        })
    }
  }, [loggedIn]);


  

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page_wrapper">

        <Header loggedIn={loggedIn} email={email} signOut={signOut} />
        <Routes >
          <Route
            path="/"
            element={
              <ProtectedRoute
                // isLoggedIn={loggedIn}
                checkToken={tokenCheck}
                element={Main}
                onEditProfile={handleEditProfileClick} // редактирование профиля
                onNewPlace={handleNewPlaceClick} // добавление карточки
                onUpdateAvatar={handleUpdateAvatarClick} // редактирование аватара
                onCardClick={handleCardClick} // нажатие на карточку
                onDeleteCard={handleDeletePlaceClick} // удаление карточки
                cards={cards}
                onCardLike={handleCardLike} // лайк/дизлайк
                isLoadingAllData={isLoadingAllData}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Register
                registration={registration}
              />
            }
          />
          <Route path="/sign-up"
            element={
              <Login authorization={authorization}
              />
            }
          />
          <Route
            path="/"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>
        <Footer />

        {/* Edit profile popup */}
        <EditProfilePopup
          popupOpen={editProfilePopupOpen}
          isLoadingAllData={isLoadingAllData}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
          loadingText="Сохранение..."
        />

        {/* New place popup */}
        <AddPlacePopup
          popupOpen={newPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
          loadingText="Добавление..."
        >
        </AddPlacePopup>

        {/* Update avatar popup */}
        <EditAvatarPopup
          popupOpen={updateAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
          loadingText="Сохранение..."
        >
        </EditAvatarPopup>

        {/* Delete card popup */}
        <PopupWithForm
          popupType="delete-place"
          popupTitle="Вы уверены?"
          submitButtonText="Да"
          popupOpen={deletePlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          isLoading={isLoading}
          loadingText="Удаление..."
        />

        {/* View image popup */}
        <ImagePopup
          popupOpen={updateAvatarPopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          popupOpen={infoTooltipOpen}
          onClose={closeAllPopups}
          type={infoTooltipType}
        />

      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
