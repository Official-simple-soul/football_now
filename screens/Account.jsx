import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Wrapper from "../components/Wrapper";
import { fonts } from "../components/constants/fonts";
import { colors } from "../components/constants/colors";

const Account = () => {
  return (
    <Wrapper>
      <View
        style={{
          padding: 10,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: fonts.mul5,
            fontWeight: 500,
            color: colors.white,
            textAlign: "center",
          }}
        >
          This service is currently not available
        </Text>
      </View>
    </Wrapper>
  );
};

export default Account;

const styles = StyleSheet.create({});
