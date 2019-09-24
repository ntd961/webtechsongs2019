import React, {useContext, useState} from "react";
import styles from "./NewSong.module.scss";
import {useForm} from "../../shared/hooks/useForm";
import {Validators} from "../../shared/Validators";
import {classes} from "../../shared/Utils";
import {ServicesContext} from "../../services/Services";
import {RouteComponentProps, withRouter} from "react-router";
import ResponseError, {emptyResponseErrors, responseErrorFromAxiosError} from "../../shared/response-error/ResponseError";
import {AxiosError} from "axios";

export interface NewSongForm {
	title: { value: string };
	artists: { value: string };
	album: { value: string };
	image: { value: string };
	rating: { value: string };
}

const NewSong = (props: RouteComponentProps) => {

	const services = useContext(ServicesContext);
	const [responseErrors, setResponseErrors] = useState(emptyResponseErrors());
	const {fields, handleChange, handleBlur, handleSubmit, onError, getClassNames} = useForm(submit, {
		title: ["", [Validators.required]],
		artists: ["", [Validators.required]],
		album: ["", [Validators.required]],
		image: ["", [Validators.required, Validators.url]],
		rating: ["", [Validators.required, Validators.range(1, 5)]]
	});

	function submit() {
		const {title, artists, album, image, rating} = fields as NewSongForm;

		services.songService.createSong(title.value, artists.value.split(","), album.value, image.value, parseInt(rating.value))
			.subscribe(() => props.history.push("/"), (error: AxiosError) => setResponseErrors(responseErrorFromAxiosError(error)));
	}

	const {title, artists, album, image, rating} = fields;
	return (
		<div className={styles.newSong}>
			<h2 className="mb-3">New Song</h2>
			<form className="grid grid-template-columns-md-auto-2 grid-gap-3 align-items-center" method="post" onSubmit={handleSubmit}>

				<label htmlFor="title">Title:</label>
				<input id="title" name="title" className={classes("form-control", ...getClassNames(title))}
					   placeholder="Enter your title" value={title.value || ""} onChange={handleChange} onBlur={handleBlur}/>
				{onError(title, ["required"],
					<div className="grid-column-md-2 alert alert-danger">Please enter a title.</div>
				)}

				<label htmlFor="artists">Artist:</label>
				<input id="artists" name="artists" className={classes("form-control", ...getClassNames(artists))}
					   placeholder="Enter your artists (comma separated)" value={artists.value || ""} onChange={handleChange} onBlur={handleBlur}/>
				{onError(artists, ["required"],
					<div className="grid-column-md-2 alert alert-danger">Please enter a artists.</div>
				)}

				<label htmlFor="album">Album:</label>
				<input id="album" name="album" className={classes("form-control", ...getClassNames(album))}
					   placeholder="Enter your album" value={album.value || ""} onChange={handleChange} onBlur={handleBlur}/>
				{onError(album, ["required"],
					<div className="grid-column-md-2 alert alert-danger">Please enter a album.</div>
				)}

				<label htmlFor="image">Image Link:</label>
				<input id="image" name="image" className={classes("form-control", ...getClassNames(image))}
					   placeholder="Enter your image link" value={image.value || ""} onChange={handleChange} onBlur={handleBlur}/>
				{onError(image, ["required", "url"],
					<div className="grid-column-md-2 alert alert-danger">Please enter a image link.</div>
				)}

				<label htmlFor="rating">Rating:</label>
				<input id="rating" name="rating" className={classes("form-control", ...getClassNames(rating))}
					   placeholder="Enter your rating" value={rating.value || ""} onChange={handleChange} onBlur={handleBlur}/>
				{onError(rating, ["required", "range"],
					<div className="grid-column-md-2 alert alert-danger">Please enter a rating between 1 and 5.</div>
				)}

				<ResponseError className="grid-column-2" responseErrors={responseErrors}/>

				<div className="grid-column-2">
					<button className="btn" type="submit">Create</button>
				</div>
			</form>
		</div>
	);
};

export default withRouter(NewSong);
