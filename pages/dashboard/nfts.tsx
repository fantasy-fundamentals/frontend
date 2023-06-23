import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import NftsCardsComponent from "../../components/dashboardLayout/nfts";
import PrivateRoute from "../../components/PrivateRoute";
import Sidebar from "../../components/_common/sideBar/sidebar";
import {
  handleMyMintedNfts,
  MintedNftValue,
} from "../../services/nft.services";
import styles from "../../styles/dashboard/nfts.module.scss";
import { getNormalizedError } from "../../utilty/helpers";
const NFTS = () => {
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(0);
  const [data, setData]: any[] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeValue, setActiveValue] = useState(false);
  const [totalNftPrice, setTotalNftPrice] = useState();
  const [totalArrayData, setTotalArrayData] = useState(null);
  const { namiWalletAddress } = useSelector((state: any) => state?.user);

  const handleMarketplaceData = async () => {
    let params: any = {
      page: page,
      limit: 12,
      minted: true,
      // wallet: namiWalletAddress,
    };
    try {
      setLoading(true);

      const responses: any = await Promise.all([
        handleMyMintedNfts(params).catch((error) => ({ error })),
        MintedNftValue(namiWalletAddress).catch((error) => ({ error })),
      ]);

      setTotalArrayData(responses[0].error ? [] : responses[0]?.data?.total);
      setTotalNftPrice(responses[0].error ? [] : responses[1]?.data);

      if (responses?.data?.data?.length === 0) {
        setData([]);
      } else if (data?.length != responses[0]?.data?.total) {
        setData((prev: any) => {
          return [...prev, ...responses[0]?.data?.data];
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
    let isMounted = true;
    if (isMounted) {
      handleMarketplaceData();
    }
    return () => {
      isMounted = false;
    };
  }, [page, namiWalletAddress]);

  return (
    <PrivateRoute>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <NftsCardsComponent
            search={search}
            data={data}
            page={page}
            setPage={setPage}
            loading={loading}
            handlePageChange={handlePageChange}
            activePrice={activeValue}
            totalArrayData={totalArrayData}
            totalNftPrice={totalNftPrice}
          />
        </div>
      </div>
    </PrivateRoute>
  );
};
NFTS.getLayout = (page) => <Sidebar>{page}</Sidebar>;
export default NFTS;
