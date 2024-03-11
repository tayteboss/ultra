import styled from 'styled-components';
import FooterContactBlock from '../../blocks/FooterContactBlock';
import pxToRem from '../../../utils/pxToRem';
import LayoutWrapper from '../../common/LayoutWrapper';
import LogoSvg from '../../svgs/LogoSvg';
import { useEffect, useState } from 'react';

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

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		gap: ${pxToRem(240)};
		height: calc(100svh - 64px);
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

const RHS = styled.div``;

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
	color: var(--footer-fg);
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
											General enquiries
										</ContactLink>
									)}
									{newBusinessEmail && (
										<ContactLink
											className="type-h3"
											href={`mailto:${newBusinessEmail}`}
										>
											New business
										</ContactLink>
									)}
									{careersEmail && (
										<ContactLink
											className="type-h3"
											href={`mailto:${careersEmail}`}
										>
											Join our team
										</ContactLink>
									)}
								</MobileContactDetails>
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
								<Copyright>
									© {new Date().getFullYear()} Ultra Brand
									Studio
								</Copyright>
							</RHS>
						</BottomWrapper>
					</Inner>
				</LayoutWrapper>
			</Outer>
		</FooterWrapper>
	);
};

export default Footer;
