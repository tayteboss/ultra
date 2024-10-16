import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import LayoutWrapper from '../components/common/LayoutWrapper';
import pxToRem from '../utils/pxToRem';

const PageWrapper = styled.div`
	background: var(--colour-black);
`;

const Inner = styled.div`
	padding: ${pxToRem(180)} 0 ${pxToRem(240)};
`;

const Title = styled.h2`
	color: var(--colour-off-white);
`;

const Page = () => {
	return (
		<PageWrapper>
			<NextSeo title="404 | Sorry we couldn't find that page" />
			<LayoutWrapper>
				<Inner>
					<Title>Sorry, we couldn't find that page</Title>
				</Inner>
			</LayoutWrapper>
		</PageWrapper>
	);
};

export default Page;
