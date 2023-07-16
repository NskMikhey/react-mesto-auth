import React from 'react';
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {

    // Стейт аватара
    const [avatar, setAvatar] = React.useState({ avatar: "" });

    // Стейты валидации инпутов, формы  сообщений ошибок валидации
    const [formInputsValid, setFormInputsValid] = React.useState({ name: true, about: true });
    const [formValidationMessages, setFormValidationMessages] = React.useState({ name: "", about: "" });
    const [formValid, setFormValid] = React.useState(true);

    const refAvatar = React.useRef('');

    // Изменяет стейт аватара
    function handleInputChange(evt) {
        const { name, value } = evt.target;
        setAvatar({
            ...avatar,
            [name]: value
        })
        handleInputValid(refAvatar);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateAvatar({
            avatar: refAvatar.current.value
        })
        setFormValid(false);
    }

    // Закрытие и сброс
    function handleOnClose() {
        props.onClose();
        setFormInputsValid({ avatar: false });
        setFormValid(false);
    }

    // Обрабатывает валидацию ввода события
    const handleInputValid = (input) => {
        const { name } = input.current;

        if (!input.current.validity.valid) {

            setFormInputsValid({
                ...formInputsValid,
                [name]: false
            });

            setFormValidationMessages({
                ...formValidationMessages,
                [name]: input.current.validationMessage
            });

        } else {
            setFormInputsValid({
                ...formInputsValid,
                [name]: true
            });

            setFormValidationMessages({
                ...formValidationMessages,
                [name]: ""
            });
        }
    }

    React.useEffect(() => {
        refAvatar.current.value = "";
    }, [props.popupOpen]);

    React.useEffect(() => {
        const formInputsValidValues = Object.values(formInputsValid);
        const isFormValid = formInputsValidValues.includes(false) ? false : true;
        setFormValid(isFormValid);
    }, [formInputsValid, props.popupOpen]);

    return (
        <PopupWithForm
            popupType="avatar-popup"
            popupTitle="Обновить аватар"
            submitButtonText="Сохранить"
            popupOpen={props.popupOpen}
            popupFormName="updateAvatarForm"
            onClose={handleOnClose}
            onSubmit={handleSubmit}
            isLoading={props.isLoading}
            loadingText={props.loadingText}
            onOverlayClose={props.onOverlayClose}
            isValid={formValid}
        >
            <label className="popup__input-group" htmlFor="avatar_url">
                <input
                    type="url"
                    className="popup__input"
                    name="avatar"
                    id="profile-avatar"
                    placeholder="Ссылка на картинку"
                    required
                    ref={refAvatar}
                    value={avatar.avatar}
                    onChange={handleInputChange}
                />
                <span
                    className={["popup__error", formValidationMessages.avatar !== "" ? "popup__error_visible" : ""].join(" ")}
                    id="popup__error_type_profile-avatar"
                >{formValidationMessages.avatar}</span>
            </label>
        </PopupWithForm>
    );
};

export default EditAvatarPopup;
