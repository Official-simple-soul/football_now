import {
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { colors } from "../constants/colors";
import { Team } from "../constants/Paragraphs";
import Flex from "../constants/Flex";
import { fonts } from "../constants/fonts";
import { useNavigation } from "@react-navigation/native";
import { formatDateToCustomFormat } from "../constants/dateFormat";

const MatchesCard = ({
  home,
  away,
  homeScore,
  awayScore,
  minutesPlayed,
  status,
  matchObj,
  homeLogo,
  awayLogo,
  date,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  // const animateBlink = () => {
  //   Animated.loop(
  //     Animated.sequence([
  //       Animated.timing(fadeAnim, {
  //         toValue: 1,
  //         duration: 2000,
  //         easing: Easing.linear,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(fadeAnim, {
  //         toValue: 1,
  //         duration: 2000,
  //         easing: Easing.linear,
  //         useNativeDriver: true,
  //       }),
  //     ]),
  //     {
  //       iterations: -1,
  //     }
  //   ).start();
  // };

  // useEffect(() => {
  //   animateBlink();
  // }, []);

  const handleNavigate = () => {
    navigation.navigate("Home", { screen: "Details", params: { matchObj } });
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.sec,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 14,
        columnGap: 20,
        marginVertical: 5,
      }}
      onPress={handleNavigate}
    >
      <Flex justify={"space-between"}>
        <Flex>
          <View
            style={{
              rowGap: 6,
              alignItems: "center",
              width: 30,
            }}
          >
            {status === "1H" || status === "2H" ? (
              // <Animated.View style={{ opacity: fadeAnim }}>
              <Text
                style={{
                  color: colors.txtSec,
                  color: colors.live,
                  fontSize: 12,
                }}
              >
                {`${minutesPlayed}'`}
              </Text>
            ) : // </Animated.View>
            status === "FT" || status === "HT" ? (
              <>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 10,
                    fontFamily: fonts.mul5,
                    fontWeight: "500",
                  }}
                >
                  {status}
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={{
                    color: colors.txtSec,
                    fontSize: 10,
                    fontFamily: fonts.mul5,
                    fontWeight: "500",
                  }}
                >
                  {formatDateToCustomFormat(new Date(date))}
                </Text>
              </>
            )}
          </View>
          <View style={{ rowGap: 6 }}>
            <Flex>
              <Image
                source={{
                  uri: `${homeLogo}`,
                }}
                style={{ width: 20, height: 20 }}
              />
              <Team team={home} />
            </Flex>
            <Flex>
              <Image
                source={{
                  uri: `${awayLogo}`,
                }}
                style={{ width: 20, height: 20 }}
              />
              <Team team={away} />
            </Flex>
          </View>
        </Flex>
        <View style={{ rowGap: 20 }}>
          <Team
            team={homeScore}
            color={homeScore > awayScore ? colors.oth : colors.white}
          />
          <Team
            team={awayScore}
            color={awayScore > homeScore ? colors.oth : colors.white}
          />
        </View>
      </Flex>
    </TouchableOpacity>
  );
};

export default MatchesCard;

const styles = StyleSheet.create({});
