import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";
import React from "react";
import Login from "../../components/login/Login";

const LoginPage = () => {
	return (
		<div className="page">
			<Navigation/>
			<div className="content-wrapper">
				<Login/>
			</div>
			<Footer/>
		</div>
	);
};
export default LoginPage;
