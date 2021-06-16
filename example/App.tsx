import React, { useState, useCallback } from "react";
import { TouchableOpacityProps, View } from "react-native";
import { IValidSSL, isSSLValid } from "react-native-pinning-sha256";
import styled from "styled-components/native";
import {
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from "styled-system";

type DivProps = LayoutProps &
  FlexboxProps &
  SpaceProps &
  ColorProps &
  TouchableOpacityProps;
type TextProps = SpaceProps & ColorProps & TypographyProps;

const Div = styled.View<DivProps>`
  ${color}
  ${space}
  ${layout}
  ${flexbox}
`;
const Button = styled.TouchableOpacity<DivProps>`
  ${color}
  ${space}
  ${layout}
  ${flexbox}
  padding: 10px;
  border-radius: 12px;
`;
const Text = styled.Text<TextProps>`
  ${space}
  ${typography}
  ${color}
`;
export default function App() {
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
  return (
    <Div flex={1} alignItems="center" justifyContent="center">
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
      <Div>
        <Button
          bg="green"
          mb={10}
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
          <Text color="#fff" fontSize={16} fontWeight="bold">
            Github Valid Hash
          </Text>
        </Button>
        <Button
          bg="red"
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
          <Text color="#fff" fontSize={16} fontWeight="bold">
            Github InValid Hash
          </Text>
        </Button>
      </Div>
    </Div>
  );
}
