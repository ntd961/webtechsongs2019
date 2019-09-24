import React from "react";
import ReactDOM from "react-dom";
import ResponseError, {emptyResponseErrors} from "./ResponseError";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<ResponseError responseErrors={{...emptyResponseErrors(), unexpectedError: true}}/>, div);
	ReactDOM.unmountComponentAtNode(div);
});
