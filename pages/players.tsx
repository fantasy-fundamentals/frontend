import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDebounce } from "usehooks-ts";
import ForgotPassword from "../components/_common/forgotPassword";
import Login from "../components/_common/login";
import Modal from "../components/_common/modal";
import SignUp from "../components/_common/signUp";
import PlayerComCards from "../components/playersComponent/cards";
import Filters from "../components/playersComponent/filters";
import PlayersHeader from "../components/playersComponent/playersHeader";
import {
  handleFavotitePlayers,
  handleFilterPlayers,
} from "../services/players.services";
import { getNormalizedError } from "../utilty/helpers";

const players = () => {
  let va = localStorage.getItem("val");
  let filterVal = localStorage.getItem("filterVal");
  const [count, setTotalCount] = useState(false);
  const { user } = useSelector((state: any) => state?.user);
  const [loading, setLoading] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [data, setData]: any[] = useState([]);
  const [cloneData, setCloneData]: any[] = useState([]);
  const [activeModal, setActiveModal] = useState<any>(1);
  const [popupvisible, setpopupvisible] = useState(false);
  const [searchById, setSearchById] = useState(null);
  const [searchByFirstName, setSearchByFirstName] = useState(null);
  const [totalArrayData, setTotalArrayData] = useState(null);
  const [searchByLastName, setSearchByLastName] = useState(null);
  const [totalSearchCount, setTotalSearchCount] = useState(0);
  const [teamBy, setTeamBy] = useState(va === null ? "all" : va?.toString());
  const teamOptions = ["all", "QB", "WR", "RB", "TE"];
  const [filterBy, setFilterBy] = useState(
    filterVal === null ? "Filter Data By" : filterVal?.toString()
  );
  const byId = useDebounce(searchById, 700);
  const ByFirstName = useDebounce(searchByFirstName, 700);
  const ByLastName = useDebounce(searchByLastName, 700);

  const statusOptions = [
    "All",
    "Active",
    "Inactive",
    "Fantasy points Low to High",
    "Fantasy points High to Low",
  ];

  const toggleData = () => {
    setpopupvisible(false);
    setActiveModal(1);
  };

  const handleConnectModal = (type?: string) => {
    if (type === "signUp") {
      setActiveModal(2);
    } else if (type === "forgot") {
      setActiveModal(3);
    } else if (type === "login") {
      setActiveModal(1);
    }
  };

  const handleFilter = (data) => {
    if (data === "Filter Data By" || data === "All") {
      return "";
    } else if (data === "Fantasy points Low to High") {
      return "asc";
    } else if (data === "Fantasy points High to Low") {
      return "desc";
    } else {
      return data;
    }
  };

  const PlayersData = async (val?: any) => {
    try {
      setLoading(true);
      let params = {
        limit: 20,
        page: page,
        email: user?.email,
        team: val === null ? "all" : teamBy,
        playerId: byId ? String(byId)?.trim() : "",
        firstName: ByFirstName ? String(ByFirstName)?.trim() : "",
        lastName: ByLastName ? String(ByLastName)?.trim() : "",
        status: handleFilter(filterBy),
      };
      const res = await handleFilterPlayers(params);
      setTotalArrayData(res?.data?.total);
      if (res?.data?.data?.length === 0) {
        setTotalCount(true);
      } else {
        if (
          byId?.length > 0 ||
          ByFirstName?.length > 0 ||
          ByLastName?.length > 0
        ) {
          setData([]);
          setCloneData((prev: any) => [...prev, ...res?.data?.data]);
        } else {
          setCloneData([]);
          setData((prev: any) => [...prev, ...res?.data?.data]);
        }
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  const handleFavData = async (data?: {
    _id?: string;
    isFavorite?: boolean;
  }) => {
    try {
      if (user === null) {
        setpopupvisible((preview) => !preview);
      } else {
        setFavLoading(true);
        const res = await handleFavotitePlayers(
          data?._id,
          user?.email,
          !data?.isFavorite
        );
        setData((prev: any) => {
          return prev.map((item: any) => {
            if (item?._id === data?._id) {
              return {
                ...item,
                isFavorite: !item.isFavorite,
              };
            } else {
              return item;
            }
          });
        });
        toast.success(res?.data?.message);
        setFavLoading(false);
      }
    } catch (error) {
      setFavLoading(false);
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  const FilterOptionsHandler = useMemo(() => {
    if (filterBy === "Filter Data By") {
      return statusOptions?.filter((item) => item != "All");
    } else {
      return statusOptions;
    }
  }, [filterBy]);

  const TeamOptionsHandler = useMemo(() => {
    if (teamBy === "all") {
      return teamOptions?.filter((item) => item != "all");
    } else {
      return teamOptions;
    }
  }, [teamBy]);

  useEffect(() => {
    if (byId || ByFirstName || ByLastName) {
      setCloneData([]);
      setTotalSearchCount(Number(page + 1) * 20);
    }
    PlayersData();
  }, [page, teamBy, byId, ByFirstName, ByLastName, filterBy]);

  return (
    <div>
      <Modal visible={popupvisible} btn onClose={() => toggleData()}>
        {activeModal === 1 ? (
          <Login
            onClick={() => handleConnectModal("signUp")}
            onClickForgot={() => handleConnectModal("forgot")}
            popupvisible={setpopupvisible}
          />
        ) : activeModal === 2 ? (
          <SignUp onClick={() => handleConnectModal("login")} />
        ) : activeModal === 3 ? (
          <ForgotPassword
            onClickSignUp={() => handleConnectModal("signUp")}
            setActiveModal={setActiveModal}
          />
        ) : null}
      </Modal>
      <PlayersHeader />
      <Filters
        statusOptions={FilterOptionsHandler}
        setFilterBy={setFilterBy}
        filterBy={filterBy}
        setSearchById={setSearchById}
        setSearchByFirstName={setSearchByFirstName}
        setSearchByLastName={setSearchByLastName}
        loading={loading}
        setData={setData}
        TeamOptionsHandler={TeamOptionsHandler}
        setTeamBy={setTeamBy}
        teamBy={teamBy}
        setPage={setPage}
      />
      <PlayerComCards
        data={
          byId?.length > 0 || ByFirstName?.length > 0 || ByLastName?.length > 0
            ? cloneData
            : data
        }
        page={page}
        setPage={setPage}
        loading={loading}
        favLoading={favLoading}
        count={count}
        handleFavData={handleFavData}
        selection={teamBy}
        totalArrayData={totalArrayData}
        totalSearchCount={totalSearchCount}
      />
    </div>
  );
};

export default players;
