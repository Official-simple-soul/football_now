import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import Details from "../screens/Details";
import Home from "../screens/Home";
import { colors } from "./constants/colors";
import Icons from "./constants/Icons";
import { AntDesign } from "@expo/vector-icons";
import Competitions from "../screens/Competitions";
import CompDetails from "../screens/CompDetails";

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='HomeMain'
      screenOptions={{
        headerBackTitle: "",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.sec,
        },
      }}
    >
      <Stack.Screen
        name='HomeMain'
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Details'
        component={Details}
        options={({ route }) => ({
          title: route.params?.matchObj?.home,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // Handle the favorite icon click action here
                // You can navigate or perform any other action
              }}
              style={{ marginRight: 5 }}
            >
              {/* <Icons icon='star' color={colors.white} /> */}
              <AntDesign name='star' size={24} color={colors.white} />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export const CompetitionStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='CompetitionMain'
      screenOptions={{
        headerBackTitle: "",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.sec,
        },
      }}
    >
      <Stack.Screen
        name='CompetitionMain'
        component={Competitions}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='CompDetails'
        component={CompDetails}
        options={({ route }) => ({
          title: "Competition",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // Handle the favorite icon click action here
                // You can navigate or perform any other action
              }}
              style={{ marginRight: 5 }}
            >
              {/* <Icons icon='star' color={colors.white} /> */}
              <AntDesign name='star' size={24} color={colors.white} />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};
