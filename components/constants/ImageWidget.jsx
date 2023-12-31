import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const ImageWidget = ({ logo }) => {
  return (
    <>
      {logo ? (
        <Image
          source={{
            uri: `${logo}`,
          }}
          style={{ width: 30, height: 30 }}
        />
      ) : null}
    </>
  );
};

export default ImageWidget;

const styles = StyleSheet.create({});
