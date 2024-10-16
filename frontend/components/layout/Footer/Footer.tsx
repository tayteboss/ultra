import styled from 'styled-components';
import FooterContactBlock from '../../blocks/FooterContactBlock';
import pxToRem from '../../../utils/pxToRem';
import LayoutWrapper from '../../common/LayoutWrapper';
import LogoSvg from '../../svgs/LogoSvg';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Props = {
	postcode: string;
	linkedInUrl: string;
	instagramUrl: string;
	addressUrl: string;
	newBusinessEmail: string;
	streetAddress: string;
	careersEmail: string;
	generalEnquiriesEmail: string;
};

const FooterWrapper = styled.footer`
	display: flex;
	flex-direction: column;
	gap: ${pxToRem(80)};
	position: relative;
	z-index: 10;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		background: var(--footer-fg);
		padding-top: ${pxToRem(64)};
	}
`;

const Outer = styled.div`
	width: 100%;
	margin-bottom: ${pxToRem(16)};
`;

const Inner = styled.div`
	background: var(--footer-bg);
	border-radius: ${pxToRem(4)};
	padding: ${pxToRem(16)};
	display: flex;
	flex-direction: column;
	gap: ${pxToRem(315)};

	transition: background var(--transition-speed-slow) var(--transition-ease);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		gap: ${pxToRem(240)};
		min-height: calc(100svh - 64px);
		justify-content: space-between;
	}

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		gap: ${pxToRem(160)};
	}
`;

const TopWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const LHS = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const SocialLink = styled.a`
	color: var(--footer-fg);

	transition: all var(--transition-speed-default) var(--transition-ease);

	&:hover {
		color: var(--footer-hover);
	}
`;

const MobileNewsletterLink = styled.a`
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: block;
		padding-top: ${pxToRem(24)};

		color: var(--footer-fg);

		transition: all var(--transition-speed-default) var(--transition-ease);

		&:hover {
			color: var(--footer-hover);
		}
	}
`;

const RHS = styled.div`
	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const AddressWrapper = styled.a`
	transition: all var(--transition-speed-default) var(--transition-ease);

	&:hover {
		* {
			color: var(--footer-hover);
		}
	}
`;

const Address = styled.div`
	color: var(--footer-fg);
	text-align: right;

	transition: all var(--transition-speed-default) var(--transition-ease);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		text-align: left;
	}
`;

const Postcode = styled.div`
	color: var(--footer-fg);
	text-align: right;

	transition: all var(--transition-speed-default) var(--transition-ease);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		text-align: left;
	}
`;

const Time = styled.div`
	color: var(--footer-fg);
	text-align: right;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		text-align: left;
		font-size: ${pxToRem(38)};
		line-height: normal;
	}

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		font-size: ${pxToRem(28)};
		line-height: ${pxToRem(28)};
	}
`;

const BottomWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		gap: ${pxToRem(8)};
	}

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		align-items: center;
	}
`;

const LogoWrapper = styled.div`
	svg {
		width: 40vw;
		height: auto;

		@media ${(props) => props.theme.mediaBreakpoints.mobile} {
			width: 100%;
		}
	}
`;

const Copyright = styled.p`
	text-align: right;
	color: var(--footer-bg);

	transition: color var(--transition-speed-slow) var(--transition-ease);

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		font-size: ${pxToRem(12)} !important;
	}
`;

const DesktopAddressDetails = styled.div`
	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const MobileAddressDetails = styled.div`
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: block;
		margin-top: ${pxToRem(24)};
	}
`;

const MobileContactDetails = styled.div`
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-bottom: ${pxToRem(24)};
	}
`;

const ContactLink = styled.a`
	color: var(--footer-fg);
`;

const Title = styled.h4`
	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const LinkTag = styled.div`
	color: var(--footer-fg);

	transition: all var(--transition-speed-default) var(--transition-ease);

	&:hover {
		color: var(--footer-hover);
	}
`;

const TermsFooter = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-top: ${pxToRem(24)};
`;

const TermsRHS = styled.div`
	display: flex;
	gap: ${pxToRem(16)};
`;

const TermsLHS = styled.div`
	display: flex;
	gap: ${pxToRem(16)};
`;

const SmallLinkTag = styled.div`
	color: var(--footer-bg);

	transition: color var(--transition-speed-slow) var(--transition-ease);

	&:hover {
		text-decoration: underline;
	}

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		font-size: ${pxToRem(12)} !important;
	}
`;

const Footer = (props: Props) => {
	const {
		postcode,
		linkedInUrl,
		instagramUrl,
		addressUrl,
		newBusinessEmail,
		streetAddress,
		careersEmail,
		generalEnquiriesEmail
	} = props;

	const [time, setTime] = useState('00:00:00');

	useEffect(() => {
		let rightNow = new Date();
		const londonTime = rightNow.toLocaleString('en-GB', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
			timeZone: 'Europe/London'
		});
		setTime(londonTime);

		const interval = setInterval(() => {
			let rightNow = new Date();
			const londonTime = rightNow.toLocaleString('en-GB', {
				hour: '2-digit',
				minute: '2-digit',
				hour12: false,
				timeZone: 'Europe/London'
			});
			setTime(londonTime);
		}, 10000);

		return () => clearInterval(interval);
	}, []);

	return (
		<FooterWrapper>
			<FooterContactBlock
				newBusinessEmail={newBusinessEmail}
				generalEnquiriesEmail={generalEnquiriesEmail}
				careersEmail={careersEmail}
			/>
			<Outer>
				<LayoutWrapper>
					<Inner>
						<TopWrapper>
							<LHS>
								<MobileContactDetails>
									{generalEnquiriesEmail && (
										<ContactLink
											className="type-h3"
											href={`mailto:${generalEnquiriesEmail}`}
										>
											Talk to us
										</ContactLink>
									)}
									{newBusinessEmail && (
										<ContactLink
											className="type-h3"
											href={`mailto:${newBusinessEmail}`}
										>
											Work with us
										</ContactLink>
									)}
									{careersEmail && (
										<ContactLink
											className="type-h3"
											href={`mailto:${careersEmail}`}
										>
											Join us
										</ContactLink>
									)}
								</MobileContactDetails>
								<Title className="type-h2">Follow us</Title>
								{instagramUrl && (
									<SocialLink
										href={instagramUrl}
										target="_blank"
										className="type-h3"
									>
										Instagram
									</SocialLink>
								)}
								{linkedInUrl && (
									<SocialLink
										href={linkedInUrl}
										target="_blank"
										className="type-h3"
									>
										LinkedIn
									</SocialLink>
								)}
								{/* <MobileNewsletterLink
									href="/contact#newsletter"
									className="type-h3"
								>
									Newsletter
								</MobileNewsletterLink> */}
								<MobileAddressDetails>
									{addressUrl && (
										<AddressWrapper
											href={addressUrl}
											target="_blank"
										>
											{streetAddress && (
												<Address className="type-h3">
													{streetAddress}
												</Address>
											)}
											{postcode && (
												<Postcode className="type-h3">
													{postcode}
												</Postcode>
											)}
										</AddressWrapper>
									)}
									{time && (
										<Time className="type-h3">{time}</Time>
									)}
								</MobileAddressDetails>
							</LHS>
							<DesktopAddressDetails>
								<Title className="type-h2 right-align">
									Visit us
								</Title>
								{addressUrl && (
									<AddressWrapper
										href={addressUrl}
										target="_blank"
									>
										{streetAddress && (
											<Address className="type-h3">
												{streetAddress}
											</Address>
										)}
										{postcode && (
											<Postcode className="type-h3">
												{postcode}
											</Postcode>
										)}
									</AddressWrapper>
								)}
								{time && (
									<Time className="type-h3">{time}</Time>
								)}
							</DesktopAddressDetails>
						</TopWrapper>
						<BottomWrapper>
							<LHS>
								<LogoWrapper>
									<LogoSvg color="var(--footer-fg)" />
								</LogoWrapper>
							</LHS>
							<RHS>
								{/* <Title className="type-h2 right-align">
									Subscribe to
								</Title>
								<Link href="/contact#newsletter">
									<LinkTag className="type-h3 right-align">
										Newsletter
									</LinkTag>
								</Link> */}
							</RHS>
						</BottomWrapper>
					</Inner>
					<TermsFooter>
						<TermsLHS>
							<Link href="/terms-conditions">
								<SmallLinkTag className="type-p">
									Terms & Conditions
								</SmallLinkTag>
							</Link>
							<Link href="/privacy-policy">
								<SmallLinkTag className="type-p">
									Privacy Policy
								</SmallLinkTag>
							</Link>
						</TermsLHS>
						<TermsRHS>
							<Copyright>
								© {new Date().getFullYear()} Ultra Brand Studio
							</Copyright>
						</TermsRHS>
					</TermsFooter>
				</LayoutWrapper>
			</Outer>
		</FooterWrapper>
	);
};

export default Footer;
