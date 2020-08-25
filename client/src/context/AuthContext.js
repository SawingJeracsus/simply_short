import { createContext } from "react";

const noup = () => {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noup,
    logout: noup,
    isAuthicated: false    
})