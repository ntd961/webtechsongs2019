import Navigation from "../../components/navigation/Navigation";
import SongGallery from "../../components/gallery/Gallery";
import Footer from "../../components/footer/Footer";
import React from "react";

const DashboardPage = () => {
	return (
		<div className="page">
			<Navigation/>
			<div className="content-wrapper">
				<SongGallery/>
			</div>
			<Footer/>
		</div>
	);
};

export default DashboardPage;
