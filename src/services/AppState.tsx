import {createContext} from "react";
import {Authentication} from "./authentication-service/AuthenticationService";

export interface AppState {
	authentication: Authentication
}

export const AppStateContext = createContext<AppState>({authentication: false});
