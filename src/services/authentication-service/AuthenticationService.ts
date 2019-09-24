import {BehaviorSubject, Observable, Subject} from "rxjs";
import Axios from "axios-observable";
import {baseUrl} from "../../config/config.json";
import {map, tap} from "rxjs/operators";
import {AxiosResponse} from "axios";

export type Authentication = User | false;

export interface User {
	username: string;
}

export interface Credentials {
	username: string;
	password: string;
}

class AuthenticationService {
	private readonly loggedIn: Subject<Authentication> = new BehaviorSubject<Authentication>(false);

	constructor() {
		Axios.get(`${baseUrl}/user`, {
			withCredentials: true
		}).subscribe((response: AxiosResponse) => {
			if (response.status === 200) {
				this.loggedIn.next({
					username: response.data
				});
			}
		});
	}

	isLoggedIn(): Observable<Authentication> {
		return this.loggedIn;
	}

	login(credentials: Credentials): Observable<void> {
		return Axios.post(`${baseUrl}/login`, {
			username: credentials.username,
			password: credentials.password
		}, {
			withCredentials: true
		}).pipe(
			map((response: AxiosResponse) => response.data),
			tap(() => {
				this.loggedIn.next({
					username: credentials.username
				});
			})
		);
	}

	logout() {
		Axios.post(`${baseUrl}/logout`, null, {
			withCredentials: true
		}).pipe(
			tap(() => {
				this.loggedIn.next(false);
			})
		).subscribe();
	}
}

export default AuthenticationService;
