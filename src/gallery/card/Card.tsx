import React, {Component} from "react";
import styles from "./Card.module.scss";
import {Car} from "../../App";

interface CardProperties {
	car: Car;
}

class Card extends Component<CardProperties, any> {
	render() {
		return (
			<div className={styles.card}>
				<img className={styles.cardImage} alt={this.props.car.brand + " " + this.props.car.name} src={this.props.car.image}/>
				<h3>{this.props.car.brand} {this.props.car.name}</h3>
				<div className="badge-grid">
					<a href="/" className="badge">{this.props.car.brand}</a>
					<a href="/" className="badge">{this.props.car.category}</a>
				</div>
			</div>
		);
	}
}

export default Card;
