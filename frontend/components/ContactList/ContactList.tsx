import styled from 'styled-components';
import LayoutWrapper from '../common/LayoutWrapper';
import LayoutGrid from '../common/LayoutGrid';
import ContactCard from '../blocks/ContactCard';
import pxToRem from '../../utils/pxToRem';
import ContactLinkCard from '../blocks/ContactLinkCard';

type Props = {
	contactButtonTitle: string;
	contactCta: string;
	generalEnquiriesButtontitle: string;
	generalEnquiriesCta: string;
	newBusinessButtonTitle: string;
	newBusinessCta: string;
	newBusinessEmail: string;
	careersEmail: string;
	generalEnquiriesEmail: string;
	findUsCta: string;
	streetAddress: string;
	addressUrl: string;
	followUsCta: string;
	instagramUrl: string;
	linkedInUrl: string;
	newsletterCta: string;
	setNewsletterIsOpen?: (value: boolean) => void;
};

const ContactListWrapper = styled.section`
	padding-top: ${pxToRem(120)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding-top: ${pxToRem(62)};
	}

	.layout-grid {
		row-gap: ${pxToRem(80)};

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			row-gap: 0;
		}
	}
`;

const ContactList = (props: Props) => {
	const {
		contactButtonTitle,
		contactCta,
		generalEnquiriesButtontitle,
		generalEnquiriesCta,
		newBusinessButtonTitle,
		newBusinessCta,
		newBusinessEmail,
		careersEmail,
		generalEnquiriesEmail,
		findUsCta,
		streetAddress,
		addressUrl,
		followUsCta,
		instagramUrl,
		linkedInUrl,
		newsletterCta,
		setNewsletterIsOpen
	} = props;

	return (
		<ContactListWrapper>
			<LayoutWrapper>
				<LayoutGrid>
					<ContactCard
						cta={newBusinessCta}
						buttonTitle={newBusinessButtonTitle}
						email={newBusinessEmail}
						title="New Business"
					/>
					<ContactCard
						cta={generalEnquiriesCta}
						buttonTitle={generalEnquiriesButtontitle}
						email={generalEnquiriesEmail}
						title="General Enquiries"
					/>
					<ContactCard
						cta={contactCta}
						buttonTitle={contactButtonTitle}
						email={careersEmail}
						title="Careers"
					/>
					<ContactLinkCard
						cta={followUsCta}
						useSocialButtons={true}
						instagramUrl={instagramUrl}
						linkedInUrl={linkedInUrl}
						title="Follow us"
					/>
					<ContactLinkCard
						cta={findUsCta}
						useMapsButton={true}
						addressUrl={addressUrl}
						title="Find us"
					/>
					<ContactLinkCard
						cta={newsletterCta}
						useNewsletterButton={true}
						setNewsletterIsOpen={setNewsletterIsOpen}
						title="Newsletter"
					/>
				</LayoutGrid>
			</LayoutWrapper>
		</ContactListWrapper>
	);
};

export default ContactList;
