import React, {ComponentType} from "react";
import {Redirect, Route, RouteComponentProps, RouteProps} from "react-router";
import {Pathname} from "history";

export interface ProtectedRouteProps extends RouteProps {
	component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
	canActivate?: boolean;
	redirectTo: Pathname;
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
	const {component: Component, canActivate, redirectTo, ...rest} = props;
	return (
		<Route
			{...rest}
			render={(_props) => (
				(canActivate === undefined || canActivate) ?
					(<Component {..._props} />) :
					(<Redirect to={{pathname: redirectTo, state: {from: _props.location}}}/>)
			)}
		/>
	);
};

export default ProtectedRoute;
