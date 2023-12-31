import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Wrapper from "../components/Wrapper";
import Icons from "../components/constants/Icons";
import Flex from "../components/constants/Flex";
import LiveRow from "../components/live/LiveRow";
import { fonts } from "../components/constants/fonts";
import Matches from "../components/matches/Matches";

const Home = () => {
  return (
    <Wrapper>
      <View style={{ flex: 1, padding: 10 }}>
        <Flex justify={"space-between"}>
          <Text
            style={{
              fontSize: 20,
              color: "white",
              fontWeight: "800",
              fontFamily: fonts.mul8,
            }}
          >
            FootballNow
          </Text>
          <Flex>
            <Icons icon={"search"} color='white' />
            <Icons icon={"notifications-outline"} color='white' />
          </Flex>
        </Flex>
        <LiveRow />
        <Matches />
      </View>
    </Wrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
