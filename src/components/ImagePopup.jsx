import React from 'react';
const ImagePopup = (props) => {

    const { name, link } = props.card;

    return (
        <section className={link !== '' ? "popup popup_is-opened image-popup" : "popup image-popup"}
            aria-label="попап зума"
            onClick={props.onOverlayClose}
        >
            <div className="popup__image-container" aria-label="зум карточки">
                <button
                    className="popup__close-button button-hover"
                    type="button"
                    aria-label="Закрыть окно"
                    onClick={props.onClose} />
                <img src={link} alt={`Изображение ${name}`} className="popup__image" />
                <p className="popup__image-title">{name}</p>
            </div>
        </section>
    )
};

export default ImagePopup