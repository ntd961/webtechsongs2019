import React, {Component} from "react";
import styles from "./Footer.module.scss";

class Footer extends Component {
	render() {
		return (
			<div className={styles.footer}>
				<a href="/impressum">Impressum</a>
			</div>
		);
	}
}

export default Footer;
