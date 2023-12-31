import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeApiRequest } from "./api"; // Import your API request function

// Group fixtures by country
const groupFixturesByCountryAndLeague = (fixtures) => {
  return fixtures.reduce((result, fixture) => {
    const countryName = fixture.league.country;
    const leagueName = fixture.league.name;

    if (!result[countryName]) {
      result[countryName] = {};
    }

    if (!result[countryName][leagueName]) {
      result[countryName][leagueName] = [];
    }

    result[countryName][leagueName].push(fixture);

    return result;
  }, {});
};

// Function to fetch and store data
const fetchAndStoreData = async () => {
  try {
    const data = await makeApiRequest("fixtures", {
      date: new Date().toISOString().split("T")[0],
    });

    // Group the data by country
    const groupedData = groupFixturesByCountryAndLeague(data.response);

    // Store the grouped data in AsyncStorage
    await AsyncStorage.setItem("all_fixtures", JSON.stringify(groupedData));

    return groupedData;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const all_fixtures = async () => {
  AsyncStorage.removeItem("all_fixtures");
  try {
    const storedData = await AsyncStorage.getItem("all_fixtures");
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      const data = await fetchAndStoreData();
      return data;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
    ully;
  }
};
