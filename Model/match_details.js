import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeApiRequest } from "./api"; // Import your API request function

const fetchAndStoreData = async (fixture_id) => {
  const data = await makeApiRequest("fixtures", {
    id: `${fixture_id}`,
  });

  await AsyncStorage.setItem("single_fixture", JSON.stringify(data.response));
  return data.response;
};

export const single_fixtures = async (fixture_id, activeId) => {
  AsyncStorage.removeItem("single_fixture");
  try {
    const storedData = await AsyncStorage.getItem("single_fixture");
    let data;
    if (storedData) {
      data = JSON.parse(storedData);
    } else {
      data = await fetchAndStoreData(fixture_id);
    }

    return data;
  } catch (error) {
    console.error("Error:", error);
    return null; // You may want to handle the error more gracefully
  }
};
