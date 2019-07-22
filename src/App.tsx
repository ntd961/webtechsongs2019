import React, {Component} from "react";
import Navigation from "./navigation/Navigation";
import Gallery from "./gallery/Gallery";
import styles from "./App.module.css";
import Footer from "./footer/Footer";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

export interface Car {
	name: string;
	brand: string;
	category: string;
	image: string;
}

const cars: Car[] = [
	{
		brand: "Lamborghini",
		name: "Aventador",
		category: "Sportwagen",
		image: "https://st.motortrend.com/uploads/sites/11/2019/03/2020-Lamborghini-Aventador-SVJ-Roadster-02.jpg"
	},
	{
		brand: "Mercedes-Benz",
		name: "S-Klasse Limousine",
		category: "Oberklasse",
		image: "https://www.mercedes-benz.com/content/dam/brandhub/mercedes-benz/vehicles/passenger-cars/s-class/mercedes-benz-fahrzeuge-s-klasse-w-222-s-500-selenitgrau-metallic-2560x1440-2560x1440.jpg"
	}
];

const dashboard = (<div className={styles.pageWrapper}>
	<Navigation/>
	<Gallery cars={cars}/>
	<Footer/>
</div>);

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Redirect exact from="/" to="/dashboard"/>
					<Route path="/dashboard" component={() => dashboard}/>
					<Route path="/impressum" component={() => <div>Test</div>}/>
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
