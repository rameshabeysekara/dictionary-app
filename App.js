import * as React from "react";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { name as appName } from "./app.json";
import { StatusBar } from "expo-status-bar";
import { AppRegistry, Alert, View } from "react-native";
import Home from "./src/components/Home/Home";
import Favorites from "./src/components/Favorites/Favorites";
import Settings from "./src/components/Settings/Settings";
import styles from "./src/styles/main";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Entypo, Fontisto } from "@expo/vector-icons";
import { load as databaseLoad } from "./src/database";
import * as SplashScreen from "expo-splash-screen";
import { Colors } from "./src/styles/colors";
import * as Notifications from "expo-notifications";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createMaterialBottomTabNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    secondary: Colors.secondary,
  },
};

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

//Handle notification display
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
  handleSuccess: (notificationId) => {
    console.log("Handle Success", notificationId);
  },
  handleError: (notificationId, error) => {
    console.log("Handle Error", error);
  },
});

export default function App() {
  //Listem to received notifcations
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification Received: ", notification);
      }
    );
    console.log("Reveive Subscription: ", subscription);
    return () => {
      subscription.remove();
    };
  }, []);

  // State for the list of Words.
  const [words, setWords] = useState([]);

  useEffect(() => {
    databaseLoad()
      .then((data) => {
        setWords(data);
      })
      .catch(() => {
        Alert.alert(
          "Database Load",
          "There was an error loading the database. Please, try again later."
        );
      })
      .finally(() => {
        SplashScreen.hideAsync();
      });
  }, []);

  const handleAddWord = (data) => {
    const updatedWords = [...words];
    updatedWords.push(data);
    console.log(updatedWords);
    setWords(updatedWords);
  };

  const handleWordRemoval = (id) => {
    const updatedWords = words.filter((word) => word.id !== id);
    setWords(updatedWords);
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          >
            {(props) => <Home {...props} onAddWord={handleAddWord} />}
          </Tab.Screen>
          <Tab.Screen
            name="Favorites"
            options={{
              tabBarLabel: "Favorites",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="view-list"
                  color={color}
                  size={26}
                />
              ),
            }}
          >
            {(props) => (
              <Favorites
                {...props}
                words={words}
                onWordRemoval={handleWordRemoval}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Settings"
            options={{
              tabBarLabel: "Settings",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="cog" color={color} size={26} />
              ),
            }}
          >
            {(props) => <Settings {...props} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
