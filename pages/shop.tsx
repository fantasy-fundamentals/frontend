import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ComingSoon from "../components/comingSoon";
import ShopComponentCards from "../components/shopComponent/cards";
import ShopHeader from "../components/shopComponent/playersHeader";
import { handleShopData } from "../services/shopServices";
import { getNormalizedError } from "../utilty/helpers";

const Shop = () => {
  const [searchData, setSearchData] = useState();
  const [count, setTotalCount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [data, setData]: any[] = useState([]);

  const searchQuery = (e: any) => {
    setSearchData(e.target.value);
  };

  const PlayersData = async () => {
    try {
      setLoading(true);
      const res = await handleShopData(page);

      if (res?.data?.data?.length === 0) {
        setTotalCount(true);
        return;
      } else {
        setData((prev) => [...prev, ...res?.data?.data]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  const handlePageData = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    PlayersData();
  }, [page]);

  return (
    <div>
      <ShopHeader searchCard={searchQuery} />
      {/* <ComingSoon
        style={{
          minHeight: "60vh",
        }}
        width="300px"
        height="230px"
        fontSize="40px"
      /> */}
      <ShopComponentCards
        searchData={searchData}
        data={data}
        page={page}
        setPage={setPage}
        loading={loading}
        count={count}
        handlePageData={handlePageData}
      />
    </div>
  );
};

export default Shop;
