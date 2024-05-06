import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import Image from 'next/image';
import MuxPlayer from '@mux/mux-player-react';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import MobileControls from '../../elements/MobileControls';

type Props = {
	leftImage?: string;
	rightImage?: string;
	leftVideo?: string;
	rightVideo?: string;
};

const TwoColumnMediaWrapper = styled.section`
	padding: ${pxToRem(16)} 0;

	mux-player {
		width: 100%;
		height: 100%;
		object-fit: cover;

		transition: all var(--transition-speed-default) var(--transition-ease);
	}

	img {
		transition: all var(--transition-speed-default) var(--transition-ease);
	}
`;

const LHS = styled.div`
	grid-column: 1 / 7;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
		margin-bottom: ${pxToRem(16)};
	}
`;

const RHS = styled.div`
	grid-column: 7 / -1;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}
`;

const MediaWrapper = styled.div`
	width: 100%;
	padding-top: 120%;
	position: relative;
	border-radius: ${pxToRem(4)};
	overflow: hidden;
`;

const MediaInner = styled.div`
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
	overflow: hidden;

	img {
		object-fit: cover;
	}
`;

const TwoColumnMedia = (props: Props) => {
	const { leftImage, rightImage, leftVideo, rightVideo } = props;

	const [isRhsMuted, setIsRhsMuted] = useState(true);
	const [isLhsMuted, setIsLhsMuted] = useState(true);

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<TwoColumnMediaWrapper
			ref={ref}
			className={`view-element-img-scale-down ${
				inView ? 'view-element-img-scale-down--in-view' : ''
			}`}
		>
			<LayoutWrapper>
				<LayoutGrid>
					<LHS>
						{leftImage ? (
							<MediaWrapper>
								<MediaInner>
									<Image src={leftImage} alt="" fill />
								</MediaInner>
							</MediaWrapper>
						) : (
							leftVideo && (
								<MediaWrapper>
									<MediaInner
										className="cursor-text"
										data-text={
											isRhsMuted ? 'Unmute' : 'Mute'
										}
										data-theme="orange"
										onClick={() =>
											setIsRhsMuted(!isRhsMuted)
										}
									>
										<MuxPlayer
											streamType="on-demand"
											playbackId={leftVideo}
											autoPlay="muted"
											loop={true}
											thumbnailTime={1}
											preload="auto"
											muted={isRhsMuted}
											playsInline={true}
										/>
										<MobileControls
											setIsMuted={setIsRhsMuted}
											isMuted={isRhsMuted}
										/>
									</MediaInner>
								</MediaWrapper>
							)
						)}
					</LHS>
					<RHS>
						{rightImage ? (
							<MediaWrapper>
								<MediaInner>
									<Image src={rightImage} alt="" fill />
								</MediaInner>
							</MediaWrapper>
						) : (
							rightVideo && (
								<MediaWrapper>
									<MediaInner
										className="cursor-text"
										data-text={
											isLhsMuted ? 'Unmute' : 'Mute'
										}
										data-theme="orange"
										onClick={() =>
											setIsLhsMuted(!isLhsMuted)
										}
									>
										<MuxPlayer
											streamType="on-demand"
											playbackId={rightVideo}
											autoPlay="muted"
											loop={true}
											thumbnailTime={1}
											preload="auto"
											muted={isLhsMuted}
											playsInline={true}
										/>
										<MobileControls
											setIsMuted={setIsLhsMuted}
											isMuted={isLhsMuted}
										/>
									</MediaInner>
								</MediaWrapper>
							)
						)}
					</RHS>
				</LayoutGrid>
			</LayoutWrapper>
		</TwoColumnMediaWrapper>
	);
};

export default TwoColumnMedia;
