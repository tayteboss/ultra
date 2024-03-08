import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import { OffBriefPageType, TransitionsType } from '../shared/types/types';
import { motion } from 'framer-motion';
import client from '../client';
import { offBriefPageQueryString } from '../lib/sanityQueries';
import HeroTitle from '../components/blocks/HeroTitle';
import OffBriefContent from '../components/blocks/OffBriefContent';
import pxToRem from '../utils/pxToRem';
import OffBriefGallery from '../components/blocks/OffBriefGallery';

const PageWrapper = styled(motion.div)`
	margin-bottom: ${pxToRem(80)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(16)};
	}
`;

type Props = {
	data: OffBriefPageType;
	pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
	const { data, pageTransitionVariants } = props;

	return (
		<PageWrapper
			variants={pageTransitionVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<NextSeo
				title={data?.seoTitle || 'Ultra'}
				description={data?.seoDescription || ''}
			/>
			<HeroTitle preCursor={data?.heroTitle} />
			<OffBriefContent data={data?.content} />
			<OffBriefGallery data={data?.gallery} />
		</PageWrapper>
	);
};

export async function getStaticProps() {
	const data = await client.fetch(offBriefPageQueryString);

	return {
		props: {
			data
		}
	};
}

export default Page;
