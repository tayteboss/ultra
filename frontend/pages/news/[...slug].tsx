import styled from 'styled-components';
import client from '../../client';
import { ArticleType, TransitionsType } from '../../shared/types/types';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';
import ProjectHeroTitle from '../../components/blocks/ProjectHeroTitle';
import ProjectHeroMedia from '../../components/blocks/ProjectHeroMedia';
import UltraPageBuilder from '../../components/common/UltraPageBuilder';
import pxToRem from '../../utils/pxToRem';
import LayoutWrapper from '../../components/common/LayoutWrapper';

type Props = {
	data: ArticleType;
	pageTransitionVariants: TransitionsType;
};

const PageWrapper = styled(motion.div)`
	margin-bottom: ${pxToRem(80)};
	min-height: 100vh;
`;

const RelatedWrapper = styled.div`
	padding-top: ${pxToRem(80)};
`;

const RelatedTitle = styled.h3`
	color: var(--colour-off-white);
	margin-bottom: ${pxToRem(40)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(32)};
	}
`;

const workPageVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.5,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: 'easeInOut'
		}
	}
};

const Page = (props: Props) => {
	const { data } = props;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const hasRelatedArticle = data?.relatedArticle;

	return (
		<PageWrapper
			variants={workPageVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<NextSeo
				title={data?.title || 'Ultra'}
				description={data?.seoDescription || ''}
			/>
			<ProjectHeroTitle title={data?.title} />
			<ProjectHeroMedia heroImage={data?.heroImage} />
			<UltraPageBuilder data={data?.pageBuilder} />
			{hasRelatedArticle && (
				<RelatedWrapper>
					<LayoutWrapper>
						<RelatedTitle>Related Article</RelatedTitle>
					</LayoutWrapper>
				</RelatedWrapper>
			)}
		</PageWrapper>
	);
};

export async function getStaticPaths() {
	const projectsListQuery = `
		*[_type == 'article'] [0...10] {
			slug
		}
	`;

	const allCaseStudies = await client.fetch(projectsListQuery);

	return {
		paths: allCaseStudies.map((item: any) => {
			return `/news/${item?.slug?.current}`;
		}),
		fallback: true
	};
}

export async function getStaticProps({ params }: any) {
	const articleQuery = `
		*[_type == 'article' && slug.current == "${params.slug[0]}"][0] {
			...,
			heroImage: heroImage.asset->url,
			pageBuilder[] {
				...,
				'leftImage': leftImage.asset->url,
				'rightImage': rightImage.asset->url,
				'leftVideo': leftVideo.asset->playbackId,
				'rightVideo': rightVideo.asset->playbackId,
				'image': image.asset->url,
				'video': video.asset->playbackId
			},
			relatedArticle[]-> {
				...,
				heroImage: heroImage.asset->url
			}
		}
	`;

	const data = await client.fetch(articleQuery);

	return {
		props: {
			data
		}
	};
}

export default Page;
