# 프리온보딩 과제: SPA Router 구현 (DEMO)

React Hooks와 History API를 사용하여 Client Side Routing을 구현합니다.

## 구현사항

1. 사용자가 접근한 url에 대응하는 페이지를 렌더링합니다.
   `/` → `root`, `/about` → `about`
1. 'push' 메소드를 사용하여 설정한 경로로 이동할 수 있습니다. `() => push('/about')`
1. 브라우저의 내비게이션에 따른 페이지 이동이 가능합니다.

## 미구현사항

1. `404 Not found` 예외처리

## Usage

```javascript
//main.tsx
	<Router>
		<Route path='/' component={<Root />} />
		<Route path='/about' component={<About />} />
	</Router>
);

//Root.tsx
import { Link, useRouter } from '../context/router';

function Root() {
	const { push } = useRouter();
	return (
		<div>
			<h1>root</h1>
			<Link onClick={() => push('/about')}>about</Link>
		</div>
	);
}

export default Root;

```

## 의의

리액트로 개발하면서 라우팅 관련해서는 react-router-dom 라이브러리를 습관처럼 사용했었는데, 이 짧으면서도 개선여지가 많은 코드를 작성하면서 참 배운게 많았습니다.

- React.Children.toArray(): props를 배열형태로 가공할 수 있다.

```javascript
const routes: Route[] = Children.toArray(children).map(item => item.props);
```

- window.location, window.popstate: 클라이언트단에서 서버에 페이지를 요청하지 않고도 페이지 이동이 가능하다.

```javascript
const onPopState = () => setLocation(window.location.pathname);
window.addEventListener('popstate', onPopState);
```

## 한계

한편 구현사항은 만족했지만 해결해야 할 문제점 혹은 의문점도 있습니다.

- Router에서 Route의 path를 활용하지 않은점

```javascript
//main.tsx
<Router>
	<Route path='/' component={<Root />} />
</Router>;
/** Router에 path 속성을 전달하지만 **/

//router.tsx
export function Route({ component, path }: RouteProps) {
	return <div>{component}</div>;
}
/** 전달된 component를 그대로 render하는 것 외에는 기능이 없음 **/

//Root.tsx
import { Link, useRouter } from '../context/router';

function Root({}: PageProps) {
	const { push } = useRouter();
	return (
		<div>
			<h1>root</h1>
			<Link onClick={() => push('/about')}>about</Link>
		</div>
	);
}
/** 페이지에서 수동적으로 path를 전달해주기 때문인데 이에 대한 개선이 필요해보임 **/
```
