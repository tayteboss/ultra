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
import LoadMore from '../../components/blocks/LoadMore';
import pxToRem from '../../utils/pxToRem';
import { useState } from 'react';
import ArticleList from '../../components/blocks/ArticleList';
import HeroTitle from '../../components/blocks/HeroTitle';

const PageWrapper = styled(motion.div)`
	background: var(--colour-black);
	margin-bottom: ${pxToRem(120)};
	background: var(--colour-white);

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

	const paginationLength = 8;

	const [fetchedArticles, setfetchedArticles] = useState(articles);
	const [articleCount, setProjectCount] = useState(paginationLength);
	const [cantLoadMore, setCantLoadMore] = useState(
		articles.length >= paginationLength ? false : true
	);
	const [isLoading, setIsLoading] = useState(false);

	const handleLoadMore = async () => {
		setIsLoading(true);

		try {
			const data = await client.fetch<ArticleType[]>(
				`*[_type == 'article'] | order(date desc) [${articleCount}...${
					articleCount + paginationLength
				}] {
					...,
					'heroImage': heroImage.asset->url 
				}`
			);

			setfetchedArticles([...fetchedArticles, ...data]);
			setProjectCount(articleCount + paginationLength);

			if (data.length < paginationLength) {
				setCantLoadMore(true);
			}

			setIsLoading(false);
		} catch (error) {
			console.error('Error fetching site data:', error);
			setIsLoading(false);
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
				// REMOVE WHEN READY
				nofollow={true}
				noindex={true}
			/>
			<HeroTitle preCursor="Latest news" />
			<ArticleList data={fetchedArticles} />
			{!cantLoadMore && (
				<LoadMore
					isLoading={isLoading}
					handleClick={() => handleLoadMore()}
					useDark
				/>
			)}
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
