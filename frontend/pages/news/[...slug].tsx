import styled from 'styled-components';
import client from '../../client';
import { ArticleType, TransitionsType } from '../../shared/types/types';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';
import ProjectHeroTitle from '../../components/blocks/ProjectHeroTitle';
import UltraPageBuilder from '../../components/common/UltraPageBuilder';
import pxToRem from '../../utils/pxToRem';
import LayoutWrapper from '../../components/common/LayoutWrapper';
import ArticleHeroImage from '../../components/blocks/ArticleHeroImage';
import Image from 'next/image';
import Link from 'next/link';

const PageWrapper = styled(motion.div)`
	margin-bottom: ${pxToRem(80)};
	min-height: 100vh;

	* {
		color: var(--colour-black) !important;
	}

	.content {
		* {
			text-align: left;
			max-width: 800px;
			margin: 0 auto;
		}
	}
`;

const RelatedWrapper = styled.div`
	padding-top: ${pxToRem(80)};

	&:hover {
		img {
			transform: scale(1.05);
		}
	}

	img {
		transition: all var(--transition-speed-extra-slow)
			var(--transition-ease);
	}
`;

const RelatedSubTitle = styled.h3`
	color: var(--colour-black);
	margin-bottom: ${pxToRem(8)};
	opacity: 0.5;
`;

const RelatedTitle = styled.h4`
	color: var(--colour-black);
	margin-bottom: ${pxToRem(32)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(24)};
	}
`;

const ImageWrapper = styled.div`
	width: 100%;
	height: 70vh;
	position: relative;
	overflow: hidden;
	border-radius: ${pxToRem(4)};

	img {
		object-fit: cover;
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

type Props = {
	data: ArticleType;
	pageTransitionVariants: TransitionsType;
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
			<ProjectHeroTitle title={data?.title} date={data?.date} useLight />
			<ArticleHeroImage heroImage={data?.heroImage} />
			<UltraPageBuilder data={data?.pageBuilder} />
			{hasRelatedArticle && (
				<RelatedWrapper>
					<LayoutWrapper>
						<Link
							href={`/news/${data?.relatedArticle?.slug?.current}`}
						>
							<RelatedSubTitle className="type-h4">
								Related Article
							</RelatedSubTitle>
							<RelatedTitle className="type-d1">
								{data?.relatedArticle?.title || ''}
							</RelatedTitle>
							{data.relatedArticle?.heroImage && (
								<ImageWrapper>
									<Image
										src={data.relatedArticle?.heroImage}
										alt=""
										fill
									/>
								</ImageWrapper>
							)}
						</Link>
					</LayoutWrapper>
				</RelatedWrapper>
			)}
		</PageWrapper>
	);
};

export async function getStaticPaths() {
	const articleListQuery = `
		*[_type == 'article'] [0...100] {
			slug
		}
	`;

	const allArticles = await client.fetch(articleListQuery);

	return {
		paths: allArticles.map((item: any) => {
			return `/news/${item?.slug?.current}`;
		}),
		fallback: true
	};
}

export async function getStaticProps({ params }: any) {
	const articleQuery = `
		*[_type == 'article' && slug.current == "${params.slug[0]}"][0] {
			...,
			'heroImage': heroImage.asset->url,
			pageBuilder[] {
				...,
				'leftImage': leftImage.asset->url,
				'rightImage': rightImage.asset->url,
				'leftVideo': leftVideo.asset->playbackId,
				'rightVideo': rightVideo.asset->playbackId,
				'image': image.asset->url,
				'video': video.asset->playbackId
			},
			relatedArticle-> {
				...,
				'heroImage': heroImage.asset->url,
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
