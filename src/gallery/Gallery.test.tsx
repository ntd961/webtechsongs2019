import ReactDOM from "react-dom";
import Gallery from "./Gallery";
import * as React from "react";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<Gallery/>, div);
	ReactDOM.unmountComponentAtNode(div);
});
