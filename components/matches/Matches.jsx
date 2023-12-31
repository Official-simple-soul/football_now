import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import MatchesHeader from "./MatchesHeader";
import MatchesRow from "./MatchesRow";

const matchHeader = [
  {
    title: "Live",
    id: 1,
  },
  {
    title: "All",
    id: 2,
  },
  {
    title: "Finished",
    id: 3,
  },
];

const Matches = () => {
  const [activeId, setActiveId] = useState(1);
  return (
    <View style={{ marginVertical: 15 }}>
      <MatchesHeader
        activeId={activeId}
        setActiveId={setActiveId}
        matchHeader={matchHeader}
      />
      <MatchesRow activeId={activeId} />
    </View>
  );
};

export default Matches;

const styles = StyleSheet.create({});
