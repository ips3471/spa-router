import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, RouterProvider as Router } from './context/router.tsx';
import Root from './pages/Root.tsx';
import About from './pages/About.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Router>
			<Route path='/' component={<Root />} />
			<Route path='/about' component={<About />} />
		</Router>
	</React.StrictMode>,
);
