import React from "react";
import styles from "./Card.module.scss";

interface CardProperties {
	title: string;
	image: string;
	badges: string[];
	onDetailsClick?: Function;
	onBadgeClick?: Function;
}


const Card = (props: CardProperties) => {

	const handleBadgeClick = (e: React.MouseEvent<HTMLButtonElement>, value: string) => {
		e.preventDefault();
		e.stopPropagation();
		if (props.onBadgeClick) {
			props.onBadgeClick(value);
		}
	};

	const handleCardClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (props.onDetailsClick) {
			props.onDetailsClick();
		}
	};

	return (
		<div className={styles.card}>
			<img className={styles.cardImage} alt={props.title} src={props.image}/>
			<h3>{props.title}</h3>
			<div className="badge-grid">
				{props.badges.map((badge: string, i: number) =>
					<button key={i} className="badge" onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleBadgeClick(e, badge)}>{badge}</button>
				)}
			</div>
			{props.onDetailsClick ? (
				<button className={"btn " + styles.detailsButton} onClick={handleCardClick}>Details</button>
			) : null}
		</div>
	);
};

export default Card;
