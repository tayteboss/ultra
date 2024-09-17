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

const siteSettings = require('../json/siteSettings.json');

const pageTransitionVariants: TransitionsType = {
	hidden: { opacity: 0, transition: { duration: 0.5 } },
	visible: { opacity: 1, transition: { duration: 0.5 } }
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
		setAppCursorRefresh(appCursorRefresh + 1);

		setTimeout(() => {
			checkRoute();
			setAppCursorRefresh(appCursorRefresh + 1);
		}, 100);
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
			'var(--colour-orange)'
		);
		document.documentElement.style.setProperty(
			'--footer-fg',
			theme.colours.black
		);
		document.documentElement.style.setProperty(
			'--footer-contact-fg',
			theme.colours.offWhite
		);
		document.documentElement.style.setProperty(
			'--menu-inactive',
			theme.colours.white
		);
		document.documentElement.style.setProperty(
			'--footer-hover',
			theme.colours.white
		);
		document.documentElement.style.setProperty(
			'--menu-blend-mode',
			'difference'
		);
	};

	const setOffBriefTheme = () => {
		document.documentElement.style.setProperty(
			'--html-bg',
			'var(--colour-orange)'
		);
		document.documentElement.style.setProperty(
			'--footer-bg',
			theme.colours.black
		);
		document.documentElement.style.setProperty(
			'--footer-fg',
			'var(--colour-orange)'
		);
		document.documentElement.style.setProperty(
			'--footer-contact-fg',
			theme.colours.black
		);
		document.documentElement.style.setProperty(
			'--menu-inactive',
			theme.colours.white
		);
		document.documentElement.style.setProperty(
			'--footer-hover',
			theme.colours.white
		);
		document.documentElement.style.setProperty(
			'--menu-blend-mode',
			'normal'
		);
	};

	const setContactTheme = () => {
		document.documentElement.style.setProperty(
			'--html-bg',
			theme.colours.white
		);
		document.documentElement.style.setProperty(
			'--footer-bg',
			'var(--colour-orange)'
		);
		document.documentElement.style.setProperty(
			'--footer-fg',
			theme.colours.black
		);
		document.documentElement.style.setProperty(
			'--footer-contact-fg',
			theme.colours.black
		);
		document.documentElement.style.setProperty(
			'--menu-inactive',
			theme.colours.white
		);
		document.documentElement.style.setProperty(
			'--footer-hover',
			theme.colours.white
		);
		document.documentElement.style.setProperty(
			'--menu-blend-mode',
			'difference'
		);
	};

	const setAboutTheme = () => {
		document.documentElement.style.setProperty(
			'--html-bg',
			theme.colours.offWhite
		);
		document.documentElement.style.setProperty(
			'--footer-bg',
			'var(--colour-orange)'
		);
		document.documentElement.style.setProperty(
			'--footer-fg',
			theme.colours.black
		);
		document.documentElement.style.setProperty(
			'--footer-contact-fg',
			theme.colours.black
		);
		document.documentElement.style.setProperty(
			'--menu-inactive',
			theme.colours.white
		);
		document.documentElement.style.setProperty(
			'--footer-hover',
			theme.colours.white
		);
		document.documentElement.style.setProperty(
			'--menu-blend-mode',
			'difference'
		);
	};

	const checkRoute = () => {
		if (router.pathname === '/') {
			setDefaultTheme();
		} else if (router.pathname === '/off-brief') {
			setOffBriefTheme();
		} else if (
			router.pathname === '/contact' ||
			router.pathname === '/terms-conditions' ||
			router.pathname === '/privacy-policy'
		) {
			setContactTheme();
		} else if (router.pathname === '/about') {
			setAboutTheme();
		} else {
			setDefaultTheme();
		}
	};

	useEffect(() => {
		checkRoute();
	}, [router]);

	useEffect(() => {
		const hasCookies = Cookies.get('visited');

		if (hasCookies) {
			setHasVisited(true);
		}

		const timer = setTimeout(() => {
			Cookies.set('visited', 'true', { expires: 1, path: '' });
		}, 5000);

		checkRoute();

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
