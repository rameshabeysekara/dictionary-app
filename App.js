import { StatusBar } from "expo-status-bar";
import { Alert, View, SafeAreaView } from "react-native";
import Header from "./src/components/Header/Header";
// import Tasks from "./src/components/Tasks/Tasks";
// import Form from "./src/components/Form/Form";
import Settings from "./src/components/Settings/Settings";
import styles from "./src/styles/main";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { load as databaseLoad } from "./src/database";
import * as SplashScreen from "expo-splash-screen";
import { Colors } from "./src/styles/colors";
import * as Notifications from "expo-notifications";

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

// Creates the tab navigator object.
const Tab = createBottomTabNavigator();

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

  // State for the list of tasks.
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    databaseLoad()
      .then((data) => {
        setTasks(data);
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

  // Include a new task to the list.
  const handleAddTask = (data) => {
    const updatedTasks = [...tasks];
    updatedTasks.push(data);
    setTasks(updatedTasks);
  };

  // Toggles the status of a task.
  const handleStatusChange = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.done = !task.done;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Remove a task.
  const handleTaskRemoval = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Header />
        <Tab.Navigator>
          {/* <Tab.Screen
            name="List"
            options={{
              headerShown: false,
              title: "List Tasks",
              tabBarActiveTintColor: Colors.primary,
              tabBarInactiveTintColor: Colors.inactive,
              tabBarIcon: ({ size, color }) => (
                <FontAwesome name="list-ul" size={size} color={color} />
              ),
            }}
          >
            {(props) => (
              <Tasks
                {...props}
                tasks={tasks}
                onStatusChange={handleStatusChange}
                onTaskRemoval={handleTaskRemoval}
              />
            )}
          </Tab.Screen> */}
          {/* <Tab.Screen
            name="Add"
            options={{
              title: "Add Task",
              tabBarActiveTintColor: Colors.primary,
              tabBarInactiveTintColor: Colors.inactive,
              headerTintColor: Colors.headerText,
              headerStyle: {
                backgroundColor: Colors.background,
              },
              tabBarIcon: ({ size, color }) => (
                <Entypo name="add-to-list" size={size} color={color} />
              ),
            }}
          >
            {(props) => <Form {...props} onAddTask={handleAddTask} />}
          </Tab.Screen> */}
          <Tab.Screen
            name="Settings"
            options={{
              title: "Settings",
              tabBarActiveTintColor: Colors.primary,
              tabBarInactiveTintColor: Colors.inactive,
              headerTintColor: Colors.headerText,
              headerStyle: {
                backgroundColor: Colors.background,
              },
              tabBarIcon: ({ size, color }) => (
                <Entypo name="cog" size={size} color={color} />
              ),
            }}
          >
            {(props) => <Settings {...props} />}
          </Tab.Screen>
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
