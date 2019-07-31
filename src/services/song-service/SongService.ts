export interface Song {
	id: number;
	title: string;
	artists: string[];
	album: string;
	image: string;
}

class SongService {

	getSongs(searchValue: string = ""): Song[] {
		return [
			{
				id: 1,
				title: "Goodbyes",
				artists: ["Post Malone"],
				album: "Goodbyes",
				image: "https://e-cdns-images.dzcdn.net/images/cover/a34c120da927629e8c174d4ff3a29eed/264x264-000000-80-0-0.jpg"
			},
			{
				id: 2,
				title: "I Feel It Coming",
				artists: ["The Weeknd", "Daft Punk"],
				album: "Starboy",
				image: "https://e-cdns-images.dzcdn.net/images/cover/afa915d88d871b6f929e61ada8aa644f/264x264-000000-80-0-0.jpg"
			},
			{
				id: 3,
				title: "In the End",
				artists: ["Linkin Park"],
				album: "Hybrid Theory",
				image: "https://e-cdns-images.dzcdn.net/images/cover/033a271b5ec10842c287827c39244fb5/264x264-000000-80-0-0.jpg"
			}
		].filter((song: Song) => [...song.artists, song.album, song.title].some(value => value.indexOf(searchValue) !== -1));
	}

	getSong(id: number): Song | null {
		return this.getSongs()
			.find(song => song.id === id) || null;
	}
}

export default SongService;
