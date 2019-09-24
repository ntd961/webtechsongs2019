import {Context, createContext} from "react";
import SongService from "./song-service/SongService";
import AuthenticationService from "./authentication-service/AuthenticationService";

export interface Services {
	songService: SongService;
	authenticationService: AuthenticationService;
}

export const ServicesContext: Context<Services> = createContext({} as Services);
