import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import LiveCard from "./LiveCard";
import Flex from "../constants/Flex";
import { colors } from "../constants/colors";
import { liveData } from "../../data";
import { live_fixtures } from "../../Model/live_matches";

const LiveRow = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [liveMatches, setLiveMatches] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await live_fixtures();

    const filteredData = [
      ...(data?.England?.["Premier League"] || []),
      ...(data?.France?.["Ligue 1"] || []),
      ...(data?.Germany?.["Bundesliga"] || []),
      ...(data?.Spain?.["La Liga"] || []),
      ...(data?.Italy?.["Seria A"] || []),
      ...(data?.World?.["UEFA Champions League"] || []),
    ];

    setLiveMatches(filteredData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);

    fetchData()
      .then(() => setIsRefreshing(false))
      .catch(() => setIsRefreshing(false));
  };

  return (
    <View style={{ rowGap: 10, marginTop: 20 }}>
      <Flex justify={"space-between"}>
        <Text style={{ color: colors.white }}>Live Now</Text>
        <Text style={{ color: colors.white }}>See More</Text>
      </Flex>
      <FlatList
        data={liveMatches}
        renderItem={({ item }) => {
          return (
            <LiveCard
              home={item.teams.home.name}
              away={item.teams.away.name}
              homeScore={item.goals.home}
              awayScore={item.goals.away}
              minutesPlayed={item.fixture.status.elapsed}
              status={item.fixture.status.short}
              matchObj={item}
              key={item.fixture.id}
              date={item.fixture.date}
              homeLogo={item.teams.home.logo}
              awayLogo={item.teams.away.logo}
              btn={true}
            />
          );
        }}
        keyExtractor={(_, index) => index}
        horizontal
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

export default LiveRow;

const styles = StyleSheet.create({});
