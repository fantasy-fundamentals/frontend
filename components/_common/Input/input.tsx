import { FiSearch } from "react-icons/fi";
import styles from "./input.module.scss";
interface prop {
  style?: any;
  img?: any;
  type?: string;
  placeholder?: string;
  value?: number | any;
  disable?: any;
  name?: string;
  Name?: string;
  onClick?: (prop: any) => any;
  config?: any;
  img2?: any;
  imgOnClick?: (prop: any) => any;
  search?: any;
  wrapperStyle?: any;
  onChange?: any;
}
function Input(Props: prop) {
  let {
    style,
    img,
    type,
    placeholder,
    value,
    disable,
    name,
    onClick,
    config,
    img2,
    search,
    wrapperStyle,
    imgOnClick,
    onChange,
    Name,
  } = Props;
  const toSpread = config && config ? config : Props;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper} style={wrapperStyle}>
        <div className={styles.headingWrapper}>{Name}</div>
        <div className={styles.inputWrapper} style={style}>
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            disabled={disable}
            name={name}
            onClick={onClick}
            {...toSpread}
          />
          {img2 ? (
            <span onClick={imgOnClick}>
              {search ? <FiSearch /> : <img src={img2} alt="" />}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Input;
