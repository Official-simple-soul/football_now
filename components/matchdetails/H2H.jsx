import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Card from "../constants/Card";
import { Team } from "../constants/Paragraphs";
import { Divider } from "react-native-paper";
import { fonts } from "../constants/fonts";
import MatchesCard from "../matches/MatchesCard";
import { liveData } from "../../data";
import Flex from "../constants/Flex";
import { colors } from "../constants/colors";
import { h2h_fixtures } from "../../Model/H2H";
import ImageWidget from "../constants/ImageWidget";

function calculateResults(matches) {
  let homeWins = 0;
  let awayWins = 0;
  let draws = 0;

  matches?.slice(0, 5)?.forEach((match) => {
    const homeWinner = match.teams.home.winner;
    const awayWinner = match.teams.away.winner;

    if (homeWinner === true) {
      homeWins++;
    } else if (homeWinner === false) {
      awayWins++;
    } else {
      draws++;
    }
  });

  return {
    homeWins,
    awayWins,
    draws,
  };
}

const H2H = ({ match_details }) => {
  const [h2h, setH2H] = useState(null);
  const [topDetails, setTopDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await h2h_fixtures(
        match_details[0]?.teams?.home?.id,
        match_details[0]?.teams?.away?.id
      );
      setH2H(data);
      setTopDetails(calculateResults(data));
      console.log(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {}, [H2H]);

  return (
    <ScrollView>
      <Card>
        <Flex justify={"space-between"}>
          <View style={{ alignItems: "center", rowGap: 10 }}>
            <Flex>
              <ImageWidget logo={match_details[0]?.teams?.home?.logo} />
              <Team team={"Wins"} />
            </Flex>
            <Team team={topDetails?.homeWins} />
          </View>
          <View style={{ alignItems: "center", rowGap: 10 }}>
            <Team team={"Draws"} />
            <Team team={topDetails?.draws} />
          </View>
          <View style={{ alignItems: "center", rowGap: 10 }}>
            <Flex>
              <ImageWidget logo={match_details[0]?.teams?.away?.logo} />
              <Team team={"Wins"} />
            </Flex>
            <Team team={topDetails?.awayWins} />
          </View>
        </Flex>
        <Divider />
        <Text
          style={{
            textAlign: "center",
            color: colors.white,
            fontFamily: fonts.mul5,
            marginVertical: 15,
          }}
        >
          Last 5 Matches
        </Text>
        {isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size='large' color={colors.white} />
          </View>
        ) : (
          <View>
            {h2h?.slice(0, 5).map((item, idx) => {
              return (
                <MatchesCard
                  home={item.teams.home.name}
                  away={item.teams.away.name}
                  homeScore={item.goals.home}
                  awayScore={item.goals.away}
                  minutesPlayed={item.fixture.status.elapsed}
                  status={item.fixture.status.short}
                  matchObj={item}
                  key={idx}
                  date={item.fixture.date}
                  homeLogo={item.teams.home.logo}
                  awayLogo={item.teams.away.logo}
                />
              );
            })}
          </View>
        )}
      </Card>
    </ScrollView>
  );
};

export default H2H;

const styles = StyleSheet.create({});
