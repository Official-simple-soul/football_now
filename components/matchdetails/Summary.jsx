import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "../constants/Card";
import {
  BookingDetails,
  BookingDetailsHome,
  GoalDetails,
  GoalDetailsHome,
  SubDetails,
  SubDetailsHome,
} from "../constants/MatchDetails";
import Flex from "../constants/Flex";
import { colors } from "../constants/colors";

const Summary = ({ match_details }) => {
  return (
    <ScrollView>
      <Card>
        {match_details[0]?.events?.map((event, id) => {
          return (
            <View key={id}>
              <View>
                {match_details[0]?.teams?.home?.id === event?.team?.id ? (
                  <Flex justify={"flex-start"}>
                    {event.type === "Card" ? (
                      <BookingDetailsHome card={event} />
                    ) : event.type === "Goal" ? (
                      <GoalDetailsHome goal={event} />
                    ) : event.type === "subst" ? (
                      <SubDetailsHome sub={event} />
                    ) : null}
                  </Flex>
                ) : (
                  <Flex justify={"flex-end"}>
                    {event.type === "Card" ? (
                      <BookingDetails card={event} />
                    ) : event.type === "Goal" ? (
                      <GoalDetails goal={event} />
                    ) : event.type === "subst" ? (
                      <SubDetails sub={event} />
                    ) : null}
                  </Flex>
                )}
              </View>
            </View>
          );
        })}
      </Card>
    </ScrollView>
  );
};

export default Summary;

const styles = StyleSheet.create({});
