import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Team, Title } from "../components/constants/Paragraphs";
import { fonts } from "../components/constants/fonts";
import { colors } from "../components/constants/colors";
import MatchesCard from "../components/matches/MatchesCard";
import MatchesHeader from "../components/matches/MatchesHeader";
import { leagueTableData, liveData } from "../data";
import Wrapper from "../components/Wrapper";
import LeagueTable from "../components/matchdetails/LeagueTable";
import Card from "../components/constants/Card";
import Flex from "../components/constants/Flex";
import Icons from "../components/constants/Icons";
import { makeApiRequest } from "../Model/api";
import { league_fixtures } from "../Model/league_fixtures";

const competitionDetailsHeader = [
  {
    title: "Results",
    id: 1,
  },
  {
    title: "Fixtures",
    id: 2,
  },
  {
    title: "Standing",
    id: 3,
  },
  {
    title: "Stats",
    id: 4,
  },
];

const CompDetails = ({ route }) => {
  const [activeId, setActiveId] = useState(1);
  const [matchDetails, setMatchDetails] = useState(null);
  const [swipe, setSwipe] = useState(1);
  const [statTitle, setStatTitle] = useState(null);
  const [compDetailsDisplay, setCompDetailsDisplay] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (activeId === 1) {
  //     setCompDetailsDisplay(liveData.slice(0, 7));
  //   } else if (activeId === 2) {
  //     setCompDetailsDisplay(liveData.slice(2, 5));
  //   }
  // }, [activeId]);

  const handleLeft = () => {
    setSwipe((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleRight = () => {
    setSwipe((prev) => (prev < 3 ? prev + 1 : prev));
  };

  useEffect(() => {
    setMatchDetails(route.params?.comp);
  }, [route]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (activeId === 1) {
        const data = await league_fixtures(matchDetails?.league?.id, "FT");
        setCompDetailsDisplay(data);
      }
      if (activeId === 2) {
        const data = await league_fixtures(matchDetails?.league?.id, "NS");
        setCompDetailsDisplay(data);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [activeId]);

  useEffect(() => {
    swipe === 1
      ? setStatTitle("Goal")
      : swipe === 2
      ? setStatTitle("Assist")
      : setStatTitle("Clean Sheet");
  }, [swipe]);

  const renderHeader = () => (
    <Flex justify={"space-between"}>
      <Flex>
        <Team team={"#"} color={colors.txtSec} />
        <View>
          <Team team={"Player"} color={colors.txtSec} />
        </View>
      </Flex>
      <Team team={statTitle} color={colors.txtSec} />
    </Flex>
  );

  const renderBody = ({ item, key }) => (
    <View key={key} style={{ marginBottom: 14 }}>
      <Flex justify={"space-between"}>
        <Flex>
          <Team team={item.position} color={colors.txtSec} />
          <Flex>
            <Image source={require("../assets/images/testImg.png")} />
            <View style={{ rowGap: 6 }}>
              <Team team={item.clubName} />
              <Text style={{ color: colors.txtSec }}>{item.clubName}</Text>
            </View>
          </Flex>
        </Flex>
        <Team team={item.points} color={colors.oth} />
      </Flex>
    </View>
  );

  return (
    <Wrapper>
      <View style={{ padding: 10, marginBottom: 450 }}>
        <View
          style={{
            rowGap: 14,
            marginVertical: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: `${matchDetails?.league?.logo}`,
            }}
            style={{ width: 50, height: 50 }}
          />
          <Team team={matchDetails?.country?.name} />
          <Text
            style={{
              color: colors.white,
              fontFamily: fonts.mul8,
              fontSize: 20,
            }}
          >
            {matchDetails?.league?.name}
          </Text>
        </View>
        <MatchesHeader
          matchHeader={competitionDetailsHeader}
          activeId={activeId}
          setActiveId={setActiveId}
        />
        <View>
          <View>
            {activeId === 4 ? (
              <Flex justify={"space-between"}>
                <View>
                  <Title text={statTitle} />
                </View>
                <Flex>
                  <TouchableOpacity onPress={handleLeft}>
                    <Icons icon={"chevron-back"} color={colors.white} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleRight}>
                    <Icons icon={"chevron-forward"} color={colors.white} />
                  </TouchableOpacity>
                </Flex>
              </Flex>
            ) : (
              <Title text={""} />
            )}
          </View>
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
            <ScrollView>
              {activeId === 1 || activeId === 2 ? (
                compDetailsDisplay &&
                Object.entries(compDetailsDisplay)
                ?.map(([date, fixtures]) => {
                  const fixturesToDisplay =
                    activeId === 2 ? fixtures : fixtures.reverse();

                  return (
                    <View key={date} style={{ marginVertical: 8 }}>
                      <Text
                        style={{
                          color: colors.white,
                          fontFamily: fonts.mul8,
                          fontWeight: "800",
                          marginBottom: 4,
                        }}
                      >
                        {date}
                      </Text>
                      {Array.isArray(fixturesToDisplay)
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
                                  status={comp_details?.fixture?.status?.short}
                                  matchObj={comp_details}
                                  date={comp_details?.fixture?.date}
                                />
                              </View>
                            );
                          })
                        : null}
                    </View>
                  );
                })
              ) : activeId === 3 ? (
                <LeagueTable />
              ) : (
                <View>
                  <Card>
                    {renderHeader()}
                    <View style={{ marginTop: 20 }}>
                      {leagueTableData.map((data) => {
                        return renderBody({
                          item: data,
                          key: data.id.toString(),
                        });
                      })}
                    </View>
                  </Card>
                </View>
              )}
            </ScrollView>
          )}
        </View>
      </View>
    </Wrapper>
  );
};

export default CompDetails;

const styles = StyleSheet.create({});
