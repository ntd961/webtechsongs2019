import React, {useContext, useEffect, useState} from "react";
import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";
import {RouteComponentProps} from "react-router";
import {Song} from "../../services/song-service/SongService";
import {ServicesContext} from "../../services/Services";
import EditSong from "../../components/edit-song/EditSong";

const EditSongPage = (props: RouteComponentProps) => {
	const {songId} = props.match.params as any;
	const {songService} = useContext(ServicesContext);
	const [song, setSong] = useState<Song | null>(null);

	useEffect(() => {
		songService.getSong(parseInt(songId))
			.subscribe((song: Song | null) => setSong(song), () => setSong(null));
	}, [songService, songId]);

	return (
		<div className="page">
			<Navigation/>
			<div className="content-wrapper">
				{song ? (
					<EditSong song={song}/>
				) : (
					<div>No song found.</div>
				)}
			</div>
			<Footer/>
		</div>
	);
};

export default EditSongPage;
