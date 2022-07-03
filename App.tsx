import React from "react";
import {
  useFonts,
  ReadexPro_300Light,
  ReadexPro_400Regular,
  ReadexPro_700Bold,
  ReadexPro_500Medium,
} from "@expo-google-fonts/readex-pro";
import AppLoading from "expo-app-loading";
import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    ReadexPro_300Light,
    ReadexPro_400Regular,
    ReadexPro_500Medium,
    ReadexPro_700Bold,
  });

  if (!fontsLoaded) {
    <AppLoading />;
  }
  return <Routes />;
}
