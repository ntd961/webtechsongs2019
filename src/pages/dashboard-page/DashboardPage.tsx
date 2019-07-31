import Navigation from "../../navigation/Navigation";
import SongGallery from "../../gallery/SongGallery";
import Footer from "../../footer/Footer";
import React from "react";

const DashboardPage = () => {
	return (
		<div className="page-wrapper">
			<Navigation/>
			<SongGallery/>
			<Footer/>
		</div>
	);
};

export default DashboardPage;
