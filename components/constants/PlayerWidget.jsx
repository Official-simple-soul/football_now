import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Team } from "./Paragraphs";

const PlayerWidget = ({ player, color }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          backgroundColor: `#${color?.primary}`,
          borderWidth: 1,
          borderColor: `#${color?.border}`,
          borderRadius: 50,
          width: 30,
          height: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Team team={player?.number} color={`#${color?.number}`} />
      </View>
      <View style={{ marginTop: 5 }}>
        <Team team={player?.name} />
      </View>
    </View>
  );
};

export default PlayerWidget;

const styles = StyleSheet.create({});
