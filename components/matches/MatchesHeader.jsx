import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";
import { Team } from "../constants/Paragraphs";

const MatchesHeader = ({ setActiveId, activeId, matchHeader }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      {matchHeader.map((match) => (
        <TouchableOpacity
          key={match.id}
          style={[
            styles.headerItem,
            match.id === activeId ? styles.activeHeader : null,
          ]}
          onPress={() => setActiveId(match.id)}
        >
          <Team
            team={match.title}
            color={match.id !== activeId && colors.txtSec}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  headerItem: {
    padding: 10,
  },
  activeHeader: {
    borderBottomWidth: 2,
    borderColor: colors.oth, // For example, change the border color to indicate active state
  },
});

export default MatchesHeader;
