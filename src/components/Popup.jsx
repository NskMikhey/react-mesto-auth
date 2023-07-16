import React, { useEffect, useRef } from "react";

const Popup = (props) => {

    const { closeHandler, className, children, isOpen } = props;
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
        if (isOpen) {
            document.addEventListener("click", handleOverlayClose, false);
            document.addEventListener("keydown", closeByEsc, false);
        }

        return () => {
            if (isOpen) {
                document.removeEventListener("click", handleOverlayClose, false);
                document.removeEventListener("keydown", closeByEsc, false);
            }
        };
        //eslint-disable-next-line
    }, [isOpen, closeHandler]);

    return (
        <div className={className} ref={popup}>
            {children}
        </div>
    );
};

export default Popup;