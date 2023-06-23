import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PlayerInfoCareer from "../components/playerInfoComponent/career";
import { playerInfoScoreData } from "../components/playerInfoComponent/data";
import PlayerInfoHeader from "../components/playerInfoComponent/header";
import PlayerInfoRunnings from "../components/playerInfoComponent/runnings";
import PlayerInfoSeason from "../components/playerInfoComponent/season";
import SeasonTableComponent from "../components/playerInfoComponent/seasonTable";

import {
  secattackData,
  seckickingData,
  secscoreData,
  secsummaryData,
} from "../components/playerInfoComponent/seasonTable/secData";
import Gear from "../components/_common/GearCards";
import LatestNews from "../components/_common/latestNewsCards";
import { getPlayersDetail } from "../services/players.services";
import { handleShopData } from "../services/shopServices";
import { saveShopData } from "../store/reducers/homeSlice";
import styles from "../styles/playerInfo.module.scss";
import { getNormalizedError } from "../utilty/helpers";
const PlayerInfo = () => {
  const { playersDetails } = useSelector((state: any) => state.playersDetail);

  const { shop } = useSelector((state: any) => state?.home);
  const [playerData, setPlayerData] = useState<any>();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const location: any = useRouter();

  const handleData = async () => {
    try {
      setLoading(true);
      const shopRes = await handleShopData();
      const playerDetailRes = await getPlayersDetail(location?.query?.playerId);
      let filterData = shopRes?.data?.data?.filter((item) => item?.isActive);
      setPlayerData(playerDetailRes?.data?.data);
      dispatch(saveShopData(filterData?.slice(0, 4)));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  let TableArrayData: any = [
    {
      type: "all",
      heading: [
        "WEEK",
        "Fantasy points",
        "Passing yards",
        "Rushing yards",
        "Touchdowns",
        "Interceptions",
        "Fumbles",
        "Completion %",
        "Quarterback rating",
      ],
      recentGames: [
        playerData?.lastGameStats?.Week,
        playerData?.lastGameStats?.FantasyPoints,
        playerData?.lastGameStats?.PassingYards,
        playerData?.lastGameStats?.RushingYards,
        playerData?.lastGameStats?.Touchdowns,
        playerData?.lastGameStats?.Interceptions,
        playerData?.lastGameStats?.FumblesOwnRecoveries,
        playerData?.lastGameStats?.PassingCompletionPercentage,
        playerData?.lastGameStats?.QuarterbackHits,
      ],
      // recentGames: [
      //   playerData?.player?.historicalRating?.slice(-1)[0]?.week,
      //   playerData?.lastGameStats?.slice(-1)[0]?.rating,
      //   playerData?.lastGameStats?.PassingYards,
      //   playerData?.lastGameStats?.RushingYards,
      //   playerData?.lastGameStats?.RushingYards,
      //   playerData?.lastGameStats?.Touchdowns,
      //   playerData?.lastGameStats?.Interceptions,
      //   playerData?.lastGameStats?.FumblesOwnRecoveries,
      //   playerData?.lastGameStats?.PassingCompletionPercentage,
      // ],
      season: [
        playerData?.totalGames?.PassingYards,
        "-",
        playerData?.lastGameStats?.PassingYards,
        playerData?.lastGameStats?.RushingYards,
        playerData?.lastGameStats?.RushingYards,
        playerData?.lastGameStats?.Touchdowns,
        playerData?.lastGameStats?.Interceptions,
        playerData?.lastGameStats?.FumblesOwnRecoveries,
        playerData?.lastGameStats?.PassingCompletionPercentage,
      ],
      seasonData: playerData?.totalGames,
    },

    {
      type: "WR",
      heading: [
        "WEEK",
        "Fantasy points",
        "Targets",
        "Receptions",
        "Receiving Yards",
        "Receiving TD",
        "Rushing yards",
        "Rushing TD",
      ],
      recentGames: [
        playerData?.lastGameStats?.Week,
        playerData?.lastGameStats?.FantasyPoints,
        playerData?.lastGameStats?.ReceivingTargets,
        playerData?.lastGameStats?.Receptions,
        playerData?.lastGameStats?.ReceivingYards,
        playerData?.lastGameStats?.ReceivingTouchdowns,
        playerData?.lastGameStats?.RushingYards,
        playerData?.lastGameStats?.RushingTouchdowns,
      ],
      season: [
        "-",
        "-",
        playerData?.lastGameStats?.ReceivingTargets,
        playerData?.lastGameStats?.Receptions,
        playerData?.lastGameStats?.ReceivingYards,
        playerData?.lastGameStats?.ReceivingTouchdowns,
        playerData?.lastGameStats?.RushingYards,
        playerData?.lastGameStats?.RushingTouchdowns,
        Number(playerData?.lastGameStats?.FantasyPoints)?.toLocaleString(),
      ],
      seasonData: playerData?.totalGames,
    },

    {
      type: "RB",
      heading: [
        "Week",
        "Place they finished",
        "Rush attempts",
        "Rush Yards",
        "Rushing Touchdown",
        "Targets",
        "Receptions",
        "Receiving yards",
        "Receiving touchdowns",
        "Fantasy Points",
      ],
      recentGames: [
        playerData?.lastGameStats?.Week,
        playerData?.lastGameStats?.Stadium,
        playerData?.lastGameStats?.RushingAttempts,
        playerData?.lastGameStats?.RushingYards,
        playerData?.lastGameStats?.RushingTouchdowns,
        "-",
        playerData?.lastGameStats?.Receptions,
        playerData?.lastGameStats?.ReceivingYards,
        playerData?.lastGameStats?.RushingTouchdowns,
        Number(playerData?.lastGameStats?.FantasyPoints)?.toLocaleString(),
      ],
      season: [
        playerData?.player?.historicalRating?.slice(-1)[0]?.week,
        "-",
        playerData?.lastGameStats?.RushingAttempts,
        playerData?.lastGameStats?.RushingYards,
        playerData?.lastGameStats?.RushingTouchdowns,
        "-",
        playerData?.lastGameStats?.Receptions,
        playerData?.lastGameStats?.ReceivingYards,
        playerData?.lastGameStats?.ReceivingTouchdowns,
        Number(playerData?.lastGameStats?.FantasyPoints)?.toLocaleString(),
      ],
      seasonData: playerData?.totalGames,
    },

    {
      type: "TE",
      heading: [
        "WEEK",
        "Fantasy points",
        "Targets",
        "Receptions",
        "Receiving Yards",
        "Receiving TD",
        "Rushing yards",
        "Rushing TD",
      ],
      recentGames: [
        playerData?.lastGameStats?.Week,
        playerData?.lastGameStats?.FantasyPoints,
        playerData?.lastGameStats?.ReceivingTargets,
        playerData?.lastGameStats?.Receptions,
        playerData?.lastGameStats?.ReceivingYards,
        playerData?.lastGameStats?.ReceivingTouchdowns,
        playerData?.lastGameStats?.RushingYards,
        playerData?.lastGameStats?.RushingTouchdowns,
      ],
      season: [
        playerData?.player?.historicalRating?.slice(-1)[0]?.week,
        playerData?.player?.historicalRating?.slice(-1)[0]?.rating,
        playerData?.lastGameStats?.ReceivingTargets,
        playerData?.lastGameStats?.Receptions,
        playerData?.lastGameStats?.ReceivingYards,
        playerData?.lastGameStats?.ReceivingTouchdowns,
        playerData?.lastGameStats?.RushingYards,
        playerData?.lastGameStats?.RushingTouchdowns,
        Number(playerData?.lastGameStats?.FantasyPoints)?.toLocaleString(),
      ],
      seasonData: playerData?.totalGames,
    },

    {
      type: "QB",
      heading: [
        "WEEK",
        "Fantasy points",
        "Targets",
        "Receptions",
        "Receiving Yards",
        "Receiving TD",
        "Rushing yards",
        "Rushing TD",
      ],
      recentGames: [
        playerData?.lastGameStats?.Week,
        playerData?.lastGameStats?.FantasyPoints,
        playerData?.careerStats?.ReceivingTargets,
        playerData?.careerStats?.Receptions,
        playerData?.careerStats?.ReceivingYards,
        playerData?.careerStats?.ReceivingTouchdowns,
        playerData?.careerStats?.RushingYards,
        playerData?.careerStats?.RushingTouchdowns,
      ],
      season: [
        playerData?.player?.historicalRating?.slice(-1)[0]?.week,
        playerData?.player?.historicalRating?.slice(-1)[0]?.rating,
        playerData?.lastGameStats?.ReceivingTargets,
        playerData?.lastGameStats?.Receptions,
        playerData?.lastGameStats?.ReceivingYards,
        playerData?.lastGameStats?.ReceivingTouchdowns,
        playerData?.lastGameStats?.RushingYards,
        playerData?.lastGameStats?.RushingTouchdowns,
        Number(playerData?.lastGameStats?.FantasyPoints)?.toLocaleString(),
      ],
      seasonData: playerData?.totalGames,
    },
  ];

  let handleFilterData = TableArrayData?.find(
    (item: any) => item?.type === playersDetails?.selection
  );

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      handleData();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {loading ? (
            <div
              style={{
                minHeight: "83vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <RotatingLines
                strokeColor="#d80f29"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
              />
            </div>
          ) : (
            <>
              <PlayerInfoHeader playersDetails={playerData} />
              {/* <PlayerInfoCareer playersDetails={playerData} /> */}
              {/* <PlayerInfoSeason /> */}
              {/* <PlayerInfoRunnings /> */}

              <SeasonTableComponent
                heading="Recent game"
                summeryName="SUMMARY"
                summaryData={playerInfoScoreData}
                scoringName="SCORING"
                scoreData={playerInfoScoreData}
                KickingName="KICKING"
                kickingData={playerInfoScoreData}
                attackName="ATTACK"
                tableHeading={
                  handleFilterData?.heading
                    ? handleFilterData?.heading
                    : TableArrayData[0]?.heading
                }
                playerData={
                  handleFilterData?.recentGames
                    ? handleFilterData?.recentGames
                    : TableArrayData[0]?.recentGames
                }
              />
              <SeasonTableComponent
                type={playersDetails?.selection}
                heading="2022 Season "
                summeryName="SUMMARY"
                summaryData={playerInfoScoreData}
                scoringName="SCORING"
                scoreData={playerInfoScoreData}
                KickingName="KICKING"
                kickingData={playerInfoScoreData}
                attackName="ATTACK"
                playerData={
                  handleFilterData?.seasonData
                    ? handleFilterData?.seasonData
                    : handleFilterData?.season
                    ? handleFilterData?.season
                    : TableArrayData[0]?.season
                }
                tableHeading={
                  handleFilterData?.heading
                    ? handleFilterData?.heading
                    : TableArrayData[0]?.heading
                }
              />
              <LatestNews />
              <Gear shopData={shop} />
            </>
          )}

          {/* <SeasonTableComponent
            heading="Career By Season"
            summeryName="SUMMARY"
            summaryData={summaryData}
            scoringName="SCORING"
            scoreData={scoreData}
            KickingName="KICKING"
            kickingData={kickingData}
            attackName="ATTACK"
            attackData={attackData}
          />
          <SeasonTableComponent
            career={true}
            heading="Career Overall"
            summeryName="SUMMARY"
            summaryData={secsummaryData}
            scoringName="SCORING"
            scoreData={secscoreData}
            KickingName="KICKING"
            kickingData={seckickingData}
            attackName="ATTACK"
            attackData={secattackData}
          /> */}
        </div>
      </div>
    </>
  );
};

export default PlayerInfo;
