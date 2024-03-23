import styled from 'styled-components';
import client from '../../client';
import { ProjectType, TransitionsType } from '../../shared/types/types';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';
import ProjectHeroTitle from '../../components/blocks/ProjectHeroTitle';
import ProjectHeroMedia from '../../components/blocks/ProjectHeroMedia';
import muxBlurHash from '@mux/blurhash';
import UltraPageBuilder from '../../components/common/UltraPageBuilder';
import pxToRem from '../../utils/pxToRem';
import ProjectsList from '../../components/blocks/ProjectsList';
import LayoutWrapper from '../../components/common/LayoutWrapper';

type Props = {
	data: ProjectType;
	blurHash: string | null;
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
	const { data, blurHash } = props;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const hasRelatedProjects = data?.relatedProjects?.length > 0;

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
			<ProjectHeroTitle title={data?.heroTitle} />
			<ProjectHeroMedia
				desktopVideo={data?.heroVideo}
				mobileVideo={data?.mobileHeroVideo}
				heroImage={data?.heroImage}
				mobileHeroImage={data?.mobileHeroImage}
				blurHashBase64={blurHash}
			/>
			<UltraPageBuilder data={data?.pageBuilder} />
			{hasRelatedProjects && (
				<RelatedWrapper>
					<LayoutWrapper>
						<RelatedTitle>Related Projects</RelatedTitle>
					</LayoutWrapper>
					<ProjectsList data={data?.relatedProjects} />
				</RelatedWrapper>
			)}
		</PageWrapper>
	);
};

export async function getStaticPaths() {
	const projectsListQuery = `
		*[_type == 'caseStudy'] [0...10] {
			slug
		}
	`;

	const allCaseStudies = await client.fetch(projectsListQuery);

	return {
		paths: allCaseStudies.map((item: any) => {
			return `/work/${item?.slug?.current}`;
		}),
		fallback: true
	};
}

export async function getStaticProps({ params }: any) {
	const projectQuery = `
		*[_type == 'project' && slug.current == "${params.slug[0]}"][0] {
			...,
			title,
			slug,
			seoDescription,
			client,
			heroTitle,
			mobileHeroImage {
				asset->{
					url
				}
			},
			heroImage {
				asset->{
					url
				}
			},
			heroVideo {
				asset->{playbackId}
			},
			mobileHeroVideo {
				asset->{playbackId}
			},
			pageBuilder[] {
				...,
				'leftImage': leftImage.asset->url,
				'rightImage': rightImage.asset->url,
				'leftVideo': leftVideo.asset->playbackId,
				'rightVideo': rightVideo.asset->playbackId,
				'image': image.asset->url,
				'video': video.asset->playbackId
			},
			relatedProjects[]-> {
				...,
				"thumbnailStrip": thumbnailStrip[] {
					alt,
					asset-> {
						url,
						playbackId
					}
				},
			}
		}
	`;

	const data = await client.fetch(projectQuery);

	let blurHash = '';

	// if (data?.heroVideo?.asset?.playbackId) {
	// 	const { blurHashBase64 } = await muxBlurHash(
	// 		data.heroVideo?.asset?.playbackId
	// 	);
	// 	blurHash = blurHashBase64;
	// }

	return {
		props: {
			data,
			blurHash
		}
	};
}

export default Page;
