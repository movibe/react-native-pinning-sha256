import React, { useState } from "react";
import { Button, Div, Text, ThemeProvider } from "react-native-magnus";
import { isSSLValid, IValidSSL } from "react-native-pinning-ssl";

export default function App() {
  const [Valid, setValid] = useState<boolean>(false);
  const [Domain, setDomain] = useState<string>();
  const [Progress, setProgress] = useState(false);
  const checkUrl = async ({ url, hashes, domainNames }: IValidSSL) => {
    try {
      setProgress(true);

      setDomain(url);
      const result = await isSSLValid({
        url,
        hashes,
        domainNames,
      });

      setValid(result);
    } catch (e) {
      console.log(e);
      setValid(false);
    } finally {
      setProgress(false);
    }
  };

  return (
    <ThemeProvider>
      <Div flex={1} alignItems="center" justifyContent="center">
        <Text fontSize="lg" fontWeight="bold" color="black" mt="lg">
          Certificate Pinning SHA256 Validation
        </Text>
        <Div>
          {Progress && (
            <Text
              fontSize="lg"
              fontWeight="bold"
              textTransform="uppercase"
              color="black"
              letterSpacing={2}
              mt="lg"
            >
              Loading
            </Text>
          )}
          {!Progress && Domain && (
            <Text
              fontSize="md"
              color={Valid ? "green" : "red"}
              letterSpacing={2}
              mt="lg"
            >
              {Domain}: {Valid ? "Secure" : "Danger"}
            </Text>
          )}
        </Div>
        <Div flexWrap="wrap" mt="xl">
          <Button
            mt="lg"
            px="xl"
            py="lg"
            bg="green"
            disabled={Progress}
            onPress={() =>
              checkUrl({
                url: "https://github.com/",
                hashes: [
                  "0A E3 84 BF D4 DD E9 D1 3E 50 C5 85 7C 05 A4 42 C9 3F 8E 01 44 5E E4 B3 45 40 D2 2B D1 E3 7F 1B",
                ],
                domainNames: ["github.com"],
              })
            }
          >
            Github Valid Hash
          </Button>
          <Button
            mt="lg"
            px="xl"
            py="lg"
            bg="red"
            disabled={Progress}
            onPress={() =>
              checkUrl({
                url: "https://github.com/",
                hashes: [
                  "C7 46 67 21 CD 31 78 2E 2D 3B B1 6B 52 6F E1 6B 64 F8 AF EB 2B 36 BA 9D 0B 22 A9 57 DA 5F B8 5D",
                ],
                domainNames: ["github.com"],
              })
            }
          >
            Github InValid Hash
          </Button>
        </Div>
      </Div>
    </ThemeProvider>
  );
}
