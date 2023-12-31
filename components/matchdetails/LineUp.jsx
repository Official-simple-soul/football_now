import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Team } from "../constants/Paragraphs";
import { colors } from "../constants/colors";
import Card from "../constants/Card";
import Flex from "../constants/Flex";
import PlayerWidget from "../constants/PlayerWidget";

const LineUp = ({ match_details }) => {
  const line_up = match_details[0]?.lineups;
  const home_line = match_details[0]?.lineups[0]?.formation;
  const away_line = match_details[0]?.lineups[1]?.formation;
  const homeLineUp = home_line?.split("-")?.map((item) => parseInt(item, 10));
  const awayLineUp = away_line?.split("-")?.map((item) => parseInt(item, 10));
  const gkPlayer1 = line_up[0]?.startXI?.shift();
  const gkPlayer2 = line_up[1]?.startXI?.shift();
  // console.log(line_up.length)
  return (
    <ScrollView>
      <Card>
        {line_up.length > 0 ? (
          <>
            <View>
              <Flex justify={"space-between"}>
                <Team team={match_details[0]?.lineups[0]?.team?.name} />
                <Team team={home_line} />
              </Flex>
              <View
                style={{
                  borderWidth: 3,
                  borderColor: colors.txtSec,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <>
                  <View
                    style={{
                      borderWidth: 3,
                      borderTopWidth: 0,
                      borderColor: colors.txtSec,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 10,
                      width: 200,
                      height: 100,
                    }}
                  >
                    <PlayerWidget
                      player={gkPlayer1?.player}
                      color={line_up[0]?.team?.colors?.goalkeeper}
                    />
                  </View>
                  <View style={{ rowGap: 25, marginVertical: 25 }}>
                    {homeLineUp?.map((e, idx) => {
                      // let keeperOut = homeLineUp.slice()
                      const start = homeLineUp
                        ?.slice(0, idx)
                        ?.reduce((acc, length) => acc + length, 0);
                      const end = start + e;
                      const slicedData = line_up[0]?.startXI?.slice(start, end);
                      return (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            width: "100%",
                          }}
                          key={idx}
                        >
                          {Array.from({ length: e }).map((_, index) => (
                            <View key={index}>
                              <PlayerWidget
                                player={slicedData[index]?.player}
                                color={line_up[0]?.team?.colors?.player}
                              />
                            </View>
                          ))}
                        </View>
                      );
                    })}
                  </View>
                </>
                <View
                  style={{
                    height: 3,
                    backgroundColor: colors.txtSec,
                    width: "100%",
                  }}
                ></View>
                <View
                  style={{
                    position: "absolute",
                    width: 150,
                    height: 150,
                    borderWidth: 3,
                    borderColor: colors.txtSec,
                    borderRadius: 200,
                  }}
                ></View>
                <>
                  <View style={{ rowGap: 25, marginVertical: 25 }}>
                    {awayLineUp?.reverse()?.map((e, idx) => {
                      const start = awayLineUp
                        ?.slice(0, idx)
                        ?.reduce((acc, length) => acc + length, 0);
                      const end = start + e;
                      const slicedData = line_up[1]?.startXI
                        ?.reverse()
                        ?.slice(start, end);
                      return (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            width: "100%",
                          }}
                          key={idx}
                        >
                          {Array.from({ length: e }).map((_, index) => {
                            return (
                              <View key={index}>
                                <PlayerWidget
                                  player={slicedData[index]?.player}
                                  color={line_up[1]?.team?.colors?.player}
                                />
                              </View>
                            );
                          })}
                        </View>
                      );
                    })}
                  </View>
                  <View
                    style={{
                      borderWidth: 3,
                      borderBottomWidth: 0,
                      borderColor: colors.txtSec,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 10,
                      width: 200,
                      height: 100,
                    }}
                  >
                    <PlayerWidget
                      player={gkPlayer2?.player}
                      color={line_up[1]?.team?.colors?.goalkeeper}
                    />
                  </View>
                </>
              </View>
            </View>
            <Flex justify={"space-between"}>
              <Team team={match_details[0]?.lineups[1]?.team?.name} />
              <Team team={away_line} />
            </Flex>
          </>
        ) : (
          <Team team={"No line up"} />
        )}
      </Card>
    </ScrollView>
  );
};

export default LineUp;

const styles = StyleSheet.create({});
