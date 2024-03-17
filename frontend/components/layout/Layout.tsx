import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import { ReactNode, useEffect, useState } from 'react';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import MobileMenu from '../blocks/MobileMenu';

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
		generalEnquiriesEmail
	} = siteSettings;

	const [menuIsActive, setMenuIsActive] = useState(false);

	const lenis = useLenis(({ scroll }) => {});

	useEffect(() => {
		if (!lenis) return;

		if (menuIsActive) {
			lenis.stop();
		} else {
			lenis.start();
		}
	}, [menuIsActive]);

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
		</>
	);
};

export default Layout;
