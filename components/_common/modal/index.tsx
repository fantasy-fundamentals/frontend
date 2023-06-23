import React, { useCallback, useEffect, useRef } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import cn from "classnames";
import styles from "./modal.module.scss";
interface prop {
  visible?: any;
  onClose?: any;
  children?: any;
  btn?: any;
  outerStyle?: any;
  btnStyle?: any;
  showModal2?: any;
}
export default function Modal(Prop: prop) {
  const { visible, onClose, children, btn, outerStyle, btnStyle, showModal2 } =
    Prop;
  const escFunction = useCallback(
    (e: any) => {
      if (e.type === "click") {
        e.preventDefault();
      }
      if (e.keyCode === 27) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    document.removeEventListener("click", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
      document.removeEventListener("click", escFunction, false);
    };
  }, [escFunction]);

  const scrollRef = useRef(null);

  useEffect(() => {
    // visible ? disableBodyScroll(scrollRef) : enableBodyScroll(scrollRef);
  }, [visible]);
  if (visible) {
    return (
      <div
        className={`${showModal2 ? styles.modal2 : styles.modal}`}
        ref={scrollRef}
      >
        <div
          className={cn(showModal2 ? styles.outer2 : styles.outer)}
          style={outerStyle}
        >
          <OutsideClickHandler onOutsideClick={onClose}>
            {btn && (
              <button
                className={styles.close}
                onClick={onClose}
                style={btnStyle}
              >
                close
              </button>
            )}

            {children}
          </OutsideClickHandler>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
