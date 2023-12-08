import { useEffect, useState } from "react";
import { View, Text, Switch, Pressable, Platform } from "react-native";
import { save as databaseSave } from "../../database";
import styles from "./styles";
import * as Notifications from "expo-notifications";
import { Colors } from "../../styles/colors";

export default function Setiings() {
  const [reminder, setReminder] = useState(false);
  const [schedule, setSchedule] = useState([]);

  const handleReminderPress = async () => {
    if (!reminder) {
      const scheduled = await scheduleReminder();
      if (scheduled) {
        setReminder(true);
        setSchedule(await getSchedule());
      }
    } else {
      const cancelled = await cancelReminder();
      if (cancelled) {
        setReminder(false);
        setSchedule(await getSchedule());
      }
    }
  };

  //Load scheduled reminders
  useEffect(() => {
    const fetchSchedule = async () => {
      const previouslyScheduled = await getSchedule();
      setSchedule(previouslyScheduled);

      const hasReminder = previouslyScheduled.some(
        (item) => item.type === "reminder"
      );

      if (hasReminder !== reminder) {
        setReminder(hasReminder);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Receive daily notifications</Text>
      <View style={styles.switch.container}>
        <Switch value={reminder} onValueChange={handleReminderPress} />
        <Pressable onPress={handleReminderPress}>
          <Text style={styles.switch.label}>Set Daily Reminder</Text>
        </Pressable>
      </View>
    </View>
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
      hour: 8, // Set the hour to 8 AM
      minute: 0, // Set the minute to 0 (start of the hour)
      repeats: true,
    };

    const schedulingOptions = {
      content: {
        title: "Todo Reminder",
        body: "Remember to check your tasks",
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
  console.log("Cancel for: ", Platform.OS);
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
    const scheduledNotifications =
      await Notifications.getAllScheduledNotificationsAsync();

    const schedule = [];
    scheduledNotifications.forEach((scheduledNotification) => {
      if (
        scheduledNotification &&
        scheduledNotification.content &&
        scheduledNotification.content.data
      ) {
        schedule.push({
          id: scheduledNotification.identifier,
          type: scheduledNotification.content.data.type || "unknown",
        });
      }
    });

    return schedule;
  } catch (error) {
    console.error("Error while getting schedule:", error);
  }
}
