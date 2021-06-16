declare module 'react-native-pinning-sha256' {
    import React from "react"
    export interface IValidSSL {
        url: string;
        hashes: string[];
        domainNames: string[];
    }
    export const isSSLValid = (key: IValidSSL) : Promise<boolean> => void;
    

}