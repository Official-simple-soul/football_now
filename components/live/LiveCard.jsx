import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Flex from "../constants/Flex";
import Button from "../constants/Button";
import { colors } from "../constants/colors";
import { Score, Team } from "../constants/Paragraphs";
import { useNavigation } from "@react-navigation/native";
import Card from "../constants/Card";
import ImageWidget from "../constants/ImageWidget";

const LiveCard = ({
  home,
  away,
  homeScore,
  awayScore,
  minutesPlayed,
  matchObj,
  homeLogo,
  awayLogo,
  status,
  btn,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Home", { screen: "Details", params: { matchObj } });
  };

  return (
    <Card>
      <Flex justify={"space-between"}>
        <Text style={{ color: colors.white }}>{matchObj?.league?.name}</Text>
        <View
          style={{
            backgroundColor: "#ecfdf3",
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 3,
            flexDirection: "row",
            columnGap: 5,
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: 6,
              width: 6,
              borderRadius: 50,
              backgroundColor: colors.live,
            }}
          ></View>
          <Text style={{ fontSize: 12 }}>
            {status === "FT" ? "FT" : minutesPlayed}
          </Text>
        </View>
      </Flex>
      <View style={{ paddingHorizontal: 15 }}>
        <Flex justify={"space-between"}>
          <View style={{ alignItems: "center", rowGap: 10 }}>
            <ImageWidget logo={homeLogo} />
            <Team team={home?.split(" ")[0]} />
            <Team team={home?.split(" ")[1]} />
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              justifyContent: "center",
              alignItems: "center",
              rowGap: 10,
            }}
          >
            <Flex>
              <Score score={homeScore} color='white' fs={20} />
              <Text style={{ color: "white" }}>{"-"}</Text>
              <Score score={awayScore} color='white' fs={20} />
            </Flex>
            <Team team={status} />
          </View>
          <View style={{ alignItems: "center", rowGap: 10 }}>
            <ImageWidget logo={awayLogo} />
            <Team team={away?.split(" ")[0]} />
            <Team team={away?.split(" ")[1]} />
          </View>
        </Flex>
      </View>
      {btn && <Button buttonText={"Details"} handlePress={handlePress} />}
    </Card>
  );
};

export default LiveCard;

const styles = StyleSheet.create({});
