
require('dotenv').config();

module.exports = {
  expo: {
    name: "DinerExpoFood",
    slug: "DinerExpoFood",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      "image": "./assets/Logo.png",
      "resizeMode": "contain",
      "backgroundColor": "#F65726"
    },
    plugins: [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
        }
      ],
      [
        "expo-calendar",
        {
          "calendarPermission": "The app needs to access your calendar."
        }
      ]
    ],
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.dinerexpofood.app",
      config: {
        "googleMapsApiKey": process.env.API_KEY
      },
      infoPlist: {
        "NSCalendarsUsageDescription": "The app needs to access your calendar.",
        "NSLocationWhenInUseUsageDescription": "Diner needs to use your location to personalize the meals near you",
        "NSLocationAlwaysAndWhenInUseUsageDescription": "Diner needs to use your location to personalize the meals near you",
        "NSLocationAlwaysUsageDescription": "Diner needs to use your location to personalize the meals near you",
        "NSRemindersUsageDescription": "Allow $(PRODUCT_NAME) to access your reminders"
      }
    },
    android: {
      adaptiveIcon: {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      permissions: [
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.FOREGROUND_SERVICE",
        "android.permission.READ_CALENDAR",
        "android.permission.WRITE_CALENDAR"
      ],
      package: "com.dinerexpofood.app"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      eas: {
        projectId: "2744eb23-dfb3-46d1-8c12-e500c1538d06"
      }
    },
    owner: "tapiwap"
  }
}