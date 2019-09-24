import ReactDOM from "react-dom";
import * as React from "react";
import LoginPage from "./LoginPage";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<LoginPage/>, div);
	ReactDOM.unmountComponentAtNode(div);
});
