import React from "react";
import { Button, Div, Text } from "../styles";
import { useNavigation } from "@react-navigation/native";

export const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <Div flex={1} p={10}>
      <Button bg="green" mb={10} onPress={() => navigation.navigate("Simple")}>
        <Text color="#fff" fontSize={16} fontWeight="bold">
          Simple
        </Text>
      </Button>
      <Button bg="green" mb={10} onPress={() => navigation.navigate("Axios")}>
        <Text color="#fff" fontSize={16} fontWeight="bold">
          Axios Interceptor
        </Text>
      </Button>

      <Button
        bg="red"
        mb={10}
        onPress={() => navigation.navigate("AxiosReject")}
      >
        <Text color="#fff" fontSize={16} fontWeight="bold">
          Axios Reject Interceptor
        </Text>
      </Button>
    </Div>
  );
};
