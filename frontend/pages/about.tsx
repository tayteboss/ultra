import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import { AboutPageType, TransitionsType } from '../shared/types/types';
import { motion } from 'framer-motion';
import client from '../client';
import { aboutPageQueryString } from '../lib/sanityQueries';
import HeroTitle from '../components/blocks/HeroTitle';
import AboutDescription from '../components/blocks/AboutDescription';
import Team from '../components/blocks/Team';
import TitleList from '../components/blocks/TitleList';
import LocationCTA from '../components/blocks/LocationCTA';

const PageWrapper = styled(motion.div)``;

type Props = {
	data: AboutPageType;
	pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
	const { data, pageTransitionVariants } = props;

	console.log('data', data);

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
			<HeroTitle />
			<AboutDescription />
			<Team />
			<TitleList />
			<TitleList />
			<LocationCTA />
		</PageWrapper>
	);
};

export async function getStaticProps() {
	const data = await client.fetch(aboutPageQueryString);

	return {
		props: {
			data
		}
	};
}

export default Page;
