import styled from 'styled-components';
import client from '../../client';
import { ProjectType, TransitionsType } from '../../shared/types/types';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';
import HeroTitle from '../../components/blocks/HeroTitle';
import ProjectHeroTitle from '../../components/blocks/ProjectHeroTitle';
import ProjectHeroMedia from '../../components/blocks/ProjectHeroMedia';
import muxBlurHash from '@mux/blurhash';

type Props = {
	data: ProjectType;
	blurHashBase64: string;
	pageTransitionVariants: TransitionsType;
};

const PageWrapper = styled(motion.div)``;

const Page = (props: Props) => {
	const { data, blurHashBase64, pageTransitionVariants } = props;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	console.log('data', data);

	return (
		<PageWrapper
			variants={pageTransitionVariants}
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
				blurHashBase64={blurHashBase64}
			/>
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
			'heroVideo': heroVideo.asset->playbackId,
			'mobileHeroVideo': mobileHeroVideo.asset->playbackId,
			'heroImage': heroImage.asset->url,
			'mobileHeroImage': mobileHeroImage.asset->url,
			relatedProjects[]->{
				...,
				'heroVideo': heroVideo.asset->playbackId,
			},
		}
	`;

	const data = await client.fetch(projectQuery);

	const { blurHashBase64 } = await muxBlurHash(data.heroVideo);

	return {
		props: {
			data,
			blurHashBase64
		}
	};
}

export default Page;
