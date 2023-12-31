import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Icons = ({ icon, color }) => {
  return <Ionicons name={icon} size={24} color={color} />;
};

export default Icons;
