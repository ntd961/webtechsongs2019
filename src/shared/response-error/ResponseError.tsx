import React from "react";
import {AxiosError} from "axios";
import {classes} from "../Utils";

export interface ResponseErrors {
	badRequest: boolean;
	unauthorized: boolean;
	unexpectedError: boolean;
}

export const emptyResponseErrors: () => ResponseErrors = () => {
	return {
		badRequest: false,
		unauthorized: false,
		unexpectedError: false
	};
};

export const responseErrorFromAxiosError: (error: AxiosError) => ResponseErrors = (error: AxiosError) => {
	if (error.response) {
		switch (error.response.status) {
			case 400:
				return {
					...emptyResponseErrors(),
					badRequest: true
				};
			case 401:
			case 403:
				return {
					...emptyResponseErrors(),
					unauthorized: true
				};
			default:
				break;
		}
	}
	return {
		...emptyResponseErrors(),
		unexpectedError: true
	};
};

export interface ResponseErrorProperties {
	className?: string
	responseErrors: ResponseErrors;
	messages?: { [key in keyof ResponseErrors]?: string };
}

const ResponseError = (props: ResponseErrorProperties) => {

	const messages: { [key in keyof ResponseErrors]: string } = {
		badRequest: "Please check your inputs and try again.",
		unauthorized: "You're not authorized to see this data.",
		unexpectedError: "Something went wrong. Please try again later.",
		...props.messages
	};
	return <>
		{(Object.keys(props.responseErrors) as [keyof ResponseErrors]).map((key: keyof ResponseErrors) => (
			props.responseErrors[key] ? (
				<div key={key} className={classes(props.className, "alert alert-danger")}>
					{messages[key]}
				</div>
			) : null
		))}
	</>;
};

export default ResponseError;
