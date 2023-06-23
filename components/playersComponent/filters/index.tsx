import DropDown from "../../_common/Dropdown/DropDown";
import styles from "./filters.module.scss";

interface props {
  filterBy?: any;
  setFilterBy?: any;
  statusOptions?: any[];
  setSearchById?: (prop?: any) => void;
  setSearchByFirstName?: (prop?: any) => void;
  setSearchByLastName?: (prop?: any) => void;
  setTeamBy?: (prop?: any) => void;
  loading?: boolean;
  setData?: (prop?: any[]) => void;
  TeamOptionsHandler?: any;
  teamBy?: string;
  setPage?: (prop: number) => void;
}
const Filters = (prop: props) => {
  const {
    filterBy,
    setFilterBy,
    statusOptions,
    setSearchById,
    setSearchByFirstName,
    setSearchByLastName,
    loading,
    setData,
    TeamOptionsHandler,
    teamBy,
    setTeamBy,
    setPage,
  } = prop;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.headingWrapper}>
          <label>FILTER DATA BY:</label>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <label>Player ID</label>
            <div className={styles.inputStyle}>
              <input
                placeholder="ID"
                type="number"
                onChange={(e) => {
                  setSearchById(e?.target?.value);
                  if (e?.target?.value?.length > 0) {
                    setPage(0);
                  } else if (e?.target?.value?.length === 0) {
                    setData([]);
                  }
                }}
              />
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <label>First Name</label>
            <div className={styles.inputStyle}>
              <input
                placeholder="First Name"
                type="text"
                onChange={(e) => {
                  setSearchByFirstName(e?.target?.value);
                  if (e?.target?.value?.length > 0) {
                    setPage(0);
                  } else if (e?.target?.value?.length === 0) {
                    setData([]);
                  }
                }}
              />
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <label>Last Name</label>
            <div className={styles.inputStyle}>
              <input
                placeholder="Last Name"
                type="text"
                onChange={(e) => {
                  setSearchByLastName(e?.target?.value);
                  if (e?.target?.value?.length > 0) {
                    setPage(0);
                  } else if (e?.target?.value?.length === 0) {
                    setData([]);
                  }
                }}
              />
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.dropDownWrapper}>
              <label style={{ paddingBottom: "1rem" }}>Filter</label>
              <DropDown
                selected={filterBy}
                setSelected={(res: any) => {
                  !loading && filterBy != res ? setData([]) : null;
                  setFilterBy(res);
                  localStorage.setItem("filterVal", res);
                }}
                options={statusOptions}
                showRightIcon={false}
                // border
                rightIcon={"/icons/dropDownList.svg"}
              />
            </div>
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.dropDownWrapper}>
            <label style={{ paddingBottom: "1rem" }}>Position</label>
            <DropDown
              selected={teamBy}
              setSelected={(res: any) => {
                !loading && teamBy != res ? setData([]) : null;
                setTeamBy(res);
                localStorage.setItem("val", res);
              }}
              options={TeamOptionsHandler}
              showRightIcon={false}
              // border
              rightIcon={"/icons/dropDownList.svg"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
