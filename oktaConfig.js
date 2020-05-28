
import * as AuthSession from "expo-auth-session";
import { CLIENT_ID } from "react-native-dotenv";
import { ResponseType } from "expo-auth-session";


export default {
    clientId: CLIENT_ID,
    // For usage in managed apps using the proxy
    redirectUri: AuthSession.makeRedirectUri({
        // For usage in bare and standalone
        native: 'https://com.okta.dev-815303:/callback',
        useProxy: true,
    }),
    scopes: ["openid", "profile"],
    responseType: "token id_token",
    extraParams: {
        nonce: Math.random().toString(36).substring(7),
    },
};
