import ReactDOM from "react-dom";
import * as React from "react";
import SongPage from "./SongPage";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<SongPage/>, div);
	ReactDOM.unmountComponentAtNode(div);
});
