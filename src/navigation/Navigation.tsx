import React, {Component} from "react";
import styles from "./Navigation.module.scss";
import {Link} from "react-router-dom";

class Navigation extends Component {
	render() {
		return (
			<div className={styles.navigation}>
				<Link to="/dashboard" className={styles.navigationHeadline}>Musikbibliothek</Link>
			</div>
		);
	}
}

export default Navigation;
