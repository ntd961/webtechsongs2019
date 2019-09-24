import React, {Component} from "react";
import styles from "./Footer.module.scss";
import {Link} from "react-router-dom";

class Footer extends Component {
	render() {
		return (
			<div className={styles.footer}>
				<div className={styles.footerGrid}>
					<Link to="/impress">Impressum</Link>
					<Link to="/contact">Contact</Link>
				</div>
			</div>
		);
	}
}

export default Footer;
