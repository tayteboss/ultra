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
import { useState } from 'react';

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

	const [fetchedProjects, setfetchedProjects] = useState(projects);
	const [projectCount, setProjectCount] = useState(8);
	const [cantLoadMore, setCantLoadMore] = useState(
		projects.length > 8 ? false : true
	);
	const [isLoading, setIsLoading] = useState(false);

	const handleLoadMore = async () => {
		setIsLoading(true);

		const query = `
			*[_type == 'project' && !inactive] | order(orderRank) [${projectCount}...${
			projectCount + 8
		}] {
				...,
				"thumbnailStrip": thumbnailStrip[] {
					alt,
					asset-> {
						url,
						playbackId
					}
				},
			}
		`;

		try {
			const data = await client.fetch(query);

			setfetchedProjects([...fetchedProjects, ...data]);
			setProjectCount(projectCount + 2);

			if (data?.length < 4) {
				setCantLoadMore(true);
			}

			setIsLoading(false);
		} catch (error) {
			console.error('Error fetching site data:', error);
			setIsLoading(false);
			return [];
		}
	};

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
			<ProjectsList data={fetchedProjects} />
			{/* {!cantLoadMore && (
				<LoadMore
					isLoading={isLoading}
					handleClick={() => handleLoadMore()}
				/>
			)} */}
		</PageWrapper>
	);
};

export async function getStaticProps() {
	const data = await client.fetch(workPageQueryString);
	const projects = await client.fetch(projectQueryString);

	return {
		props: {
			data,
			projects
		}
	};
}

export default Page;
