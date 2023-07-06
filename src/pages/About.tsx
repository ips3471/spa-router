import { PageProps } from '../global';
import { Link, useRouter } from '../context/router';

function About({}: PageProps) {
	const { push } = useRouter();
	return (
		<div>
			<h1>about</h1>
			<Link onClick={() => push('/')}>go main</Link>
		</div>
	);
}

export default About;
