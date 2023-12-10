import { useEffect, useState } from "react";
import { View, Pressable, SafeAreaView, Text } from "react-native";
import * as Notifications from "expo-notifications";
import { Title, Switch } from "react-native-paper";
import styles from "./styles";

export default function Settings() {
  const [reminder, setReminder] = useState(false);

  const handleReminderPress = async () => {
    if (!reminder) {
      const scheduled = await scheduleReminder();
      if (scheduled) {
        setReminder(true);
      }
    } else {
      const cancelled = await cancelReminder();
      if (cancelled) {
        setReminder(false);
      }
    }
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      const hasReminder = await checkReminder();
      if (hasReminder !== reminder) {
        setReminder(hasReminder);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Title>Notifications</Title>
        <View style={styles.switchContainer}>
          <Pressable onPress={handleReminderPress}>
            <Text style={styles.label}>Set word of the day Reminder</Text>
          </Pressable>
          <Switch value={reminder} onValueChange={handleReminderPress} />
        </View>
      </View>
    </SafeAreaView>
  );
}

async function scheduleReminder() {
  try {
    const permissions = await Notifications.getPermissionsAsync();
    if (!permissions.granted) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        return false;
      }
    }

    const trigger = {
      hour: 8,
      minute: 0,
      repeats: true,
    };

    const schedulingOptions = {
      content: {
        title: "Word Of The Day Reminder",
        body: "Remember to check your word of the day!",
      },
      trigger,
    };

    const id = await Notifications.scheduleNotificationAsync(schedulingOptions);

    if (!id) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error scheduling reminder:", error);
    return false;
  }
}

async function cancelReminder() {
  let cancelled = false;
  const schedule = await getSchedule();

  for (const item of schedule) {
    if (item.type === "reminder") {
      await Notifications.cancelScheduledNotificationAsync(item.id);
      cancelled = true;
    }
  }

  return cancelled;
}

async function getSchedule() {
  try {
    const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();

    const schedule = [];
    scheduledNotifications.forEach((scheduledNotification) => {
      if (scheduledNotification && scheduledNotification.content && scheduledNotification.content.data) {
        schedule.push({
          id: scheduledNotification.identifier,
          type: scheduledNotification.content.data.type || "unknown",
        });
      }
    });

    return schedule;
  } catch (error) {
    console.error("Error while getting schedule:", error);
    return [];
  }
}
async function checkReminder() {
  const schedule = await getSchedule();
  return schedule.some((item) => item.type === "reminder");
}