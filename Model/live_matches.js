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
      live: "all",
    });

    // Group the data by country
    const groupedData = groupFixturesByCountryAndLeague(data.response);

    // Store the grouped data in AsyncStorage
    await AsyncStorage.setItem("live_fixtures", JSON.stringify(groupedData));

    return groupedData;
  } catch (error) {
    console.error("Error:", error);
    return null; // You may want to handle the error more gracefully
  }
};

export const live_fixtures = async () => {
  AsyncStorage.removeItem("live_fixtures");
  try {
    const storedData = await AsyncStorage.getItem("live_fixtures");
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

// import { makeApiRequest } from "./api"; // Import your API request function

// // Group fixtures by country
// const groupFixturesByCountry = (fixtures) => {
//   return fixtures.reduce((result, fixture) => {
//     const countryName = fixture.league.country;

//     if (!result[countryName]) {
//       result[countryName] = [];
//     }

//     result[countryName].push(fixture);

//     return result;
//   }, {});
// };

// export const live_fixtures = async () => {
//   try {
//     const data = await makeApiRequest("fixtures", {
//       live: "all",
//     });

//     // Group the data by country
//     const groupedData = groupFixturesByCountry(data.response);
//     console.log("Group Data", groupedData);
//     return groupedData;
//   } catch (error) {
//     console.error("Error:", error);
//     return null; // You may want to handle the error more gracefully
//   }
// };
