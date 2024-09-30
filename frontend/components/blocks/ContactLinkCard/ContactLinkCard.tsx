import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import formatHTML from '../../../utils/formatHTML';
import InstagramSvg from '../../svgs/InstagramSvg';
import LinkedInSvg from '../../svgs/LinkedInSvg';

const ContactLinkCardWrapper = styled.div`
	grid-column: span 4;
	display: flex;
	flex-direction: column;
	align-items: flex-start;

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

const Cta = styled.div`
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
	padding: ${pxToRem(6)} ${pxToRem(8)} ${pxToRem(4)};
	border-radius: ${pxToRem(4)};
	display: flex;
	gap: ${pxToRem(8)};
	align-items: center;
	justify-content: flex-start;
	line-height: 1;

	transition: all var(--transition-speed-default) var(--transition-ease);

	&:hover {
		background: var(--colour-orange);
		color: var(--colour-black);

		&.instagram {
			svg {
				path {
					stroke: var(--colour-black);
				}
			}
		}

		&.linkedin {
			svg {
				path {
					fill: var(--colour-black);
				}
			}
		}
	}

	&.instagram {
		svg {
			path {
				transition: all var(--transition-speed-default)
					var(--transition-ease);
			}
		}
	}

	&.linkedin {
		svg {
			path {
				transition: all var(--transition-speed-default)
					var(--transition-ease);
			}
		}
	}
`;

const NewsletterTrigger = styled.button`
	background: var(--colour-black);
	color: var(--colour-white);
	padding: ${pxToRem(4)} ${pxToRem(8)};
	border-radius: ${pxToRem(4)};

	transition: background var(--transition-speed-default)
		var(--transition-ease);

	&:hover {
		background: var(--colour-orange);
		color: var(--colour-black);
	}
`;

const ButtonWrapper = styled.div`
	display: flex;
	gap: ${pxToRem(16)};
`;

type Props = {
	cta: string;
	title: string;
	useSocialButtons?: boolean;
	instagramUrl?: string;
	linkedInUrl?: string;
	useNewsletterButton?: boolean;
	useMapsButton?: boolean;
	addressUrl?: string;
	setNewsletterIsOpen?: (value: boolean) => void;
};

const ContactLinkCard = (props: Props) => {
	const {
		cta,
		title,
		useSocialButtons,
		instagramUrl,
		linkedInUrl,
		useNewsletterButton,
		useMapsButton,
		addressUrl,
		setNewsletterIsOpen
	} = props;

	return (
		<>
			{cta && (
				<ContactLinkCardWrapper>
					{title && <Title>{title}</Title>}
					{cta && (
						<Cta
							dangerouslySetInnerHTML={{
								__html: formatHTML(cta)
							}}
						/>
					)}
					{useSocialButtons && (
						<ButtonWrapper>
							<Button
								href={instagramUrl}
								target="_blank"
								className="instagram"
							>
								<InstagramSvg />
								Instagram
							</Button>
							<Button
								href={linkedInUrl}
								target="_blank"
								className="linkedin"
							>
								<LinkedInSvg />
								LinkedIn
							</Button>
						</ButtonWrapper>
					)}
					{useNewsletterButton && (
						<NewsletterTrigger
							onClick={() =>
								setNewsletterIsOpen && setNewsletterIsOpen(true)
							}
							id="newsletter"
						>
							Sign up to newsletter
						</NewsletterTrigger>
					)}
					{useMapsButton && (
						<Button href={addressUrl} target="_blank">
							Google Maps
						</Button>
					)}
				</ContactLinkCardWrapper>
			)}
		</>
	);
};

export default ContactLinkCard;
