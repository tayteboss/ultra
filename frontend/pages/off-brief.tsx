import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import { OffBriefPageType, TransitionsType } from '../shared/types/types';
import { motion } from 'framer-motion';
import client from '../client';
import { offBriefPageQueryString } from '../lib/sanityQueries';

const PageWrapper = styled(motion.div)``;

type Props = {
	data: OffBriefPageType;
	pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
	const { data, pageTransitionVariants } = props;

	console.log('data', data);

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
