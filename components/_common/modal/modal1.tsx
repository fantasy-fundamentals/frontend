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
  backgroundColor?: any;
}
export default function Modal1(Prop: prop) {
  const {
    visible,
    onClose,
    children,
    btn,
    outerStyle,
    btnStyle,
    showModal2,
    backgroundColor,
  } = Prop;
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

  const scrollRef = useRef(null);

  useEffect(() => {
    // visible ? disableBodyScroll(scrollRef) : enableBodyScroll(scrollRef);
  }, [visible]);
  if (visible) {
    return (
      <div
        className={`${showModal2 ? styles.modal2 : styles.modal}`}
        style={{ background: backgroundColor }}
        ref={scrollRef}
      >
        <div
          className={cn(showModal2 ? styles.outer2 : styles.outer)}
          style={outerStyle}
        >
          {btn && (
            <button className={styles.close} onClick={onClose} style={btnStyle}>
              close
            </button>
          )}

          {children}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
