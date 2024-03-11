import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import {
	AboutPageType,
	SiteSettingsType,
	TransitionsType
} from '../shared/types/types';
import { motion } from 'framer-motion';
import client from '../client';
import {
	aboutPageQueryString,
	siteSettingsQueryString
} from '../lib/sanityQueries';
import HeroTitle from '../components/blocks/HeroTitle';
import AboutDescription from '../components/blocks/AboutDescription';
import Team from '../components/blocks/Team';
import TitleList from '../components/blocks/TitleList';
import LocationCTA from '../components/blocks/LocationCTA';
import pxToRem from '../utils/pxToRem';

const PageWrapper = styled(motion.div)`
	margin-bottom: ${pxToRem(80)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(24)};
	}
`;

type Props = {
	data: AboutPageType;
	siteSettings: SiteSettingsType;
	pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
	const { data, siteSettings, pageTransitionVariants } = props;

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
				suffix={data?.suffixHeroTitle}
				gallery={data?.clientsLogos}
			/>
			<AboutDescription data={data?.description} />
			<Team
				roles={data?.teamRoles}
				prefix={data?.teamRolesPrefix}
				cursors={data?.teamCursors}
			/>
			<TitleList title="Services" items={data?.servicesList} />
			<TitleList title="Client List" items={data?.clientList} useLink />
			<LocationCTA
				title={data?.locationCta}
				url={siteSettings?.addressUrl}
			/>
		</PageWrapper>
	);
};

export async function getStaticProps() {
	const data = await client.fetch(aboutPageQueryString);
	const siteSettings = await client.fetch(siteSettingsQueryString);

	return {
		props: {
			data,
			siteSettings
		}
	};
}

export default Page;
