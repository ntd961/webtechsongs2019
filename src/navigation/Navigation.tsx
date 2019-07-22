import React, {Component} from "react";
import styles from "./Navigation.module.scss";

class Navigation extends Component {
	render() {
		return (
			<div className={styles.navigation}>
				<h1 className={styles.navigationHeadline}>Autos</h1>
			</div>
		);
	}
}

export default Navigation;
