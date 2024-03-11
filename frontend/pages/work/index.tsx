import styled from 'styled-components';
import client from '../../client';
import { motion } from 'framer-motion';
import {
	ProjectType,
	TransitionsType,
	WorkPageType
} from '../../shared/types/types';
import { NextSeo } from 'next-seo';
import {
	projectQueryString,
	workPageQueryString
} from '../../lib/sanityQueries';
import ProjectsList from '../../components/blocks/ProjectsList';
import LoadMore from '../../components/blocks/LoadMore';
import pxToRem from '../../utils/pxToRem';

const PageWrapper = styled(motion.div)`
	background: var(--colour-black);
	padding-top: ${pxToRem(120)};
	margin-bottom: ${pxToRem(120)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(80)};
	}
`;

type Props = {
	data: WorkPageType;
	projects: ProjectType[];
	pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
	const { data, projects, pageTransitionVariants } = props;

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
			<ProjectsList data={projects} />
			{/* <LoadMore handleClick={() => handleLoadMore()} /> */}
		</PageWrapper>
	);
};

export async function getStaticProps() {
	const data = await client.fetch(workPageQueryString);
	const projects = await client.fetch(projectQueryString, { limit: 2 });

	return {
		props: {
			data,
			projects
		}
	};
}

export default Page;
