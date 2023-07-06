import { Link, useRouter } from '../context/router';
import { PageProps } from '../global';

function Root({}: PageProps) {
	const { push } = useRouter();
	return (
		<div>
			<h1>root</h1>
			<Link onClick={() => push('/about')}>about</Link>
		</div>
	);
}

export default Root;
