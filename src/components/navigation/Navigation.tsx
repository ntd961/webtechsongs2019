import React, {useContext} from "react";
import styles from "./Navigation.module.scss";
import {Link} from "react-router-dom";
import {ServicesContext} from "../../services/Services";
import {AppStateContext} from "../../services/AppState";

const Navigation = () => {

	const {authentication} = useContext(AppStateContext);
	const {authenticationService} = useContext(ServicesContext);

	return <div className={styles.navigation}>
		<Link to="/dashboard" className={styles.navigationHeadline}>Musikbibliothek</Link>
		<div className={styles.navigationMenu}>
			{!authentication ? (
				<Link to="/login" className="btn">Login</Link>
			) : (
				<div>
					<span className="mr-2">Logged in as: {authentication.username}</span>
					<button onClick={() => authenticationService.logout()} className="btn">Logout</button>
				</div>
			)}
		</div>
	</div>;
};

export default Navigation;
