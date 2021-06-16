import React, { useCallback, useState } from "react";
import { TouchableOpacityProps } from "react-native";
import { isSSLValid, IValidSSL } from "react-native-pinning-sha256";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./pages/HomeScreen";
import { SimplePage } from "./pages/SimplePage";
import { AxiosExample } from "./pages/AxiosExample";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Certificate Pinning Sample" }}
        />
        <Stack.Screen
          name="Simple"
          component={SimplePage}
          options={{ title: "Pinning Sample" }}
        />
        <Stack.Screen
          name="Axios"
          component={AxiosExample}
          options={{ title: "Pinning Axios Interceptor" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
