import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import { Amplify } from "aws-amplify";
import config from "./src/aws-exports";
import { Colors } from "./src/UI/colors";
import { AmplifyTheme } from "aws-amplify-react-native";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import MainNavigator from "./src/navigation/MainNavigator";
import AuthContextProvider from "./src/contexts/AuthContext";
import BasketContextProvider from "./src/contexts/BasketContext";
import OrderContextProvider from "./src/contexts/OrderContext";
import FavoritesContextProvider from "./src/contexts/FavoritesContext";

Amplify.configure(config);

function App() {

  const [fontsLoaded] = useFonts({
    Helvetica: require("./assets/fonts/Helvetica.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("./assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-ExtraLight": require("./assets/fonts/Inter-ExtraLight.ttf"),
    "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
    "Now-Regular": require("./assets/fonts/Now-Regular.otf"),
    "Now-Bold": require("./assets/fonts/Now-Bold.otf"),
    "Now-Light": require("./assets/fonts/Now-Light.otf"),
    "Now-Medium": require("./assets/fonts/Now-Medium.otf"),
    "Now-Black": require("./assets/fonts/Now-Black.otf"),
    "SFPro-Regular": require("./assets/fonts/SFPro-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }
  return (
    <View style={styles.container}>
 <AuthContextProvider>
        <BasketContextProvider>
          <FavoritesContextProvider>
            <OrderContextProvider>
              <MainNavigator />
            </OrderContextProvider>
          </FavoritesContextProvider>
        </BasketContextProvider>
      </AuthContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

const customTheme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: Colors.primaryBrand,
    borderRadius: 40,
  },
};

export default App;
