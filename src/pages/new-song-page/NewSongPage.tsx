import React from "react";
import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";
import NewSong from "../../components/new-song/NewSong";

const NewSongPage = () => {

	return (
		<div className="page">
			<Navigation/>
			<div className="content-wrapper">
				<NewSong/>
			</div>
			<Footer/>
		</div>
	);
};

export default NewSongPage;
