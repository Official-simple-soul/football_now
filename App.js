import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  useFonts,
  Mulish_500Medium,
  Mulish_800ExtraBold,
} from "@expo-google-fonts/mulish";

// screens
import Account from "./screens/Account";
import News from "./screens/News";
import { colors } from "./components/constants/colors";
import { ActivityIndicator } from "react-native";
import { CompetitionStack, HomeStack } from "./components/Navigating";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Mulish_500Medium,
    Mulish_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={{ backgroundColor: colors.sec }}
        activeColor={colors.oth}
      >
        <Tab.Screen
          name='Home'
          component={HomeStack}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='home' color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='Competitions'
          component={CompetitionStack}
          options={{
            tabBarLabel: "Competitions",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='soccer' color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='News'
          component={News}
          options={{
            tabBarLabel: "News",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name='newspaper'
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name='Account'
          component={Account}
          options={{
            tabBarLabel: "Account",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='account' color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
