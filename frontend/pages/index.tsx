import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import {
	HomePageType,
	SiteSettingsType,
	TransitionsType
} from '../shared/types/types';
import { motion } from 'framer-motion';
import client from '../client';
import {
	homePageQueryString,
	projectQueryString,
	siteSettingsQueryString
} from '../lib/sanityQueries';
import HomeProjectsList from '../components/blocks/HomeProjectsList';

const PageWrapper = styled(motion.div)`
	background: grey;
	height: 200vh;
`;

type Props = {
	data: HomePageType;
	siteSettings: SiteSettingsType;
	pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
	const { data, siteSettings, pageTransitionVariants } = props;

	console.log('data', data);
	console.log('siteSettings', siteSettings);

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
			<HomeProjectsList />
		</PageWrapper>
	);
};

export async function getStaticProps() {
	const siteSettings = await client.fetch(siteSettingsQueryString);
	const data = await client.fetch(homePageQueryString);
	// const projects = await client.fetch(projectQueryString);

	return {
		props: {
			data,
			siteSettings
		}
	};
}

export default Page;
