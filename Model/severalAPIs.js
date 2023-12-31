export const getData = async () => {
  try {
    const storedData = await AsyncStorage.getItem("leagues");
    if (storedData) {
      setCompDetailsDisplay(JSON.parse(storedData));
    } else {
      const data = await makeApiRequest("fixtures", {
        league: "39",
        season: new Date().getFullYear,
      });
      await AsyncStorage.setItem("leagues", JSON.stringify(data.response));
      setCompDetailsDisplay(data.response);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
