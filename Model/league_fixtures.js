// league_fixtures.js

import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeApiRequest } from "./api"; // Import your API request function

const groupAndFilterFixtures = (fixtures, statusFilter) => {
  const groupedFixtures = {};

  fixtures.forEach((fixture) => {
    const date = fixture?.fixture?.date?.split("T")[0];
    if (!groupedFixtures[date]) {
      groupedFixtures[date] = [];
    }
    groupedFixtures[date].push(fixture);
  });
  return groupedFixtures;
};

const fetchAndStoreData = async (league_id, status) => {
  const data = await makeApiRequest("fixtures", {
    league: `${league_id}`,
    season: `${new Date().getFullYear()}`,
    status: `${status}`,
  });
  await AsyncStorage.setItem("league_fixture", JSON.stringify(data.response));
  return data.response;
};

export const league_fixtures = async (league_id, status) => {
  AsyncStorage.removeItem("league_fixture");
  try {
    const storedData = await AsyncStorage.getItem("league_fixture");
    let data;
    if (storedData) {
      data = JSON.parse(storedData);
    } else {
      data = await fetchAndStoreData(league_id, status);
    }
    // const statusFilter = activeId === 1 ? "FT" : "NS";
    const groupedAndFilteredFixtures = groupAndFilterFixtures(data);

    return groupedAndFilteredFixtures;
  } catch (error) {
    console.error("Error:", error);
    return null; // You may want to handle the error more gracefully
  }
};
