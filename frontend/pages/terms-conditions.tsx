import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import { SiteSettingsType, TransitionsType } from '../shared/types/types';
import { motion } from 'framer-motion';
import client from '../client';
import { siteSettingsQueryString } from '../lib/sanityQueries';
import pxToRem from '../utils/pxToRem';
import LayoutWrapper from '../components/common/LayoutWrapper';
import LayoutGrid from '../components/common/LayoutGrid';
import RichText from '../components/blocks/RichText';

const PageWrapper = styled(motion.div)`
	padding-top: ${pxToRem(180)};
	margin-bottom: ${pxToRem(180)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding-top: ${pxToRem(120)};
	}
`;

const Inner = styled.div`
	grid-column: 4 / -4;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 2 / -2;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}
`;

type Props = {
	siteSettings: SiteSettingsType;
	pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
	const { siteSettings, pageTransitionVariants } = props;

	return (
		<PageWrapper
			variants={pageTransitionVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<NextSeo title={'Ultra - Terms & Conditions'} />
			<LayoutWrapper>
				<LayoutGrid>
					<Inner>
						<RichText
							data={siteSettings?.termsAndConditionsContent}
						/>
					</Inner>
				</LayoutGrid>
			</LayoutWrapper>
		</PageWrapper>
	);
};

export async function getStaticProps() {
	const siteSettings = await client.fetch(siteSettingsQueryString);

	return {
		props: {
			siteSettings
		}
	};
}

export default Page;
