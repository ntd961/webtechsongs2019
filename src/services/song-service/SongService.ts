import Axios from "axios-observable";
import {baseUrl} from "../../config/config.json";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {AxiosResponse} from "axios";

export interface Song {
	id: number;
	title: string;
	artists: string[];
	album: string;
	image: string;
	rating: number;
}

class SongService {

	createSong(title: string, artists: string[], album: string, image: string, rating: number) {

		const song: Song = {
			title: title,
			artists: artists,
			album: album,
			image: image,
			rating: rating
		} as Song;

		return Axios.post(`${baseUrl}/songs`, song, {
			withCredentials: true
		});
	}

	editSong(id: number, title: string, artists: string[], album: string, image: string, rating: number) {

		const song: Song = {
			title: title,
			artists: artists,
			album: album,
			image: image,
			rating: rating
		} as Song;

		return Axios.put(`${baseUrl}/songs/${id}`, song, {
			withCredentials: true
		});
	}

	deleteSong(id: number): Observable<AxiosResponse<any>> {

		return Axios.delete(`${baseUrl}/songs/${id}`, {
			withCredentials: true
		});
	}

	getSongs(searchValue: string = "", rating: number | null = null): Observable<Song[]> {

		let requestUrl = `${baseUrl}/songs?searchValue=${searchValue}`;
		if (rating !== null) {
			requestUrl += `&rating=${rating}`;
		}
		return Axios.get(requestUrl, {
			withCredentials: true
		}).pipe(
			map(response => response.data)
		);
	}

	getSong(id: number): Observable<Song | null> {

		return Axios.get(`${baseUrl}/songs/${id}`, {
			withCredentials: true
		}).pipe(
			map(response => response.data)
		);
	}
}

export default SongService;
