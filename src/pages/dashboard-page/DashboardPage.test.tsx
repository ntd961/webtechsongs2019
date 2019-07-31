import ReactDOM from "react-dom";
import * as React from "react";
import DashboardPage from "./DashboardPage";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<DashboardPage/>, div);
	ReactDOM.unmountComponentAtNode(div);
});
