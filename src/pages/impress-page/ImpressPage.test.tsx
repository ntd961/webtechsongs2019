import ReactDOM from "react-dom";
import * as React from "react";
import ImpressPage from "./ImpressPage";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<ImpressPage/>, div);
	ReactDOM.unmountComponentAtNode(div);
});
