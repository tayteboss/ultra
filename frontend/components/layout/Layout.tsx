import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import { ReactNode, useEffect, useState } from 'react';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import MobileMenu from '../blocks/MobileMenu';
import CookieConsent from 'react-cookie-consent';

const siteSettings = require('../../json/siteSettings.json');

const Main = styled.main`
	position: relative;
	z-index: 15;
`;

type Props = {
	children: ReactNode;
};

const Layout = (props: Props) => {
	const { children } = props;

	const {
		postCode,
		linkedInUrl,
		addressUrl,
		newBusinessEmail,
		streetAddress,
		instagramUrl,
		careersEmail,
		generalEnquiriesEmail,
		cookieCta,
		accentHexCodes
	} = siteSettings;

	const [menuIsActive, setMenuIsActive] = useState(false);
	const [accentHex, setAccentHex] = useState(accentHexCodes[0]);

	const lenis = useLenis(({ scroll }) => {});

	useEffect(() => {
		if (!lenis) return;

		if (menuIsActive) {
			lenis.stop();
		} else {
			lenis.start();
		}
	}, [menuIsActive]);

	useEffect(() => {
		document.documentElement.style.setProperty(
			'--colour-orange',
			accentHex
		);

		const interval = setInterval(() => {
			const currentIndex = accentHexCodes.indexOf(accentHex);
			const nextIndex =
				currentIndex + 1 === accentHexCodes.length
					? 0
					: currentIndex + 1;
			setAccentHex(accentHexCodes[nextIndex]);
		}, 5000);

		return () => clearInterval(interval);
	}, [accentHex]);

	return (
		<>
			<Header
				setMenuIsActive={setMenuIsActive}
				menuIsActive={menuIsActive}
			/>
			<MobileMenu
				isActive={menuIsActive}
				postcode={postCode}
				linkedInUrl={linkedInUrl}
				instagramUrl={instagramUrl}
				setMenuIsActive={setMenuIsActive}
			/>
			<ReactLenis root>
				<Main>{children}</Main>
			</ReactLenis>
			<Footer
				postcode={postCode}
				linkedInUrl={linkedInUrl}
				instagramUrl={instagramUrl}
				addressUrl={addressUrl}
				newBusinessEmail={newBusinessEmail}
				streetAddress={streetAddress}
				careersEmail={careersEmail}
				generalEnquiriesEmail={generalEnquiriesEmail}
			/>
			{cookieCta && (
				<CookieConsent
					location="bottom"
					buttonText="Accept"
					cookieName="ultra-cookie-consent"
					style={{
						background: 'rgba(0, 0, 0, 0.7)',
						backdropFilter: 'blur(10px)',
						maxWidth: '450px',
						margin: '0 16px 16px',
						borderRadius: '4px',
						color: '#FFF'
					}}
					buttonStyle={{
						color: 'var(--colour-black)',
						background: 'var(--colour-orange)',
						borderRadius: '4px',
						fontSize: '13px'
					}}
					expires={150}
				>
					{cookieCta}
				</CookieConsent>
			)}
		</>
	);
};

export default Layout;
