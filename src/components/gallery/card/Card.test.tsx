import ReactDOM from "react-dom";
import Card from "./Card";
import * as React from "react";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<Card title="test"/>, div);
	ReactDOM.unmountComponentAtNode(div);
});
