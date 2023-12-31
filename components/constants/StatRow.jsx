import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Flex from "./Flex";
import { Team } from "./Paragraphs";
import { colors } from "./colors";

const calcPercentage = (value1, value2) => {
  if (typeof value1 === "string" && value1?.includes("%")) {
    return (
      (Number(value1?.split("")[0]) /
        (Number(value1?.split("")[0]) + Number(value2?.split("")[0]))) *
      100
    ).toFixed();
  }
  return ((value1 / (value1 + value2)) * 100).toFixed();
};

const StatRow = ({ val1, val2, title }) => {
  return (
    <View style={{ rowGap: 10, marginVertical: 10 }}>
      <Flex justify={"space-between"}>
        <Team team={val1} />
        <Team team={title} />
        <Team team={val2} />
      </Flex>
      <Flex justify={"space-evenly"}>
        <View
          style={{
            width: "50%",
            height: 12,
            backgroundColor: colors.white,
            position: "relative",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            shadowOffset: 0.7,
            shadowColor: colors.sec,
            shadowOpacity: 0.7,
            borderRadius: 6,
          }}
        >
          <View
            style={{
              width: `${calcPercentage(val1, val2)}%`,
              height: 12,
              backgroundColor: colors.oth,
              position: "position",
              borderRadius: 6,
            }}
          ></View>
        </View>
        <View
          style={{
            width: "49%",
            height: 12,
            backgroundColor: colors.white,
            position: "relative",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            shadowOffset: 0.7,
            shadowColor: colors.sec,
            shadowOpacity: 0.7,
            borderRadius: 6,
          }}
        >
          <View
            style={{
              width: `${calcPercentage(val2, val1)}%`,
              height: 12,
              backgroundColor: colors.txtSec,
              position: "position",
              borderRadius: 6,
            }}
          ></View>
        </View>
      </Flex>
    </View>
  );
};

export default StatRow;

const styles = StyleSheet.create({});
