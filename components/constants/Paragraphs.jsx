import { View, Text } from "react-native";
import React from "react";
import { colors } from "./colors";
import { fonts } from "./fonts";

export const Team = ({ team, color }) => {
  return (
    <Text
      style={{
        fontSize: 14,
        color: color ? color : colors.white,
        fontFamily: fonts.mul5,
      }}
    >
      {team}
    </Text>
  );
};

export const Score = ({ score, color, fs }) => (
  <Text
    style={{
      color: color,
      fontSize: fs,
      fontWeight: "900",
      fontFamily: fonts.mul8,
    }}
  >
    {score}
  </Text>
);

export const DetailText = ({ color, text }) => (
  <Text
    style={{
      color: color,
      fontSize: 10,
      fontFamily: fonts.mul5,
      marginVertical: 4,
    }}
  >
    {text}
  </Text>
);

export const Title = ({ text, color }) => (
  <Text
    style={{
      color: color ? color : colors.white,
      fontSize: 20,
      fontFamily: fonts.mul8,
      marginVertical: 14,
    }}
  >
    {text}
  </Text>
);
