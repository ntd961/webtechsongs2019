import React from "react";
import styles from "./Contact.module.scss";
import {useForm} from "../../shared/hooks/useForm";
import {Validators} from "../../shared/Validators";
import {classes} from "../../shared/Utils";

export interface ContactForm {
	email: { value: string }
	firstName: { value: string };
	lastName: { value: string };
	message: { value: string };
}

const Contact = () => {

	const {fields, handleChange, handleBlur, handleSubmit, onError, getClassNames} = useForm(submit, {
		email: ["", [Validators.required, Validators.email]],
		firstName: ["", [Validators.required]],
		lastName: ["", [Validators.required]],
		message: ["", [Validators.required]]
	});

	function submit() {
		const {email, firstName, lastName, message} = fields as ContactForm;
		window.alert(`Got message: '${message.value}' from ${email.value} (${firstName.value}, ${lastName.value})`);
	}

	const {email, firstName, lastName, message} = fields;
	return (
		<div className={styles.contact}>
			<h2 className="mb-3">Contact</h2>
			<form className="grid grid-template-columns-md-auto-2 grid-gap-3 align-items-center" method="post" onSubmit={handleSubmit}>

				<label htmlFor="email">Email:</label>
				<input id="email" name="email" type="email" className={classes("form-control", ...getClassNames(email))}
					   placeholder="Enter your email" value={email.value || ""} onChange={handleChange} onBlur={handleBlur}/>
				{onError(email, ["required", "email"],
					<div className="grid-column-md-2 alert alert-danger">Please enter a valid email.</div>
				)}

				<label htmlFor="firstName">First name:</label>
				<input id="firstName" name="firstName" className={classes("form-control", ...getClassNames(firstName))}
					   placeholder="Enter your first name" value={firstName.value || ""} onChange={handleChange} onBlur={handleBlur}/>
				{onError(firstName, ["required"],
					<div className="grid-column-md-2 alert alert-danger">Please enter a first name.</div>
				)}

				<label htmlFor="lastName">Last name:</label>
				<input id="lastName" name="lastName" className={classes("form-control", ...getClassNames(lastName))}
					   placeholder="Enter your last name" value={lastName.value || ""} onChange={handleChange} onBlur={handleBlur}/>
				{onError(lastName, ["required"],
					<div className="grid-column-md-2 alert alert-danger">Please enter a last name.</div>
				)}

				<label htmlFor="message">Message:</label>
				<textarea id="message" name="message" className={classes("form-control", ...getClassNames(message))}
						  placeholder="Enter your message" value={message.value || ""} onChange={handleChange} onBlur={handleBlur}/>
				{onError(message, ["required"],
					<div className="grid-column-md-2 alert alert-danger">Please enter a message.</div>
				)}

				<button className="btn" type="submit">Submit</button>
			</form>
		</div>
	);
};

export default Contact;
