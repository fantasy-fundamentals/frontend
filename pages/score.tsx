import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ScoreComCards from "../components/scoreComponent/cards";
import ScoreDropDown from "../components/scoreComponent/dropDown";
import ScoreCards from "../components/scoreComponent/scoreCards";
import ScoreHeader from "../components/scoreComponent/scoreHeader/index";
import ScoreTabs from "../components/scoreComponent/scoreTabs";
import TopHeading from "../components/scoreComponent/topHeading";
import {
  handleScoreCurrentWeek,
  handleScoreWeek,
} from "../services/players.services";
import styles from "../styles/score.module.scss";
import { getNormalizedError } from "../utilty/helpers";

const Score = () => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState();
  const { user } = useSelector((state: any) => state?.user);
  const [count, setTotalCount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData]: any[] = useState([]);
  const [page, setPage] = useState(0);
  const [teamBy, setTeamBy] = useState("QB");
  const teamOptions = ["QB", "WR", "RB", "TE"];
  const [week, setWeek] = useState("-");
  const WeeksArray = [];
  for (let i = 1; i <= 52; i++) {
    WeeksArray?.push(i.toString());
  }
  const searchQuery = (e: any) => {
    setSearchData(e.target.value);
  };
  const handleCurrentWeek = async () => {
    try {
      const currentWeek = await handleScoreCurrentWeek();
      setWeek(currentWeek?.data === 0 ? "-" : currentWeek?.data);
    } catch (error) {
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };
  const handleScoreData = async () => {
    try {
      setLoading(true);

      const res = await handleScoreWeek(
        page,
        user?.email,
        teamBy
        // week === "Select Week" ? undefined : week
      );
      if (res?.data?.data?.length === 0) {
        setTotalCount(true);
      } else if (data?.length != res?.data?.total) {
        setData((prev: any) => [...prev, ...res?.data?.data]);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  useMemo(() => {
    handleCurrentWeek();
  }, []);

  useEffect(() => {
    handleScoreData();
  }, [teamBy, page]);

  const handleTeamPositionChange = (value) => {
    setPage(0);
    setTeamBy(value);
  };

  return (
    <div className={styles.container}>
      <ScoreHeader searchCard={searchQuery} />
      <div className={styles.wrapper}>
        <ScoreDropDown
          position={teamBy}
          setPosition={handleTeamPositionChange}
          positionOption={teamOptions}
          setData={setData}
          loading={loading}
          setWeeks={setWeek}
          week={week}
          weekArray={WeeksArray}
        />
        <ScoreComCards
          searchData={searchData}
          data={data}
          page={page}
          setPage={setPage}
          loading={loading}
          count={count}
          selection={teamBy}
          week={week}
          teamBy={teamBy}
        />
        {/* <div className={styles.cardWrapper}>
          <div className={styles.leftWrapper}>
            <ScoreCards searchData={searchData} />
          </div>
          <div className={styles.rightWrapper}>
            <TopHeading />
            <ScoreTabs />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Score;
