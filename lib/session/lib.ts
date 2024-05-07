import {SessionOptions} from "iron-session";

export interface SessionData {
    username: string;
    isLoggedIn: boolean;
    id_token: string;
}

export const defaultSession: SessionData = {
    username: "",
    isLoggedIn: false,
    id_token: ''
};

export const sessionOptions: SessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD || "SuperSecurePassWrodFallBackShouldNotbeInProd",
    cookieName: 'face_shipper_user',
    cookieOptions: {
        // secure only works in `https` environments
        // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
        secure: false,
    },
};

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}