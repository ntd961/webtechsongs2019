import ReactDOM from "react-dom";
import SongGallery from "./Gallery";
import * as React from "react";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<SongGallery/>, div);
	ReactDOM.unmountComponentAtNode(div);
});
