import styled from 'styled-components';
import LayoutWrapper from '../common/LayoutWrapper';
import LayoutGrid from '../common/LayoutGrid';
import ContactCard from '../blocks/ContactCard';
import pxToRem from '../../utils/pxToRem';

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
};

const ContactListWrapper = styled.section`
	padding-top: ${pxToRem(120)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding-top: ${pxToRem(62)};
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
		generalEnquiriesEmail
	} = props;

	console.log('generalEnquiriesButtontitle', generalEnquiriesButtontitle);

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
				</LayoutGrid>
			</LayoutWrapper>
		</ContactListWrapper>
	);
};

export default ContactList;
