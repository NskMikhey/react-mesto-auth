import React, {useEffect, useRef} from "react";

const Popup = (props) => {

    const {closeHandler, className, children} = props;
    const popup = useRef(null);

    // Закрытие по оверлею
    const handleOverlayClose = (evt) => {
        if (evt.target.classList.contains("popup")) {
            closeHandler();
        }
    };

    // Закрытие  по Esc
    const closeByEsc = (evt) => {
        if (evt.key === "Escape") {
            closeHandler();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleOverlayClose, false);
        document.addEventListener("mousedown", closeByEsc, false);

        return () => {
            document.removeEventListener("click", handleOverlayClose, false);
            document.removeEventListener("mousedown", closeByEsc, false);
        };
    });

    return (
        <div className={className} ref={popup}>
            {children}
        </div>
    );
};

export default Popup;