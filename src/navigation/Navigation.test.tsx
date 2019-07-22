import ReactDOM from "react-dom";
import Navigation from "./Navigation";
import * as React from "react";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<Navigation/>, div);
	ReactDOM.unmountComponentAtNode(div);
});
