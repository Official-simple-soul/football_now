import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const Wrapper = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#161616" }}>
      {children}
    </SafeAreaView>
  );
};

export default Wrapper;

const styles = StyleSheet.create({});
