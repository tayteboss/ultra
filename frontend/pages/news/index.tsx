import styled from 'styled-components';
import client from '../../client';
import { motion } from 'framer-motion';
import {
	ArticleType,
	TransitionsType,
	WorkPageType
} from '../../shared/types/types';
import { NextSeo } from 'next-seo';
import {
	articleQueryString,
	workPageQueryString
} from '../../lib/sanityQueries';
import ProjectsList from '../../components/blocks/ProjectsList';
import LoadMore from '../../components/blocks/LoadMore';
import pxToRem from '../../utils/pxToRem';
import { useState } from 'react';
import ArticleList from '../../components/blocks/ArticleList';

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
	articles: ArticleType[];
	pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
	const { data, articles, pageTransitionVariants } = props;

	const [fetchedArticles, setfetchedArticles] = useState(articles);
	const [articleCount, setProjectCount] = useState(8);
	const [cantLoadMore, setCantLoadMore] = useState(
		articles.length > 8 ? false : true
	);
	const [isLoading, setIsLoading] = useState(false);

	const handleLoadMore = async () => {
		setIsLoading(true);

		const query = `
			*[_type == 'article' && !inactive] | order(orderRank) [${articleCount}...${
			articleCount + 8
		}] {
				...,
				heroImage: heroImage.asset->url
			}
		`;

		try {
			const data = await client.fetch(query);

			setfetchedArticles([...fetchedArticles, ...data]);
			setProjectCount(articleCount + 2);

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
			<ArticleList data={fetchedArticles} />
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
	const articles = await client.fetch(articleQueryString);

	return {
		props: {
			data,
			articles
		}
	};
}

export default Page;
