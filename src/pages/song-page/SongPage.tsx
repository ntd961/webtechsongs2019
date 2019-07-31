import React from "react";
import {Services, withServices} from "../../services/Services";
import {RouteComponentProps} from "react-router";
import {Song} from "../../services/song-service/SongService";
import Card from "../../gallery/card/Card";
import Navigation from "../../navigation/Navigation";
import Footer from "../../footer/Footer";

const SongPage = withServices((props: Services & RouteComponentProps) => {
	const {songId} = props.match.params as any;
	const song: Song | null = props.songService!!.getSong(parseInt(songId)) || null;

	return (
		<div className="page-wrapper">
			<Navigation/>
			{song ? (
				<Card key={song.id} title={song.artists.join(", ") + " - " + song.title} badges={[...song.artists, song.album]} image={song.image}
					  onBadgeClick={(search: string) => props.history.push("/dashboard?search=" + search)}/>
			) : "Song not found."}
			<Footer/>
		</div>
	);
});

export default SongPage;
