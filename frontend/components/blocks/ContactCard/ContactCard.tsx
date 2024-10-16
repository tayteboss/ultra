import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import formatHTML from '../../../utils/formatHTML';

type Props = {
	cta: string;
	buttonTitle: string;
	email: string;
	title: string;
};

const ContactCardWrapper = styled.div`
	grid-column: span 4;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;

		&:not(:last-child) {
			margin-bottom: ${pxToRem(62)};
		}
	}
`;

const Title = styled.h4`
	margin-bottom: ${pxToRem(16)};
`;

const Cta = styled.h5`
	* {
		color: var(--colour-off-black);
		margin-bottom: ${pxToRem(40)};
		font-size: ${pxToRem(25)};
		line-height: 1.3;
		font-weight: 500;

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(20)};
			line-height: ${pxToRem(26)};
			margin-bottom: ${pxToRem(24)};
		}
	}
`;

const Button = styled.a`
	background: var(--colour-black);
	color: var(--colour-white);
	padding: ${pxToRem(4)} ${pxToRem(8)};
	border-radius: ${pxToRem(4)};

	transition: all var(--transition-speed-default) var(--transition-ease);

	&:hover {
		background: var(--colour-orange);
		color: var(--colour-black);
	}
`;

const ContactCard = (props: Props) => {
	const { cta, buttonTitle, email, title } = props;

	return (
		<>
			{cta && (
				<ContactCardWrapper>
					{title && <Title>{title}</Title>}
					<Cta
						dangerouslySetInnerHTML={{
							__html: formatHTML(cta)
						}}
					/>
					{email && buttonTitle && (
						<Button href={`mailto:${email}`}>{buttonTitle}</Button>
					)}
				</ContactCardWrapper>
			)}
		</>
	);
};

export default ContactCard;
