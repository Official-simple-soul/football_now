import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Flex from "../constants/Flex";
import Card from "../constants/Card";
import StatRow from "../constants/StatRow";

const statData = [
  {
    id: 1,
    title: "Shots",
    val1: 6,
    val2: 22,
  },
  {
    id: 2,
    title: "Possession (%)",
    val1: 38,
    val2: 62,
  },
  {
    id: 3,
    title: "Corners",
    val1: 2,
    val2: 7,
  },
  {
    id: 4,
    title: "Fouls",
    val1: 12,
    val2: 8,
  },
  {
    id: 5,
    title: "Yellow Cards",
    val1: 2,
    val2: 0,
  },
  {
    id: 6,
    title: "Red Cards",
    val1: 0,
    val2: 1,
  },
  {
    id: 7,
    title: "Offsides",
    val1: 1,
    val2: 3,
  },
  {
    id: 8,
    title: "Passes",
    val1: 250,
    val2: 600,
  },
  {
    id: 9,
    title: "Tackles",
    val1: 15,
    val2: 20,
  },
  {
    id: 10,
    title: "Saves",
    val1: 3,
    val2: 8,
  },
  {
    id: 11,
    title: "Shots on Target",
    val1: 4,
    val2: 10,
  },
  {
    id: 12,
    title: "Throw-Ins",
    val1: 8,
    val2: 6,
  },
  {
    id: 13,
    title: "Goal Kicks",
    val1: 5,
    val2: 10,
  },
  // Add more data entries as needed
];

const Stats = ({ match_details }) => {
  return (
    <ScrollView>
      <Card>
        <Flex justify={"space-between"}>
          <Image
            source={{
              uri: `${match_details[0]?.teams?.home?.logo}`,
            }}
            style={{ width: 30, height: 30 }}
          />
          <Image
            source={{
              uri: `${match_details[0]?.teams?.away?.logo}`,
            }}
            style={{ width: 30, height: 30 }}
          />
        </Flex>
        <View>
          {match_details[0]?.statistics?.map((statGroup, index) => (
            <View key={index} style={{ marginVertical: 10 }}>
              {statGroup.statistics.map((stat, statIndex) => (
                <StatRow
                  val1={stat?.value}
                  val2={
                    match_details[0]?.statistics[1]?.statistics[statIndex]
                      ?.value
                  }
                  title={stat?.type}
                  key={stat?.type}
                />
              ))}
            </View>
          ))}
        </View>
      </Card>
    </ScrollView>
  );
};

export default Stats;

const styles = StyleSheet.create({});
