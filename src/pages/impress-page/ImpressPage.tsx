import styles from "./ImpressPage.module.scss";
import Navigation from "../../navigation/Navigation";
import Footer from "../../footer/Footer";
import React from "react";

const ImpressPage = () => {
	return (
		<div className="page-wrapper">
			<Navigation/>
			<div>
				<h2>Impressum</h2>
				<div className={styles.impressWrapper}>
					<div>Hochschule für Technik und Wirtschaft Berlin</div>
					<div>Der Präsident</div>
					<div>Treskowallee 8</div>
					<div>10318 Berlin</div>

					<div>Telefon: +49 30 5019 - 00 (Zentrale)</div>
					<div>Fax: +49 30 50901 - 2100 (Zentrale)</div>
					<div>Bilder von: <a href="http://deezer.de">Deezer</a></div>
				</div>
				<iframe title="Maps" className={styles.map}
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19434.673406367645!2d13.512407145512707!3d52.49119019521717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8492e8e935b15%3A0xa0d5d0da2ff283a6!2sHochschule+f%C3%BCr+Technik+und+Wirtschaft+Berlin+(HTW+Berlin)+-+Campus+Treskowallee!5e0!3m2!1sde!2sde!4v1557928847641!5m2!1sde!2sde"
						allowFullScreen/>
			</div>
			<Footer/>
		</div>
	);
};
export default ImpressPage;
