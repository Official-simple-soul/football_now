import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import MatchesCard from "./MatchesCard";
import { liveData } from "../../data";
import { live_fixtures } from "../../Model/live_matches";
import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";
import { all_fixtures } from "../../Model/all_fixtures";
import { finished_fixtures } from "../../Model/finished_fixtures";
const MatchesRow = ({ activeId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [liveMatches, setLiveMatches] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    if (activeId === 2) {
      const data = await all_fixtures();
      setLiveMatches(data);
    } else if (activeId === 3) {
      const data = await finished_fixtures();
      setLiveMatches(data);
    } else {
      const data = await live_fixtures();
      setLiveMatches(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [activeId]);

  const handleRefresh = () => {
    setIsRefreshing(true);

    fetchData()
      .then(() => setIsRefreshing(false))
      .catch(() => setIsRefreshing(false));
  };

  return (
    <View style={{ marginVertical: 10, paddingBottom: 30 }}>
      {isLoading ? (
        <ActivityIndicator size={"large"} color={colors.white} />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
        >
          {liveMatches &&
            Object.entries(liveMatches)
              ?.sort(([countryA], [countryB]) =>
                countryA.localeCompare(countryB)
              )
              .map(([country, leagues]) => {
                return (
                  <View key={country} style={{ marginVertical: 8 }}>
                    {Object.entries(leagues).map(([league, fixtures]) => (
                      <View key={league}>
                        {fixtures.length > 0 && (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginTop: 10,
                            }}
                          >
                            <Text
                              style={{
                                color: colors.white,
                                fontFamily: fonts.mul8,
                                fontWeight: "800",
                                marginBottom: 4,
                              }}
                            >
                              {country}
                            </Text>
                            <Text
                              style={{
                                marginHorizontal: 5,
                                color: colors.white,
                              }}
                            >
                              -
                            </Text>
                            <Text
                              style={{
                                color: colors.white,
                                fontFamily: fonts.mul8,
                                fontWeight: "600",
                                marginBottom: 4,
                              }}
                            >
                              {league}
                            </Text>
                          </View>
                        )}
                        {Array.isArray(fixtures)
                          ? fixtures.map((comp_details, index) => {
                              return (
                                <View key={index}>
                                  <MatchesCard
                                    home={comp_details?.teams?.home?.name}
                                    away={comp_details?.teams?.away?.name}
                                    homeLogo={comp_details?.teams?.home?.logo}
                                    awayLogo={comp_details?.teams?.away?.logo}
                                    homeScore={comp_details?.goals?.home}
                                    awayScore={comp_details?.goals?.away}
                                    minutesPlayed={
                                      comp_details?.fixture?.status?.elapsed
                                    }
                                    status={
                                      comp_details?.fixture?.status?.short
                                    }
                                    matchObj={comp_details}
                                    date={comp_details?.fixture?.date}
                                  />
                                </View>
                              );
                            })
                          : null}
                      </View>
                    ))}
                  </View>
                );
              })}
        </ScrollView>
      )}
    </View>
  );
};

export default MatchesRow;

const styles = StyleSheet.create({});
