import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import Image from 'next/image';
import MuxPlayer from '@mux/mux-player-react';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';

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
`;

const TwoColumnMedia = (props: Props) => {
	const { leftImage, rightImage, leftVideo, rightVideo } = props;

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
									<MediaInner>
										<MuxPlayer
											streamType="on-demand"
											playbackId={leftVideo}
											autoPlay="muted"
											loop={true}
											thumbnailTime={1}
											preload="auto"
											muted
											playsInline={true}
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
									<MediaInner>
										<MuxPlayer
											streamType="on-demand"
											playbackId={rightVideo}
											autoPlay="muted"
											loop={true}
											thumbnailTime={1}
											preload="auto"
											muted
											playsInline={true}
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
