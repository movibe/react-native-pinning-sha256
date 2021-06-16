import React, { useCallback, useState } from "react";
import { isSSLValid, IValidSSL } from "react-native-pinning-sha256";
import { Button, Div, Text } from "../styles";
import axios from "axios";
export const SimplePage = () => {
  const [Valid, setValid] = useState<boolean>(false);
  const [Domain, setDomain] = useState<string>();
  const [Progress, setProgress] = useState(false);

  const checkUrl = useCallback(
    async ({ url, hashes, domainNames }: IValidSSL) => {
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
    },
    []
  );
  const checkAxiosUrl = useCallback(async ({ url }) => {
    try {
      setProgress(true);

      const { data } = await axios.get(url);
      console.log(data);
    } catch (e) {
      console.log(e);
      setValid(false);
    } finally {
      setProgress(false);
    }
  }, []);

  return (
    <Div flex={1} p={10}>
      <Text fontSize={20} fontWeight="bold" my={20}>
        Certificate Pinning SHA256 Validation
      </Text>
      <Div my={10} justifyContent="center" alignItems="center">
        {Progress && <Text color="red">Loading</Text>}
        {!Progress && Domain && (
          <Text fontSize={16} color={Valid ? "green" : "red"}>
            {Domain}: {Valid ? "Secure" : "Danger"}
          </Text>
        )}
      </Div>
      <Div>
        <Button
          bg="green"
          mb={10}
          onPress={() =>
            checkUrl({
              url: "https://github.com",
              hashes: [
                "0A E3 84 BF D4 DD E9 D1 3E 50 C5 85 7C 05 A4 42 C9 3F 8E 01 44 5E E4 B3 45 40 D2 2B D1 E3 7F 1B",
              ],
              domainNames: ["github.com"],
            })
          }
        >
          <Text color="#fff" fontSize={16} fontWeight="bold">
            Valid Hash
          </Text>
        </Button>
        <Button
          bg="red"
          onPress={() =>
            checkUrl({
              url: "https://github.com",
              hashes: [
                "C7 46 67 21 CD 31 78 2E 2D 3B B1 6B 52 6F E1 6B 64 F8 AF EB 2B 36 BA 9D 0B 22 A9 57 DA 5F B8 5D",
              ],
              domainNames: ["github.com"],
            })
          }
        >
          <Text color="#fff" fontSize={16} fontWeight="bold">
            InValid Hash
          </Text>
        </Button>
      </Div>
    </Div>
  );
};
