import { BiDollar } from "react-icons/bi";
import { FaEthereum } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import DropDown from "../../_common/Dropdown/DropDown";
import styles from "./header.module.scss";

interface Props {
  searchQuery?: (prop?: string) => void;
  setActive?: (prop?: boolean) => void;
  active?: boolean;
  filterBy?: string;
  setFilterBy?: (prop?: string) => void;
  setData?: (prop?: any[]) => void;
  filterOptions?: any[];
}
const MarketplaceHeader = (prop: Props) => {
  const {
    searchQuery,
    active,
    setActive,
    filterBy,
    setFilterBy,
    filterOptions,
    setData,
  } = prop;

  const currencySelection = (type: string) => {
    if (type === "dollar") {
      setActive(true);
    } else if (type === "ada") {
      setActive(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.heading}>
          <label>MARKETPLACE</label>
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.input}>
            <FiSearch className={styles.icon} />
            <input
              type="text"
              placeholder="Search by players"
              onChange={(e: any) => searchQuery(e)}
            />
          </div>

          <div className={styles.dropDown}>
            <DropDown
              selected={filterBy}
              setSelected={(res) => {
                filterBy != res && setFilterBy(res);
                filterBy != res && setData([]);
              }}
              options={filterOptions}
              showRightIcon={true}
              rightIcon={"/icons/dropDownList.svg"}
            />
            <div className={styles.btnWrapper}>
              <button
                onClick={() => currencySelection("dollar")}
                className={active === true ? styles.btnActive : null}
              >
                <BiDollar />
              </button>
              <button
                onClick={() => currencySelection("ada")}
                className={active === false ? styles.btnActive : null}
              >
                {/* <FaEthereum /> */}
                <img src={"/icons/ada.svg"} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHeader;
function MintedNfts(arg0: string): void {
  throw new Error("Function not implemented.");
}
