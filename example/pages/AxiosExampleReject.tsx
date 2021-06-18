import axios, { AxiosRequestConfig } from "axios";
import React, { useCallback, useState } from "react";
import { isSSLValid, IValidSSL } from "react-native-pinning-sha256";
import { Button, Div, Text } from "../styles";

axios.interceptors.request.use(
  async (request: AxiosRequestConfig) => {
    console.log("axios", request.url);
    const result = await isSSLValid({
      url: "https://github.com",
      hashes: [
        "0A E3 84 BF D4 DD E9 D1 3E 50 C5 85 7C 05 A4 42 C9 3F 8E 01 44 5E E4 B3 45 40 D2 2B D1 E3 7F 1C",
      ],
      domainNames: ["github.com"],
    });

    console.log("interceptor", result);

    if (!result)
      throw new axios.Cancel("Request insecure, please change your connection");

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const AxiosExampleReject = () => {
  const [Valid, setValid] = useState<boolean>(false);
  const [Domain, setDomain] = useState<string>();
  const [Progress, setProgress] = useState(false);

  const checkAxiosUrl = useCallback(async ({ url }) => {
    try {
      setProgress(true);
      setDomain(url);

      const { data } = await axios.get(url);
      console.log(data);
      setValid(true);
    } catch (e) {
      console.log(e);
      setValid(false);
    } finally {
      setProgress(false);
    }
  }, []);

  return (
    <Div flex={1} p={10}>
      <Text fontSize={20} fontWeight="bold" mb={2}>
        Certificate Pinning SHA256 Validation
      </Text>
      <Div mb={10}>
        {Progress && <Text color="red">Loading</Text>}
        {!Progress && Domain && (
          <Text fontSize={16} color={Valid ? "green" : "red"}>
            {Domain}: {Valid ? "Secure" : "Danger"}
          </Text>
        )}
      </Div>
      <Div mt={10}>
        <Button
          bg="green"
          mb={10}
          onPress={() =>
            checkAxiosUrl({
              url: "https://api.github.com/users/movibe",
            })
          }
        >
          <Text color="#fff" fontSize={16} fontWeight="bold">
            Github Valid Hash
          </Text>
        </Button>
      </Div>
    </Div>
  );
};
