import ReactDOM from "react-dom";
import Footer from "./Footer";
import * as React from "react";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<Footer/>, div);
	ReactDOM.unmountComponentAtNode(div);
});
