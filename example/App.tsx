import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AxiosExample } from "./pages/AxiosExample";
import { AxiosExampleReject } from "./pages/AxiosExampleReject";
import { HomeScreen } from "./pages/HomeScreen";
import { SimplePage } from "./pages/SimplePage";

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
        <Stack.Screen
          name="AxiosReject"
          component={AxiosExampleReject}
          options={{ title: "Pinning Axios Interceptor" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
