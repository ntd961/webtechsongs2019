import React, {useEffect, useState} from "react";
import {BrowserRouter, Redirect, Route, RouteComponentProps, Switch} from "react-router-dom";
import DashboardPage from "./pages/dashboard-page/DashboardPage";
import {Services, ServicesContext} from "./services/Services";
import SongService from "./services/song-service/SongService";
import ImpressPage from "./pages/impress-page/ImpressPage";
import LoginPage from "./pages/login-page/LoginPage";
import AuthenticationService, {Authentication} from "./services/authentication-service/AuthenticationService";
import ProtectedRoute from "./shared/protected-route/ProtectedRoute";
import {AppStateContext} from "./services/AppState";
import ContactPage from "./pages/contact-page/ContactPage";
import NewSongPage from "./pages/new-song-page/NewSongPage";
import EditSongPage from "./pages/edit-song-page/EditSongPage";

const songService = new SongService();
const authenticationService = new AuthenticationService();

const App = () => {

	const [authentication, setAuthentication] = useState<Authentication>(false);
	const services: Services = {
		songService: songService,
		authenticationService: authenticationService
	};

	useEffect(() => {
		authenticationService.isLoggedIn()
			.subscribe(setAuthentication);
	}, []);

	const isLoggedIn = !!authentication;
	return (
		<div className="page-wrapper">
			<AppStateContext.Provider value={{authentication: authentication}}>
				<ServicesContext.Provider value={services}>
					<BrowserRouter>
						<Switch>
							<Redirect exact from="/" to="/dashboard"/>
							<ProtectedRoute path="/login"
											canActivate={!isLoggedIn}
											redirectTo="/"
											component={() => <LoginPage/>}/>
							<Route path="/dashboard" component={() => <DashboardPage/>}/>
							<ProtectedRoute path="/songs/create"
											canActivate={isLoggedIn}
											redirectTo="/login"
											component={() => <NewSongPage/>}/>
							<ProtectedRoute path="/songs/edit/:songId"
											canActivate={isLoggedIn}
											redirectTo="/login"
											component={(props: RouteComponentProps) => <EditSongPage {...props}/>}/>

							<Route path="/impress" component={() => <ImpressPage/>}/>
							<Route path="/contact" component={() => <ContactPage/>}/>

							<ProtectedRoute canActivate={isLoggedIn}
											redirectTo="/login"
											component={() => <div>Not found</div>}/>
						</Switch>
					</BrowserRouter>
				</ServicesContext.Provider>
			</AppStateContext.Provider>
		</div>
	);
};

export default App;
