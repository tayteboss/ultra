import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import pxToRem from '../../../utils/pxToRem';
import MuxPlayer from '@mux/mux-player-react/lazy';

type Props = {
	preCursor: string;
	media: string;
	suffix: string;
	mediaPoster: string;
};

const HeroTitleWrapper = styled.section`
	padding-top: ${pxToRem(180)};
	max-width: 80%;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		max-width: 100%;
		padding-top: ${pxToRem(120)};
	}
`;

const PreCursor = styled.span`
	margin-right: ${pxToRem(16)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-right: 0;
	}
`;

const Suffix = styled.span`
	margin-left: ${pxToRem(16)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-left: 0;
	}
`;

const Inner = styled.h1`
	margin-bottom: ${pxToRem(32)};
`;

const MobilePlayerWrapper = styled.div`
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		height: auto;
		width: 40%;
		display: block;
		overflow: hidden;
		border-radius: ${pxToRem(4)};
		aspect-ratio: 16 / 9;
		margin-bottom: ${pxToRem(16)};

		mux-player {
			object-fit: cover;
			height: 100%;
			width: 100%;
		}
	}
`;

const DesktopPlayerWrapper = styled.span`
	height: 94px;
	width: auto;
	display: inline-block;
	overflow: hidden;
	border-radius: ${pxToRem(4)};
	aspect-ratio: 16 / 9;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}

	mux-player {
		object-fit: cover;
		height: 100%;
		width: 100%;
	}
`;

const HeroTitle = (props: Props) => {
	const { preCursor, media, suffix, mediaPoster } = props;

	return (
		<HeroTitleWrapper>
			<LayoutWrapper>
				<Inner className="type-d1">
					{media && (
						<MobilePlayerWrapper>
							<MuxPlayer
								streamType="on-demand"
								playbackId={media}
								autoPlay="muted"
								loop={true}
								thumbnailTime={1}
								loading="page"
								preload="auto"
								muted
								playsInline={true}
								poster={mediaPoster}
							/>
						</MobilePlayerWrapper>
					)}
					{preCursor && <PreCursor>{preCursor}</PreCursor>}
					{media && (
						<DesktopPlayerWrapper>
							<MuxPlayer
								streamType="on-demand"
								playbackId={media}
								autoPlay="muted"
								loop={true}
								thumbnailTime={1}
								loading="page"
								preload="auto"
								muted
								playsInline={true}
								poster={mediaPoster}
							/>
						</DesktopPlayerWrapper>
					)}
					{suffix && <Suffix>{suffix}</Suffix>}
				</Inner>
			</LayoutWrapper>
		</HeroTitleWrapper>
	);
};

export default HeroTitle;
