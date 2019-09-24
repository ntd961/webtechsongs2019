import React, {useContext, useState} from "react";
import styles from "./Login.module.scss";
import {ServicesContext} from "../../services/Services";
import {useForm} from "../../shared/hooks/useForm";
import {Validators} from "../../shared/Validators";
import {classes} from "../../shared/Utils";
import ResponseError, {emptyResponseErrors, responseErrorFromAxiosError, ResponseErrors} from "../../shared/response-error/ResponseError";
import {AxiosError} from "axios";

export interface LoginForm {
	username: { value: string };
	password: { value: string };
}

const Login = () => {

	const services = useContext(ServicesContext);
	const [responseErrors, setResponseErrors] = useState<ResponseErrors>(emptyResponseErrors());
	const {fields, handleChange, handleBlur, handleSubmit, onError, getClassNames} = useForm(submit, {
		username: ["", [Validators.required]],
		password: ["", [Validators.required, Validators.password]]
	});

	function submit() {
		const {username, password} = fields as LoginForm;
		services.authenticationService.login({
			username: username.value,
			password: password.value
		}).subscribe(() => setResponseErrors(emptyResponseErrors()), (error: AxiosError) => setResponseErrors(responseErrorFromAxiosError(error)));
	}

	const {username, password} = fields;
	return (
		<div className={styles.login}>
			<h2 className="mb-3">Login</h2>
			<form className="grid grid-template-columns-md-auto-2 grid-gap-3 align-items-center" method="post" onSubmit={handleSubmit}>

				<label htmlFor="username">Username:</label>
				<input id="username" name="username" type="username" className={classes("form-control", ...getClassNames(username))}
					   placeholder="Enter your username" value={username.value || ""} onChange={handleChange} onBlur={handleBlur}/>
				{onError(username, ["required", "username"],
					<div className="grid-column-md-2 alert alert-danger">Please enter a valid username.</div>
				)}

				<label htmlFor="password">Passwort:</label>
				<input id="password" name="password" type="password" autoComplete="off"
					   className={classes("form-control", ...getClassNames(password))} placeholder="Enter your password"
					   value={password.value || ""} onChange={handleChange} onBlur={handleBlur}/>
				{onError(password, ["required", "password"],
					<div className="grid-column-md-2 alert alert-danger">Please enter a password with at least 8 characters.</div>
				)}

				<ResponseError className="grid-column-md-2" responseErrors={responseErrors} messages={{
					unauthorized: "Wrong username or password."
				}}/>

				<button className="btn" type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
