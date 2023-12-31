import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import LiveCard from "../components/live/LiveCard";
import Wrapper from "../components/Wrapper";
import MatchesHeader from "../components/matches/MatchesHeader";
import Summary from "../components/matchdetails/Summary";
import LineUp from "../components/matchdetails/LineUp";
import Stats from "../components/matchdetails/Stats";
import H2H from "../components/matchdetails/H2H";
import LeagueTable from "../components/matchdetails/LeagueTable";
import { single_fixtures } from "../Model/match_details";

const matchHeader = [
  {
    title: "Summary",
    id: 1,
  },
  {
    title: "Line Up",
    id: 2,
  },
  {
    title: "Stats",
    id: 3,
  },
  {
    title: "H2H",
    id: 4,
  },
  {
    title: "Standings",
    id: 5,
  },
];

const Details = ({ route }) => {
  const [activeId, setActiveId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const matchDetails = route.params.matchObj;
  const [detailsDisplay, setDetailsDisplay] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await single_fixtures(matchDetails?.fixture?.id);

      if (activeId === 1) {
        setDetailsDisplay(<Summary match_details={data} />);
      } else if (activeId === 2) {
        setDetailsDisplay(<LineUp match_details={data} />);
      } else if (activeId === 3) {
        setDetailsDisplay(<Stats match_details={data} />);
      } else if (activeId === 4) {
        setDetailsDisplay(<H2H match_details={data} />);
      } else {
        setDetailsDisplay(<LeagueTable match_details={data} />);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [activeId]);

  // useEffect(() => {
  //   if (activeId === 1) {
  //     setDetailsDisplay(Summary);
  //   } else if (activeId === 2) {
  //     setDetailsDisplay(LineUp);
  //   } else if (activeId === 3) {
  //     setDetailsDisplay(Stats);
  //   } else if (activeId === 4) {
  //     setDetailsDisplay(<H2H home={home} away={away} />);
  //   } else {
  //     setDetailsDisplay(LeagueTable);
  //   }
  // }, [activeId]);

  return (
    <Wrapper>
      <View style={{ paddingHorizontal: 10, marginBottom: 400 }}>
        <View style={{ marginVertical: 14 }}>
          <LiveCard
            home={matchDetails.teams.home.name}
            away={matchDetails.teams.away.name}
            homeScore={matchDetails.goals.home}
            awayScore={matchDetails.goals.away}
            minutesPlayed={matchDetails.fixture.status.elapsed}
            homeLogo={matchDetails?.teams?.home?.logo}
            awayLogo={matchDetails?.teams?.away?.logo}
            status={matchDetails?.fixture?.status?.short}
          />
        </View>
        <MatchesHeader
          matchHeader={matchHeader}
          activeId={activeId}
          setActiveId={setActiveId}
        />
        <View style={{ paddingVertical: 20 }}>{detailsDisplay}</View>
      </View>
    </Wrapper>
  );
};

export default Details;

const styles = StyleSheet.create({});
