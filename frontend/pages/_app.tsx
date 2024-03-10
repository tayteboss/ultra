import { useEffect, useState } from 'react';
import '../styles/fonts.css';
import { ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import Layout from '../components/layout';
import { theme } from '../styles/theme';
import { GlobalStyles } from '../styles/global';
import use1vh from '../hooks/use1vh';
import { TransitionsType } from '../shared/types/types';
import useHeaderHeight from '../hooks/useHeaderHeight';
import Cursor from '../components/elements/Cursor';

const pageTransitionVariants: TransitionsType = {
	hidden: { opacity: 0, transition: { duration: 0.3 } },
	visible: { opacity: 1, transition: { duration: 0.3, delay: 0.25 } }
};

type Props = {
	Component: any;
	pageProps: {};
};

const App = (props: Props) => {
	const { Component, pageProps } = props;

	const [hasVisited, setHasVisited] = useState<boolean>(false);
	const [appCursorRefresh, setAppCursorRefresh] = useState(0);

	const router = useRouter();
	const routerEvents = router.events;

	const handleExitComplete = (): void => {
		window.scrollTo(0, 0);
	};

	use1vh();
	useHeaderHeight();

	const setDefaultTheme = () => {
		document.documentElement.style.setProperty(
			'--html-bg',
			theme.colours.black
		);
		document.documentElement.style.setProperty(
			'--footer-bg',
			theme.colours.orange
		);
		document.documentElement.style.setProperty(
			'--footer-fg',
			theme.colours.black
		);
		document.documentElement.style.setProperty(
			'--footer-contact-fg',
			theme.colours.white
		);
		document.documentElement.style.setProperty(
			'--menu-active',
			theme.colours.orange
		);
		document.documentElement.style.setProperty(
			'--menu-inactive',
			theme.colours.white
		);
	};

	const setOffBriefTheme = () => {
		document.documentElement.style.setProperty(
			'--html-bg',
			theme.colours.orange
		);
		document.documentElement.style.setProperty(
			'--footer-bg',
			theme.colours.black
		);
		document.documentElement.style.setProperty(
			'--footer-fg',
			theme.colours.orange
		);
		document.documentElement.style.setProperty(
			'--footer-contact-fg',
			theme.colours.black
		);
		document.documentElement.style.setProperty(
			'--menu-active',
			theme.colours.white
		);
		document.documentElement.style.setProperty(
			'--menu-inactive',
			theme.colours.black
		);
	};

	const setBlackTheme = () => {
		document.documentElement.style.setProperty(
			'--html-bg',
			theme.colours.white
		);
		document.documentElement.style.setProperty(
			'--footer-bg',
			theme.colours.black
		);
		document.documentElement.style.setProperty(
			'--footer-fg',
			theme.colours.white
		);
		document.documentElement.style.setProperty(
			'--footer-contact-fg',
			theme.colours.black
		);
	};

	useEffect(() => {
		if (router.pathname === '/') {
			setDefaultTheme();
		} else if (router.pathname === '/off-brief') {
			setOffBriefTheme();
		} else {
			setDefaultTheme();
		}
	}, [router]);

	useEffect(() => {
		const hasCookies = Cookies.get('visited');

		if (hasCookies) {
			setHasVisited(true);
		}

		const timer = setTimeout(() => {
			Cookies.set('visited', 'true', { expires: 1, path: '' });
		}, 5000);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<>
			<GlobalStyles />
			<ThemeProvider theme={theme}>
				<Layout>
					<AnimatePresence
						mode="wait"
						onExitComplete={() => handleExitComplete()}
					>
						<Component
							{...pageProps}
							key={router.asPath}
							pageTransitionVariants={pageTransitionVariants}
							setAppCursorRefresh={setAppCursorRefresh}
							appCursorRefresh={appCursorRefresh}
						/>
					</AnimatePresence>
				</Layout>
				<Cursor
					cursorRefresh={() =>
						setAppCursorRefresh(appCursorRefresh + 1)
					}
				/>
			</ThemeProvider>
		</>
	);
};

export default App;
