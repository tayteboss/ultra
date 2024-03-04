import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import { ReactNode } from 'react';

const siteSettings = require('../../json/siteSettings.json');

const Main = styled.main``;

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

	return (
		<>
			<Header />
			<Main>{children}</Main>
			<Footer />
		</>
	);
};

export default Layout;
