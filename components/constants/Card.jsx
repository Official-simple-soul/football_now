import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "./colors";

const Card = ({ children }) => {
  return (
    <View
      style={{
        backgroundColor: colors.sec,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 14,
        rowGap: 10,
        columnGap: 10,
      }}
    >
      {children}
    </View>
  );
};

export default Card;
