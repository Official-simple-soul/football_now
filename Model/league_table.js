import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeApiRequest } from "./api"; // Import your API request function

const fetchAndStoreData = async (season, league_id) => {
  const data = await makeApiRequest("standings", {
    season: `${season}`,
    league: `${league_id}`,
  });

  await AsyncStorage.setItem("league_standing", JSON.stringify(data.response));
  return data.response;
};

export const league_table = async (season, league_id) => {
  AsyncStorage.removeItem("league_standing");
  try {
    const storedData = await AsyncStorage.getItem("league_standing");
    let data;
    if (storedData) {
      data = JSON.parse(storedData);
    } else {
      data = await fetchAndStoreData(season, league_id);
    }

    return data;
  } catch (error) {
    console.error("Error:", error);
    return null; // You may want to handle the error more gracefully
  }
};
