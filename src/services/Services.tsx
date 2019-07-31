import React, {ComponentType, Context, ContextType, createContext, PureComponent} from "react";
import SongService from "./song-service/SongService";

export interface Services {
	songService?: SongService;
}

export const AppContext: Context<Services> = createContext({});

export const withServices = <P extends Services>(Component: ComponentType<P>) => {
	return class extends PureComponent<P> {
		static contextType = AppContext;
		context!: ContextType<typeof AppContext>;

		render() {
			const props = {...this.context, ...this.props};
			return <Component {...props as P}/>;
		}
	};
};
