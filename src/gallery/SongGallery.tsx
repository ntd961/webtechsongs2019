import React, {ChangeEvent, useState} from "react";
import styles from "./SongGallery.module.scss";
import Card from "./card/Card";
import {Song} from "../services/song-service/SongService";
import {Services, withServices} from "../services/Services";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {parse} from "query-string";

const SongGallery = withServices(withRouter((props: Services & RouteComponentProps) => {
	const queryParams = parse(props.location.search) as any;
	const [searchValue, setSearchValue] = useState(queryParams.search || "");

	const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	const songs: Song[] = props.songService!!.getSongs(searchValue);

	return (
		<div className={styles.gallery}>
			<div className={styles.searchBarWrapper}>
				<input className={styles.searchBar} type="search" placeholder="Durchsuchen..." value={searchValue} onChange={handleSearchValueChange}/>
				<button className="btn" onClick={() => setSearchValue("")}>X</button>
			</div>
			{songs.map((song: Song, i: number) =>
				<Card key={song.id} title={song.artists.join(", ") + " - " + song.title} badges={[...song.artists, song.album]} image={song.image}
					  onDetailsClick={() => props.history.push("/songs/" + song.id)} onBadgeClick={setSearchValue}/>
			)}
		</div>
	);
}));

export default SongGallery;
