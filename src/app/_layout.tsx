import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return;
  }

  SplashScreen.hideAsync();

  return (
    <>
      <StatusBar style="dark" />
      <Slot />
    </>
  );
}
