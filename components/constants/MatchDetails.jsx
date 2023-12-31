import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "./colors";
import { DetailText } from "./Paragraphs";
import { Octicons } from "@expo/vector-icons";
import Flex from "./Flex";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const SubDetails = ({ sub }) => {
  return (
    <View>
      <Flex>
        <View>
          <Flex>
            <DetailText color={colors.live} text={"In:"} />
            <DetailText color={colors.white} text={sub?.player?.name} />
          </Flex>
          <Flex>
            <DetailText color={colors.out} text={"Out:"} />
            <DetailText color={colors.white} text={sub?.assist?.name} />
          </Flex>
        </View>
        <Flex>
          <Octicons name='arrow-switch' size={16} color={colors.live} />
          <DetailText color={colors.txtSec} text={`${sub?.time?.elapsed}'`} />
        </Flex>
      </Flex>
    </View>
  );
};

export const SubDetailsHome = ({ sub }) => {
  return (
    <View>
      <Flex>
        <Flex>
          <DetailText color={colors.txtSec} text={`${sub?.time?.elapsed}'`} />
          <Octicons name='arrow-switch' size={16} color={colors.live} />
        </Flex>
        <View>
          <Flex>
            <DetailText color={colors.live} text={"In:"} />
            <DetailText color={colors.white} text={sub?.player?.name} />
          </Flex>
          <Flex>
            <DetailText color={colors.out} text={"Out:"} />
            <DetailText color={colors.white} text={sub?.assist?.name} />
          </Flex>
        </View>
      </Flex>
    </View>
  );
};

export const GoalDetails = ({ goal }) => {
  return (
    <View>
      <Flex>
        <View>
          <DetailText color={colors.white} text={goal?.player?.name} />
          <Flex>
            <Text style={{ color: colors.txtSec, fontSize: 10 }}>
              Assist: {`${goal?.assist?.name}`}
            </Text>
          </Flex>
        </View>
        <Flex>
          <MaterialCommunityIcons
            name='soccer'
            color={colors.white}
            size={16}
          />
          <DetailText color={colors.txtSec} text={`${goal?.time?.elapsed}'`} />
        </Flex>
      </Flex>
    </View>
  );
};

export const GoalDetailsHome = ({ goal }) => {
  return (
    <View>
      <Flex>
        <Flex>
          <DetailText color={colors.txtSec} text={`${goal?.time?.elapsed}'`} />
          <MaterialCommunityIcons
            name='soccer'
            color={colors.white}
            size={16}
          />
        </Flex>
        <View>
          <DetailText color={colors.white} text={goal?.player?.name} />
          <Flex>
            <Text style={{ color: colors.txtSec, fontSize: 10 }}>
              Assist: {`${goal?.assist?.name}`}
            </Text>
          </Flex>
        </View>
      </Flex>
    </View>
  );
};

export const BookingDetails = ({ card }) => {
  return (
    <View>
      <Flex>
        <View>
          <DetailText color={colors.white} text={card?.player?.name} />
        </View>
        <Flex>
          <MaterialCommunityIcons name='card' color={"yellow"} size={16} />
          <DetailText color={colors.txtSec} text={`${card?.time?.elapsed}'`} />
        </Flex>
      </Flex>
    </View>
  );
};

export const BookingDetailsHome = ({ card }) => {
  return (
    <View>
      <Flex>
        <Flex>
          <DetailText color={colors.txtSec} text={`${card?.time?.elapsed}'`} />
          <MaterialCommunityIcons name='card' color={"yellow"} size={16} />
        </Flex>
        <View>
          <DetailText color={colors.white} text={card?.player?.name} />
        </View>
      </Flex>
    </View>
  );
};
