import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useDebounce } from "usehooks-ts";
import MarketplaceHeader from "../components/marketplaceComponent/header";
import MarketplaceTabComponent from "../components/marketplaceComponent/marketplaceTabs";
import DropDown from "../components/_common/Dropdown/DropDown";
import { handleMarketData } from "../services/shopServices";
import styles from "../styles/marketplace.module.scss";
import { getNormalizedError } from "../utilty/helpers";

const Marketplace = () => {
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(0);
  const [data, setData]: any[] = useState([]);
  const [cloneddata, setClonedData]: any[] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeValue, setActiveValue] = useState(true);
  const [filterBy, setFilterBy] = useState("Filter Data By");
  const debaouncedData = useDebounce(search, 700);
  const [activeTab, setActiveTab] = useState("Minted");
  const [totalArrayData, setTotalArrayData] = useState(null);
  const [teamBy, setTeamBy] = useState("all");
  const teamOptions = ["all", "QB", "WR", "RB", "TE"];

  const filterOptions = useMemo(() => {
    if (activeTab === "All") {
      // setFilterBy("All Filters");
      return [
        "All Filters",
        // "Active",
        "Inactive",
        "Practice Squad",
        "Injured Reserve",
        "Physically Unable to Perform",
        "Non Football Injury",
        "Suspended",
        "Non-Football Illness",
        "Price Low to High",
        "Price High to Low",
      ];
    } else {
      // setFilterBy("Price Low to Hight");
      return ["Price Low to High", "Price High to Low"];
    }
  }, [activeTab]);

  const searchQuery = (e: any) => {
    setSearch(e?.target?.value);
    setData([]);
    setPage(0);
    setLoading(true);
  };

  const TeamOptionsHandler = useMemo(() => {
    if (teamBy === "all") {
      return teamOptions?.filter((item) => item != "all");
    } else {
      return teamOptions;
    }
  }, [teamBy]);

  const handleFilter = (data) => {
    if (data === "Filter Data By" || data === "All Filters") {
      return "";
    } else if (data === "Price Low to High") {
      return "asc";
    } else if (data === "Price High to Low") {
      return "desc";
    } else {
      return data;
    }
  };

  const handleMarketplaceData = async () => {
    let params: any = {
      page: page,
      limit: 12,
      minted: activeTab != "All" ? true : false,
      status: handleFilter(filterBy),
      name: debaouncedData,
      team: teamBy,
    };

    try {
      setLoading(true);
      const res = await handleMarketData(params);

      setTotalArrayData(res?.data?.total);

      if (res?.data?.data?.length === 0) {
        setData([]);
        setClonedData([]);
      } else if (data?.length != res?.data?.total) {
        setData((prev: any) => {
          return [...prev, ...res?.data?.data];
        });
        setClonedData((prev: any) => {
          return [...prev, ...res?.data?.data];
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  const handlePageChange = () => {
    setPage(page + 1);
  };

  useMemo(() => {
    handleMarketplaceData();
  }, [page, activeTab, debaouncedData, filterBy, teamBy]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <MarketplaceHeader
          searchQuery={searchQuery}
          active={activeValue}
          setActive={setActiveValue}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          filterOptions={filterOptions}
          setData={setData}
        />

        <div className={styles.middleWrapper}>
          <div className={styles.dropDownWrapper}>
            <label style={{ paddingBottom: "1rem" }}>Position</label>
            <DropDown
              selected={teamBy}
              setSelected={(res: any) => {
                !loading && teamBy != res ? setData([]) : null;
                setTeamBy(res);
              }}
              options={TeamOptionsHandler}
              showRightIcon={false}
              // border
              rightIcon={"/icons/dropDownList.svg"}
            />
          </div>
        </div>

        <MarketplaceTabComponent
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          search={search}
          data={data}
          page={page}
          setPage={setPage}
          loading={loading}
          handlePageChange={handlePageChange}
          activePrice={activeValue}
          totalArrayData={totalArrayData}
          setData={setData}
          selection={teamBy}
        />
      </div>
    </div>
  );
};

export default Marketplace;
