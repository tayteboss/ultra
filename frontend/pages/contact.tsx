import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import { ContactPageType, TransitionsType } from '../shared/types/types';
import { motion } from 'framer-motion';
import client from '../client';
import { contactPageQueryString } from '../lib/sanityQueries';
import HeroTitle from '../components/blocks/HeroTitle';
import ContactList from '../components/ContactList';

const PageWrapper = styled(motion.div)``;

type Props = {
	data: ContactPageType;
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
			<ContactList />
		</PageWrapper>
	);
};

export async function getStaticProps() {
	const data = await client.fetch(contactPageQueryString);

	return {
		props: {
			data
		}
	};
}

export default Page;
