import styled from 'styled-components';
import client from '../../client';
import { motion } from 'framer-motion';
import { TransitionsType, WorkPageType } from '../../shared/types/types';
import { NextSeo } from 'next-seo';
import {
	projectQueryString,
	workPageQueryString
} from '../../lib/sanityQueries';

const PageWrapper = styled(motion.div)`
	background: var(--colour-white);
`;

type Props = {
	data: WorkPageType;
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
	const data = await client.fetch(workPageQueryString);
	const projects = await client.fetch(projectQueryString);

	return {
		props: {
			data
		}
	};
}

export default Page;
