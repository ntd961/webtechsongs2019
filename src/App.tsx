import React from "react";
import {BrowserRouter, Redirect, Route, RouteComponentProps, Switch} from "react-router-dom";
import DashboardPage from "./pages/dashboard-page/DashboardPage";
import {AppContext, Services} from "./services/Services";
import SongService from "./services/song-service/SongService";
import SongPage from "./pages/song-page/SongPage";
import ImpressPage from "./pages/impress-page/ImpressPage";

const App = () => {
	const appContext: Services = {
		songService: new SongService()
	};

	return (
		<AppContext.Provider value={appContext}>
			<BrowserRouter>
				<Switch>
					<Redirect exact from="/" to="/dashboard"/>
					<Route path="/dashboard" component={() => <DashboardPage/>}/>
					<Route path="/songs/:songId" component={(props: RouteComponentProps) => <SongPage {...props}/>}/>
					<Route path="/impress" component={() => <ImpressPage/>}/>
				</Switch>
			</BrowserRouter>
		</AppContext.Provider>
	);
};

export default App;
