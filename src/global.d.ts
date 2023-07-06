export type Push = (pathname: string) => void;

export interface PageProps {}

export interface RouteProps {
	path: string;
	component: React.ReactNode;
}
