import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";
import React from "react";
import Contact from "../../components/contact/Contact";

const ContactPage = () => {
	return (
		<div className="page">
			<Navigation/>
			<div className="content-wrapper">
				<Contact/>
			</div>
			<Footer/>
		</div>
	);
};
export default ContactPage;
