import {
	Children,
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import { Push } from '../global';

interface Route {
	path: string;
	component: ReactNode;
}

export interface RouterContextProps {
	push: (path: string) => void;
}

const RouterContext = createContext<RouterContextProps>({
	push: () => {},
});

interface RouteProps {
	path: string;
	component: React.ReactNode;
}

export function Route({ component, path }: RouteProps) {
	return <div>{component}</div>;
}

export function Link({
	children,
	onClick,
}: {
	children: ReactNode;
	onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		onClick && onClick(e);
	};

	return <a onClick={handleClick}>{children}</a>;
}

export function RouterProvider({
	children,
}: {
	children: ReactNode | ReactNode[];
}) {
	const routes: Route[] = Children.toArray(children).map(item => item.props);

	const [location, setLocation] = useState<string>(window.location.pathname);

	const push: Push = (pathname: string) => {
		history.pushState({}, '', pathname);
		setLocation(pathname);
	};

	useEffect(() => {
		const onPopState = () => setLocation(window.location.pathname);
		window.addEventListener('popstate', onPopState);
		return () => window.removeEventListener('popstate', onPopState);
	}, []);

	return (
		<RouterContext.Provider value={{ push }}>
			{routes.find(route => route.path === location)!.component}
		</RouterContext.Provider>
	);
}

export function useRouter() {
	return useContext(RouterContext);
}
