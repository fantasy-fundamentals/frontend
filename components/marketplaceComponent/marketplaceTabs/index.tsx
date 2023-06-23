import { useSelector } from "react-redux";
import AllMarketplaceCard from "./all";
import styles from "./MarketplaceTabComponent.module.scss";
import MintedMarketplaceCards from "./mintedNfts";
interface Props {
  search?: string | any;
  data?: any[] | any;
  page?: number;
  setPage?: Function;
  loading?: boolean;
  handlePageChange?: () => void;
  activePrice?: boolean;
  activeTab?: string;
  setActiveTab?: (prop?: string) => void;
  totalArrayData?: null | number;
  setData?: any;
  selection: string;
}
function MarketplaceTabComponent(prop: Props) {
  const {
    search,
    data,
    page,
    setPage,
    loading,
    activePrice,
    activeTab,
    setActiveTab,
    handlePageChange,
    totalArrayData,
    setData,
  } = prop;
  const { accessToken } = useSelector((state: any) => state?.user);

  const handleTab = (type: string, number: number) => {
    if (!loading && activeTab != type) {
      setActiveTab(type);
      setPage(number);
      setData([]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <ul className={styles.nav}>
          {/* <li
            onClick={() => handleTab("All", 0)}
            className={activeTab === "All" ? styles.active : ""}
          >
            All NFTs
          </li> */}

          <li
            onClick={() => handleTab("Minted", 0)}
            className={activeTab === "Minted" ? styles.active : ""}
          >
            Trade Block
          </li>
        </ul>

        <div className="outlet">
          {activeTab === "All" && (
            <AllMarketplaceCard
              search={search}
              data={data}
              page={page}
              setPage={setPage}
              loading={loading}
              handlePageChange={handlePageChange}
              activePrice={activePrice}
              totalArrayData={totalArrayData}
              selection={prop.selection}
            />
          )}
          {activeTab === "Minted" && (
            <MintedMarketplaceCards
              activePrice={activePrice}
              search={search}
              data={data}
              page={page}
              setPage={setPage}
              loading={loading}
              handlePageChange={handlePageChange}
              totalArrayData={totalArrayData}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MarketplaceTabComponent;
