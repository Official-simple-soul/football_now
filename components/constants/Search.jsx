import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Flex from "./Flex";
import Icons from "./Icons";
import { colors } from "./colors";

const Search = () => {
  const [text, setText] = useState("");
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#3A3A3A",
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 10,
        columnGap: 10,
        marginVertical: 20,
      }}
    >
      <Icons icon={"search"} color={colors.white} />
      <TextInput
        style={{ height: 40, color: colors.white }}
        placeholder='Search for competitions, club...'
        onChangeText={(newText) => setText(newText)}
        defaultValue={text}
        placeholderTextColor={colors.white}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
