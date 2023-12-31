import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "./colors";

const Button = ({ buttonText, handlePress }) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: colors.oth,
          borderRadius: 10,
          paddingVertical: 7,
        }}
        onPress={handlePress}
      >
        <Text style={{ textAlign: "center", color: colors.white }}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({});
