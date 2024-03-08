import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type CardProps = {
	title: string;
	email: string;
};

type Props = {
	newBusinessEmail: string;
	generalEnquiriesEmail: string;
	careersEmail: string;
};

const FooterContactBlockWrapper = styled.div`
	display: flex;
	justify-content: center;
	gap: ${pxToRem(80)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		gap: ${pxToRem(30)};
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const CardWrapper = styled.a`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	opacity: 0.75;

	transition: all var(--transition-speed-default) var(--transition-ease);

	&:hover {
		opacity: 1;

		.card-wrapper-email {
			transform: translateY(0);
			opacity: 1;
		}
	}
`;

const Email = styled.p`
	color: var(--footer-contact-fg);
	margin-bottom: ${pxToRem(4)};
	transform: translateY(3px);
	opacity: 0;

	transition: all var(--transition-speed-default) var(--transition-ease);
`;

const Title = styled.h2`
	color: var(--footer-contact-fg);

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		font-size: ${pxToRem(36)};
	}
`;

const FooterContactCard = (props: CardProps) => {
	const { title, email } = props;

	return (
		<CardWrapper href={`mailto:${email}`}>
			<Email className="card-wrapper-email">{email}</Email>
			<Title>{title}</Title>
		</CardWrapper>
	);
};

const FooterContactBlock = (props: Props) => {
	const { newBusinessEmail, generalEnquiriesEmail, careersEmail } = props;

	return (
		<FooterContactBlockWrapper>
			<FooterContactCard title="New business" email={newBusinessEmail} />
			<FooterContactCard
				title="General enquiries"
				email={generalEnquiriesEmail}
			/>
			<FooterContactCard title="Join our team" email={careersEmail} />
		</FooterContactBlockWrapper>
	);
};

export default FooterContactBlock;
