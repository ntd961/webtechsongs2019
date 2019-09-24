import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import styles from "./Gallery.module.scss";
import Card from "./card/Card";
import {Song} from "../../services/song-service/SongService";
import {ServicesContext} from "../../services/Services";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {parse} from "query-string";
import {classes} from "../../shared/Utils";
import {Plus} from "react-feather";

const Gallery = (props: RouteComponentProps) => {
	const queryParams = parse(props.location.search) as any;
	const [songs, setSongs] = useState<Song[]>([]);
	const [searchValue, setSearchValue] = useState(queryParams.search || "");
	const [ratingsFilter, setRatingsFilter] = useState<number | "ALL">("ALL");
	const {songService} = useContext(ServicesContext);

	const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	const handleRatingFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setRatingsFilter(parseInt(event.target.value) || "ALL");
	};

	const handleClearClicked = () => {
		setSearchValue("");
		setRatingsFilter("ALL");
	};

	useEffect(() => {
		songService.getSongs(searchValue, ratingsFilter === "ALL" ? null : ratingsFilter)
			.subscribe((songs: Song[]) => setSongs(songs));
	}, [songService, searchValue, ratingsFilter]);

	return (
		<>
			<div className={styles.filterWrapper}>
				<select className="border-bottom-left-radius-0 border-top-right-radius-sm-0 border-bottom-right-radius-0 border-bottom-left-radius-sm-on"
						value={ratingsFilter} onChange={handleRatingFilterChange}>
					<option value={"ALL"}>All</option>
					{[1, 2, 3, 4, 5].map(rating =>
						<option key={rating} value={rating}>Rating: {rating}</option>
					)}
				</select>
				<input className={styles.searchBar} type="search" placeholder="Durchsuchen..." value={searchValue} onChange={handleSearchValueChange}/>
				<button className="btn border-top-right-radius-0 border-top-left-radius-0 border-bottom-left-radius-sm-0 border-top-right-radius-sm-on"
						onClick={handleClearClicked}>
					Clear
				</button>
			</div>
			<div className={styles.gallery}>
				<div className={styles.spanFullWidth}>
					Browsing {songs.length} songs.
				</div>
				{songs.map((song: Song) =>
					<Card key={song.id} title={song.artists.join(", ") + " - " + song.title} subline={`Rating ${song.rating}`}
						  badges={[...song.artists, song.album]} header={<img className={styles.image} src={song.image} alt={song.title}/>}
						  onActionClick={() => props.history.push(`/songs/edit/${song.id}`)} onBadgeClick={setSearchValue}/>
				)}
				{searchValue === "" ? (
					<div onClick={() => props.history.push("/songs/create")} className={classes(styles.newCard, "btn")}>
						<Plus/>
					</div>
				) : null}
			</div>
		</>
	);
};

export default withRouter(Gallery);
