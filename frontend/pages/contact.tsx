import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import {
	ContactPageType,
	SiteSettingsType,
	TransitionsType
} from '../shared/types/types';
import { motion } from 'framer-motion';
import client from '../client';
import {
	contactPageQueryString,
	siteSettingsQueryString
} from '../lib/sanityQueries';
import HeroTitle from '../components/blocks/HeroTitle';
import ContactList from '../components/ContactList';
import muxBlurHash from '@mux/blurhash';
import pxToRem from '../utils/pxToRem';

const PageWrapper = styled(motion.div)`
	margin-bottom: ${pxToRem(140)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(80)};
	}
`;

type Props = {
	data: ContactPageType;
	blurHashBase64: string;
	pageTransitionVariants: TransitionsType;
	siteSettings: SiteSettingsType;
};

const Page = (props: Props) => {
	const { data, blurHashBase64, pageTransitionVariants, siteSettings } =
		props;

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
			<HeroTitle
				preCursor={data?.prefixHeroTitle}
				media={data?.showreelVideo}
				mediaPoster={blurHashBase64}
				suffix={data?.suffixHeroTitle}
			/>
			<ContactList
				contactButtonTitle={data?.contactButtonTitle}
				contactCta={data?.contactCta}
				generalEnquiriesButtontitle={data?.generalEnquiriesButtonTitle}
				generalEnquiriesCta={data?.generalEnquiriesCta}
				newBusinessButtonTitle={data?.newBusinessButtonTitle}
				newBusinessCta={data?.newBusinessCta}
				newBusinessEmail={siteSettings.newBusinessEmail}
				careersEmail={siteSettings.careersEmail}
				generalEnquiriesEmail={siteSettings.generalEnquiriesEmail}
			/>
		</PageWrapper>
	);
};

export async function getStaticProps() {
	const data = await client.fetch(contactPageQueryString);
	const siteSettings = await client.fetch(siteSettingsQueryString);

	const { blurHashBase64 } = await muxBlurHash(data.showreelVideo);

	return {
		props: {
			data,
			blurHashBase64,
			siteSettings
		}
	};
}

export default Page;
