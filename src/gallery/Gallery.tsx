import React, {Component} from "react";
import styles from "./Gallery.module.scss";
import Card from "./card/Card";
import {Car} from "../App";

interface GalleryProps {
	cars: Car[],
	nameFilter?: string;
}

class Gallery extends Component<GalleryProps, any> {
	render() {
		return (
			<div className={styles.gallery}>
				{this.props.cars
					.filter(car => !this.props.nameFilter || car.name === this.props.nameFilter)
					.map((car: Car) =>
					<Card car={car}/>
				)}
			</div>
		);
	}
}

export default Gallery;
