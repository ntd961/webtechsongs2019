import React, {ReactElement} from "react";
import styles from "./Card.module.scss";
import {classes} from "../../../shared/Utils";

interface CardProperties {
	title?: string;
	subline?: string;
	header?: ReactElement;
	badges?: string[];
	actionTitle?: string;
	onActionClick?: Function;
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
		if (props.onActionClick) {
			props.onActionClick();
		}
	};

	return (
		<div className={styles.card}>
			{props.header ? (
				<div className={styles.cardHeader}>
					{props.header}
				</div>
			) : null}
			<div className={styles.content}>
				{props.title ? <h3>{props.title}</h3> : null}
				{props.subline ? <div className="mt-2">{props.subline}</div> : null}
				{props.badges ? (
					<div className={classes("badge-grid", styles.badges)}>
						{props.badges.map((badge: string, i: number) =>
							<button key={i} className="btn badge"
									onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleBadgeClick(e, badge)}>{badge}</button>
						)}
					</div>
				) : null}
				{props.onActionClick ? (
					<button className={"btn"} onClick={handleCardClick}>
						{props.actionTitle ? props.actionTitle : "Edit"}
					</button>
				) : null}
			</div>
		</div>
	);
};

export default Card;
