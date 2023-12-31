import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Flex = ({ children, justify }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: justify,
        alignItems: "center",
        columnGap: 15,
      }}
    >
      {children}
    </View>
  );
};

export default Flex;

const styles = StyleSheet.create({});
