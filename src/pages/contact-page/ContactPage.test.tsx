import ReactDOM from "react-dom";
import * as React from "react";
import ContactPage from "./ContactPage";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<ContactPage/>, div);
	ReactDOM.unmountComponentAtNode(div);
});
