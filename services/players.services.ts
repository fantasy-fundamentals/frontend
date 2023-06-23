import { HTTP_CLIENT } from "../utilty/axiosClient";

const handleFilterPlayers = async (params?: any) => {
  let END_POINT_TO_HIT = `/players?`;
  // Code that would allow only truthy values to be included in the query params
  let i = 0;
  let filterQueryStr = "";
  if (![undefined, null].includes(params)) {
    for (let [key, value] of Object.entries(params)) {
      if (!!value) {
        if (i === 0) {
          filterQueryStr += `${key}=${value}`;
        } else {
          filterQueryStr += `&${key}=${value}`;
        }
      }
      i++;
    }
  }

  END_POINT_TO_HIT =
    filterQueryStr.length > 0
      ? `${END_POINT_TO_HIT}${filterQueryStr}`
      : END_POINT_TO_HIT;
  return await HTTP_CLIENT.get(END_POINT_TO_HIT);
};

const handlePlayers = async (page?: any, email?: any, teamBy?: any) => {
  return await HTTP_CLIENT.get(
    `/players?limit=${20}&status=Active&page=${
      page ? page : 0
    }&email=${email}&team=${teamBy ? teamBy : undefined}`
  );
};

const handleScoreWeek = async (
  page?: any,
  email?: any,
  teamBy?: any,
  week?: string
) => {
  return await HTTP_CLIENT.get(
    `/players/players-by-rating?limit=${20}&status=Active&page=${
      page ? page : 0
    }&email=${email}&team=${teamBy ? teamBy : undefined}&week=${week}`
  );
};

const handleAuthPlayers = async (page?: any) => {
  return await HTTP_CLIENT.get(
    `/players/list-for-authenticated?limit=${10}&page=${
      page ? page : 0
    }&status=Active`
  );
};
const handleFavotitePlayers = async (
  id?: any,
  email?: string,
  favorite?: boolean
) => {
  return await HTTP_CLIENT.get(`/player-favorite/${id}/${email}/${favorite}`);
};

const getFavotitePlayers = async (email?: string) => {
  return await HTTP_CLIENT.get(`/player-favorite/${email}`);
};

const getPlayersDetail = async (id?: string) => {
  return await HTTP_CLIENT.get(`/players/${id}/details`);
};

const handlePlayersScore = async (upcoming?: any, limit?: any, page?: any) => {
  return await HTTP_CLIENT.get(
    `/scores?upcoming=${upcoming ? upcoming : false}&limit=${
      limit ? limit : 13
    }&page=${page ? page : 0}`
  );
};
const handleScoreCurrentWeek = async () => {
  return await HTTP_CLIENT.get(`/scores/current-week`);
};

export {
  handlePlayers,
  handlePlayersScore,
  handleFavotitePlayers,
  getFavotitePlayers,
  handleAuthPlayers,
  handleFilterPlayers,
  getPlayersDetail,
  handleScoreWeek,
  handleScoreCurrentWeek,
};
