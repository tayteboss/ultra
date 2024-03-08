import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import {
	HomePageType,
	ProjectType,
	SiteSettingsType,
	TransitionsType
} from '../shared/types/types';
import { motion } from 'framer-motion';
import client from '../client';
import {
	homePageQueryString,
	siteSettingsQueryString
} from '../lib/sanityQueries';
import HomeProjectsList from '../components/blocks/HomeProjectsList';
import muxBlurHash from '@mux/blurhash';
import pxToRem from '../utils/pxToRem';

const PageWrapper = styled(motion.div)`
	margin-bottom: ${pxToRem(80)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(16)};
	}
`;

type Props = {
	data: HomePageType;
	siteSettings: SiteSettingsType;
	pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
	const { data, siteSettings, pageTransitionVariants } = props;

	// console.log('data', data);
	// console.log('siteSettings', siteSettings);

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
			<HomeProjectsList data={data?.projects} />
		</PageWrapper>
	);
};

export async function getStaticProps() {
	const siteSettings = await client.fetch(siteSettingsQueryString);
	let data = await client.fetch(homePageQueryString);

	data.projects = await Promise.all(
		data.projects.map(async (project: ProjectType) => {
			if (project.heroVideo) {
				const { blurHashBase64 } = await muxBlurHash(project.heroVideo);
				project.desktopBlurHashBase64 = blurHashBase64;
			}
			if (project.mobileHeroVideo) {
				const { blurHashBase64 } = await muxBlurHash(
					project.mobileHeroVideo
				);
				project.mobileBlurHashBase64 = blurHashBase64;
			}
			return project;
		})
	);

	return {
		props: {
			data,
			siteSettings
		}
	};
}

export default Page;
