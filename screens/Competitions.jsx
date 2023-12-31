import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { fonts } from "../components/constants/fonts";
import { colors } from "../components/constants/colors";
import { Divider, Searchbar } from "react-native-paper";
import Search from "../components/constants/Search";
import MatchesHeader from "../components/matches/MatchesHeader";
import { liveData } from "../data";
import { Team } from "../components/constants/Paragraphs";
import Flex from "../components/constants/Flex";
import { useNavigation } from "@react-navigation/native";
import { makeApiRequest } from "../Model/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const competitionHeader = [
  {
    title: "Top",
    id: 1,
  },
  {
    title: "All",
    id: 2,
  },
  {
    title: "Region",
    id: 3,
  },
];

const Competitions = () => {
  const [activeId, setActiveId] = useState(1);
  const [compDisplay, setCompDisplay] = useState(null);
  const navigation = useNavigation();

  const getData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("leagues");
      if (storedData) {
        setCompDisplay(JSON.parse(storedData));
      } else {
        const data = await makeApiRequest("leagues");
        await AsyncStorage.setItem("leagues", JSON.stringify(data.response));
        setCompDisplay(data.response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   if (activeId === 1) {
  //     setCompDisplay(liveData.slice(0, 7));
  //   } else if (activeId === 2) {
  //     setCompDisplay(liveData);
  //   } else {
  //     setCompDisplay(liveData.slice(0, 4));
  //   }
  // }, [activeId]);

  const handleNavigate = (comp) => {
    navigation.navigate("Competitions", {
      screen: "CompDetails",
      params: { comp },
    });
  };

  useEffect(() => {});

  return (
    <Wrapper>
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontSize: 20,
            color: colors.white,
            fontWeight: "800",
            fontFamily: fonts.mul8,
          }}
        >
          Browse Competition
        </Text>
        <Search />
        <MatchesHeader
          matchHeader={competitionHeader}
          activeId={activeId}
          setActiveId={setActiveId}
        />
        <ScrollView style={{ marginVertical: 25 }}>
          {compDisplay?.slice(0, 15).map((comp, idx) => {
            return (
              <TouchableOpacity
                key={idx}
                style={{
                  paddingVertical: 14,
                  borderBottomWidth: 1,
                  borderColor: colors.txtSec,
                }}
                onPress={() => handleNavigate(comp)}
              >
                <Flex>
                  <Image
                    source={{
                      uri: `${comp?.league?.logo}`,
                    }}
                    style={{ width: 50, height: 50 }}
                  />

                  <View style={{ rowGap: 5 }}>
                    <Text style={{ color: colors.txtSec }}>
                      {comp?.country?.name}
                    </Text>
                    <Team team={comp?.league?.name} />
                  </View>
                </Flex>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </Wrapper>
  );
};

export default Competitions;

const styles = StyleSheet.create({});
