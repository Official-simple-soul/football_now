import axios from "axios";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const apiKey = process.env.EXPO_PUBLIC_API_KEY;
const commonHeaders = {
  "X-RapidAPI-Key": apiKey,
  "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
};

export const makeApiRequest = async (ep, params) => {
  try {
    const response = await axios.get(`${apiUrl}${ep}`, {
      headers: commonHeaders,
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error("Error making API request:", error);
    throw error;
  }
};
