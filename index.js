import { NativeModules } from "react-native";

const { RNPinningSsl } = NativeModules;

export async function isSSLValid({ url, hashes, domainNames }) {
  try {
    const isValid = await RNPinningSsl.getStatus(url, hashes, domainNames);
    return isValid;
  } catch (e) {
    NSURLAuthenticationChallenge;
    throw new Error(e);
  }
}
