# react-native-pinning-sha256

A react-native library for pinning SSL using SHA-256 public key.

<img src="https://raw.githubusercontent.com/movibe/react-native-pinning-sha256/main/images/mockup.jpg" width="500"/>

## Getting started

`$ yarn add react-native-pinning-ssl`

## Get SHA-256 key

<img src="https://raw.githubusercontent.com/movibe/react-native-pinning-sha256/main/images/getKey1.jpg" width="500"/>

<img src="https://raw.githubusercontent.com/movibe/react-native-pinning-sha256/main/images/getKey2.jpg" width="500"/>

## Usage

```javascript
import { isSSLValid } from "react-native-pinning-sha256";

async function runSSLPinning() {
  try {
    const result = await isSSLValid({
      url: "https://github.com/",
      hashes: ["CA 06 F5 6B 25 8B 7A 0D 4F 2B 05 47 09 39 47 86 51 15 19 84"],
      domainNames: ["github.com"],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

runSSLPinning();
```

## References

NSURLAuthenticationChallenge+Fingerprint credited to [https://stackoverflow.com/a/26963381](https://stackoverflow.com/a/26963381)
