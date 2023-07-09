import React from "react";
import Popup from "./Popup";
import Tooltip_error from "../images/tooltip_error.svg";
import Tooltip_success from "../images/tooltip_succes.svg";

const InfoTooltip = (props) => {
    const tooltip_types = {
        reg_success: {image: Tooltip_success, text: "Вы успешно зарегистрировались!"}, 
        error: {image: Tooltip_error, text: "Что-то пошло не так! Попробуйте ещё раз."} 
    };

    return (<Popup
            className={props.popupOpen ? "popup popup_is-opened" : "popup"}
            closeHandler={props.onClose}
        >
            <div
                className={["popup__container"].join(" ")}
            >
                <button
                    className="popup__close-button button-hover"
                    type="button"
                    aria-label="Закрыть окно"
                    onClick={props.onClose}
                />
                <div className="popup__tooltip">
                    <img className="popup__tooltip-image" src={tooltip_types[props.type].image}
                         alt={tooltip_types[props.type].text}/>
                    <p className="popup__tooltip-text">{tooltip_types[props.type].text}</p>
                </div>
            </div>
        </Popup>);
};

export default InfoTooltip;