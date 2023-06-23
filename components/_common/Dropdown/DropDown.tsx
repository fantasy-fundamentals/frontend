import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import styles from "./DropDown.module.scss";
interface prop {
  selected?: {} | any;
  setSelected?: {} | any;
  options?: any[] | any;
  showRightIcon?: any;
  rightIcon?: any;
  disable?: Boolean;
  border?: Boolean;
}
const DropDown = (Props: prop) => {
  const { selected, setSelected, options, showRightIcon, rightIcon, border } =
    Props;
  const [isActive, setIsActive] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isActive && dropRef.current && !dropRef.current.contains(e.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isActive]);

  return (
    <div
      className={Props.disable ? styles.disableDropdown : styles.dropdown}
      ref={dropRef}
    >
      <div
        className={styles.dropdownbtn}
        style={border ? { border: "1px solid #ffffff7a" } : null}
        onClick={(e) => {
          Props.disable ? null : setIsActive(!isActive);
        }}
      >
        {showRightIcon === false ? null : (
          <div className={styles.imgContainer}>
            <div className={styles.leftIcon}>
              <img src={rightIcon} alt="" />
            </div>
          </div>
        )}
        <span>{selected}</span>
        <div className={styles.withRightIcon}>
          <FiChevronDown />
        </div>
      </div>

      {isActive && (
        <div className={styles.dropdowncontent}>
          {options.map((option: any, index: any) => (
            <div
              key={index}
              onClick={(e) => {
                setSelected(option);
                setIsActive(false);
              }}
              className={styles.dropdownitems}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
