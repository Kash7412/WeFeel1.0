// utils/notifications.ts
import * as Notifications from "expo-notifications";
import { Alert, Platform } from "react-native";
import { SchedulableTriggerInputTypes } from "expo-notifications";

// You can configure this once globally too, but it's safe to put here for now
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const requestNotificationPermissions = async (): Promise<boolean> => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Notifications Disabled", "Please enable notifications in system settings.");
    return false;
  }
  return true;
};

export const scheduleDailyReminder = async (): Promise<void> => {
  await Notifications.cancelAllScheduledNotificationsAsync(); // Clear previous ones to avoid duplicates

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "⏰ Daily Reminder",
      body: "It's 1PM, come upload your new video!",
      sound: true,
    },
    trigger: {
      type: SchedulableTriggerInputTypes.DAILY,
      hour: 17,
      minute: 2,
    },
  });

  Alert.alert("Success", "Daily reminder set for 1PM.");
};

export const cancelAllNotifications = async (): Promise<void> => {
  await Notifications.cancelAllScheduledNotificationsAsync();
  Alert.alert("Notifications Disabled", "You will no longer receive daily reminders.");
};