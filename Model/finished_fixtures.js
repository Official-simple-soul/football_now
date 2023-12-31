import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeApiRequest } from "./api"; // Import your API request function

// Group fixtures by country and league
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

// Function to filter fixtures by status
const filterFixturesByStatus = (fixtures, status) => {
  for (const country in fixtures) {
    for (const league in fixtures[country]) {
      fixtures[country][league] = fixtures[country][league].filter(
        (fixture) => fixture.fixture.status.short === status
      );
    }
  }
  return fixtures;
};

// Function to fetch and store data
const fetchAndStoreData = async () => {
  try {
    const data = await makeApiRequest("fixtures", {
      date: new Date().toISOString().split("T")[0],
    });

    // Group the data by country and league
    const groupedData = groupFixturesByCountryAndLeague(data.response);

    // Filter the data by status "FT"
    const filteredData = filterFixturesByStatus(groupedData, "FT");

    // Store the filtered data in AsyncStorage
    await AsyncStorage.setItem(
      "finished_fixtures",
      JSON.stringify(filteredData)
    );

    return filteredData;
  } catch (error) {
    console.error("Error:", error);
    return null; // You may want to handle the error more gracefully
  }
};

// Function to get finished fixtures
export const finished_fixtures = async () => {
  AsyncStorage.removeItem("finished_fixtures");
  try {
    const storedData = await AsyncStorage.getItem("finished_fixtures");
    if (storedData) {
      // If data is found in storage, parse and return it
      return JSON.parse(storedData);
    } else {
      // If no data is found, fetch and store data
      const data = await fetchAndStoreData();
      return data;
    }
  } catch (error) {
    console.error("Error:", error);
    return null; // You may want to handle the error more gracefully
  }
};
