import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeApiRequest } from "./api"; // Import your API request function

const fetchAndStoreData = async (id_1, id_2) => {
  const data = await makeApiRequest("fixtures/headtohead", {
    h2h: `${id_1}-${id_2}`,
  });

  await AsyncStorage.setItem("h2h_fixture", JSON.stringify(data.response));
  return data.response;
};

export const h2h_fixtures = async (id_1, id_2) => {
  AsyncStorage.removeItem("h2h_fixture");
  try {
    const storedData = await AsyncStorage.getItem("h2h_fixture");
    let data;
    if (storedData) {
      data = JSON.parse(storedData);
    } else {
      data = await fetchAndStoreData(id_1, id_2);
    }

    return data;
  } catch (error) {
    console.error("Error:", error);
    return null; // You may want to handle the error more gracefully
  }
};
